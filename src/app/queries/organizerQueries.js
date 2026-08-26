import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';

export const getOrganizerQueryKey = (scanMode, sessionMode, page, pageSize, tab, subTab, q, sortBy, sortDir) => [
  ...QK.organizer,
  scanMode || 'all',
  sessionMode || 'sfw',
  page || 1,
  pageSize || 40,
  tab || 'manual',
  subTab || 'all',
  q || '',
  sortBy || 'source',
  sortDir || 'asc',
];

export const useOrganizerQuery = (scanMode, sessionMode, page, pageSize, tab, subTab, q, sortBy, sortDir, enabled = true) => useQuery({
  queryKey: getOrganizerQueryKey(scanMode, sessionMode, page, pageSize, tab, subTab, q, sortBy, sortDir),
  queryFn: () => api.organizer.get({ scanMode, sessionMode, page, pageSize, tab, subTab, q, sortBy, sortDir }),
  placeholderData: (previousData, previousQuery) => {
    if (!previousQuery) return undefined;
    const prevKey = previousQuery.queryKey;
    const prevScanMode = prevKey[1];
    const prevSessionMode = prevKey[2];
    const prevTab = prevKey[5];
    const prevSubTab = prevKey[6];

    if (
      prevScanMode !== (scanMode || 'all') ||
      prevSessionMode !== (sessionMode || 'sfw') ||
      prevTab !== (tab || 'manual') ||
      prevSubTab !== (subTab || 'all')
    ) {
      return undefined;
    }
    return previousData;
  },
  enabled,
});

export const useOrganizerCountQuery = (scanMode, sessionMode, isScanActive = false) => useQuery({
  queryKey: [...QK.organizerCount, scanMode || 'all', sessionMode || 'sfw'],
  queryFn: () => api.organizer.getCount({ scanMode, sessionMode }),
  refetchInterval: isScanActive ? 3000 : false,
});

export const useOrganizerDeleteMutation = () => useMutation({
  mutationFn: ({ item_ids, extra_ids, mode }) => api.organizer.delete({ item_ids, extra_ids, mode }),
  meta: {
    invalidates: [QK.organizer, QK.organizerCount, QK.stats],
    invalidateAllMedia: true,
  },
});

export const useOrganizerParentCandidatesQuery = ({ scanMode, sessionMode, tab, isManual = false } = {}, options = {}) => {
  const queryKeyGroup = isManual ? QK.organizerParentCandidatesManual : QK.organizerParentCandidatesMatched;
  const effectiveTab = tab || (scanMode === 'tv' ? 'episodes' : scanMode);
  return useQuery({
    queryKey: [...queryKeyGroup, scanMode, sessionMode, effectiveTab, isManual],
    queryFn: () => api.organizer.get({
      scanMode,
      sessionMode,
      tab: isManual ? 'manual' : effectiveTab,
      page: 1,
      pageSize: 1000,
    }),
    staleTime: 10000,
    ...options,
  });
};

