import { useCallback, useRef, useEffect } from 'react';
import { getOrganizerQueryKey, useOrganizerDeleteMutation } from '@/queries';
import { QK, invalidateAllMediaCaches } from '@/lib/queryKeys';

export const removeOrganizerRow = (currentOrganizer, row) => {
  if (!currentOrganizer) {
    return currentOrganizer;
  }

  const mediaId = row.itemId;
  let nextCounts = currentOrganizer.tab_counts ? { ...currentOrganizer.tab_counts } : null;

  if (nextCounts) {
    const isManual = row.tab === 'manual' || row.rawPayload?.is_manual || ['no_match', 'error', 'new', 'uncertain', 'multiple'].includes(row.rawStatus);
    const rawType = row.rawType || row.type;

    if (isManual) {
      if (nextCounts.manualCount > 0) nextCounts.manualCount -= 1;
      if (rawType === 'scene' && nextCounts.manualScenesCount > 0) nextCounts.manualScenesCount -= 1;
      if (rawType === 'movie' && nextCounts.manualMoviesCount > 0) nextCounts.manualMoviesCount -= 1;
      if ((rawType === 'episode' || rawType === 'episodes') && nextCounts.manualEpisodesCount > 0) nextCounts.manualEpisodesCount -= 1;

      if (rawType === 'scene') nextCounts.scenesCount = (nextCounts.scenesCount || 0) + 1;
      else if (rawType === 'movie') nextCounts.moviesCount = (nextCounts.moviesCount || 0) + 1;
      else if (rawType === 'episode' || rawType === 'episodes') nextCounts.episodesCount = (nextCounts.episodesCount || 0) + 1;
    } else if (row.rawType === 'extra') {
      if (nextCounts.extrasCount > 0) nextCounts.extrasCount -= 1;
    } else {
      if (nextCounts.matchedCount > 0) nextCounts.matchedCount -= 1;
      if (rawType === 'scene' && nextCounts.scenesCount > 0) nextCounts.scenesCount -= 1;
      else if (rawType === 'movie' && nextCounts.moviesCount > 0) nextCounts.moviesCount -= 1;
      else if (rawType === 'episode' && nextCounts.episodesCount > 0) nextCounts.episodesCount -= 1;
    }
  }

  if (Array.isArray(currentOrganizer.items)) {
    const nextItems = currentOrganizer.items.filter((item) => {
      if (row.rawType === 'extra') {
        return item.id !== mediaId;
      }
      const isTargetMedia = item.id === mediaId && item.parent_id == null;
      const isTargetExtra = item.parent_id === mediaId;
      return !isTargetMedia && !isTargetExtra;
    });

    const removedCount = currentOrganizer.items.length - nextItems.length;
    return {
      ...currentOrganizer,
      items: nextItems,
      total_count: Math.max(0, (currentOrganizer.total_count || 0) - removedCount),
      tab_counts: nextCounts,
    };
  }

  return {
    ...currentOrganizer,
    groups: (currentOrganizer.groups || []).map((group) => ({
      ...group,
      rows: (group.rows || []).filter((r) => r.itemId !== mediaId),
    })).filter((group) => group.rows.length > 0),
    tab_counts: nextCounts,
  };
};

