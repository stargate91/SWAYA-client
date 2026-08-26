import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';

export const useListsQuery = (includeAdult = false) => useQuery({
  queryKey: [...QK.lists, includeAdult],
  queryFn: () => api.lists.getLists(includeAdult),
});

export const useListDetailsQuery = (listId, params = {}, options = {}) => useQuery({
  queryKey: [...QK.listDetails, listId, params],
  queryFn: () => api.lists.getListDetails(listId, params),
  enabled: !!listId,
  ...options,
});

export const useCreateListMutation = () => useMutation({
  mutationFn: (payload) => api.lists.createList(payload),
  meta: {
    invalidates: [QK.lists],
  },
});

export const useImportListMutation = () => useMutation({
  mutationFn: (file) => api.lists.importList(file),
  meta: {
    invalidates: [QK.lists, QK.listDetails],
  },
});

export const useUpdateListMutation = () => useMutation({
  mutationFn: ({ listId, payload }) => api.lists.updateList(listId, payload),
  meta: {
    invalidates: [QK.lists, QK.listDetails],
  },
});

export const useDeleteListMutation = () => useMutation({
  mutationFn: (listId) => api.lists.deleteList(listId),
  meta: {
    invalidates: [QK.lists, QK.listDetails, QK.listMembership, QK.recommendations],
  },
});

export const useAddListItemMutation = () => useMutation({
  mutationFn: ({ listId, payload }) => api.lists.addToList(listId, payload),
  meta: {
    invalidates: [QK.lists, QK.listDetails, QK.listMembership, QK.libraryItemDetail, QK.libraryTvDetail, QK.recommendations],
    invalidateEntity: (_data, variables) => {
      const itemId = variables?.payload?.media_item_id || variables?.payload?.tmdb_id || variables?.payload?.person_id || variables?.payload?.item_id || variables?.payload?.id || variables?.itemId;
      const mediaType = variables?.payload?.media_type || variables?.payload?.type || variables?.mediaType;
      if (!itemId || mediaType === 'person' || mediaType === 'people') return null;
      return { id: itemId, opts: { lists: true, listsList: true } };
    },
    invalidatePerson: (_data, variables) => {
      const itemId = variables?.payload?.media_item_id || variables?.payload?.tmdb_id || variables?.payload?.person_id || variables?.payload?.item_id || variables?.payload?.id || variables?.itemId;
      const mediaType = variables?.payload?.media_type || variables?.payload?.type || variables?.mediaType;
      if (!itemId || (mediaType !== 'person' && mediaType !== 'people')) return null;
      return { id: itemId, opts: { listsList: true } };
    },
  },
});

export const useRemoveListItemMutation = () => useMutation({
  mutationFn: ({ listId, itemId }) => api.lists.removeFromList(listId, itemId),
  meta: {
    invalidates: [QK.lists, QK.listDetails, QK.listMembership, QK.libraryItemDetail, QK.libraryTvDetail, QK.recommendations],
    invalidateEntity: (_data, variables) => {
      const itemId = variables?.itemId;
      const mediaType = variables?.mediaType;
      if (!itemId || mediaType === 'person' || mediaType === 'people') return null;
      return { id: itemId, opts: { lists: true, listsList: true } };
    },
    invalidatePerson: (_data, variables) => {
      const itemId = variables?.itemId;
      const mediaType = variables?.mediaType;
      if (!itemId || (mediaType !== 'person' && mediaType !== 'people')) return null;
      return { id: itemId, opts: { listsList: true } };
    },
  },
});

export const useUploadListImageMutation = () => useMutation({
  mutationFn: ({ listId, file }) => api.lists.uploadListImage(listId, file),
  meta: {
    invalidates: [QK.lists, QK.listDetails],
  },
});

export const useOverrideListImageMutation = () => useMutation({
  mutationFn: ({ listId, path }) => api.lists.overrideListImage(listId, path),
  meta: {
    invalidates: [QK.lists, QK.listDetails],
  },
});

export const useItemMembershipQuery = (itemId) => {
  return useQuery({
    queryKey: [...QK.listMembership, itemId],
    queryFn: () => api.lists.getItemMembership(itemId),
    enabled: !!itemId,
  });
};


