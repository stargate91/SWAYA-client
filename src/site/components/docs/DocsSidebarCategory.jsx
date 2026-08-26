import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './DocsSidebarCategory.module.css';


export default function DocsSidebarCategory({
  category,
  items = [],
  onSelectDoc,
}) {
  return (
    <div className={styles['nav-section']}>
      <div className={styles['category-title']}>{category}</div>
      {items.map((item) => (
        <NavLink
          key={item.slug}
          to={item.path}
          onClick={() => onSelectDoc?.(item.slug)}
          className={`${styles['nav-link']} ${item.isActive ? styles['nav-link--active'] : ''}`}
        >
          <span>{item.title}</span>
        </NavLink>
      ))}
    </div>
  );
}

DocsSidebarCategory.propTypes = {
  category: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
    })
  ),
  onSelectDoc: PropTypes.func,
};