export const removeOrganizerRows = (currentOrganizer, rows) => {
  if (!currentOrganizer || !Array.isArray(rows) || rows.length === 0) {
    return currentOrganizer;
  }

  const mediaIds = new Set(rows.map((row) => row.itemId));
  let nextCounts = currentOrganizer.tab_counts ? { ...currentOrganizer.tab_counts } : null;

  if (nextCounts) {
    rows.forEach((row) => {
      const isManual = row.tab === 'manual' || row.rawPayload?.is_manual || ['no_match', 'error', 'new', 'uncertain', 'multiple'].includes(row.rawStatus);
      const rawType = row.rawType || row.type;

      if (isManual) {
        if (nextCounts.manualCount > 0) nextCounts.manualCount -= 1;
        if (rawType === 'scene' && nextCounts.manualScenesCount > 0) nextCounts.manualScenesCount -= 1;
        if (rawType === 'movie' && nextCounts.manualMoviesCount > 0) nextCounts.manualMoviesCount -= 1;
        if ((rawType === 'episode' || rawType === 'episodes') && nextCounts.manualEpisodesCount > 0) nextCounts.manualEpisodesCount -= 1;

        if (rawType === 'scene') nextCounts.scenesCount = (nextCounts.scenesCount || 0) + 1;
        else if (rawType === 'movie') nextCounts.moviesCount = (nextCounts.moviesCount || 0) + 1;
        else if (rawType === 'episode' || rawType === 'episodes') nextCounts.episodesCount = (nextCounts.episodesCount || 0) + 1;
      } else if (row.rawType === 'extra') {
        if (nextCounts.extrasCount > 0) nextCounts.extrasCount -= 1;
      } else {
        if (nextCounts.matchedCount > 0) nextCounts.matchedCount -= 1;
        if (rawType === 'scene' && nextCounts.scenesCount > 0) nextCounts.scenesCount -= 1;
        else if (rawType === 'movie' && nextCounts.moviesCount > 0) nextCounts.moviesCount -= 1;
        else if (rawType === 'episode' && nextCounts.episodesCount > 0) nextCounts.episodesCount -= 1;
      }
    });
  }

  if (Array.isArray(currentOrganizer.items)) {
    const nextItems = currentOrganizer.items.filter((item) => {
      const isTargetMedia = mediaIds.has(item.id) && item.parent_id == null;
      const isTargetExtra = mediaIds.has(item.id) || (item.parent_id != null && mediaIds.has(item.parent_id));
      return !isTargetMedia && !isTargetExtra;
    });

    const removedCount = currentOrganizer.items.length - nextItems.length;
    return {
      ...currentOrganizer,
      items: nextItems,
      total_count: Math.max(0, (currentOrganizer.total_count || 0) - removedCount),
      tab_counts: nextCounts,
    };
  }

  return {
    ...currentOrganizer,
    groups: (currentOrganizer.groups || []).map((group) => ({
      ...group,
      rows: (group.rows || []).filter((r) => !mediaIds.has(r.itemId)),
    })).filter((group) => group.rows.length > 0),
    tab_counts: nextCounts,
  };
};

