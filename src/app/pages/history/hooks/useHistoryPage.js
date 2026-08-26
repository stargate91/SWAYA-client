import { useState, useEffect, useMemo, useCallback, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePreservedState } from '@/hooks/usePreservedState';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useTranslation } from '@/providers/LanguageContext';
import { useUi } from '@/providers/UiProvider';
import { useLibraryModeStore, isNsfwMode } from '@/stores/useLibraryModeStore';
import { AlertTriangle } from '@/ui/icons';
import {
  useHistoryQuery,
  useUndoMutation,
  useScanStatusQuery,
  useWatchedHistoryQuery,
  usePlayMediaMutation,
  usePeaksQuery
} from '@/queries';
import { ROUTES } from '@/lib/routes';
import { getMediaDetailRoute } from '../utils/historyHelpers';
import UndoConfirmDialogContent from '../components/UndoConfirmDialogContent';

export default function useHistoryPage() {
  const { t } = useTranslation();
  const { confirmDialog, toast } = useUi();
  const [activeTab, setActiveTab] = usePreservedState('activeTab', 'rename');
  const [lightboxImage, setLightboxImage] = useState(null);
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);

  useScrollRestoration('.shell__content', [activeTab]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNsfwMode(sessionMode) && activeTab === 'peaks') {
      navigate(ROUTES.DASHBOARD);
    }
  }, [sessionMode, activeTab, navigate]);

  // Rename History
  const {
    data: historyData,
    isLoading: isHistoryLoading,
    fetchNextPage: fetchNextHistoryPage,
    hasNextPage: hasNextHistoryPage,
    isFetchingNextPage: isFetchingNextHistoryPage,
  } = useHistoryQuery();
  const history = historyData?.pages.flatMap((page) => Array.isArray(page) ? page : (page?.items || [])) || [];

  const { data: scanStatus } = useScanStatusQuery();
  const undoMutation = useUndoMutation();
  const [revertingBatchIds, setRevertingBatchIds] = useState(new Set());

  const isAnyTaskActive = scanStatus?.active;
  const isUndoing = scanStatus?.active && scanStatus?.phase === 'undoing';

  // Playback History
  const {
    data: watchedHistoryData,
    isLoading: isWatchedLoading,
    fetchNextPage: fetchNextWatchedPage,
    hasNextPage: hasNextWatchedPage,
    isFetchingNextPage: isFetchingNextWatchedPage,
  } = useWatchedHistoryQuery();
  const watchedHistory = watchedHistoryData?.pages.flatMap((page) => Array.isArray(page) ? page : (page?.items || [])) || [];

  const playMutation = usePlayMediaMutation();

  // Peak Moments History
  const { data: peaksData = [], isLoading: isPeaksLoading } = usePeaksQuery();

  const handlePlayMoment = useCallback((itemId, videoPosition) => {
    playMutation.mutate({ itemId, start: videoPosition });
  }, [playMutation]);

  const historySentinelRef = useInfiniteScroll({
    onIntersect: fetchNextHistoryPage,
    enabled: hasNextHistoryPage && !isFetchingNextHistoryPage && activeTab === 'rename',
    root: '.shell__content',
  });

  const watchedSentinelRef = useInfiniteScroll({
    onIntersect: fetchNextWatchedPage,
    enabled: hasNextWatchedPage && !isFetchingNextWatchedPage && activeTab === 'watched',
    root: '.shell__content',
  });

  const handlePlay = useCallback((itemId) => {
    playMutation.mutate(itemId);
  }, [playMutation]);

  const handleNavigateMedia = useCallback((log) => {
    const route = getMediaDetailRoute(log);
    if (route) {
      navigate(route.pathname, { state: route.state });
    }
  }, [navigate]);

  const triggerUndo = useCallback((batchId, onSuccessCallback, onErrorCallback) => {
    setRevertingBatchIds((prev) => {
      const next = new Set(prev);
      next.add(batchId);
      return next;
    });
    undoMutation.mutate(batchId, {
      onSuccess: () => {
        setRevertingBatchIds((prev) => {
          const next = new Set(prev);
          next.delete(batchId);
          return next;
        });
        toast(t('historyPage.toastStartedDesc') || 'Reverting batch in the background...', 'success');
        if (onSuccessCallback) onSuccessCallback();
      },
      onError: (err) => {
        setRevertingBatchIds((prev) => {
          const next = new Set(prev);
          next.delete(batchId);
          return next;
        });
        toast(err?.message || t('historyPage.toastErrorDesc') || 'Could not launch undo operation.', 'danger');
        if (onErrorCallback) onErrorCallback();
      }
    });
  }, [undoMutation, toast, t]);

  const handleConfirmUndo = useCallback((batch) => {
    confirmDialog({
      title: t('historyPage.confirmTitle') || 'Confirm Action Reversion',
      description: t('historyPage.confirmDesc') || 'This will physically move and rename all successfully organized files back to their previous naming scheme and folders.',
      icon: AlertTriangle,
      variant: 'primary',
      content: createElement(UndoConfirmDialogContent, { batch, t }),
      cancelText: t('common.cancel') || 'Cancel',
      confirmText: t('historyPage.confirmButton') || 'Revert Action',
      onConfirm: () => {
        triggerUndo(batch.id);
      },
    });
  }, [confirmDialog, triggerUndo, t]);

  const tabOptions = useMemo(() => {
    const opts = [
      { value: 'rename', label: t('historyPage.tabRename') || 'Rename Logs' },
      { value: 'watched', label: t('historyPage.tabWatched') || 'Playback Logs' }
    ];
    if (isNsfwMode(sessionMode)) {
      opts.push({ value: 'peaks', label: 'Finish Logs' });
    }
    return opts;
  }, [sessionMode, t]);

  const pageTitle = useMemo(() => {
    if (activeTab === 'rename') return t('historyPage.pageTitle') || 'Rename history';
    if (activeTab === 'watched') return t('historyPage.watchedPageTitle') || 'Watched History';
    return 'Finishes';
  }, [activeTab, t]);

  const pageDesc = useMemo(() => {
    if (activeTab === 'rename') return t('historyPage.pageDesc') || 'Track previously renamed items and organize actions';
    if (activeTab === 'watched') return t('historyPage.watchedPageDesc') || 'Track movies, series and scene plays';
    return 'Track all finish marks and timestamps in chronological order';
  }, [activeTab, t]);

  return {
    t,
    activeTab,
    setActiveTab,
    tabOptions,
    pageTitle,
    pageDesc,
    lightboxImage,
    setLightboxImage,
    isHistoryLoading,
    history,
    isAnyTaskActive,
    isUndoing,
    revertingBatchIds,
    handleConfirmUndo,
    historySentinelRef,
    isWatchedLoading,
    watchedHistory,
    playMutation,
    handlePlay,
    handleNavigateMedia,
    watchedSentinelRef,
    isPeaksLoading,
    peaksData,
    handlePlayMoment,
    sessionMode,
  };
}
