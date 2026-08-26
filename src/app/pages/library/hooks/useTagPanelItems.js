import { useState, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTagItemsQuery } from '@/queries';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';
import { getLibraryTagBucketKeys } from '@/lib/libraryTabs';
import { isPersonMediaType } from '@/lib/mediaTypes';

export function useTagPanelItems({ tag, activeSessionMode }) {
  const queryClient = useQueryClient();

  const tagItemsQueryKey = useMemo(
    () => [...QK.tagItems, tag.name, activeSessionMode === 'nsfw'],
    [tag.name, activeSessionMode]
  );

  const removeTagMutation = useMutation({
    mutationFn: async (item) => {
      const isPerson = isPersonMediaType(item.type);
      if (isPerson) {
        const detail = await api.people.getDetail(item.id);
        const currentTags = detail.custom_tags || [];
        const nextTags = currentTags.filter((t) => t !== tag.name);
        return api.people.updateStatus(item.id, { custom_tags: nextTags });
      } else {
        const detail = await api.library.getItemDetail(item.id, { mediaType: item.type });
        const currentTags = detail.custom_tags || [];
        const nextTags = currentTags.filter((t) => t !== tag.name);
        return api.media.updateStatus(item.id, { custom_tags: nextTags, media_type: item.type });
      }
    },
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: tagItemsQueryKey });
      const previousTagDetails = queryClient.getQueryData(tagItemsQueryKey);

      if (previousTagDetails) {
        queryClient.setQueryData(tagItemsQueryKey, (oldData) => {
          if (!oldData) return oldData;
          const updated = {};
          const itemType = item.type || item.media_type;
          for (const key of Object.keys(oldData)) {
            if (Array.isArray(oldData[key])) {
              updated[key] = oldData[key].filter(
                (i) => !(String(i.id) === String(item.id) && (i.type || i.media_type) === itemType)
              );
            } else {
              updated[key] = oldData[key];
            }
          }
          return updated;
        });
      }

      const filterItemTag = (oldData) => {
        if (!oldData) return oldData;
        const currentCustomTags = oldData.custom_tags;
        const currentTags = oldData.tags;
        const filterList = (arr) => (Array.isArray(arr) ? arr.filter((t) => (typeof t === 'string' ? t : t?.name) !== tag.name) : arr);
        return {
          ...oldData,
          ...(currentCustomTags !== undefined ? { custom_tags: filterList(currentCustomTags) } : {}),
          ...(currentTags !== undefined ? { tags: filterList(currentTags) } : {}),
        };
      };

      if (item.id != null) {
        const idStr = String(item.id);
        queryClient.setQueriesData({ queryKey: [...QK.libraryItemDetail, idStr] }, filterItemTag);
        queryClient.setQueriesData({ queryKey: [...QK.libraryTvDetail, idStr] }, filterItemTag);
        queryClient.setQueriesData({ queryKey: [...QK.personDetail, idStr] }, filterItemTag);
        queryClient.setQueriesData({ queryKey: [...QK.fullMetadata, idStr] }, filterItemTag);
      }

      return { previousTagDetails };
    },
    onError: (_err, _item, context) => {
      if (context?.previousTagDetails) {
        queryClient.setQueryData(tagItemsQueryKey, context.previousTagDetails);
      }
    },
    meta: {
      invalidates: () => [
        QK.libraryTags,
        QK.allTags,
        QK.library,
        QK.people,
        QK.peopleInfinite,
        tagItemsQueryKey,
        QK.libraryItemDetail,
        QK.libraryTvDetail,
        QK.personDetail,
        QK.fullMetadata,
      ],
    },
  });

  const { data: tagDetails, isLoading } = useTagItemsQuery(tag.name, activeSessionMode === 'nsfw');

  const allItems = useMemo(() => {
    if (!tagDetails) return [];
    return getLibraryTagBucketKeys(activeSessionMode).flatMap((key) => tagDetails[key] || []);
  }, [tagDetails, activeSessionMode]);

  const [visibleCount, setVisibleCount] = useState(20);
  const paginatedItems = allItems.slice(0, visibleCount);
  const hasMore = allItems.length > visibleCount;

  const loadMore = () => setVisibleCount((prev) => prev + 20);

  return {
    allItems,
    paginatedItems,
    hasMore,
    isLoading,
    loadMore,
    removeTagMutation,
    handleRemoveTagItem: (targetItem) => removeTagMutation.mutate(targetItem),
  };
}
