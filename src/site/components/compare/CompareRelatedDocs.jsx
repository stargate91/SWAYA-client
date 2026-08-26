import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './CompareRelatedDocs.module.css';

export default function CompareRelatedDocs({ relatedDocs = [], competitorName = '', t }) {
  if (!relatedDocs || relatedDocs.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="related-docs-heading">
      <div className={styles.header}>
        <h2 id="related-docs-heading" className={styles.title}>
          {t('landing.compare.relatedDocsTitle', {
            name: competitorName,
            defaultValue: `Explore Relevant SWAYA Features & Workflows`,
          })}
        </h2>
        <p className={styles.subtitle}>
          {t('landing.compare.relatedDocsSubtitle', {
            defaultValue:
              'In-depth documentation guides covering core features compared above.',
          })}
        </p>
      </div>

      <div className={styles.grid}>
        {relatedDocs.map((doc) => (
          <Link
            key={doc.slug}
            to={doc.path || `/docs/${doc.slug}`}
            className={styles.card}
          >
            <div className={styles['card-header']}>
              <h3 className={styles['card-title']}>
                <span>{doc.title}</span>
                <span className={styles['card-arrow']} aria-hidden="true">→</span>
              </h3>
              <p className={styles['card-desc']}>{doc.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

CompareRelatedDocs.propTypes = {
  relatedDocs: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      path: PropTypes.string,
    })
  ).isRequired,
  competitorName: PropTypes.string,
  t: PropTypes.func.isRequired,
};
