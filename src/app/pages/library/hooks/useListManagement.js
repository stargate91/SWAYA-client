import { useState, useMemo } from 'react';
import { useUi } from '@/providers/UiProvider';
import {
  useListsQuery,
  useItemMembershipQuery,
  useAddListItemMutation,
  useRemoveListItemMutation,
  useCreateListMutation
} from '@/queries';
import { useSettingsQuery } from '@/queries/settingsQueries';
import { useTranslation } from '@/providers/LanguageContext';
import { translateListName, translateListDescription } from '@/lib/listTranslations';

import { normalizeMediaType, MEDIA_TYPES } from '@/lib/mediaTypes';
import { resolveTitle } from '@/lib/normalizeMediaEntity';

const buildListItemPayload = (item, normalizedType, rawType) => {
  const isPerson = normalizedType === MEDIA_TYPES.PERSON;
  if (isPerson) {
    return {
      person_id: item?.id,
      media_type: 'person',
      title: item?.name,
      poster_path: item?.profile_path
    };
  }

  const isTvItem = normalizedType === MEDIA_TYPES.TV || rawType === 'tv';
  const isSceneItem = normalizedType === MEDIA_TYPES.SCENE || rawType === 'scene';
  const poster = isSceneItem ? (item?.backdrop_path || item?.poster_path) : item?.poster_path;

  return {
    media_item_id: !isTvItem ? item?.id : undefined,
    tmdb_id: isTvItem ? item?.id : undefined,
    media_type: rawType || normalizedType,
    title: resolveTitle(item, item?.filename),
    poster_path: poster,
    year: item?.year ? parseInt(item.year, 10) : undefined,
    is_adult: !!item?.is_adult || !!item?.adult || isSceneItem
  };
};

export default function useListManagement({ item, type: rawType }) {
  const { t } = useTranslation();
  const { toast } = useUi();
  const normalizedType = normalizeMediaType(rawType);
  const isTv = normalizedType === MEDIA_TYPES.TV;
  const isPerson = normalizedType === MEDIA_TYPES.PERSON;
  const isScene = normalizedType === MEDIA_TYPES.SCENE;
  const isVideo = normalizedType === MEDIA_TYPES.VIDEO;
  const isAdultItem = !!item?.is_adult || !!item?.adult || isScene;

  // Map media type to list_type enum
  const listType = isPerson
    ? 'person'
    : (isScene || isVideo)
      ? 'video_scene'
      : 'movie_tv';

  const { data: settings = {} } = useSettingsQuery();
  const includeAdult = (settings?.include_adult === true || settings?.include_adult === 'true') || isAdultItem;

  // Construct item_id for membership check
  const membershipItemId = isPerson
    ? (item?.id ? `person_${item.id}` : undefined)
    : (isTv
        ? (item?.id && String(item.id).startsWith('tmdb_') ? item.id : `tmdb_${item?.id}`)
        : item?.id);

  // Queries
  const { data: rawLists = [], isLoading: listsLoading } = useListsQuery(includeAdult);
  const lists = useMemo(() => {
    return rawLists.map((l) => ({
      ...l,
      name: translateListName(l, t),
      description: translateListDescription(l, l.description, t),
    }));
  }, [rawLists, t]);

  const { data: membershipData = { list_ids: [], memberships: [] }, isLoading: membershipLoading } =
    useItemMembershipQuery(membershipItemId);

  // Mutations
  const addMutation = useAddListItemMutation();
  const removeMutation = useRemoveListItemMutation();
  const createMutation = useCreateListMutation();

  const [creating, setCreating] = useState(false);
  const [prevListIds, setPrevListIds] = useState(membershipData.list_ids);
  const [optimisticListIds, setOptimisticListIds] = useState(null);

  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    return a.every((val, i) => val === b[i]);
  };

  if (!arraysEqual(membershipData.list_ids, prevListIds)) {
    setPrevListIds(membershipData.list_ids);
    setOptimisticListIds(null);
  }

  const actualListIds = optimisticListIds !== null ? optimisticListIds : (membershipData.list_ids || []);

  // Filter lists by correct list_type AND adult status matching the current item
  const filteredLists = lists.filter(l => l.list_type === listType && Boolean(l.is_adult) === Boolean(isAdultItem));

  // Find the matching watchlist based on media type + adult status
  const watchlist = useMemo(() => {
    if (isPerson) return null;
    return filteredLists.find(l => l.is_watchlist) || null;
  }, [filteredLists, isPerson]);

  const otherLists = !isPerson ? filteredLists.filter(l => !l.is_watchlist) : filteredLists;

  const isWatchlistAdded = watchlist ? actualListIds.includes(watchlist.id) : false;

  const handleToggleList = async (list) => {
    const listId = list.id;
    const isAdded = actualListIds.includes(listId);

    if (isAdded) {
      setOptimisticListIds((prev) => (prev || membershipData.list_ids || []).filter(id => id !== listId));
      const membership = membershipData.memberships?.find(m => m.list_id === listId);
      if (membership) {
        try {
          await removeMutation.mutateAsync({
            listId,
            itemId: membership.list_item_id
          });
        } catch (err) {
          console.error('Failed to remove item from list:', err);
          toast(err?.message || t('lists.remove_item_failed') || 'Failed to remove item from list', 'danger');
          setOptimisticListIds(membershipData.list_ids);
        }
      }
    } else {
      setOptimisticListIds((prev) => [...(prev || membershipData.list_ids || []), listId]);
      try {
        const payload = buildListItemPayload(item, normalizedType, rawType);

        await addMutation.mutateAsync({
          listId,
          payload
        });
      } catch (err) {
        console.error('Failed to add item to list:', err);
        toast(err?.message || t('common.error') || 'Failed to add item to list', 'danger');
        setOptimisticListIds(membershipData.list_ids);
      }
    }
  };

  const handleCreateList = async (newListName) => {
    if (!newListName.trim()) return;

    try {
      setCreating(true);
      const newList = await createMutation.mutateAsync({
        name: newListName.trim(),
        description: '',
        color: 'var(--color-accent-blue)',
        list_type: listType,
        is_adult: isAdultItem
      });

      if (newList && newList.id) {
        const payload = buildListItemPayload(item, normalizedType, rawType);

        await addMutation.mutateAsync({
          listId: newList.id,
          payload
        });
      }
    } catch (err) {
      console.error('Failed to create list or add item:', err);
      toast(err?.message || t('common.error') || 'Failed to create list', 'danger');
    } finally {
      setCreating(false);
    }
  };

  const [newListName, setNewListName] = useState('');

  const onSubmitCreateList = async (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }
    if (!newListName.trim()) return;
    await handleCreateList(newListName);
    setNewListName('');
  };

  return {
    loading: listsLoading || membershipLoading,
    watchlist,
    otherLists,
    isWatchlistAdded,
    actualListIds,
    handleToggleList,
    handleCreateList,
    creating,
    newListName,
    setNewListName,
    onSubmitCreateList,
  };
}


