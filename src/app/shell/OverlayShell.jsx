import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppClosePrompt } from './useAppClosePrompt';
import WindowTitlebar from './WindowTitlebar';
import MiniPlayerBar from './MiniPlayerBar';
import Spinner from '@/ui/Spinner';
import styles from './OverlayShell.module.css';

export default function OverlayShell() {
  useAppClosePrompt();

  return (
    <div className={styles['overlay-shell']}>
      <WindowTitlebar />
      <main className={styles['overlay-content']}>
        <Suspense fallback={<Spinner label="Loading..." centered fullHeight />}>
          <Outlet />
        </Suspense>
      </main>
      <MiniPlayerBar />
    </div>
  );
}
