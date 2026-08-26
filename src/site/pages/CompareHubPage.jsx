import {
  CompareHubHeader,
  CompareCategoryFilter,
  CompareCard,
  CompareCta,
} from '../components/compare';
import { AriaLiveRegion } from '../components/common';
import { useCompareHub } from '../hooks/useCompareHub';
import styles from './CompareHubPage.module.css';

export default function CompareHubPage() {
  const {
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredList,
    filterAnnouncement,
    breadcrumbItems,
    prefix,
    onOpenDemo,
    t,
  } = useCompareHub();

  return (
    <div className={styles.container}>
      <CompareHubHeader breadcrumbItems={breadcrumbItems} t={t} />


      <CompareCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <AriaLiveRegion message={filterAnnouncement} />

      <section className={styles.grid} aria-label="Comparisons">
        {filteredList.map((comp) => (
          <CompareCard
            key={comp.slug}
            comp={comp}
            prefix={prefix}
            t={t}
          />
        ))}
      </section>

      <CompareCta onOpenDemo={onOpenDemo} />
    </div>
  );
}
