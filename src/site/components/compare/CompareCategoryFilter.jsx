import PropTypes from 'prop-types';
import styles from './CompareCategoryFilter.module.css';

export default function CompareCategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className={styles['filter-bar']} role="tablist" aria-label="Comparison categories">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          role="tab"
          aria-selected={selectedCategory === cat}
          className={`${styles['filter-btn']} ${
            selectedCategory === cat ? styles['filter-btn--active'] : ''
          }`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

CompareCategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};
