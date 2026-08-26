import PropTypes from 'prop-types';
import { Clock } from 'lucide-react';
import Badge from '@/ui/Badge';
import styles from './ChangelogReleaseCard.module.css';

export default function ChangelogHeader({
  version,
  isLatest,
  latestBadgeLabel,
  date,
  title,
  description,
}) {
  return (
    <div className={styles['release-header']}>
      <div className={styles['release-meta-row']}>
        <div className={styles['version-tag-wrapper']}>
          <span className={styles['version-badge']}>{version}</span>
          {isLatest && (
            <Badge tone="accent" size="sm">
              {latestBadgeLabel}
            </Badge>
          )}
        </div>

        <time dateTime={date} className={styles['release-date']}>
          <Clock size={13} aria-hidden="true" />
          <span>{date}</span>
        </time>
      </div>

      <h2 className={styles['release-title']}>{title}</h2>
      <p className={styles['release-desc']}>{description}</p>
    </div>
  );
}

ChangelogHeader.propTypes = {
  version: PropTypes.string.isRequired,
  isLatest: PropTypes.bool,
  latestBadgeLabel: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
