import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRemoveListItemMutation, fetchPeopleAll, fetchGlobalSearch, fetchLibraryItems } from '@/queries';
import { useUi } from '@/providers/UiProvider';
import { useDebounce } from '@/hooks/useDebounce';
import { resolveTitle } from '@/lib/normalizeMediaEntity';
import { matchesEntityId } from '@/lib/entityIds';

export default function useListsAddDrawer({
  isOpen,
  activeList,
  addListItemMutation,
  activeListDetails,
  t,
}) {
  const queryClient = useQueryClient();
  const isAdultActive = Boolean(activeList?.is_adult);

  const [query, setQuery] = useState('');
  const [source, setSource] = useState('library'); // 'library' or 'discover'
  const [mediaType, setMediaType] = useState('movie'); // 'movie', 'tv', 'scene'
  const [provider, setProvider] = useState('tmdb'); // 'tmdb', 'theporndb', 'stashdb'
  const debouncedQuery = useDebounce(query, source === 'library' && !query.trim() ? 0 : 350);
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const pageRef = useRef(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [statusFilter, setStatusFilter] = useState('not_added'); // 'added', 'not_added'
  const { toast } = useUi();
  const prevIsOpenRef = useRef(false);

  const removeListItemMutation = useRemoveListItemMutation();

  // Reset inputs when modal opens or active list changes
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      queueMicrotask(() => {
        setQuery('');
        setResults([]);
        pageRef.current = 1;
        setHasMore(false);
        setStatusFilter('not_added');
        setSource('library');
        if (activeList) {
          const isSfwVideo = !activeList.is_adult && activeList.list_type === 'video_scene';
          if (isSfwVideo) {
            setMediaType('videos');
            setProvider('tmdb');
          } else {
            setMediaType(activeList.list_type === 'video_scene' ? 'scene' : 'movie');
            setProvider(activeList.list_type === 'video_scene' || activeList.is_adult ? 'theporndb' : 'tmdb');
          }
        }
      });
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, activeList]);

  // Reset search when changing tabs while drawer is open
  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => {
        setQuery('');
        setResults([]);
        setHasMore(false);
        pageRef.current = 1;
      });
    }
  }, [isOpen, source, mediaType, provider]);

  const handleSearch = useCallback(async (isNew = true, queryToUse) => {
    const activeQuery = (queryToUse !== undefined ? queryToUse : debouncedQuery).trim();
    if (source === 'discover' && !activeQuery) {
      setResults([]);
      setSearching(false);
      setLoadingMore(false);
      return;
    }

    const currentPage = isNew ? 1 : pageRef.current + 1;
    if (isNew) {
      pageRef.current = 1;
      setSearching(true);
    } else {
      setLoadingMore(true);
    }

    try {
      if (activeList?.list_type === 'person') {
        if (source === 'library') {
          const limit = 20;
          const currentOffset = isNew ? 0 : (currentPage - 1) * limit;
          const res = await fetchPeopleAll(queryClient, {
            search: activeQuery || undefined,
            offset: currentOffset,
            limit,
            adult_only: isAdultActive,
            include_inactive: false
          });
          const newItems = res.items || res.results || res || [];
          setResults((prev) => isNew ? newItems : [...prev, ...newItems]);
          setHasMore(res.has_more || (newItems.length === limit));
          pageRef.current = currentPage;
        } else {
          const res = await fetchGlobalSearch(queryClient, {
            query: activeQuery,
            source: isAdultActive ? provider : 'tmdb',
            type: 'person',
            includeAdult: isAdultActive
          });
          setResults(res.results || res || []);
          setHasMore(false);
        }
      } else {
        if (source === 'library') {
          const pageSize = 20;
          const res = await fetchLibraryItems(queryClient, {
            search: activeQuery || undefined,
            tab: mediaType === 'movie' ? 'movies' : mediaType === 'tv' ? 'tv' : mediaType === 'videos' ? 'videos' : 'scenes',
            page: currentPage,
            pageSize,
            include_adult: isAdultActive,
            filter_ownership: 'all'
          });
          const newItems = res.items || res.results || [];
          setResults((prev) => isNew ? newItems : [...prev, ...newItems]);
          setHasMore(res.page < res.total_pages);
          pageRef.current = currentPage;
        } else {
          const res = await fetchGlobalSearch(queryClient, {
            query: activeQuery,
            source: isAdultActive ? provider : 'tmdb',
            type: mediaType === 'movie' ? 'movie' : mediaType === 'tv' ? 'tv' : 'scene',
            includeAdult: isAdultActive
          });
          setResults(res.results || res || []);
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
      setLoadingMore(false);
    }
  }, [debouncedQuery, source, mediaType, provider, isAdultActive, activeList, queryClient]);

  useEffect(() => {
    if (!isOpen) return;

    let isSubscribed = true;
    queueMicrotask(() => {
      if (!isSubscribed) return;
      if (source === 'library' || debouncedQuery.trim()) {
        handleSearch(true, debouncedQuery);
      } else {
        setResults([]);
        setHasMore(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [debouncedQuery, source, mediaType, provider, isOpen, isAdultActive, handleSearch]);

  const listType = activeList?.list_type;

  const handleAdd = async (item) => {
    try {
      let result;
      if (listType === 'person') {
        result = await addListItemMutation.mutateAsync({
          listId: activeList.id,
          payload: {
            person_id: item.id
          }
        });
      } else {
        const isTvItem = item.media_type === 'tv' || mediaType === 'tv';
        const isSceneItem = item.media_type === 'scene' || mediaType === 'scene' || item.media_type === 'video' || mediaType === 'video' || item.media_type === 'videos' || mediaType === 'videos';
        const poster = isSceneItem 
          ? (item.still_path || item.backdrop_path || item.poster_path) 
          : (item.poster_path || item.profile_path);

        result = await addListItemMutation.mutateAsync({
          listId: activeList.id,
          payload: {
            media_item_id: (source === 'library' && !isTvItem) ? item.id : undefined,
            tmdb_id: (source === 'discover' || isTvItem) ? item.id : undefined,
            media_type: item.media_type || mediaType,
            provider: source === 'discover' ? (item.provider || provider) : undefined,
            title: resolveTitle(item),
            poster_path: isSceneItem ? undefined : poster,
            still_path: isSceneItem ? poster : undefined,
            year: item.year ? parseInt(item.year, 10) : undefined
          }
        });
      }
      if (result?.already_exists) {
        toast(t('lists.item_already_exists') || 'Item is already on this list', 'warning');
      } else {
        toast(t('lists.item_added_success') || 'Item added successfully!', 'success');
      }
    } catch (err) {
      toast(err.message || 'Failed to add item', 'danger');
    }
  };

  const getListItem = useCallback((item) => {
    if (!activeListDetails || !activeListDetails.items) return null;
    return activeListDetails.items.find((i) => {
      if (listType === 'person') {
        return matchesEntityId(i.person_id, item.id);
      }
      if (item.id && matchesEntityId(i.media_item_id, item.id)) return true;
      if (matchesEntityId(i.tmdb_id, item.tmdb_id || item.id)) return true;
      if (matchesEntityId(i.external_id, item.external_id || item.id)) return true;
      return false;
    });
  }, [activeListDetails, listType]);

  const isAdded = useCallback((item) => !!getListItem(item), [getListItem]);

  const handleRemove = async (item) => {
    const listItem = getListItem(item);
    if (!listItem) return;
    try {
      await removeListItemMutation.mutateAsync({
        listId: activeList.id,
        itemId: listItem.id
      });
      toast(t('lists.item_removed_success') || 'Item removed from list', 'success');
    } catch (err) {
      toast(err.message || t('lists.remove_item_failed') || 'Failed to remove item', 'danger');
    }
  };
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 40 && hasMore && !loadingMore && !searching) {
      handleSearch(false);
    }
  };

  const isSfwVideoList = !isAdultActive && listType === 'video_scene';

  const placeholder = useMemo(() => {
    if (listType === 'person') return t('lists.search_placeholder_performers');
    if (isSfwVideoList) return t('lists.search_placeholder_videos');
    if (listType === 'video_scene') return t('lists.search_placeholder_scenes');
    return t('lists.search_placeholder_movies');
  }, [listType, isSfwVideoList, t]);

  const handleSourceChange = useCallback((val) => {
    setSource(val);
    if (val === 'discover') {
      if (mediaType === 'scene' || mediaType === 'videos') {
        if (isAdultActive) {
          setMediaType('scene');
          setProvider('theporndb');
        } else {
          setMediaType('movie');
          setProvider('tmdb');
        }
      } else {
        setProvider('tmdb');
      }
    }
    setResults([]);
  }, [mediaType, isAdultActive]);

  const mediaTypeOptions = useMemo(() => {
    if (listType === 'video_scene') {
      return [
        { label: t('lists.media_type_scenes'), value: 'scene' },
        ...(source === 'library' ? [{ label: t('lists.media_type_videos'), value: 'videos' }] : [])
      ];
    }
    return [
      { label: t('lists.media_type_movies'), value: 'movie' },
      { label: t('lists.media_type_tv'), value: 'tv' }
    ];
  }, [listType, source, t]);

  const providerOptions = useMemo(() => {
    if (listType === 'person') {
      return [
        { label: 'TMDB', value: 'tmdb' },
        { label: 'ThePornDB', value: 'theporndb' },
        { label: 'StashDB', value: 'stashdb' },
        { label: 'FansDB', value: 'fansdb' }
      ];
    }
    if (mediaType === 'scene') {
      return [
        { label: 'ThePornDB', value: 'theporndb' },
        { label: 'StashDB', value: 'stashdb' },
        { label: 'FansDB', value: 'fansdb' }
      ];
    }
    return [
      { label: 'TMDB', value: 'tmdb' },
      { label: 'ThePornDB', value: 'theporndb' }
    ];
  }, [listType, mediaType]);

  const showMediaTypeChips = listType !== 'person' && !isSfwVideoList && mediaTypeOptions.length > 1;
  const showProviderChips = isAdultActive && source === 'discover' && (mediaType === 'movie' || mediaType === 'scene' || listType === 'person');

  const filteredResults = useMemo(() => {
    if (source === 'discover') return results;
    return results.filter((item) => {
      const added = isAdded(item);
      if (statusFilter === 'added') return added;
      if (statusFilter === 'not_added') return !added;
      return true;
    });
  }, [results, source, statusFilter, isAdded]);

  const isSceneItem = mediaType === 'scene' || mediaType === 'video' || mediaType === 'videos' || listType === 'video_scene';
  const skeletonAspect = listType === 'person' ? 'circle' : (isSceneItem ? 'landscape' : 'poster');

  return {
    query,
    setQuery,
    source,
    setSource,
    handleSourceChange,
    mediaType,
    setMediaType,
    mediaTypeOptions,
    showMediaTypeChips,
    provider,
    setProvider,
    providerOptions,
    showProviderChips,
    placeholder,
    results,
    filteredResults,
    setResults,
    searching,
    loadingMore,
    statusFilter,
    setStatusFilter,
    isAdultActive,
    handleAdd,
    handleRemove,
    isAdded,
    handleScroll,
    skeletonAspect,
  };
}
