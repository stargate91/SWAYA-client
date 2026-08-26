import PropTypes from 'prop-types';
import { Sparkles } from 'lucide-react';
import Badge from '@/ui/Badge';
import DocsBreadcrumb from './DocsBreadcrumb';
import DocsHubCategorySection from './DocsHubCategorySection';
import styles from './DocsHubView.module.css';

export default function DocsHubView({
  sectionsToRender = [],
  searchQuery,
  homeUrl,
  docsUrl,
  t,
}) {
  return (
    <div className={styles['content-column']}>
      <header className={styles['hub-header']}>
        <DocsBreadcrumb homeUrl={homeUrl} docsUrl={docsUrl} t={t} />

        <div className={styles['hub-badge-row']}>
          <Badge tone="accent" size="sm" leftIcon={<Sparkles size={12} aria-hidden="true" />}>
            {t('docs.ui.documentationHub', { defaultValue: 'User Guides' })}
          </Badge>
        </div>

        <h1 className={styles.title}>
          {t('docs.ui.hubTitle', { defaultValue: 'SWAYA Documentation & Guides' })}
        </h1>

        <p className={styles.description}>
          {t('docs.ui.hubSubtitle', {
            defaultValue:
              'Everything you need to configure automated batch file renaming, multi-source metadata scraping, custom library curation, and hardware-accelerated playback.',
          })}
        </p>
      </header>

      <div className={styles['hub-categories']}>
        {sectionsToRender.length === 0 ? (
          <div className={styles['empty-state']}>
            {t('docs.ui.noGuidesFound', {
              query: searchQuery,
              defaultValue: `No guides found matching "${searchQuery}".`,
            })}
          </div>
        ) : (
          sectionsToRender.map((section) => (
            <DocsHubCategorySection
              key={section.categoryKey || section.category}
              section={section}
            />
          ))
        )}
      </div>
    </div>
  );
}

DocsHubView.propTypes = {
  sectionsToRender: PropTypes.array,
  searchQuery: PropTypes.string,
  homeUrl: PropTypes.string.isRequired,
  docsUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};



