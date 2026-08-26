import { ShieldCheck } from 'lucide-react';
import { useCookieConsent } from '../../hooks/useCookieConsent';
import styles from './CookieConsentBanner.module.css';

export default function CookieConsentBanner() {
  const {
    isBannerVisible,
    acceptAll,
    acceptEssential,
    ariaLabel,
    title,
    description,
    essentialLabel,
    acceptLabel,
  } = useCookieConsent();

  if (!isBannerVisible) {
    return null;
  }

  return (
    <aside
      className={styles['banner-container']}
      role="region"
      aria-label={ariaLabel}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles['icon-box']}>
            <ShieldCheck size={18} aria-hidden="true" />
          </div>
          <h2 className={styles.title}>
            {title}
          </h2>
        </div>

        <p className={styles.description}>
          {description}
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles['btn-essential']}
            onClick={acceptEssential}
          >
            {essentialLabel}
          </button>
          <button
            type="button"
            className={styles['btn-accept']}
            onClick={acceptAll}
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    </aside>
  );
}
