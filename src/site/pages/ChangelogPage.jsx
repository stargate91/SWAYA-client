import { Layers } from 'lucide-react';
import Badge from '@/ui/Badge';
import { Breadcrumb } from '../components/common';
import { useChangelogPage } from '../hooks/useChangelogPage';
import ChangelogReleaseCard from '../components/changelog';
import styles from './ChangelogPage.module.css';

export default function ChangelogPage() {
  const { releases, breadcrumbItems, t } = useChangelogPage();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Breadcrumb items={breadcrumbItems} />

        <div className={styles['badge-row']}>
          <Badge tone="accent" size="sm" leftIcon={<Layers size={12} aria-hidden="true" />}>
            {t('landing.changelog.badge', { defaultValue: 'Release History' })}
          </Badge>
        </div>

        <h1 className={styles.title}>
          {t('landing.changelog.title', { defaultValue: 'Release Notes & Changelog' })}
        </h1>

        <p className={styles.description}>
          {t('landing.changelog.subtitle', {
            defaultValue:
              'Track new features, performance optimizations, and updates across every release of SWAYA.',
          })}
        </p>
      </header>

      <section className={styles.timeline} aria-label="Releases timeline">
        {releases.map((release) => (
          <ChangelogReleaseCard
            key={release.version}
            release={release}
            t={t}
          />
        ))}
      </section>
    </div>
  );
}
