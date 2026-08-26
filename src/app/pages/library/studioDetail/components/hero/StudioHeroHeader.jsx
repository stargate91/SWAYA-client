import StudioLogoBlock from './StudioLogoBlock';
import StudioActionsRatingBlock from './StudioActionsRatingBlock';
import StudioRelationsBlock from './StudioRelationsBlock';
import StudioMetadataBlock from './StudioMetadataBlock';
import styles from './StudioHeroHeader.module.css';

export default function StudioHeroHeader({
  studio,
  logoUrl,
  t,
  isActivateHovered,
  setIsActivateHovered,
  setIsLogoDrawerOpen,
  setIsReviewModalOpen,
  handleToggleFavorite,
  handleToggleActive,
  handleRatingChange,
  filteredSubStudios,
}) {
  return (
    <div className={styles['media-column']}>
      {/* Studio Logo & Title */}
      <StudioLogoBlock
        studio={studio}
        logoUrl={logoUrl}
        t={t}
        setIsLogoDrawerOpen={setIsLogoDrawerOpen}
      />

      {/* Action Row: Favorite, Active/Inactive, Review & Rating */}
      <StudioActionsRatingBlock
        studio={studio}
        t={t}
        isActivateHovered={isActivateHovered}
        setIsActivateHovered={setIsActivateHovered}
        setIsReviewModalOpen={setIsReviewModalOpen}
        handleToggleFavorite={handleToggleFavorite}
        handleToggleActive={handleToggleActive}
        handleRatingChange={handleRatingChange}
      />

      {/* Description & Aliases Metadata */}
      <StudioMetadataBlock
        studio={studio}
        t={t}
      />

      {/* Parent Studio & Sub-Studios Relations */}
      <StudioRelationsBlock
        studio={studio}
        filteredSubStudios={filteredSubStudios}
        t={t}
      />
    </div>
  );
}
