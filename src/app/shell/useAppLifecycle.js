import { useEffect } from 'react';
import { useNavigate, useLocation, useNavigationType } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { sendIpc, onIpc, isElectron } from '@/lib/ipc';
import { useSettingsQuery } from '@/queries';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { usePlaybackStore } from '@/stores/usePlaybackStore';
import { ROUTES } from '@/lib/routes';
import { setPageMeta } from '@site/lib/meta/pageMeta';

export function useAppLifecycle() {
  const { data: settings } = useSettingsQuery();
  const theme = settings?.ui_theme || 'dark';
  const navigate = useNavigate();
  const location = useLocation();
  const syncPath = useNavigationStore((state) => state.syncPath);
  const navType = useNavigationType();
  const queryClient = useQueryClient();

  useEffect(() => {
    syncPath(location.pathname + location.search, navType);
  }, [location, syncPath, navType]);

  useEffect(() => {
    if (!isElectron && typeof document !== 'undefined') {
      const canonicalUrl = `https://swaya.xyz${location.pathname}`;
      setPageMeta({
        canonicalUrl,
        robots: 'noindex, follow',
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    sendIpc('theme-changed', theme);
  }, [theme]);

  useEffect(() => {
    let isInitialStartup = true;
    const endStartup = () => {
      isInitialStartup = false;
    };
    const timer = setTimeout(endStartup, 3000);

    const clearActiveFocus = () => {
      if (isInitialStartup && document.activeElement && document.activeElement !== document.body) {
        document.activeElement.blur();
      }
    };

    const handleInitialFocus = (e) => {
      if (isInitialStartup && e.target && e.target !== document.body) {
        setTimeout(() => {
          if (isInitialStartup && document.activeElement && document.activeElement !== document.body) {
            document.activeElement.blur();
          }
        }, 0);
      }
    };

    const handleUserInteraction = () => {
      endStartup();
    };

    document.addEventListener('focusin', handleInitialFocus, true);
    window.addEventListener('keydown', handleUserInteraction, { once: true, capture: true });
    window.addEventListener('pointerdown', handleUserInteraction, { once: true, capture: true });

    clearActiveFocus();
    setTimeout(clearActiveFocus, 0);
    setTimeout(clearActiveFocus, 100);
    setTimeout(clearActiveFocus, 300);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('focusin', handleInitialFocus, true);
      window.removeEventListener('keydown', handleUserInteraction, { capture: true });
      window.removeEventListener('pointerdown', handleUserInteraction, { capture: true });
    };
  }, []);

  useEffect(() => {
    return onIpc('player-state-update', (event, data) => {
      usePlaybackStore.getState().handlePlayerStateUpdate(data, queryClient);
    });
  }, [queryClient]);

  useEffect(() => {
    if (settings && !settings.onboarding_completed) {
      navigate(ROUTES.ONBOARDING);
    }
  }, [settings, navigate]);
}
