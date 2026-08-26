import PropTypes from 'prop-types';
import { Scale } from 'lucide-react';
import Badge from '@/ui/Badge';
import { Breadcrumb } from '../common';
import styles from './CompareHubHeader.module.css';

export default function CompareHubHeader({ breadcrumbItems, t }) {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles['badge-row']}>
          <Badge tone="accent" size="sm" leftIcon={<Scale size={12} aria-hidden="true" />}>
            {t('landing.compare.badge', { defaultValue: 'Software Comparisons' })}
          </Badge>
        </div>

        <h1 className={styles.title}>
          {t('landing.compare.hubTitle', { defaultValue: 'SWAYA vs' })}{' '}
          <span className={styles['title-accent']}>
            {t('landing.compare.hubTitleAccent', { defaultValue: 'The Alternatives' })}
          </span>
        </h1>

        <p className={styles.subtitle}>
          {t('landing.compare.hubSubtitle', {
            defaultValue:
              'Compare SWAYA with popular media servers, physical file renamers, and media managers to see why collectors choose our 100% offline desktop app.',
          })}
        </p>
      </header>
    </>
  );
}

CompareHubHeader.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    })
  ).isRequired,
  t: PropTypes.func.isRequired,
};

