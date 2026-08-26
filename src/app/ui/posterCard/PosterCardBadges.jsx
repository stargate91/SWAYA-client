import Badge from '../Badge';
import { Star, Heart, Check } from '@/ui/icons';
import { formatRating } from '@/lib/formatters';
import styles from './PosterCardBadges.module.css';

export default function PosterCardBadges({
  userRating = 0,
  isFavorite = false,
  isWatched = false,
  progressPercent,
}) {
  return (
    <>
      {userRating > 0 && (
        <Badge
          className={styles['user-rating-badge']}
          leftIcon={<Star size={10} fill="currentColor" />}
        >
          {formatRating(userRating)}
        </Badge>
      )}
      {isFavorite && (
        <div className={styles['favorite-badge']}>
          <Heart size={14} fill="currentColor" strokeWidth={2.2} />
        </div>
      )}
      {isWatched && (
        <div className={styles['watched-badge']}>
          <Check size={14} strokeWidth={3} />
        </div>
      )}
      {progressPercent !== undefined && progressPercent !== null && (
        <div className={styles['progress-track']}>
          <div
            className={styles['progress-fill']}
            /* eslint-disable-next-line react/forbid-dom-props */
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </>
  );
}
