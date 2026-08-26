import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import { useUi } from '@/providers/UiProvider';
import { ChevronDown, ChevronUp } from '@/ui/icons';
import ImagePickerDrawer from '@/components/drawers/ImagePickerDrawer';
import RatingsReviewDrawer from '@/components/drawers/RatingsReviewDrawer';
import DetailPageShell from './components/detail/DetailPageShell';
import EntityDetailTopControls from './components/entityDetail/EntityDetailTopControls';
import EntityDetailStatusSection from './components/entityDetail/EntityDetailStatusSection';
import EntityDetailHeroSection from './components/entityDetail/EntityDetailHeroSection';
import PersonCreditsSections from './components/entityDetail/PersonCreditsSections';
import CollectionDetailSections from './components/entityDetail/CollectionDetailSections';
import usePeopleCollectionDetailController from './hooks/usePeopleCollectionDetailController';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import { useDeckScrollTransition } from './hooks/useDeckScrollTransition';
import PeopleLeftSidebar from './components/entityDetail/PeopleLeftSidebar';
import PeopleRightHeroSection from './components/entityDetail/PeopleRightHeroSection';
import BottomSocialsBar from './components/detail/sections/BottomSocialsBar';
import IconButton from '@/ui/IconButton';
import UtilityBarBottomPortal from '@/ui/UtilityBarBottomPortal';
import shellStyles from './components/detail/DetailPageShell.module.css';
import styles from './PeopleCollectionDetailPage.module.css';

