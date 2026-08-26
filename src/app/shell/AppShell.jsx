import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppClosePrompt } from './useAppClosePrompt';
import WindowTitlebar from './WindowTitlebar';
import MiniPlayerBar from './MiniPlayerBar';
import Sidebar from './Sidebar';
import Spinner from '@/ui/Spinner';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useAppLifecycle } from './useAppLifecycle';
import { useScanCacheSync } from './useScanCacheSync';
import styles from './AppShell.module.css';

export default function AppShell() {
  useAppLifecycle();
  useScanCacheSync();
  useAppClosePrompt();

  const isSidebarCollapsed = useSidebarStore((state) => state.isCollapsed);
  const handleToggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <div className={`${styles.shell} shell ${isSidebarCollapsed ? styles['is-sidebar-collapsed'] : ''}`}>
      <WindowTitlebar />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleToggleSidebar} />

      <div className={`${styles.main} shell__main`}>
        <main className={`${styles.content} shell__content`}>
          <Suspense fallback={<Spinner label="Loading page..." centered fullHeight />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <MiniPlayerBar />
    </div>
  );
}


