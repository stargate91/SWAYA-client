import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SIDEBAR_ICONS, Download } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import { sendWindowEvent } from '@/lib/ipc';
import { useSettingsQuery } from '@/queries';
import { ROUTES } from '@/lib/routes';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { scrollToTop } from '@/lib/domScroll';

export const navItems = [
  { to: ROUTES.DASHBOARD, translationKey: 'sidebar.dashboard', icon: SIDEBAR_ICONS.dashboard },
  { to: ROUTES.ORGANIZER, translationKey: 'sidebar.organizer', icon: SIDEBAR_ICONS.organizer },
  { to: ROUTES.LIBRARY, translationKey: 'sidebar.library', icon: SIDEBAR_ICONS.library },
  { to: ROUTES.LISTS, translationKey: 'sidebar.lists', icon: SIDEBAR_ICONS.lists },
  { to: ROUTES.RATINGS, translationKey: 'sidebar.myRatings', icon: SIDEBAR_ICONS.myRatings },
  { to: ROUTES.TORRENT, translationKey: 'sidebar.torrent', icon: Download },
  { to: ROUTES.STATISTICS, translationKey: 'sidebar.statistics', icon: SIDEBAR_ICONS.statistics },
  { to: ROUTES.HISTORY, translationKey: 'sidebar.history', icon: SIDEBAR_ICONS.history },
  { to: ROUTES.SETTINGS, translationKey: 'sidebar.settings', icon: SIDEBAR_ICONS.settings },
];

export function useSidebar(isCollapsed) {
  const { t } = useTranslation();
  const location = useLocation();
  const { data: settings = {} } = useSettingsQuery();
  const torrentEnabled = Boolean(settings?.torrent_enabled);

  const filteredNavItems = navItems.filter((item) => {
    if (item.to === ROUTES.TORRENT) {
      return torrentEnabled;
    }
    return true;
  });

  const toggleAriaLabel = isCollapsed ? 'Expand navigation' : 'Collapse navigation';

  const handleNavClick = useCallback((targetPath) => {
    if (location.pathname === targetPath) {
      useNavigationStore.getState().clearPageState(targetPath);
      scrollToTop();
    }
  }, [location.pathname]);

  const quitApp = useCallback(() => {
    sendWindowEvent('app-quit');
  }, []);

  return {
    t,
    navItems: filteredNavItems,
    toggleAriaLabel,
    handleNavClick,
    quitApp,
  };
}
