import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HelpQuickDocCard from './HelpQuickDocCard';
import styles from './HelpQuickDocs.module.css';

export default function HelpQuickDocs({
  quickDocLinks,
  docsUrl,
  title,
  subtitle,
  allGuidesLabel,
}) {
  return (
    <section className={styles.section} aria-label="Documentation Guides">
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.grid}>
        {quickDocLinks.map((guide) => (
          <HelpQuickDocCard key={guide.slug} guide={guide} />
        ))}
      </div>

      <Link to={docsUrl} className={styles['all-guides-link']}>
        <span>{allGuidesLabel}</span>
      </Link>
    </section>
  );
}

HelpQuickDocs.propTypes = {
  quickDocLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ).isRequired,
  docsUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  allGuidesLabel: PropTypes.string.isRequired,
};


