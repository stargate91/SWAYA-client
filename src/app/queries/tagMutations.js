import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';

export const useCreateTagMutation = () => useMutation({
  mutationFn: (payload) => api.tags.create(payload),
  meta: {
    invalidateTag: (_data, variables) => variables,
  },
});

export const useUpdateTagMutation = () => useMutation({
  mutationFn: ({ id, tagId, payload }) => api.tags.update(id ?? tagId, payload),
  meta: {
    invalidateTag: (_data, variables) => variables?.payload?.name || variables?.id || variables?.tagId,
  },
});

export const useDeleteTagMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tagIdOrObj) => {
      const id = typeof tagIdOrObj === 'object' ? tagIdOrObj.id : tagIdOrObj;
      return api.tags.delete(id);
    },
    onSuccess: (_data, tagIdOrObj) => {
      const tagObj = typeof tagIdOrObj === 'object' ? tagIdOrObj : { id: tagIdOrObj };

      const removeTagFromCache = (oldData) => {
        if (!oldData) return oldData;
        const currentCustomTags = oldData.custom_tags;
        const currentTags = oldData.tags;

        const filterList = (arr) => {
          if (!Array.isArray(arr)) return arr;
          return arr.filter((t) => {
            if (typeof t === 'string') {
              return t !== tagObj.name && t !== String(tagObj.id);
            }
            if (t && typeof t === 'object') {
              return (tagObj.name && t.name !== tagObj.name) || (tagObj.id && String(t.id) !== String(tagObj.id));
            }
            return true;
          });
        };

        return {
          ...oldData,
          ...(currentCustomTags !== undefined ? { custom_tags: filterList(currentCustomTags) } : {}),
          ...(currentTags !== undefined ? { tags: filterList(currentTags) } : {}),
        };
      };

      queryClient.setQueriesData({ queryKey: QK.libraryItemDetail }, removeTagFromCache);
      queryClient.setQueriesData({ queryKey: QK.libraryTvDetail }, removeTagFromCache);
      queryClient.setQueriesData({ queryKey: QK.personDetail }, removeTagFromCache);
      queryClient.setQueriesData({ queryKey: QK.fullMetadata }, removeTagFromCache);
    },
    meta: {
      invalidateTag: (_data, tagIdOrObj) => (typeof tagIdOrObj === 'object' ? tagIdOrObj : { id: tagIdOrObj }),
    },
  });
};

