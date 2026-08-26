import PropTypes from 'prop-types';
import styles from './DocsSidebar.module.css';
import { useDocsSidebar } from '../../hooks/useDocsSidebar';
import { AriaLiveRegion } from '../common';
import DocsSidebarSearch from './DocsSidebarSearch';
import DocsSidebarCategory from './DocsSidebarCategory';

export default function DocsSidebar({ activeSlug, onSelectDoc }) {
  const {
    searchQuery,
    setSearchQuery,
    clearSearch,
    filteredSections,
    searchAnnouncement,
    t,
  } = useDocsSidebar(activeSlug);

  return (
    <aside role="complementary" aria-label="Documentation Sidebar" className={styles.sidebar}>
      <DocsSidebarSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={clearSearch}
        placeholder={t('docs.ui.searchPlaceholder')}
        ariaLabel={t('docs.ui.searchAriaLabel')}
        clearAriaLabel={t('docs.ui.clearSearchAriaLabel')}
      />

      <AriaLiveRegion message={searchAnnouncement} />

      <nav role="navigation" aria-label={t('docs.ui.navigationAriaLabel')}>
        {filteredSections.length === 0 ? (
          <div className={styles['empty-state']}>
            {t('docs.ui.noGuidesFound', { query: searchQuery })}
          </div>
        ) : (
          filteredSections.map((section) => (
            <DocsSidebarCategory
              key={section.categoryKey || section.category}
              category={section.category}
              items={section.items}
              onSelectDoc={onSelectDoc}
            />
          ))
        )}
      </nav>
    </aside>
  );
}

DocsSidebar.propTypes = {
  activeSlug: PropTypes.string,
  onSelectDoc: PropTypes.func,
};

