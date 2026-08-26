/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useOrganizerTabState } from './useOrganizerTabState';
import { useOrganizerPaginationSort } from './useOrganizerPaginationSort';
import { useOrganizerDetailsState } from './useOrganizerDetailsState';
import { useFileSelection } from './useFileSelection';
import { useOrganizerDismissState } from './useOrganizerDismissState';
import { useOrganizerFocus } from './useOrganizerFocus';
import { mapOrganizerItemRow, mapExtraRow } from '@/lib/mappers';
import { stripEntityPrefix } from '@/lib/entityIds';
import { useOrganizerQuery, useScanStatusQuery, useOrganizerCountQuery } from '@/queries';


export function useOrganizerPageState({ t, scanMode, sessionMode }) {
  const dismissScopeKey = `${sessionMode || 'sfw'}:${scanMode || 'movies'}`;
  const [pendingResolvedIds, setPendingResolvedIds] = useState(new Set());

  const scanStatusQuery = useScanStatusQuery({
    select: (data) => ({
      active: Boolean(data?.active),
      phase: data?.phase || 'idle',
      stop_requested: Boolean(data?.stop_requested),
      last_completed: data?.last_completed || 0,
      organizer_revision: data?.organizer_revision || 0,
      completed_item_ids: data?.completed_item_ids || [],
    }),
  });
  const scanStatus = scanStatusQuery.data || null;
  const isScanActive = Boolean(scanStatus?.active);

  const organizerCountQuery = useOrganizerCountQuery(scanMode, sessionMode, isScanActive);
  const rawOrganizerItemCount = organizerCountQuery.data?.count ?? null;
  const organizerItemCount = rawOrganizerItemCount == null ? null : Number(rawOrganizerItemCount);
  const isOrganizerCountReady = Number.isFinite(organizerItemCount);

  const addPendingResolvedIds = useCallback((ids) => {
    setPendingResolvedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
  }, []);

  const removePendingResolvedIds = useCallback((ids) => {
    setPendingResolvedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
  }, []);

  const {
    activeMainTab,
    setActiveMainTab,
    activeExtrasTab,
    setActiveExtrasTab,
    activeManualTab,
    setActiveManualTab,
  } = useOrganizerTabState();

  // 1. We first initialize the pagination/sort helper with a temporary/actual count of items.
  const [totalItems, setTotalItems] = useState(0);

  const {
    searchQuery,
    inputSearch,
    setInputSearch,
    currentPage,
    pageSize,
    setPageSize,
    sortConfig,
    handleSortToggle,
    totalPages,
    pageStart,
    pageEnd,
    setPageAndScrollToTop,
  } = useOrganizerPaginationSort({
    activeMainTab,
    activeExtrasTab,
    activeManualTab,
    totalItems,
  });

  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    if (isScanActive) {
      setIsLoaded(true);
    }
  }, [isScanActive]);

  // 2. Query data from backend using the current states.
  const subTab = activeMainTab === 'manual' ? activeManualTab : (activeMainTab === 'extras' ? activeExtrasTab : null);
  const organizerQuery = useOrganizerQuery(
    scanMode,
    sessionMode,
    currentPage,
    pageSize,
    activeMainTab,
    subTab,
    searchQuery,
    sortConfig?.key || 'source',
    sortConfig?.direction || 'asc',
    isLoaded
  );

  const organizer = organizerQuery.data || { items: [], total_items: 0, tab_counts: {} };

  const wasFetchingRef = useRef(false);

  useEffect(() => {
    const isFetching = organizerQuery.isFetching;
    if (wasFetchingRef.current && !isFetching) {
      if (pendingResolvedIds.size > 0) {
        const fetchedIds = new Set(
          (organizer.items || []).map((item) =>
            item.parent_id != null ? `extra-${item.id}` : `item-${item.id}`
          )
        );
        const toRemove = [];
        pendingResolvedIds.forEach((id) => {
          if (!fetchedIds.has(id)) {
            toRemove.push(id);
          }
        });
        if (toRemove.length > 0) {
          removePendingResolvedIds(toRemove);
        }
      }
    }
    wasFetchingRef.current = isFetching;
  }, [organizerQuery.isFetching, organizer.items, pendingResolvedIds, removePendingResolvedIds]);

  const {
    dismissedRowIds,
    dismissRows,
    restoreDismissedRows,
    dismissedCount,
  } = useOrganizerDismissState({
    organizer,
    scopeKey: dismissScopeKey,
    activeMainTab,
  });

  const fetchedTotalItems = organizerQuery.data?.total_items;

  useEffect(() => {
    if (fetchedTotalItems !== undefined) {
      setTotalItems(fetchedTotalItems);
    }
  }, [fetchedTotalItems]);

  const tabCounts = useMemo(() => {
    const counts = organizer.tab_counts || {};
    const adjusted = {
      manualCount: counts.manualCount || 0,
      manualMoviesCount: counts.manualMoviesCount || 0,
      manualEpisodesCount: counts.manualEpisodesCount || 0,
      manualScenesCount: counts.manualScenesCount || 0,
      moviesCount: counts.moviesCount || 0,
      episodesCount: counts.episodesCount || 0,
      scenesCount: counts.scenesCount || 0,
      extrasCount: counts.extrasCount || 0,
      extraBonusCount: counts.extraBonusCount || 0,
      extraSubtitlesCount: counts.extraSubtitlesCount || 0,
      extraAudioCount: counts.extraAudioCount || 0,
      extraImagesCount: counts.extraImagesCount || 0,
      extraMetadataCount: counts.extraMetadataCount || 0,
    };

    if (!pendingResolvedIds || pendingResolvedIds.size === 0) {
      return adjusted;
    }

    const items = organizer.items || [];
    const itemsMap = new Map(items.map((it) => [it.id, it]));

    pendingResolvedIds.forEach((id) => {
      const isExtra = String(id).startsWith('extra-');
      const realId = Number.parseInt(stripEntityPrefix(id), 10);

      if (isExtra) {
        adjusted.extrasCount = Math.max(0, adjusted.extrasCount - 1);
      } else {
        const item = itemsMap.get(realId);
        if (item) {
          if (item.is_manual) {
            adjusted.manualCount = Math.max(0, adjusted.manualCount - 1);
            if (item.is_movie) {
              adjusted.manualMoviesCount = Math.max(0, adjusted.manualMoviesCount - 1);
              adjusted.moviesCount += 1;
            } else if (item.is_tv) {
              adjusted.manualEpisodesCount = Math.max(0, adjusted.manualEpisodesCount - 1);
              adjusted.episodesCount += 1;
            } else if (item.is_scene) {
              adjusted.manualScenesCount = Math.max(0, adjusted.manualScenesCount - 1);
              adjusted.scenesCount += 1;
            }
          } else {
            if (item.is_movie) {
              adjusted.moviesCount = Math.max(0, adjusted.moviesCount - 1);
            } else if (item.is_tv) {
              adjusted.episodesCount = Math.max(0, adjusted.episodesCount - 1);
            } else if (item.is_scene) {
              adjusted.scenesCount = Math.max(0, adjusted.scenesCount - 1);
            }
          }
        }
      }
    });

    return adjusted;
  }, [organizer.tab_counts, organizer.items, pendingResolvedIds]);

  // Map backend items to frontend rows
  const paginatedRows = useMemo(() => {
    const items = organizer.items || [];
    return items.map((item) => {
      if (activeMainTab === 'extras') {
        return mapExtraRow(item, t);
      }
      return mapOrganizerItemRow(item, t);
    });
  }, [organizer.items, activeMainTab, t]);

  // Instantly filter out dismissed or resolved items from the current page
  const visiblePaginatedRows = useMemo(() => {
    return paginatedRows.filter(
      (row) => !dismissedRowIds.has(row.id)
        && !pendingResolvedIds?.has(row.id)
        && (row.rawType !== 'extra' || (!dismissedRowIds.has(`item-${row.parent_id}`) && !pendingResolvedIds?.has(`item-${row.parent_id}`)))
    );
  }, [paginatedRows, dismissedRowIds, pendingResolvedIds]);

  const {
    activeRowId,
    setActiveRowId,
    activeRow,
  } = useOrganizerDetailsState({
    sortedRows: visiblePaginatedRows,
    paginatedRows: visiblePaginatedRows,
  });

  const {
    selectedRowIds,
    setSelectedRowIds,
    selectedRows,
    handleToggleRow,
    handleToggleAll,
    clearSelectedRows,
  } = useFileSelection({
    sortedRows: visiblePaginatedRows,
    paginatedRows: visiblePaginatedRows,
  });

  useEffect(() => {
    setSelectedRowIds((current) => {
      const visibleIds = new Set(visiblePaginatedRows.map((row) => row.id));
      const next = new Set([...current].filter((id) => visibleIds.has(id)));
      return next.size === current.size ? current : next;
    });
  }, [visiblePaginatedRows, setSelectedRowIds]);

  const { focusFirstAvailableResult } = useOrganizerFocus({
    organizer,
    activeRowId,
    setActiveRowId,
    pendingResolvedIds,
  });

  useEffect(() => {
    const allowedMainTabs = scanMode === 'offline'
      ? ['scenes', 'extras']
      : scanMode === 'scenes'
        ? ['manual', 'scenes', 'extras']
        : scanMode === 'tv'
          ? ['manual', 'episodes', 'extras']
          : ['manual', 'movies', 'extras'];

    const allowedManualTabs = (scanMode === 'scenes' || scanMode === 'offline')
      ? ['scenes']
      : scanMode === 'tv'
        ? ['episodes']
        : ['movies'];

    if (!allowedMainTabs.includes(activeMainTab)) {
      setActiveMainTab(allowedMainTabs.includes('manual') ? 'manual' : allowedMainTabs[0]);
    }
    if (!allowedManualTabs.includes(activeManualTab)) {
      setActiveManualTab(allowedManualTabs[0]);
    }
  }, [activeMainTab, activeManualTab, scanMode, sessionMode, setActiveMainTab, setActiveManualTab]);

  return {
    dismissRows,
    restoreDismissedRows,
    dismissedCount,
    dismissedRowIds,
    pendingResolvedIds,
    addPendingResolvedIds,
    removePendingResolvedIds,
    visibleMediaCount: tabCounts.moviesCount + tabCounts.episodesCount + tabCounts.scenesCount + tabCounts.manualCount,
    visibleExtraCount: tabCounts.extrasCount,
    sessionVisibleMediaCount: tabCounts.moviesCount + tabCounts.episodesCount + tabCounts.scenesCount + tabCounts.manualCount,
    sessionVisibleExtraCount: tabCounts.extrasCount,
    activeExtrasTab,
    activeManualTab,
    activeMainTab,
    activeRow,
    currentPage,
    handleSortToggle,
    handleToggleAll,
    handleToggleRow,
    pageSize,
    pageStart,
    pageEnd,
    paginatedRows: visiblePaginatedRows,
    searchQuery: inputSearch,
    selectedRows,
    selectedRowIds,
    clearSelectedRows,
    setActiveExtrasTab,
    setActiveManualTab,
    setActiveMainTab,
    setActiveRowId,
    setPageAndScrollToTop,
    setPageSize,
    setSearchQuery: setInputSearch,
    focusFirstAvailableResult,
    sortConfig,
    sortedRows: visiblePaginatedRows,
    tabCounts,
    totalPages,
    organizerQuery,
    organizer,
    scanStatusQuery,
    scanStatus,
    isScanActive,
    organizerCountQuery,
    organizerItemCount,
    isOrganizerCountReady,
    isLoaded,
    setIsLoaded,
  };
}
