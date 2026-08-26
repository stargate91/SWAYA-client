import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './NotFoundQuickLinks.module.css';

export default function NotFoundQuickLinks({ quickLinks = [], title }) {
  if (!quickLinks || quickLinks.length === 0) {
    return null;
  }

  return (
    <div className={styles['quick-links']}>
      {title && (
        <span className={styles['quick-links-title']}>
          {title}
        </span>
      )}
      <div className={styles['quick-links-grid']}>
        {quickLinks.map((link) => (
          <Link
            key={link.slug || link.to}
            to={link.to}
            className={styles['quick-link']}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

NotFoundQuickLinks.propTypes = {
  quickLinks: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
};
