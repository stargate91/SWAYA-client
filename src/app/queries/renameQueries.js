import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';

export const useRenameMutation = () => useMutation({
  mutationFn: (payload) => api.rename.start(payload),
  meta: {
    invalidates: [QK.history, QK.organizer, QK.organizerCount],
  },
});

export const useRenamePreviewQuery = ({ scanMode, sessionMode } = {}, options = {}) => useQuery({
  queryKey: [...QK.organizerRenamePreview, scanMode || 'all', sessionMode || 'sfw'],
  queryFn: () => api.organizer.getRenamePreview({ scanMode, sessionMode }),
  ...options,
});

export const fetchRenamePreview = (queryClient, { scanMode, sessionMode } = {}) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.organizerRenamePreview, scanMode || 'all', sessionMode || 'sfw'],
    queryFn: () => api.organizer.getRenamePreview({ scanMode, sessionMode }),
  });
};
