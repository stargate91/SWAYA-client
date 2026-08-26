import DetailPageShell from '@/pages/library/components/detail/DetailPageShell';
import ImagePickerDrawer from '@/components/drawers/ImagePickerDrawer';
import RatingsReviewDrawer from '@/components/drawers/RatingsReviewDrawer';
import BottomSocialsBar from '@/pages/library/components/detail/sections/BottomSocialsBar';

import { useStudioDetailPageState } from './hooks/useStudioDetailPageState';
import StudioHeroHeader from './components/hero/StudioHeroHeader';
import StudioGridSection from './components/grid/StudioGridSection';

import styles from './StudioDetailPage.module.css';

export default function StudioDetailPage() {
  const state = useStudioDetailPageState();

  const {
    studio,
    isStudioLoading,
    isStudioError,
    studioError,
    t,
    logoUrl,
    isActivateHovered,
    setIsActivateHovered,
    isLogoDrawerOpen,
    setIsLogoDrawerOpen,
    setIsReviewModalOpen,
    handleToggleFavorite,
    handleToggleActive,
    handleRatingChange,
    filteredSubStudios,
    socialLinks,
  } = state;

  if (isStudioError) {
    return (
      <DetailPageShell
        title={t('library.studios.notFound') || 'Studio not found'}
        fallbackUrl={null}
        backLabel={t('common.back') || 'Back'}
        error={studioError}
        pageClassName="entity-detail-page entity-detail-page--people entity-detail-page--studio"
      />
    );
  }

  return (
    <DetailPageShell
      title={studio?.name || ''}
      fallbackUrl={logoUrl}
      backLabel={t('common.back') || 'Back'}
      isLoading={isStudioLoading && !studio}
      pageClassName="entity-detail-page entity-detail-page--people entity-detail-page--studio"
    >
      {studio && (
        <>
          <div className={styles.layout}>
            {/* Left Column - Hero Sidebar & Actions */}
            <StudioHeroHeader
              studio={studio}
              logoUrl={logoUrl}
              t={t}
              isActivateHovered={isActivateHovered}
              setIsActivateHovered={setIsActivateHovered}
              setIsLogoDrawerOpen={setIsLogoDrawerOpen}
              setIsReviewModalOpen={setIsReviewModalOpen}
              handleToggleFavorite={handleToggleFavorite}
              handleToggleActive={handleToggleActive}
              handleRatingChange={handleRatingChange}
              filteredSubStudios={filteredSubStudios}
            />

            {/* Right Column - Media Controls & Grid Section */}
            <StudioGridSection {...state} />
          </div>

          {/* Logo Picker Drawer */}
          <ImagePickerDrawer
            isOpen={isLogoDrawerOpen}
            onClose={() => setIsLogoDrawerOpen(false)}
            title={t('library.details.changeLogo') || 'Change Logo'}
            className="entity-detail-page__drawer--logo"
            entityId={studio.id}
            entityType="studio"
            imageType="logo"
            currentImagePath={studio.logo_path}
          />

          {/* Review / Comment Drawer */}
          <RatingsReviewDrawer
            editingItem={state.editingReviewItem}
            setEditingItem={state.setEditingReviewItem}
            reviewText={state.reviewText}
            setReviewText={state.setReviewText}
            handleSaveReview={state.handleSaveReview}
            t={t}
          />

          {/* Bottom External Links Socials Bar */}
          {socialLinks && socialLinks.length > 0 && (
            <BottomSocialsBar socialLinks={socialLinks} />
          )}
        </>
      )}
    </DetailPageShell>
  );
}
