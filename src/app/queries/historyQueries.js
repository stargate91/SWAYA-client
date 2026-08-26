import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useLibraryModeStore, isNsfwMode } from '@/stores/useLibraryModeStore';
import { QK } from '@/lib/queryKeys';
import { DEFAULT_PAGE_SIZE } from '@/lib/paginationConstants';

export const usePeaksQuery = () => useQuery({
  queryKey: QK.peaksHistory,
  queryFn: () => api.history.getPeaks({ limit: 50 }),
});

export const useHistoryQuery = () => useInfiniteQuery({
  queryKey: QK.history,
  queryFn: ({ pageParam = 1 }) => api.history.get({ page: pageParam, limit: DEFAULT_PAGE_SIZE }),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => lastPage.has_more ? lastPage.page + 1 : undefined,
});

export const useWatchedHistoryQuery = () => {
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  return useInfiniteQuery({
    queryKey: [...QK.watchedHistory, sessionMode],
    queryFn: ({ pageParam = 1 }) => api.history.getWatched({
      page: pageParam,
      limit: DEFAULT_PAGE_SIZE,
      include_adult: isNsfwMode(sessionMode) ? 'true' : 'false',
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.has_more ? lastPage.page + 1 : undefined,
  });
};

export const useBatchLogsQuery = (batchId, { enabled = true } = {}) => useQuery({
  queryKey: [...QK.historyBatchLogs, batchId],
  queryFn: () => api.history.getBatchLogs(batchId, { limit: 500 }),
  enabled: Boolean(enabled && batchId),
  staleTime: 5 * 60 * 1000,
});

export const useUndoMutation = () => useMutation({
  mutationFn: (batchId) => api.rename.undo(batchId),
  meta: {
    invalidates: [QK.history, QK.historyBatchLogs, QK.scanStatus],
  },
});