export function useOrganizerDeleteActions({
  queryClient,
  toast,
  t,
  closeModal,
  clearSelectedRows,
  focusFirstAvailableResult,
  scanMode,
  sessionMode,
  addPendingResolvedIds,
  removePendingResolvedIds,
}) {
  const queryKey = getOrganizerQueryKey(scanMode, sessionMode);
  const debounceTimerRef = useRef(null);
  const resolveQueueRef = useRef([]);
  const isProcessingQueueRef = useRef(false);
  const deleteMutation = useOrganizerDeleteMutation();

  useEffect(() => {
    const timerRef = debounceTimerRef;
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const refreshOrganizer = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    invalidateAllMediaCaches(queryClient);
  }, [queryClient]);

  const processQueue = useCallback(async () => {
    if (isProcessingQueueRef.current) return;
    isProcessingQueueRef.current = true;

    try {
      while (resolveQueueRef.current.length > 0) {
        const task = resolveQueueRef.current[0];
        try {
          if (task.performMutationFn) {
            await task.performMutationFn();
          }
        } catch (error) {
          console.error('Failed to resolve queued match:', error);
          task.rollback();
          if (removePendingResolvedIds) {
            removePendingResolvedIds(task.rows.map((row) => row.id));
          }
        } finally {
          resolveQueueRef.current.shift();
        }
      }
    } finally {
      isProcessingQueueRef.current = false;
    }
  }, [removePendingResolvedIds]);

  const performOptimisticUpdateAndFocus = useCallback((rows) => {
    const activeQueries = queryClient.getQueriesData({ queryKey: QK.organizer });
    const rollbackQueries = activeQueries.map(([key, data]) => ({ key, data }));
    const countQueries = queryClient.getQueriesData({ queryKey: QK.organizerCount });
    const rollbackCounts = countQueries.map(([key, data]) => ({ key, data }));
    const removedCount = rows.length;

    queryClient.setQueriesData({ queryKey: QK.organizer }, (oldData) => {
      if (!oldData) return oldData;
      return removeOrganizerRows(oldData, rows);
    });

    queryClient.setQueriesData({ queryKey: QK.organizerCount }, (oldData) => {
      if (!oldData || typeof oldData.count !== 'number') return oldData;
      return { ...oldData, count: Math.max(0, oldData.count - removedCount) };
    });

    const activeQuery = activeQueries.find(([, data]) => data && Array.isArray(data.items));
    if (activeQuery && activeQuery[1]) {
      const nextOrganizer = removeOrganizerRows(activeQuery[1], rows);
      focusFirstAvailableResult(nextOrganizer);
    } else {
      const previousOrganizer = queryClient.getQueryData(queryKey);
      const nextOrganizer = removeOrganizerRows(previousOrganizer, rows);
      if (nextOrganizer) {
        queryClient.setQueryData(queryKey, nextOrganizer);
        focusFirstAvailableResult(nextOrganizer);
      }
    }

    return () => {
      rollbackQueries.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });
      rollbackCounts.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });
      const activeQueryRollback = rollbackQueries.find(({ data }) => data && Array.isArray(data.items));
      if (activeQueryRollback) {
        focusFirstAvailableResult(activeQueryRollback.data);
      }
    };
  }, [queryClient, focusFirstAvailableResult, queryKey]);

  const handleResolveOrganizerRows = useCallback(async (rows, performMutationFn) => {
    closeModal();
    if (addPendingResolvedIds) {
      addPendingResolvedIds(rows.map((row) => row.id));
    }

    const rollback = performOptimisticUpdateAndFocus(rows);

    resolveQueueRef.current.push({
      rows,
      performMutationFn,
      rollback,
    });

    processQueue();
  }, [closeModal, addPendingResolvedIds, performOptimisticUpdateAndFocus, processQueue]);

  const handleResolveOrganizerRow = useCallback(async (row) => {
    await handleResolveOrganizerRows([row], null);
  }, [handleResolveOrganizerRows]);

  const handleDeleteOrganizerRow = useCallback(async (row, mode) => {
    closeModal();
    if (addPendingResolvedIds) {
      addPendingResolvedIds([row.id]);
    }

    const rollback = performOptimisticUpdateAndFocus([row]);

    try {
      await deleteMutation.mutateAsync({
        item_ids: row.rawType === 'extra' ? [] : [row.itemId],
        extra_ids: row.rawType === 'extra' ? [row.itemId] : [],
        mode,
      });
      refreshOrganizer();
      const toastKey = mode === 'ignore' ? 'organizer.toasts.deleteIgnoreSuccess'
        : mode === 'trash' ? 'organizer.toasts.deleteTrashSuccess'
        : 'organizer.toasts.deleteDbOnlySuccess';
      toast(t(toastKey), 'success');
    } catch (error) {
      console.error(`Failed to delete organizer row (id: ${row.id}, mode: ${mode}):`, error);
      toast(error?.message || t('organizer.toasts.deleteActionFailed') || 'Delete failed', 'danger');
      rollback();
      throw error;
    }
  }, [closeModal, addPendingResolvedIds, performOptimisticUpdateAndFocus, deleteMutation, refreshOrganizer, toast, t]);

  const handleDeleteOrganizerRows = useCallback(async (rows, mode) => {
    closeModal();
    clearSelectedRows();
    if (addPendingResolvedIds) {
      addPendingResolvedIds(rows.map((row) => row.id));
    }

    const rollback = performOptimisticUpdateAndFocus(rows);

    try {
      await deleteMutation.mutateAsync({
        item_ids: rows.filter((row) => row.rawType !== 'extra').map((row) => row.itemId),
        extra_ids: rows.filter((row) => row.rawType === 'extra').map((row) => row.itemId),
        mode,
      });
      refreshOrganizer();
      const count = rows.length;
      const toastKey = count === 1
        ? (mode === 'ignore' ? 'organizer.toasts.deleteIgnoreSuccess' : mode === 'trash' ? 'organizer.toasts.deleteTrashSuccess' : 'organizer.toasts.deleteDbOnlySuccess')
        : (mode === 'ignore' ? 'organizer.toasts.deleteIgnoreSuccessPlural' : mode === 'trash' ? 'organizer.toasts.deleteTrashSuccessPlural' : 'organizer.toasts.deleteDbOnlySuccessPlural');
      toast(t(toastKey).replace('{count}', count), 'success');
    } catch (error) {
      console.error(`Failed to delete ${rows.length} organizer rows (mode: ${mode}):`, error);
      toast(error?.message || t('organizer.toasts.deleteActionFailed') || 'Delete failed', 'danger');
      rollback();
      throw error;
    }
  }, [closeModal, clearSelectedRows, addPendingResolvedIds, performOptimisticUpdateAndFocus, deleteMutation, refreshOrganizer, toast, t]);

  return {
    refreshOrganizer,
    handleResolveOrganizerRow,
    handleResolveOrganizerRows,
    handleDeleteOrganizerRow,
    handleDeleteOrganizerRows,
  };
}

export default useOrganizerDeleteActions;
