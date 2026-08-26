import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';
import { useLibraryModeStore, isNsfwMode } from '@/stores/useLibraryModeStore';

export const useToggleTrackedMutation = () => {
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  return useMutation({
    mutationFn: ({ tmdbId, externalId, mediaType, isTracked, track }) => {
      const id = tmdbId || externalId;
      let shouldTrack = false;
      if (track !== undefined) {
        shouldTrack = !!track;
      } else if (isTracked !== undefined) {
        shouldTrack = !isTracked;
      }
      return shouldTrack
        ? api.media.trackItem(id, mediaType, isNsfwMode(sessionMode))
        : api.media.untrackItem(id, mediaType);
    },
    meta: {
      invalidates: [QK.libraryItemDetail, QK.libraryTvDetail],
      invalidateEntity: (_data, variables) => ({
        id: variables.tmdbId || variables.externalId,
        opts: { lists: true, stats: true },
      }),
    },
  });
};

export const useAddPeakMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables) => {
      const itemId = typeof variables === 'object' ? variables.itemId : variables;
      const payload = typeof variables === 'object' ? {
        video_position: variables.video_position,
        snapshot_path: variables.snapshot_path,
      } : undefined;
      return api.media.addPeak(itemId, payload);
    },
    onMutate: async (variables) => {
      const { itemId, tvId } = typeof variables === 'object' ? variables : { itemId: variables, tvId: null };
      const targets = [itemId, tvId].filter(Boolean);

      const uniqueIds = new Set();
      targets.forEach(id => {
        uniqueIds.add(id);
        uniqueIds.add(String(id).replace('tv_', ''));
      });

      for (const id of uniqueIds) {
        await queryClient.cancelQueries({ queryKey: [...QK.libraryItemDetail, id] });
      }

      // Snapshot all matching detail queries by prefix
      const contextSnapshot = [];
      uniqueIds.forEach(id => {
        contextSnapshot.push(...queryClient.getQueriesData({ queryKey: [...QK.libraryItemDetail, id] }));
      });

      const optimisticUpdate = (oldData) => {
        if (!oldData) return oldData;
        const currentCount = oldData.peaks_count || 0;
        const currentHistory = oldData.peaks_history || [];
        const tempPeak = {
          id: 'temp-' + Date.now(),
          video_position: 0,
          watched_at: new Date().toISOString(),
          isOptimistic: true,
        };
        return {
          ...oldData,
          peaks_count: currentCount + 1,
          peaks_history: [...currentHistory, tempPeak].sort((a, b) => a.video_position - b.video_position),
        };
      };

      uniqueIds.forEach(id => {
        queryClient.setQueriesData({ queryKey: [...QK.libraryItemDetail, id] }, optimisticUpdate);
      });

      return { contextSnapshot };
    },
    onError: (_err, _variables, context) => {
      if (context?.contextSnapshot) {
        context.contextSnapshot.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
      }
    },
    onSuccess: (data, variables) => {
      const { itemId, tvId } = typeof variables === 'object' ? variables : { itemId: variables, tvId: null };
      const updateData = (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          peaks_count: data.peaks_count,
          peaks_history: data.peaks_history,
        };
      };
      const targets = [itemId, tvId].filter(Boolean);
      targets.forEach(id => {
        const clean = String(id).replace('tv_', '');
        queryClient.setQueriesData({ queryKey: [...QK.libraryItemDetail, id] }, updateData);
        queryClient.setQueriesData({ queryKey: [...QK.libraryItemDetail, clean] }, updateData);
        queryClient.setQueriesData({ queryKey: [...QK.libraryTvDetail, id] }, updateData);
      });
    },
    meta: {
      invalidates: [
        QK.peaksHistory,
        QK.watchedHistory,
        QK.personDetail,
        QK.personCredits,
        QK.people,
        QK.peopleInfinite,
        QK.recentlyActivated,
      ],
      invalidateEntity: (_data, variables) => {
        const itemId = typeof variables === 'object' ? variables?.itemId : variables;
        return {
          id: itemId,
          opts: { lists: true, stats: true, continueWatching: true, watchedHistory: true, recommendations: true },
        };
      },
      invalidateTv: (_data, variables) => (typeof variables === 'object' ? variables?.tvId : null),
      broadcast: (_data, variables) => {
        const { itemId, tvId } = typeof variables === 'object' ? variables : { itemId: variables, tvId: null };
        return {
          entityId: itemId,
          entityOpts: { lists: true, stats: true, continueWatching: true, watchedHistory: true, recommendations: true },
          tvId: tvId || null,
          keys: [
            QK.peaksHistory,
            QK.watchedHistory,
            QK.personDetail,
            QK.personCredits,
            QK.people,
            QK.peopleInfinite,
            QK.recentlyActivated,
          ],
        };
      },
      errorToast: (err) => err.message || 'Failed to add peak',
    },
  });
};

export const useDeletePeakMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, logId }) => api.media.deletePeak(itemId, logId),
    onSuccess: (data, variables) => {
      const { itemId, tvId } = variables;
      const updateData = (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          peaks_count: data.peaks_count,
          peaks_history: data.peaks_history,
        };
      };
      const targets = [itemId, tvId].filter(Boolean);
      targets.forEach(id => {
        const clean = String(id).replace('tv_', '');
        queryClient.setQueriesData({ queryKey: [...QK.libraryItemDetail, id] }, updateData);
        queryClient.setQueriesData({ queryKey: [...QK.libraryItemDetail, clean] }, updateData);
        queryClient.setQueriesData({ queryKey: [...QK.libraryTvDetail, id] }, updateData);
      });
    },
    meta: {
      invalidates: [
        QK.peaksHistory,
        QK.watchedHistory,
        QK.personDetail,
        QK.personCredits,
        QK.people,
        QK.peopleInfinite,
        QK.recentlyActivated,
      ],
      invalidateEntity: (_data, variables) => ({
        id: variables?.itemId,
        opts: { lists: true, stats: true, continueWatching: true, watchedHistory: true, recommendations: true },
      }),
      invalidateTv: (_data, variables) => variables?.tvId || null,
      broadcast: (_data, variables) => {
        const { itemId, tvId } = variables;
        return {
          entityId: itemId,
          entityOpts: { lists: true, stats: true, continueWatching: true, watchedHistory: true, recommendations: true },
          tvId: tvId || null,
          keys: [
            QK.peaksHistory,
            QK.watchedHistory,
            QK.personDetail,
            QK.personCredits,
            QK.people,
            QK.peopleInfinite,
            QK.recentlyActivated,
          ],
        };
      },
    },
  });
};


