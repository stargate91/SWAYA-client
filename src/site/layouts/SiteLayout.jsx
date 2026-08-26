import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { CookieConsentBanner } from '../components/cookie';
import { SiteErrorBoundary } from '../components/common';
import { useSiteLayout } from '../hooks/useSiteLayout';
import styles from '../styles/SiteLayout.module.css';

export default function SiteLayout() {
  const { t, skipToContentLabel } = useSiteLayout();

  return (
    <>
      <a href="#main-content" className={styles['skip-link']}>
        {skipToContentLabel}
      </a>
      <Navbar />
      <main id="main-content" role="main" tabIndex={-1} className={styles.main}>
        <SiteErrorBoundary t={t}>
          <Outlet />
        </SiteErrorBoundary>
      </main>
      <Footer />
      <CookieConsentBanner />
    </>
  );
}


