import PropTypes from 'prop-types';
import { Check } from 'lucide-react';
import styles from './ChangelogReleaseCard.module.css';

export default function ChangelogHighlights({ highlights = [], title }) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className={styles['highlights-box']}>
      <span className={styles['highlights-title']}>{title}</span>
      <ul className={styles['highlights-list']}>
        {highlights.map((highlight, idx) => (
          <li key={idx} className={styles['highlights-item']}>
            <Check size={12} className={styles['check-icon']} aria-hidden="true" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

ChangelogHighlights.propTypes = {
  highlights: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};
