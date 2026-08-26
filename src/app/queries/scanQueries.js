import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';

export const useScanStatusQuery = ({ enabled = true, select } = {}) => useQuery({
  queryKey: QK.scanStatus,
  queryFn: () => api.scan.getStatus(),
  enabled,
  select,
  refetchInterval: (query) => {
    const data = query.state.data;
    if (!data?.active) return false;
    return data.scan_mode === 'offline' ? 400 : 1200;
  },
});

export const useScanMutation = () => useMutation({
  mutationFn: (payload) => api.scan.start(payload),
  meta: {
    invalidates: [QK.scanStatus, QK.organizer, QK.organizerCount],
  },
});

export const useScanRetryMutation = () => useMutation({
  mutationFn: (payload) => api.scan.retry(payload),
  meta: {
    invalidates: [QK.scanStatus, QK.organizer, QK.organizerCount],
  },
});

export const useHydrateStatusQuery = ({ enabled = true, select } = {}) => useQuery({
  queryKey: QK.hydrateStatus,
  queryFn: () => api.hydrate.getStatus(),
  enabled,
  select,
  refetchInterval: (query) => {
    const data = query.state.data;
    if (!data?.active) return false;
    return 1200;
  },
});

export const useCollectionStatusQuery = ({ enabled = true, select } = {}) => useQuery({
  queryKey: QK.collectionStatus,
  queryFn: () => api.collection.getStatus(),
  enabled,
  select,
  refetchInterval: (query) => {
    const data = query.state.data;
    if (!data?.active) return false;
    return 1200;
  },
});

export const useStopTaskMutation = () => useMutation({
  mutationFn: () => api.task.stop(),
  meta: {
    invalidates: [QK.scanStatus, QK.hydrateStatus, QK.collectionStatus, QK.organizer, QK.organizerCount],
  },
});

export const fetchScanStatus = (queryClient) => {
  return queryClient.fetchQuery({
    queryKey: QK.scanStatus,
    queryFn: () => api.scan.getStatus(),
  });
};

