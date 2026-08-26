import { Pencil } from '@/ui/icons';
import LogoCard from '@/ui/data/LogoCard';
import Text from '@/ui/Text';
import styles from './StudioLogoBlock.module.css';

export default function StudioLogoBlock({ studio, logoUrl, t, setIsLogoDrawerOpen }) {
  return (
    <div className={styles['top-section']}>
      <div className={styles['logo-container']}>
        <LogoCard
          src={logoUrl}
          alt={studio.name}
          size="xl"
          invert
          className={styles['studio-logo']}
        />
        <button
          type="button"
          className={styles['logo-edit-btn']}
          onClick={() => setIsLogoDrawerOpen(true)}
          title={t('library.details.changeLogo') || 'Change Logo'}
        >
          <Pencil size={14} />
        </button>
      </div>

      <Text as="h1" className={styles.title}>
        {studio.name}
      </Text>
    </div>
  );
}
