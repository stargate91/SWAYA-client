import { useMemo } from 'react';
import { Database, Inbox } from '@/ui/icons';

export function useOrganizerViewModel({
  organizerItemCount,
  isBrowseStarting,
  isOrganizerCountReady,
  isLoadingAll,
  isRenamePending,
  isRenameStarting,
  isScanActive,
  pageEnd,
  pageStart,
  scanPhase,
  sortedRows,
  t,
  visibleExtraCount,
  visibleMediaCount,
  totalItems,
  isLoading,
  isFetching,
}) {
  const loadedMediaCount = useMemo(() => visibleMediaCount || 0, [visibleMediaCount]);

  const hasVisibleItems = useMemo(() => {
    return loadedMediaCount > 0 || (visibleExtraCount || 0) > 0;
  }, [loadedMediaCount, visibleExtraCount]);

  const hasDatabaseItems = useMemo(() => {
    return isOrganizerCountReady && organizerItemCount > 0;
  }, [isOrganizerCountReady, organizerItemCount]);

  const remainingOrganizerCount = useMemo(() => {
    return isOrganizerCountReady ? Math.max(0, organizerItemCount - loadedMediaCount) : null;
  }, [isOrganizerCountReady, organizerItemCount, loadedMediaCount]);

  const shouldShowLoadRest = useMemo(() => {
    return hasVisibleItems && isOrganizerCountReady && remainingOrganizerCount > 0;
  }, [hasVisibleItems, isOrganizerCountReady, remainingOrganizerCount]);

  const summaryText = useMemo(() => {
    return `${pageStart}-${pageEnd} / ${totalItems ?? sortedRows.length}`;
  }, [pageStart, pageEnd, totalItems, sortedRows.length]);

  const isRenameActive = useMemo(() => {
    return isRenamePending || (isScanActive && scanPhase === 'organizing');
  }, [isRenamePending, isScanActive, scanPhase]);

  const isQueryLoading = useMemo(() => {
    return isLoading || (isFetching && !hasVisibleItems);
  }, [isLoading, isFetching, hasVisibleItems]);

  const loadingState = useMemo(() => {
    if (isLoadingAll) {
      return {
        label: t('organizer.loadingStates.loadAll.label'),
        description: t('organizer.loadingStates.loadAll.description'),
      };
    }
    if (isRenameActive) {
      return {
        label: t('organizer.loadingStates.rename.label'),
        description: t('organizer.loadingStates.rename.description'),
      };
    }
    if (isScanActive) {
      return {
        label: t('organizer.loadingStates.scan.label'),
        description: t('organizer.loadingStates.scan.description'),
      };
    }
    if (isQueryLoading) {
      return {
        label: t('common.loading') || 'Loading...',
        description: t('organizer.loadingStates.scan.description') || 'Retrieving items...',
      };
    }
    return null;
  }, [isLoadingAll, isRenameActive, isScanActive, isQueryLoading, t]);

  const emptyState = useMemo(() => {
    if (!hasVisibleItems && !loadingState && !isLoading && !isFetching) {
      return hasDatabaseItems
        ? {
          icon: Inbox,
          title: t('organizer.emptyStates.notLoaded.title'),
          description: t('organizer.emptyStates.notLoaded.description'),
        }
        : {
          icon: Database,
          title: t('organizer.emptyStates.emptyDatabase.title'),
          description: t('organizer.emptyStates.emptyDatabase.description'),
        };
    }
    return null;
  }, [hasVisibleItems, loadingState, hasDatabaseItems, isLoading, isFetching, t]);

  const browseButtonLabel = useMemo(() => {
    return isBrowseStarting
      ? t('organizer.buttons.opening')
      : isScanActive
        ? t('organizer.buttons.scanning')
        : t('organizer.buttons.browseAndScan');
  }, [isBrowseStarting, isScanActive, t]);

  const loadAllButtonLabel = useMemo(() => {
    if (isLoadingAll) return t('common.loading');
    return isOrganizerCountReady
      ? `${t('organizer.buttons.loadAll')} (${organizerItemCount})`
      : t('organizer.buttons.loadAll');
  }, [isLoadingAll, isOrganizerCountReady, organizerItemCount, t]);

  const loadRestButtonLabel = useMemo(() => {
    if (isLoadingAll) return t('common.loading');
    return isOrganizerCountReady
      ? `${t('organizer.buttons.loadTheRest')} (${remainingOrganizerCount})`
      : t('organizer.buttons.loadTheRest');
  }, [isLoadingAll, isOrganizerCountReady, remainingOrganizerCount, t]);

  const renameButtonLabel = useMemo(() => {
    return isRenameStarting || isRenameActive
      ? t('organizer.buttons.organizing')
      : t('organizer.buttons.rename');
  }, [isRenameStarting, isRenameActive, t]);

  return {
    browseButtonLabel,
    emptyState,
    hasDatabaseItems,
    hasVisibleItems,
    loadAllButtonLabel,
    loadRestButtonLabel,
    loadingState,
    renameButtonLabel,
    shouldShowLoadRest,
    summaryText,
  };
}
