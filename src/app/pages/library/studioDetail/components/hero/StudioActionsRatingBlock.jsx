import { Check, Minus, Plus, Heart, PenLine } from '@/ui/icons';
import Inline from '@/ui/Inline';
import Tooltip from '@/ui/Tooltip';
import SegmentedRating from '@/ui/SegmentedRating';
import IconButton from '@/ui/IconButton';
import { formatRating } from '@/lib/formatters';
import styles from './StudioActionsRatingBlock.module.css';

export default function StudioActionsRatingBlock({
  studio,
  t,
  isActivateHovered,
  setIsActivateHovered,
  setIsReviewModalOpen,
  handleToggleFavorite,
  handleToggleActive,
  handleRatingChange,
}) {
  return (
    <div className={styles['rating-block']}>
      <Inline gap="sm" align="center" fullWidth>
        {/* Favorite Button */}
        <IconButton
          variant="none"
          size="none"
          className={`${styles['sidebar-action']} ${studio?.is_favorite ? styles['sidebar-action-fav--active'] : ''}`}
          onClick={handleToggleFavorite}
          title={null}
        >
          <Tooltip content={t('library.details.favorite') || 'Favorite'}>
            <Heart size={15} fill={studio?.is_favorite ? 'currentColor' : 'none'} />
          </Tooltip>
        </IconButton>

        {/* Active / Inactive Toggle Button */}
        <IconButton
          variant="none"
          size="none"
          className={`${styles['sidebar-action']} ${studio?.is_active ? styles['sidebar-action-act--active'] : ''}`}
          onClick={handleToggleActive}
          onMouseEnter={() => setIsActivateHovered(true)}
          onMouseLeave={() => setIsActivateHovered(false)}
          title={null}
        >
          <Tooltip content={studio?.is_active ? (t('library.details.active') || 'Active') : (t('library.details.inactive') || 'Inactive')}>
            {studio?.is_active ? (
              isActivateHovered ? <Minus size={15} /> : <Check size={15} />
            ) : (
              <Plus size={15} />
            )}
          </Tooltip>
        </IconButton>

        {/* Review Modal Button */}
        <IconButton
          variant="none"
          size="none"
          className={styles['sidebar-action']}
          onClick={() => setIsReviewModalOpen(true)}
          title={null}
        >
          <Tooltip content={t('library.details.writeReview') || 'Write Review'}>
            <PenLine size={15} />
          </Tooltip>
        </IconButton>
      </Inline>

      {/* Star Rating Slider */}
      <SegmentedRating
        value={studio?.user_rating}
        onChange={handleRatingChange}
        t={t}
        className={styles['rating-container']}
        barClassName={styles['rating-bar']}
        segmentClassName={styles['rating-segment']}
        segmentFillClassName={styles['rating-fill']}
        labelClassName={styles['rating-label']}
        formatLabel={(displayVal) => {
          return displayVal !== null && displayVal !== undefined
            ? `${t('library.details.yourRating') || 'Your Rating'}: ${formatRating(displayVal)}`
            : (t('library.details.yourRating') || 'Your Rating');
        }}
      />
    </div>
  );
}
