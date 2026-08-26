import PropTypes from 'prop-types';
import { Clock, Sparkles } from 'lucide-react';
import Badge from '@/ui/Badge';
import styles from './DocsArticleMeta.module.css';


export default function DocsArticleMeta({ activeCategory, readingTimeMinutes, t }) {
  return (
    <div className={styles['header-meta']}>
      {activeCategory && (
        <Badge tone="accent" size="sm" leftIcon={<Sparkles size={12} aria-hidden="true" />}>
          {activeCategory}
        </Badge>
      )}
      <span className={styles['reading-time']}>
        <Clock size={13} aria-hidden="true" />
        {t('docs.ui.minRead', { count: readingTimeMinutes, minutes: readingTimeMinutes })}
      </span>
    </div>
  );
}

DocsArticleMeta.propTypes = {
  activeCategory: PropTypes.string,
  readingTimeMinutes: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};
