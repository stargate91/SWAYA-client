import Button from '@/ui/Button';
import { useDownloadSection } from '../../hooks/useDownloadSection';
import styles from './DownloadSection.module.css';

export default function DownloadSection() {
  const { title, subtitle, buttonText, disclaimer, checkoutUrl, handleBuyClick } = useDownloadSection();

  return (
    <section id="download" className={styles.download}>
      <div className={styles['download-card']}>
        <h2 className={styles['download-title']}>{title}</h2>
        <p className={styles['download-subtitle']}>{subtitle}</p>

        <div className={styles['download-actions']}>
          <Button
            as="a"
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className={styles['download-btn']}
            onClick={handleBuyClick}
            aria-label={`${buttonText} (opens in new tab)`}
          >
            {buttonText}
          </Button>
          <span className={styles['download-disclaimer']}>{disclaimer}</span>
        </div>
      </div>
    </section>
  );
}

