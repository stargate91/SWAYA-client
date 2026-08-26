import { useMemo, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSettingsQuery } from '@/queries';
import { useUi } from '@/providers/UiProvider';
import { useTranslation } from '@/providers/LanguageContext';
import {
  useOrganizerActions,
  useOrganizerPageState,
  useOrganizerTabs,
  useOrganizerViewModel,
  useOrganizerDeleteActions,
  useOrganizerRuleSync,
  useOrganizerSettingsRefresh,
} from './index';
import { useLibraryModeStore, isNsfwMode } from '@/stores/useLibraryModeStore';

const EMPTY_SETTINGS = {};

export function useOrganizerPageController() {
  const { t } = useTranslation();
  const { closeModal, openModal, toast } = useUi();
  const queryClient = useQueryClient();
  const settingsQuery = useSettingsQuery();
  const settings = settingsQuery.data || EMPTY_SETTINGS;
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);

  const {
    scanMode,
    setScanMode,
    scanModeOptions,
    provider,
    setProvider,
    providerOptions,
    organizerRuleSignature,
  } = useOrganizerRuleSync({
    settings,
    sessionMode,
    t,
  });

  const {
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
    paginatedRows,
    searchQuery,
    selectedRows,
    selectedRowIds,
    clearSelectedRows,
    setActiveExtrasTab,
    setActiveManualTab,
    setActiveMainTab,
    setActiveRowId,
    setPageAndScrollToTop,
    setPageSize,
    setSearchQuery,
    focusFirstAvailableResult,
    sortConfig,
    sortedRows,
    tabCounts,
    totalPages,
    dismissRows,
    restoreDismissedRows,
    dismissedCount,
    addPendingResolvedIds,
    removePendingResolvedIds,
    visibleExtraCount,
    visibleMediaCount,
    organizerQuery,
    organizer,
    scanStatusQuery,
    scanStatus,
    isScanActive,
    organizerCountQuery,
    organizerItemCount,
    isOrganizerCountReady,
    setIsLoaded,
  } = useOrganizerPageState({ t, scanMode, sessionMode });

  const {
    handleBrowseAndScan,
    handleLoadAll,
    handleRename,
    handleScanPaths,
    handleRetryMatch,
    isBrowseStarting,
    isLoadingAll,
    isRenamePending,
    isRenameStarting,
    isRetryPending,
  } = useOrganizerActions({
    defaultScanDir: settingsQuery.data?.default_scan_dir,
    organizerCountQuery,
    organizerQuery,
    isScanActive,
    onResultsReady: focusFirstAvailableResult,
    queryClient,
    t,
    toast,
    openModal,
    closeModal,
    sortedRows,
    scanStatusQuery,
    scanMode,
    sessionMode,
    includeAdult: Boolean(settings.include_adult && isNsfwMode(sessionMode)),
    provider,
    settings,
    setIsLoaded,
    currentPage,
    pageSize,
    activeMainTab,
    activeManualTab,
    activeExtrasTab,
    searchQuery,
    sortConfig,
    addPendingResolvedIds,
    removePendingResolvedIds,
  });

  const { computedExtrasTabs, computedManualTabs, computedMainTabs } = useOrganizerTabs({
    t,
    tabCounts,
    scanMode,
  });

  const {
    browseButtonLabel,
    emptyState: organizerEmptyState,
    hasDatabaseItems,
    hasVisibleItems,
    loadAllButtonLabel,
    loadRestButtonLabel,
    loadingState: organizerLoadingState,
    renameButtonLabel,
    shouldShowLoadRest,
    summaryText,
  } = useOrganizerViewModel({
    organizerItemCount,
    isBrowseStarting,
    isOrganizerCountReady,
    isLoadingAll,
    isRenamePending,
    isRenameStarting,
    isScanActive,
    pageEnd,
    pageStart,
    scanPhase: scanStatus?.phase,
    sortedRows,
    t,
    visibleExtraCount,
    visibleMediaCount,
    totalItems: organizer.total_items || 0,
    isLoading: organizerQuery.isLoading,
    isFetching: organizerQuery.isFetching,
  });

  const handleRemoveAll = useCallback(() => {
    const ids = sortedRows.map((row) => row.id);
    dismissRows(ids);
  }, [sortedRows, dismissRows]);

  const hasActiveVisibleItems = sortedRows.length > 0;
  const hasReviewNeeded = tabCounts.manualCount > 0;

  const headerActionsProps = useMemo(() => ({
    hasVisibleItems,
    dismissedCount,
    hasActiveVisibleItems,
    hasReviewNeeded,
    isScanActive,
    isBrowseStarting,
    isLoadingAll,
    isRenamePending,
    isRenameStarting,
    isRetryPending,
    isOrganizing: Boolean(isScanActive && scanStatus?.phase === 'organizing'),
    browseButtonLabel,
    loadRestButtonLabel,
    renameButtonLabel,
    shouldShowLoadRest,
    onRemoveAll: handleRemoveAll,
    onRetryMatch: handleRetryMatch,
    onRestoreDismissed: restoreDismissedRows,
    onBrowseAndScan: handleBrowseAndScan,
    onLoadAll: handleLoadAll,
    onRename: handleRename,
    t,
  }), [
    hasVisibleItems,
    dismissedCount,
    hasActiveVisibleItems,
    hasReviewNeeded,
    isScanActive,
    isBrowseStarting,
    isLoadingAll,
    isRenamePending,
    isRenameStarting,
    isRetryPending,
    scanStatus?.phase,
    browseButtonLabel,
    loadRestButtonLabel,
    renameButtonLabel,
    shouldShowLoadRest,
    handleRemoveAll,
    handleRetryMatch,
    restoreDismissedRows,
    handleBrowseAndScan,
    handleLoadAll,
    handleRename,
    t,
  ]);

  const emptyStateActionsProps = useMemo(() => ({
    emptyState: organizerEmptyState,
    hasDatabaseItems,
    isScanActive,
    isBrowseStarting,
    isLoadingAll,
    browseButtonLabel,
    loadAllButtonLabel,
    onBrowseAndScan: handleBrowseAndScan,
    onLoadAll: handleLoadAll,
  }), [
    organizerEmptyState,
    hasDatabaseItems,
    isScanActive,
    isBrowseStarting,
    isLoadingAll,
    browseButtonLabel,
    loadAllButtonLabel,
    handleBrowseAndScan,
    handleLoadAll,
  ]);

  const { refreshOrganizer } = useOrganizerDeleteActions({
    t,
    closeModal,
    toast,
    queryClient,
    focusFirstAvailableResult,
    clearSelectedRows,
    scanMode,
    sessionMode,
    addPendingResolvedIds,
    removePendingResolvedIds,
  });

  useOrganizerSettingsRefresh({
    organizerRuleSignature,
    organizerQueryData: organizerQuery.data,
    isScanActive,
    refreshOrganizer,
  });

  const isDropzoneDisabled = isScanActive || isBrowseStarting || isLoadingAll || isRenamePending || isRenameStarting;

  const scanSettingsTriggerLabel = useMemo(() => {
    if (scanMode !== 'offline' && providerOptions.find((p) => p.value === provider)?.label) {
      const modeLabel = scanModeOptions.find((o) => o.value === scanMode)?.label;
      const provLabel = providerOptions.find((p) => p.value === provider)?.label;
      return `${modeLabel} | ${provLabel}`;
    }
    return scanModeOptions.find((o) => o.value === scanMode)?.label || 'Scan Settings';
  }, [scanMode, provider, providerOptions, scanModeOptions]);

  const modalProviderProps = {
    focusFirstAvailableResult,
    clearSelectedRows,
    dismissRows,
    selectedRows,
    scanMode,
    sessionMode,
    provider,
    addPendingResolvedIds,
    removePendingResolvedIds,
  };

  const scanSettingsProps = {
    scanMode,
    setScanMode,
    scanModeOptions,
    provider,
    setProvider,
    providerOptions,
    sessionMode,
    t,
  };

  const pageContentProps = {
    activeExtrasTab,
    activeManualTab,
    activeMainTab,
    activeRow,
    currentPage,
    handleSortToggle,
    handleToggleAll,
    handleToggleRow,
    pageSize,
    paginatedRows,
    searchQuery,
    selectedRowIds,
    setActiveExtrasTab,
    setActiveManualTab,
    setActiveMainTab,
    setActiveRowId,
    setPageAndScrollToTop,
    setPageSize,
    setSearchQuery,
    sortConfig,
    sortedRows,
    totalPages,
    settingsQuery,
    organizerQuery,
    computedExtrasTabs,
    computedManualTabs,
    computedMainTabs,
    organizerEmptyState,
    organizerLoadingState,
    summaryText,
    headerActionsProps,
    emptyStateActionsProps,
    onDropPaths: handleScanPaths,
    isDropzoneDisabled,
    sessionMode,
    t,
  };

  return {
    t,
    scanMode,
    scanModeOptions,
    provider,
    providerOptions,
    sessionMode,
    scanSettingsTriggerLabel,
    modalProviderProps,
    scanSettingsProps,
    pageContentProps,
    headerActionsProps,
    emptyStateActionsProps,
    handleRemoveAll,
    refreshOrganizer,
  };
}

export default useOrganizerPageController;
