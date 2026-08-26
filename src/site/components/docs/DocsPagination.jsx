import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './DocsPagination.module.css';

export default function DocsPagination({ prevDoc, nextDoc, t }) {
  return (
    <nav
      role="navigation"
      aria-label={t('docs.ui.navigationAriaLabel', { defaultValue: 'Guide Navigation' })}
      className={styles.pagination}
    >
      {prevDoc ? (
        <Link to={prevDoc.path} className={styles['page-nav-button']}>
          <span className={styles['nav-direction']}>
            <ArrowLeft size={12} aria-hidden="true" /> {t('docs.ui.prevGuide', { defaultValue: 'Previous' })}
          </span>
          <span className={styles['nav-title']}>{prevDoc.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {nextDoc && (
        <Link
          to={nextDoc.path}
          className={`${styles['page-nav-button']} ${styles['page-nav-button--next']}`}
        >
          <span className={styles['nav-direction']}>
            {t('docs.ui.nextGuide', { defaultValue: 'Next' })} <ArrowRight size={12} aria-hidden="true" />
          </span>
          <span className={styles['nav-title']}>{nextDoc.title}</span>
        </Link>
      )}
    </nav>
  );
}

DocsPagination.propTypes = {
  prevDoc: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  nextDoc: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  t: PropTypes.func.isRequired,
};

