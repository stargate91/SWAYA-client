import PropTypes from 'prop-types';
import { HelpCircle } from 'lucide-react';
import Badge from '@/ui/Badge';
import styles from './FaqHeader.module.css';

export default function FaqHeader({ tag, title, titleAccent, subtitle, sectionId }) {
  return (
    <div className={styles.header}>
      {tag && (
        <Badge tone="accent" size="md" leftIcon={<HelpCircle size={14} aria-hidden="true" />}>
          {tag}
        </Badge>
      )}

      <h2 id={`${sectionId}-title`} className={styles.title}>
        {title}{' '}
        {titleAccent && <span className={styles['title-accent']}>{titleAccent}</span>}
      </h2>

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

FaqHeader.propTypes = {
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleAccent: PropTypes.string,
  subtitle: PropTypes.string,
  sectionId: PropTypes.string.isRequired,
};
