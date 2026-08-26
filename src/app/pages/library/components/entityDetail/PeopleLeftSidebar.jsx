import PropTypes from 'prop-types';
import { PenLine, Heart, Check, Minus, Plus, Info } from '@/ui/icons';
import Lightbox from '@/ui/Lightbox';
import SegmentedRating from '@/ui/SegmentedRating';
import EntityDetailDrawer from './EntityDetailDrawer';
import EditableMediaCard from './EditableMediaCard';
import IconButton from '@/ui/IconButton';
import Button from '@/ui/Button';
import Card from '@/ui/Card';
import Grid from '@/ui/Grid';
import { useTranslation } from '@/providers/LanguageContext';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Tooltip from '@/ui/Tooltip';
import { usePeopleLeftSidebar } from '../../hooks/usePeopleLeftSidebar';
import styles from './PeopleLeftSidebar.module.css';

export default function PeopleLeftSidebar({
  item,
  mediaUrl,
  overviewText,
  overviewTitle,
  isActivateHovered,
  setIsActivateHovered,
  handleToggleFavorite,
  handleToggleActive,
  handleOpenReviewModal,
  handleRatingChange,
  showFinishes = false,
  onMediaCardClick,
  profileLinks = [],
  isDrawerOpen,
  setIsDrawerOpen,
}) {
  const { locale, t } = useTranslation();

  const {
    displayName,
    candidateAliases,
    drawerAliases,
    countryISO,
    flagEmoji,
    genderVal,
    deptVal,
    ageVal,
    lastFinishDateText,
    lightboxUrl,
    handleOpenOriginalImage,
    handleCloseLightbox,
    formatRatingLabel,
  } = usePeopleLeftSidebar({
    item,
    mediaUrl,
    locale,
    t,
  });

  return (
    <div className={styles['media-column']}>
      {/* 1. Top Section containing Title, Aliases and the Profile picture */}
      <Stack gap="md" fullWidth fill>
        <Stack gap="2xs">
          <Text as="h1" variant="title" weight="bold" truncate>
            {displayName}
          </Text>
          {candidateAliases.length > 0 && (
            <Text variant="body" color="secondary" italic truncate weight="medium">
              {candidateAliases.join(', ')}
            </Text>
          )}
        </Stack>

        <div className={styles['image-wrapper']}>
          <EditableMediaCard
            mediaUrl={mediaUrl}
            altText={displayName}
            onClick={handleOpenOriginalImage}
            onEditClick={onMediaCardClick}
            editTitle={t('library.details.changeProfile') || 'Change Profile Picture'}
            type="profile"
            flagEmoji={flagEmoji}
            countryISO={countryISO}
            flagTooltip={item?.place_of_birth}
          />
        </div>
      </Stack>

      {/* 2. Bottom Section containing 3 rows: Actions + Rater, Info Grid, Details Button */}
      <Stack gap="sm" fullWidth className={styles['bottom-section']}>
        {/* ROW 1: Action buttons + Rater */}
        <div className={styles['rating-block']}>
          <Inline gap="sm" align="center" fullWidth>
            <IconButton
              variant="none"
              size="none"
              className={`${styles['sidebar-action']} ${item?.is_favorite ? styles['sidebar-action-fav--active'] : ''}`}
              onClick={handleToggleFavorite}
              title={null}
            >
              <Tooltip content={t('library.details.favorite') || 'Favorite'}>
                <Heart size={15} fill={item?.is_favorite ? 'currentColor' : 'none'} />
              </Tooltip>
            </IconButton>
            <IconButton
              variant="none"
              size="none"
              className={`${styles['sidebar-action']} ${item?.is_active ? styles['sidebar-action-act--active'] : ''}`}
              onClick={handleToggleActive}
              onMouseEnter={() => setIsActivateHovered(true)}
              onMouseLeave={() => setIsActivateHovered(false)}
              title={null}
            >
              <Tooltip content={item?.is_active
                ? (t('library.people.unfollow') || 'Unfollow')
                : (t('library.people.follow') || 'Follow')}
              >
                {item?.is_active
                  ? (isActivateHovered ? <Minus size={15} /> : <Check size={15} />)
                  : <Plus size={15} />}
              </Tooltip>
            </IconButton>
            <IconButton
              variant="none"
              size="none"
              className={styles['sidebar-action']}
              onClick={handleOpenReviewModal}
              title={null}
            >
              <Tooltip content={t('library.details.writeReview') || 'Write Review'}>
                <PenLine size={15} />
              </Tooltip>
            </IconButton>
          </Inline>

          <SegmentedRating
            value={item?.user_rating}
            onChange={(newRating) => handleRatingChange?.(newRating)}
            t={t}
            className={styles['rating-container']}
            barClassName={styles['rating-bar']}
            segmentClassName={styles['rating-segment']}
            segmentFillClassName={styles['rating-fill']}
            labelClassName={styles['rating-label']}
            formatLabel={formatRatingLabel}
          />
        </div>

        {/* ROW 2: Informational grid */}
        <Card variant="none" padding="sm" fullWidth className={styles['info-card']}>
          <Grid variant="two-cols" gap="md">
            <Stack gap="2xs">
              <Text variant="small" color="muted" weight="medium" uppercase tracking="wider">
                {t('library.details.gender') || 'Gender'}
              </Text>
              <Text variant="body" weight="bold" color="primary" truncate>
                {genderVal || '—'}
              </Text>
            </Stack>
            <Stack gap="2xs">
              <Text variant="small" color="muted" weight="medium" uppercase tracking="wider">
                {t('library.details.role') || 'Role'}
              </Text>
              <Text variant="body" weight="bold" color="primary" truncate>
                {deptVal}
              </Text>
            </Stack>
            <Stack gap="2xs">
              <Text variant="small" color="muted" weight="medium" uppercase tracking="wider">
                {t('library.details.born') || 'Born'}
              </Text>
              <Text variant="body" weight="bold" color="primary" truncate>
                {item?.birthday || '—'}
              </Text>
            </Stack>
            <Stack gap="2xs">
              <Text variant="small" color="muted" weight="medium" uppercase tracking="wider">
                {t('library.details.age') || 'Age'}
              </Text>
              <Text variant="body" weight="bold" color="primary" truncate>
                {ageVal}
              </Text>
            </Stack>
            {showFinishes && (
              <>
                <Stack gap="2xs">
                  <Text variant="small" color="muted" weight="medium" uppercase tracking="wider">
                    {t('library.details.finishes') || 'Finishes'}
                  </Text>
                  <Text variant="body" weight="bold" color="primary" truncate>
                    {item?.finish_count ?? 0}
                  </Text>
                </Stack>
                <Stack gap="2xs">
                  <Text variant="small" color="muted" weight="medium" uppercase tracking="wider">
                    {t('library.details.lastFinish') || 'Last Finish'}
                  </Text>
                  <Text variant="body" weight="bold" color="primary" truncate>
                    {lastFinishDateText}
                  </Text>
                </Stack>
              </>
            )}
          </Grid>
        </Card>

        {profileLinks.length > 0 && (
          <div className="entity-detail-page__profile-links">
            {profileLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`entity-detail-page__profile-link ${link.fullWidth ? 'entity-detail-page__profile-link--full-width' : ''}`}
                /* eslint-disable-next-line react/forbid-dom-props */
                style={{
                  borderColor: `color-mix(in srgb, ${link.brandColor} 30%, transparent)`,
                  color: `color-mix(in srgb, ${link.brandColor} 85%, white)`
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* ROW 3: Button */}
        <Button
          variant="secondary-neutral"
          icon={Info}
          onClick={() => setIsDrawerOpen(true)}
          fullWidth
        >
          {t('library.details.needMoreBtn') || 'Biography & Details'}
        </Button>
      </Stack>

      <EntityDetailDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        item={item}
        overviewTitle={overviewTitle}
        drawerAliases={drawerAliases}
        overviewText={overviewText}
        t={t}
      />

      {lightboxUrl && (
        <Lightbox
          imageUrl={lightboxUrl}
          onClose={handleCloseLightbox}
          t={t}
        />
      )}
    </div>
  );
}

PeopleLeftSidebar.propTypes = {
  item: PropTypes.object,
  mediaUrl: PropTypes.string,
  overviewText: PropTypes.string,
  overviewTitle: PropTypes.string,
  isActivateHovered: PropTypes.bool,
  setIsActivateHovered: PropTypes.func,
  handleToggleFavorite: PropTypes.func,
  handleToggleActive: PropTypes.func,
  handleOpenReviewModal: PropTypes.func,
  handleRatingChange: PropTypes.func,
  showFinishes: PropTypes.bool,
  onMediaCardClick: PropTypes.func,
  profileLinks: PropTypes.array,
  isDrawerOpen: PropTypes.bool,
  setIsDrawerOpen: PropTypes.func,
};

