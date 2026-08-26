import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';

export function useActiveTorrentsQuery(enabled = true) {
  return useQuery({
    queryKey: QK.activeTorrents,
    queryFn: () => api.torrent.getActive(),
    refetchInterval: (query) => {
      if (!enabled) return false;
      const downloads = query.state.data?.downloads || [];
      if (downloads.length === 0) return false;
      const hasActive = downloads.some((d) => {
        const state = (d.state || '').toLowerCase();
        return state === 'downloading' || state === 'seeding' || (!state.includes('pause') && !state.includes('stop'));
      });
      return hasActive ? 2000 : 5000;
    },
    enabled,
  });
}

export async function pauseTorrentOptimistic(queryClient, hash) {
  await queryClient.cancelQueries({ queryKey: QK.activeTorrents });
  const previousData = queryClient.getQueryData(QK.activeTorrents);

  if (previousData?.downloads) {
    queryClient.setQueryData(QK.activeTorrents, {
      ...previousData,
      downloads: previousData.downloads.map((t) => {
        if (t.hash !== hash) return t;
        const isCompleted = (t.progress || 0) >= 100;
        return {
          ...t,
          state: isCompleted ? 'pausedUP' : 'pausedDL',
          raw_state: isCompleted ? 'pausedUP' : 'pausedDL',
          speed: 0,
          dlspeed: 0,
          upspeed: 0,
        };
      }),
    });
  }

  return { previousData };
}

export async function resumeTorrentOptimistic(queryClient, hash) {
  await queryClient.cancelQueries({ queryKey: QK.activeTorrents });
  const previousData = queryClient.getQueryData(QK.activeTorrents);

  if (previousData?.downloads) {
    queryClient.setQueryData(QK.activeTorrents, {
      ...previousData,
      downloads: previousData.downloads.map((t) => {
        if (t.hash !== hash) return t;
        const isCompleted = (t.progress || 0) >= 100;
        return {
          ...t,
          state: isCompleted ? 'seeding' : 'downloading',
          raw_state: isCompleted ? 'uploading' : 'downloading',
        };
      }),
    });
  }

  return { previousData };
}

export async function deleteTorrentOptimistic(queryClient, hash) {
  await queryClient.cancelQueries({ queryKey: QK.activeTorrents });
  const previousData = queryClient.getQueryData(QK.activeTorrents);

  if (previousData?.downloads) {
    queryClient.setQueryData(QK.activeTorrents, {
      ...previousData,
      downloads: previousData.downloads.filter((t) => t.hash !== hash),
    });
  }

  return { previousData };
}

export function usePauseTorrentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hash) => api.torrent.pause(hash),
    onMutate: (hash) => pauseTorrentOptimistic(queryClient, hash),
    onError: (_err, _hash, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(QK.activeTorrents, context.previousData);
      }
    },
    meta: {
      invalidates: [QK.activeTorrents],
    },
  });
}

export function useResumeTorrentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hash) => api.torrent.resume(hash),
    onMutate: (hash) => resumeTorrentOptimistic(queryClient, hash),
    onError: (_err, _hash, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(QK.activeTorrents, context.previousData);
      }
    },
    meta: {
      invalidates: [QK.activeTorrents],
    },
  });
}

export function useDeleteTorrentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ hash, deleteFiles = false }) => api.torrent.delete(hash, deleteFiles),
    onMutate: ({ hash }) => deleteTorrentOptimistic(queryClient, hash),
    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(QK.activeTorrents, context.previousData);
      }
    },
    meta: {
      invalidates: [QK.activeTorrents],
      invalidateAllMedia: true,
    },
  });
}

export function fetchTorrentSearch(queryClient, params) {
  return queryClient.fetchQuery({
    queryKey: [...QK.torrentSearch, params],
    queryFn: () => api.torrent.search(params),
    staleTime: 60 * 1000,
  });
}

export function useDownloadTorrentMutation() {
  return useMutation({
    mutationFn: (payload) => api.torrent.download(payload),
    meta: {
      invalidates: [QK.activeTorrents],
    },
  });
}


