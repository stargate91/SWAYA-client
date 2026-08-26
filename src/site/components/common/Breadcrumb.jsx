import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumb.module.css';

export default function Breadcrumb({ items = [], ariaLabel = 'Breadcrumb', className = '' }) {
  if (!items || items.length === 0) return null;

  return (
    <nav role="navigation" className={`${styles.breadcrumb} ${className}`.trim()} aria-label={ariaLabel}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Fragment key={item.key || item.to || index}>
            {index > 0 && (
              <ChevronRight
                size={12}
                className={styles.separator}
                aria-hidden="true"
              />
            )}
            {item.to && !isLast ? (
              <Link to={item.to} className={styles['breadcrumb-link']}>
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? styles['breadcrumb-current'] : undefined} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      to: PropTypes.string,
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};
