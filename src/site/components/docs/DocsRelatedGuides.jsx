import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import styles from './DocsRelatedGuides.module.css';

export default function DocsRelatedGuides({ relatedDocs, t }) {
  if (!relatedDocs || relatedDocs.length === 0) return null;

  return (
    <section className={styles['related-section']} aria-labelledby="related-guides-title">
      <h2 id="related-guides-title" className={styles['related-title']}>
        <Compass size={16} className={styles['related-icon']} aria-hidden="true" />
        {t('docs.ui.relatedGuides', { defaultValue: 'Related Guides' })}
      </h2>
      <div className={styles['related-grid']}>
        {relatedDocs.map((doc) => (
          <Link
            key={doc.slug}
            to={doc.path}
            className={styles['related-card']}
          >
            <span className={styles['related-card-title']}>
              {doc.title}
              <ArrowRight size={13} aria-hidden="true" />
            </span>
            <p className={styles['related-card-desc']}>{doc.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

DocsRelatedGuides.propTypes = {
  relatedDocs: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ),
  t: PropTypes.func.isRequired,
};

