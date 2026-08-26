import PropTypes from 'prop-types';
import DocsHubCard from './DocsHubCard';
import styles from './DocsHubCategorySection.module.css';


export default function DocsHubCategorySection({ section }) {
  return (
    <section className={styles['hub-section']}>
      <h2 className={styles['hub-category-title']}>
        {section.category}
      </h2>

      <div className={styles['hub-grid']}>
        {section.items.map((item) => (
          <DocsHubCard
            key={item.slug}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

DocsHubCategorySection.propTypes = {
  section: PropTypes.shape({
    category: PropTypes.string.isRequired,
    categoryKey: PropTypes.string,
    items: PropTypes.arrayOf(DocsHubCard.propTypes.item).isRequired,
  }).isRequired,
};

