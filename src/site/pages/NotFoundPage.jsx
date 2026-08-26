import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './NotFoundPage.module.css';
import Button from '@/ui/Button';
import Badge from '@/ui/Badge';
import { useNotFoundPage } from '../hooks/useNotFoundPage';
import NotFoundQuickLinks from '../components/notfound';

export default function NotFoundPage() {
  const { t, homeUrl, goBack, quickLinks, popularGuidesTitle } = useNotFoundPage();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Badge tone="accent" size="sm">
          {t('docs.ui.error404', { defaultValue: 'Error 404' })}
        </Badge>

        <h1 className={styles['error-code']}>
          {t('docs.ui.error404Code', { defaultValue: '404' })}
        </h1>

        <h2 className={styles.title}>
          {t('docs.ui.pageNotFoundTitle', { defaultValue: 'Page Not Found' })}
        </h2>

        <p className={styles.description}>
          {t('docs.ui.pageNotFoundDesc', {
            defaultValue:
              'The page or documentation guide you are looking for has been moved, renamed, or does not exist.',
          })}
        </p>

        <div className={styles.actions}>
          <Button
            variant="secondary"
            onClick={goBack}
            leftIcon={<ArrowLeft size={16} aria-hidden="true" />}
          >
            {t('docs.ui.goBack', { defaultValue: 'Go Back' })}
          </Button>

          <Button
            as={Link}
            to={homeUrl}
            variant="primary"
            size="md"
          >
            {t('docs.ui.returnHome', { defaultValue: 'Return to Home' })}
          </Button>
        </div>

        <NotFoundQuickLinks quickLinks={quickLinks} title={popularGuidesTitle} />
      </div>
    </div>
  );
}
