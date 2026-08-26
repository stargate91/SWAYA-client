import { useCallback, createElement } from 'react';
import { AlertTriangle } from '@/ui/icons';
import Text from '@/ui/Text';
import { useUi } from '@/providers/UiProvider';
import { useTranslation } from '@/providers/LanguageContext';
import useWindowProgress from './useWindowProgress';
import useWindowControls from './useWindowControls';
import { useSettingsQuery } from '@/queries/settingsQueries';
import { useStopTaskMutation } from '@/queries/scanQueries';
import { useLibraryModeStore, isNsfwMode, isSfwMode, SESSION_MODES } from '@/stores/useLibraryModeStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { ROUTES } from '@/lib/routes';

export function useWindowTitlebarActions() {
  const { data: settings } = useSettingsQuery();
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const toggleSessionMode = useLibraryModeStore((state) => state.toggleSessionMode);
  const { scanProgress, imageProgress, hydrateProgress, collectionProgress, torrentProgress, syncProgress } = useWindowProgress();
  const { confirmDialog, toast } = useUi();
  const { t } = useTranslation();
  const { minimize, toggleMaximize, close, resizeToMinimum } = useWindowControls();
  const navigate = useNavigate();
  const location = useLocation();
  const stopTaskMutation = useStopTaskMutation();

  const canGoBack = useNavigationStore((state) => state.currentIndex > 0);
  const canGoForward = useNavigationStore((state) => state.currentIndex < state.historyStack.length - 1);
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);

  const handleGoBack = useCallback(() => {
    goBack(navigate);
  }, [goBack, navigate]);

  const handleGoForward = useCallback(() => {
    goForward(navigate);
  }, [goForward, navigate]);

  const handleAbort = useCallback(() => {
    confirmDialog({
      title: t('progress.abortConfirm.title'),
      description: t('progress.abortConfirm.body') || t('progress.abortConfirm.description'),
      icon: AlertTriangle,
      variant: 'danger',
      cancelText: t('progress.abortConfirm.cancel'),
      confirmText: t('progress.abortConfirm.confirm'),
      onConfirm: async () => {
        try {
          await stopTaskMutation.mutateAsync();
        } catch (err) {
          console.error('Failed to stop background task:', err);
          toast(err.message || t('organizer.toasts.abortTaskFailed'), 'danger');
        }
      },
    });
  }, [confirmDialog, stopTaskMutation, t, toast]);

  const handleToggleClick = useCallback(() => {
    const isEnteringNsfw = !isNsfwMode(sessionMode);

    const performToggle = () => {
      const mainEl = document.querySelector('.shell__main');
      if (mainEl) {
        mainEl.classList.add('is-transitioning');
      }

      setTimeout(() => {
        const nextMode = isNsfwMode(sessionMode) ? SESSION_MODES.SFW : SESSION_MODES.NSFW;
        toggleSessionMode();

        if (isSfwMode(nextMode)) {
          const path = location.pathname;
          if (
            path.startsWith('/library/movie/') ||
            path.startsWith('/library/tv/') ||
            path.startsWith('/library/scene/') ||
            path.startsWith('/library/video/') ||
            path.startsWith('/library/people/') ||
            path.startsWith('/library/collection/') ||
            path.startsWith('/library/studio/')
          ) {
            navigate(ROUTES.DASHBOARD);
          }
        }

        setTimeout(() => {
          if (mainEl) {
            mainEl.classList.remove('is-transitioning');
          }
        }, 150);
      }, 200);
    };

    const isAlreadyVerified = typeof window !== 'undefined' && window.localStorage?.getItem('swaya_nsfw_age_verified') === 'true';

    if (isEnteringNsfw && !isAlreadyVerified) {
      confirmDialog({
        title: t('common.nsfwConfirmTitle') || '18+ Age Verification & Content Warning',
        content: createElement(
          Text,
          { variant: 'body', color: 'primary' },
          t('common.nsfwConfirmDescription') || 'This section contains sexually explicit (18+) adult media. Are you at least 18 years of age or the age of majority in your jurisdiction and consent to view adult material?'
        ),
        icon: AlertTriangle,
        variant: 'danger',
        confirmText: t('common.nsfwConfirmButton') || 'I am 18+ - Enter',
        cancelText: t('common.cancel') || 'Cancel',
        onConfirm: () => {
          try {
            window.localStorage?.setItem('swaya_nsfw_age_verified', 'true');
          } catch {
            // ignore
          }
          performToggle();
        },
      });
    } else {
      performToggle();
    }
  }, [confirmDialog, isNsfwMode, location.pathname, navigate, sessionMode, t, toggleSessionMode]);

  return {
    settings,
    sessionMode,
    scanProgress,
    imageProgress,
    hydrateProgress,
    collectionProgress,
    torrentProgress,
    syncProgress,
    canGoBack,
    canGoForward,
    handleGoBack,
    handleGoForward,
    handleAbort,
    handleToggleClick,
    minimize,
    toggleMaximize,
    close,
    resizeToMinimum,
    t,
  };
}

export default useWindowTitlebarActions;