export default function PeopleCollectionDetailPage({ type = 'people' }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useUi();
  const isPeople = type === 'people';
  const {
    item,
    isLoading,
    queryError,
    hasError,
    overviewTitle,
    overviewText,
    overviewEmptyText,
    profileLinks,
    extraLinks,
    socialLinks,
    backdropUrl,
    mediaUrl,
    isActivateHovered,
    canChoosePeopleBackdrop,
    canChooseCollectionBackdrop,
    updatePersonStatusMutation,
    setIsActivateHovered,
    handleToggleFavorite,
    handleToggleActive,
    handleOpenReviewModal,
    handleRatingChange,
    showFinishes,
    editingReviewItem,
    setEditingReviewItem,
    reviewText,
    setReviewText,
    handleSaveReview,
    isImagePickerDrawerOpen,
    isBackdropDrawerOpen,
    isDetailsDrawerOpen,
    setIsDetailsDrawerOpen,
    isAnyDrawerOpen,
    handleOpenImagePickerModal,
    handleCloseImagePickerModal,
    handleOpenBackdropModal,
    handleCloseBackdropModal,
  } = usePeopleCollectionDetailController({
    id,
    isPeople,
    t,
  });

  useScrollRestoration('.media-detail-page__container', [isLoading]);

  const containerRef = useRef(null);
  const rightColumnRef = useRef(null);

  const { isScrolled, handleScrollToggle } = useDeckScrollTransition({
    isAnyDrawerOpen: isAnyDrawerOpen || !isPeople,
    innerScrollSelector: '[class*="discover-grid-wrapper"]',
  });

  return (
    <DetailPageShell
      containerRef={containerRef}
      backdropUrl={backdropUrl}
      fallbackUrl={mediaUrl}
      backLabel={t('common.back') || 'Back'}
      isLoading={isLoading}
      isPeople={isPeople}
      isScrolled={isPeople ? isScrolled : false}
      pageClassName={`entity-detail-page ${isPeople ? 'entity-detail-page--people' : 'entity-detail-page--collection'} ${isPeople && isScrolled ? 'is-scrolled' : ''} ${isAnyDrawerOpen ? 'logo-drawer-open' : ''}`}
      topRightControls={
        <EntityDetailTopControls
          isPeople={isPeople}
          item={item}
          t={t}
          canChoosePeopleBackdrop={canChoosePeopleBackdrop}
          canChooseCollectionBackdrop={canChooseCollectionBackdrop}
          updatePersonStatusMutation={updatePersonStatusMutation}
          handleOpenPeopleBackdropModal={handleOpenBackdropModal}
          handleOpenCollectionBackdropModal={handleOpenBackdropModal}
          extraLinks={extraLinks}
          socialLinks={socialLinks}
        />
      }
    >

      {hasError && (
        <EntityDetailStatusSection
          title={isPeople ? 'Unable to load person' : 'Unable to load collection'}
          message={queryError?.message || 'The detail request failed.'}
        />
      )}

      {!hasError && item && !isLoading && (
        <>
          {isPeople ? (
            <div className={styles.layout}>
              <PeopleLeftSidebar
                item={item}
                mediaUrl={mediaUrl}
                overviewText={overviewText}
                overviewTitle={overviewTitle}
                overviewEmptyText={overviewEmptyText}
                isActivateHovered={isActivateHovered}
                setIsActivateHovered={setIsActivateHovered}
                handleToggleFavorite={handleToggleFavorite}
                handleToggleActive={handleToggleActive}
                handleOpenReviewModal={handleOpenReviewModal}
                handleRatingChange={handleRatingChange}
                showFinishes={showFinishes}
                onMediaCardClick={handleOpenImagePickerModal}
                isDrawerOpen={isDetailsDrawerOpen}
                setIsDrawerOpen={setIsDetailsDrawerOpen}
              />
              <div ref={rightColumnRef} className={`${styles['right-column']} person-credits-right-column`}>
                <div className={`${styles['deck-wrapper']} ${isScrolled ? styles['deck-wrapper--scrolled'] : ''}`}>
                  <div className={styles['hero-slide']}>
                    <PeopleRightHeroSection item={item} />
                  </div>
                  <div className={styles['credits-slide']}>
                    <PersonCreditsSections
                      id={id}
                      item={item}
                      navigate={navigate}
                      t={t}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles['collection-layout']}>
              <EntityDetailHeroSection
                isPeople={isPeople}
                item={item}
                isScrolled={false}
                mediaUrl={mediaUrl}
                profileLinks={profileLinks}
                extraLinks={extraLinks}
                socialLinks={socialLinks}
                overviewText={overviewText}
                overviewTitle={overviewTitle}
                overviewEmptyText={overviewEmptyText}
                isActivateHovered={isActivateHovered}
                t={t}
                setIsActivateHovered={setIsActivateHovered}
                handleToggleFavorite={handleToggleFavorite}
                handleToggleActive={handleToggleActive}
                handleOpenReviewModal={handleOpenReviewModal}
                onMediaCardClick={handleOpenImagePickerModal}
                updatePersonStatusMutation={updatePersonStatusMutation}
                isDrawerOpen={isDetailsDrawerOpen}
                setIsDrawerOpen={setIsDetailsDrawerOpen}
              />

              <CollectionDetailSections
                item={item}
                navigate={navigate}
                t={t}
              />
            </div>
          )}
        </>
      )}
      {!hasError && isPeople && socialLinks.length > 0 && (
        <BottomSocialsBar socialLinks={socialLinks} t={t} />
      )}


      {!hasError && isPeople && (
        <UtilityBarBottomPortal align="center">
          <IconButton
            variant="ghost"
            size="sm"
            className={shellStyles['scroll-toggle-btn']}
            onClick={handleScrollToggle}
            title={
              isScrolled
                ? (t('library.details.backToProfile') || 'Back to Profile')
                : (t('library.details.scrollToCredits') || 'Scroll to Credits')
            }
          >
            {isScrolled ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </IconButton>
        </UtilityBarBottomPortal>
      )}

      {/* Image Picker Drawer */}
      <ImagePickerDrawer
        isOpen={isImagePickerDrawerOpen}
        onClose={handleCloseImagePickerModal}
        title={isPeople ? (t('library.details.changeProfile') || 'Change Profile Picture') : (t('library.details.changePoster') || 'Change Poster')}
        className="entity-detail-page__drawer--poster"
        entityId={isPeople ? item?.id : `collection_${item?.tmdb_id}`}
        entityType={isPeople ? 'person' : 'collection'}
        imageType={isPeople ? 'profile' : 'poster'}
        externalIds={item?.external_ids}
        item={item}
        t={t}
        toast={toast}
        closeOnSelect={false}
      />

      {/* Backdrop Picker Drawer */}
      <ImagePickerDrawer
        isOpen={isBackdropDrawerOpen}
        onClose={handleCloseBackdropModal}
        title={t('library.details.chooseBackdrop') || 'Choose Backdrop'}
        className="entity-detail-page__drawer--backdrop"
        entityId={isPeople ? item?.id : `collection_${item?.tmdb_id || item?.id}`}
        tmdbId={isPeople ? undefined : (item?.tmdb_id || item?.id)}
        item={item}
        entityType={isPeople ? 'person' : 'collection'}
        imageType="backdrop"
        currentPath={item?.backdrop_path}
        t={t}
        toast={toast}
        closeOnSelect={false}
      />
      {isPeople && item?.id && (
        <RatingsReviewDrawer
          editingItem={editingReviewItem}
          setEditingItem={setEditingReviewItem}
          reviewText={reviewText}
          setReviewText={setReviewText}
          handleSaveReview={handleSaveReview}
          t={t}
        />
      )}
    </DetailPageShell>
  );
}

