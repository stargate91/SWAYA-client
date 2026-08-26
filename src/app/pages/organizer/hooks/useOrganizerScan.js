import { useEffect, useRef, useState } from 'react';
import { selectFolder } from '@/lib/ipc';
import { scrollToTop } from '@/lib/domScroll';
import { useScanMutation, getOrganizerQueryKey } from '@/queries';
import { QK, invalidateAllMediaCaches } from '@/lib/queryKeys';



const applyCommittedItemsToOrganizerCache = (organizer, completedItemIds, tabCounts) => {
  if (!organizer) return organizer;

  const completedIds = new Set(completedItemIds.map(String));
  const items = (organizer.items || []).filter((item) => (
    !completedIds.has(String(item.id))
    && !completedIds.has(String(item.parent_id))
  ));

  return {
    ...organizer,
    items,
    total_items: Math.max(0, (organizer.total_items || 0) - ((organizer.items || []).length - items.length)),
    tab_counts: tabCounts,
  };
};

export function useOrganizerScan({
  defaultScanDir,
  organizerQuery,
  isScanActive,
  onResultsReady,
  queryClient,
  t,
  toast,
  scanStatusQuery,
  renameStartedRef,
  setIsRenamePending,
  scanMode,
  sessionMode,
  includeAdult,
  provider,
  setIsLoaded,
  currentPage,
  pageSize,
  activeMainTab,
  activeManualTab,
  activeExtrasTab,
  searchQuery,
  sortConfig,
  removePendingResolvedIds,
}) {
  const subTab = activeMainTab === 'manual' ? activeManualTab : (activeMainTab === 'extras' ? activeExtrasTab : null);
  const queryKey = getOrganizerQueryKey(
    scanMode,
    sessionMode,
    currentPage,
    pageSize,
    activeMainTab,
    subTab,
    searchQuery,
    sortConfig?.key || 'source',
    sortConfig?.direction || 'asc'
  );
  const [isBrowseStarting, setIsBrowseStarting] = useState(false);
  const previousScanActiveRef = useRef(false);
  const lastScanPathsRef = useRef([]);
  const scanMutation = useScanMutation();
  const wasStopRequestedRef = useRef(false);
  const scanStatus = scanStatusQuery?.data || null;
  const lastCompletedRef = useRef(scanStatus?.last_completed || 0);
  const organizerRevisionRef = useRef(0);
  const organizerQueryRef = useRef(organizerQuery);
  useEffect(() => {
    organizerQueryRef.current = organizerQuery;
  });

  useEffect(() => {
    if (isScanActive && scanStatus) {
      if (scanStatus.stop_requested) {
        wasStopRequestedRef.current = true;
      }
    }
  }, [isScanActive, scanStatus]);

  useEffect(() => {
    const wasActive = previousScanActiveRef.current;
    const nextLastCompleted = scanStatus?.last_completed || 0;
    const prevLastCompleted = lastCompletedRef.current;

    if (scanStatus?.last_completed) {
      lastCompletedRef.current = scanStatus.last_completed;
    }

    const isBackgroundScanCompleted = !isScanActive && nextLastCompleted > prevLastCompleted;

    if ((wasActive && !isScanActive) || isBackgroundScanCompleted) {
      const finalizeScan = async () => {
        const wasRename = renameStartedRef.current;
        renameStartedRef.current = false;
        setIsRenamePending(false);

        const wasAborted = wasStopRequestedRef.current;
        wasStopRequestedRef.current = false;

        invalidateAllMediaCaches(queryClient);

        try {
          const result = await organizerQueryRef.current.refetch();
          const nextOrganizer = result.data || { items: [], total_items: 0, tab_counts: {} };

          queryClient.setQueryData(queryKey, nextOrganizer);
          onResultsReady?.(nextOrganizer);

          if (wasRename) {
            if (wasAborted) {
              toast(t('organizer.toasts.renameAborted') || 'Renaming stopped.', 'warning');
            } else {
              toast(t('organizer.toasts.renameComplete') || 'Renaming complete!', 'success');
            }
          } else {
            toast(t('organizer.toasts.scanComplete') || 'Scan finished!', 'success');
          }
        } catch {
          toast(wasRename ? (t('organizer.toasts.renameComplete') || 'Renaming complete!') : t('organizer.toasts.scanCompleteFallback'), 'success');
        }
        lastScanPathsRef.current = [];
      };

      finalizeScan();
      scrollToTop(false);
    }
    previousScanActiveRef.current = isScanActive;
  }, [isScanActive, onResultsReady, queryClient, queryKey, setIsRenamePending, t, toast, renameStartedRef, scanStatus]);

  useEffect(() => {
    const revision = Number(scanStatus?.organizer_revision || 0);
    if (revision <= organizerRevisionRef.current) return;

    organizerRevisionRef.current = revision;
    const applyCommittedOrganizerSnapshot = async () => {
      const result = await organizerQueryRef.current.refetch();
      if (result.data) {
        const completedItemIds = scanStatus?.completed_item_ids || [];
        queryClient.setQueriesData(
          { queryKey: QK.organizer },
          (cachedOrganizer) => applyCommittedItemsToOrganizerCache(
            cachedOrganizer,
            completedItemIds,
            result.data.tab_counts,
          ),
        );
        queryClient.setQueryData(queryKey, result.data);
        const counts = result.data.tab_counts || {};
        queryClient.setQueryData(
          ['organizer-count', scanMode || 'all', sessionMode || 'sfw'],
          {
            count: (counts.manualCount || 0)
              + (counts.moviesCount || 0)
              + (counts.episodesCount || 0)
              + (counts.scenesCount || 0),
          },
        );
        removePendingResolvedIds?.(completedItemIds.map((id) => `item-${id}`));
        onResultsReady?.(result.data);
      }
    };
    applyCommittedOrganizerSnapshot();
  }, [onResultsReady, queryClient, queryKey, removePendingResolvedIds, scanMode, scanStatus?.completed_item_ids, scanStatus?.organizer_revision, sessionMode]);

  const handleScanPaths = async (paths) => {
    if (isScanActive || isBrowseStarting) {
      return;
    }

    const uniquePaths = [...new Set((paths || []).filter(Boolean))];
    if (uniquePaths.length === 0) {
      return;
    }

    setIsBrowseStarting(true);
    setIsLoaded(true);
    try {
      lastScanPathsRef.current = uniquePaths;

      const response = await scanMutation.mutateAsync({
        paths: uniquePaths,
        mode: scanMode,
        include_adult: includeAdult,
        provider: provider,
      });

      if (response?.status === 'error') {
        throw new Error(response.message);
      }
    } catch (error) {
      toast(error.message || t('organizer.toasts.scanStartFailed'), 'danger');
    } finally {
      setIsBrowseStarting(false);
    }
  };

  const handleBrowseAndScan = async () => {
    const folder = await selectFolder(defaultScanDir);
    if (!folder) {
      return;
    }

    await handleScanPaths([folder]);
  };

  return {
    handleScanPaths,
    handleBrowseAndScan,
    isBrowseStarting,
  };
}
