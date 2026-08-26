import { lazy, Suspense } from 'react';
import {
  Image as ImageIcon,
  Trash2,
  ChevronDown,
  ChevronUp,
} from '@/ui/icons';

// Context
import { MediaDetailProvider } from './components/detail/MediaDetailContext';

// Controller Hook
import { useMediaDetailPageController } from './hooks/useMediaDetailPageController';

// UI & Layout Components
import MediaHeaderInfo from './components/detail/MediaHeaderInfo';
import UserRatingSection from './components/detail/UserRatingSection';
import MediaOverview from './components/detail/MediaOverview';
import MediaActions from './components/detail/MediaActions';
import DetailPageShell from './components/detail/DetailPageShell';
import shellStyles from './components/detail/DetailPageShell.module.css';
import GlassPlayButton from '@/ui/GlassPlayButton';
import UtilityBarBottomPortal from '@/ui/UtilityBarBottomPortal';
import EditableMediaCard from './components/entityDetail/EditableMediaCard';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Card from '@/ui/Card';
import Drawer from '@/ui/Drawer';
import Text from '@/ui/Text';
import IconButton from '@/ui/IconButton';
import Tooltip from '@/ui/Tooltip';
import RatingsReviewDrawer from '@/components/drawers/RatingsReviewDrawer';

// Panels
import BespokeSeasonsSection from './components/detail/sections/BespokeSeasonsSection';
import TechnicalPanel from './components/detail/sections/TechnicalPanel';
import BespokeTagger from './components/detail/sections/BespokeTagger';
import BespokePeaksSection from './components/detail/sections/BespokePeaksSection';
import ListsPopover from './components/detail/sections/ListsPopover';
import BespokeCastSection from './components/detail/sections/BespokeCastSection';
import BespokeCompaniesSection from './components/detail/sections/BespokeCompaniesSection';
import BespokeRatingsSection from './components/detail/sections/BespokeRatingsSection';
import CompactWatchStatsSection from './components/detail/sections/CompactWatchStatsSection';
import BespokeBoxOfficeSection from './components/detail/sections/BespokeBoxOfficeSection';
import BottomSocialsBar from './components/detail/sections/BottomSocialsBar';

const DetailsMetadataDrawer = lazy(() => import('./components/detail/DetailsMetadataDrawer'));
const ImagePickerDrawer = lazy(() => import('@/components/drawers/ImagePickerDrawer'));
const Lightbox = lazy(() => import('@/ui/Lightbox'));

export default function MediaDetailPage({ type = 'movie' }) {
  const {
    id,
    normalizedType,
    t,
    toast,
    navigate,
    isLoading,
    item,
    isMovie,
    isScene,
    isSceneType,
    isFallback,
    isOwned,
    title,
    logoUrl,
    backdropUrl,
    posterUrl,
    editingReviewItem,
    setEditingReviewItem,
    reviewText,
    setReviewText,
    handleSaveReview,
    deleteLibraryItemMutation,
    handleDeleteClick,
    containerRef,
    isScrolled,
    handleScrollToggle,
    socialLinks,
    isPreviewPlaying,
    isVideoPlaying,
    setIsVideoPlaying,
    previewSrc,
    handleTogglePreview,
    handleOpenBackdropModal,
    handleOpenPosterModal,
    isDrawerOpen,
    setIsDrawerOpen,
    isOverviewDrawerOpen,
    setIsOverviewDrawerOpen,
    isLogoDrawerOpen,
    setIsLogoDrawerOpen,
    isPosterDrawerOpen,
    setIsPosterDrawerOpen,
    isBackdropDrawerOpen,
    setIsBackdropDrawerOpen,
    lightboxUrl,
    setLightboxUrl,
    isAnyDrawerOpen,
    handlePosterClick,
    providerValue,
  } = useMediaDetailPageController({ type });

  if (isLoading) {
    return <DetailPageShell isLoading />;
  }

  return (
    <MediaDetailProvider value={providerValue}>
      <DetailPageShell
        backdropUrl={backdropUrl}
        fallbackUrl={posterUrl}
        isScene={isSceneType}
        isFallback={isFallback}
        isPreviewPlaying={isPreviewPlaying}
        previewSrc={previewSrc}
        backLabel={t('common.back') || 'Back'}
        isScrolled={isScrolled}
        isDrawerOpen={isAnyDrawerOpen}
        containerRef={containerRef}
        onVideoPlayingChange={setIsVideoPlaying}
        topRightControls={(
          <>
            {item && (
              <ListsPopover
                item={item}
                type={normalizedType}
                t={t}
              />
            )}
            {item && (item.in_library || isOwned) && (
              <Tooltip content={t('common.delete') || 'Delete'}>
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="media-detail-page__side-nav-toggle u-text-danger"
                  disabled={deleteLibraryItemMutation.isPending}
                >
                  <Trash2 size={18} />
                </button>
              </Tooltip>
            )}
            <Tooltip content={t('library.details.backdrops') || 'Choose Backdrop'}>
              <button
                type="button"
                onClick={handleOpenBackdropModal}
                className="media-detail-page__side-nav-toggle"
              >
                <ImageIcon size={18} />
              </button>
            </Tooltip>
          </>
        )}
      >
        <div className={shellStyles['deck-wrapper']}>
          <div className={shellStyles['hero-content-section']}>
            {isScene && item?.in_library && (
              <GlassPlayButton
                isPlaying={isPreviewPlaying}
                onClick={handleTogglePreview}
                title={isPreviewPlaying ? 'Pause Preview' : 'Play Preview'}
                className="media-detail-page__center-play-btn"
                isLoading={isPreviewPlaying && !isVideoPlaying}
              />
            )}
            {(!logoUrl && posterUrl && !isScene) ? (
              <Inline
                gap="2xl"
                align="start"
                wrap={false}
                fullWidth
                /* eslint-disable-next-line react/forbid-component-props */
                style={{ marginTop: 'var(--media-detail-content-start-y)' }}
              >
                <EditableMediaCard
                  mediaUrl={posterUrl}
                  altText={title}
                  onClick={handlePosterClick}
                  onEditClick={handleOpenPosterModal}
                  editTitle={t('library.details.changePoster') || 'Change Poster'}
                  viewOriginalTitle={t('library.details.viewOriginalImage') || 'View Original Image'}
                  type="poster"
                  size="hero"
                />
                <Stack
                  gap="lg"
                  fullWidth
                  /* eslint-disable-next-line react/forbid-component-props */
                  style={{ minWidth: 0 }}
                >
                  <MediaHeaderInfo isFallbackGrid={true} />
                  <UserRatingSection />
                  <MediaOverview />
                </Stack>
              </Inline>
            ) : (
              <>
                <MediaHeaderInfo />
                <UserRatingSection />
                <MediaOverview />
              </>
            )}
          </div>

          <div
            className={`${shellStyles['inline-sections']} media-detail-page__inline-sections`}
          >
            <Stack gap="2xl">
              {item && <BespokeCastSection item={item} t={t} navigate={navigate} />}
              {isScene && item?.technical && (
                <div className="bespoke-boxoffice-section">
                  <Card
                    variant="glass-shaded"
                    headerVariant="shaded"
                    padding="md"
                    title={t('library.details.technicalInfo') || 'Technical Info'}
                  >
                    <TechnicalPanel showTitle={false} />
                  </Card>
                </div>
              )}
              {!isMovie && !isScene && item && <BespokeSeasonsSection />}

              {/* Box Office Section for Movies */}
              {isMovie && <BespokeBoxOfficeSection item={item} t={t} />}

              {item && (isMovie || isScene) && <BespokeCompaniesSection item={item} t={t} />}

              {/* Ratings Section */}
              {(isMovie || isScene) && <BespokeRatingsSection item={item} t={t} />}
            </Stack>
            <Stack gap="md">
              {item && (
                <CompactWatchStatsSection
                  item={item}
                  isMovie={isMovie}
                  isScene={isScene}
                  t={t}
                />
              )}
              {item && <BespokeTagger />}
              {item && item.is_adult && <BespokePeaksSection />}
            </Stack>
          </div>
        </div>

        <UtilityBarBottomPortal align="left">
          <MediaActions />
        </UtilityBarBottomPortal>

        <UtilityBarBottomPortal align="center">
          <IconButton
            variant="ghost"
            size="sm"
            className={shellStyles['scroll-toggle-btn']}
            onClick={handleScrollToggle}
            title={
              isScrolled
                ? (t('library.details.backToProfile') || 'Back to Profile')
                : (t('library.details.scrollToCredits') || 'Scroll to Details')
            }
          >
            {isScrolled ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </IconButton>
        </UtilityBarBottomPortal>

        <BottomSocialsBar socialLinks={socialLinks} t={t} />
      </DetailPageShell>

      <RatingsReviewDrawer
        editingItem={editingReviewItem}
        setEditingItem={setEditingReviewItem}
        reviewText={reviewText}
        setReviewText={setReviewText}
        handleSaveReview={handleSaveReview}
        t={t}
      />

      {isDrawerOpen && (
        <Suspense fallback={null}>
          <DetailsMetadataDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            item={item}
            isMovie={isMovie}
            isScene={isScene}
            t={t}
          />
        </Suspense>
      )}

      <Drawer
        isOpen={isOverviewDrawerOpen}
        onClose={() => setIsOverviewDrawerOpen(false)}
        title={item?.title || item?.name || t('library.details.overview') || 'Overview'}
        size="md"
        padded
      >
        {item?.overview && (
          <Text variant="body" color="primary" preserveWhitespace>
            {item.overview}
          </Text>
        )}
      </Drawer>

      {isLogoDrawerOpen && (
        <Suspense fallback={null}>
          <ImagePickerDrawer
            isOpen={isLogoDrawerOpen}
            onClose={() => setIsLogoDrawerOpen(false)}
            title={t('library.details.chooseLogo') || 'Choose Logo'}
            className="entity-detail-page__drawer--logo"
            entityId={id}
            tmdbId={item?.tmdb_id || item?.tv_tmdb_id}
            imageType="logo"
            entityType={normalizedType}
            currentPath={item?.logo_path}
            t={t}
            toast={toast}
            item={item}
            closeOnSelect={false}
            variant="contrast"
          />
        </Suspense>
      )}

      {isPosterDrawerOpen && (
        <Suspense fallback={null}>
          <ImagePickerDrawer
            isOpen={isPosterDrawerOpen}
            onClose={() => setIsPosterDrawerOpen(false)}
            title={t('library.details.choosePoster') || 'Choose Poster'}
            className="entity-detail-page__drawer--poster"
            entityId={id}
            tmdbId={item?.tmdb_id || item?.tv_tmdb_id}
            imageType="poster"
            entityType={normalizedType}
            currentPath={item?.poster_path}
            t={t}
            toast={toast}
            item={item}
            closeOnSelect={false}
          />
        </Suspense>
      )}

      {isBackdropDrawerOpen && (
        <Suspense fallback={null}>
          <ImagePickerDrawer
            isOpen={isBackdropDrawerOpen}
            onClose={() => setIsBackdropDrawerOpen(false)}
            title={t('library.details.backdrops') || 'Choose Backdrop'}
            className="entity-detail-page__drawer--backdrop"
            entityId={id}
            tmdbId={item?.tmdb_id || item?.tv_tmdb_id}
            imageType="backdrop"
            entityType={normalizedType}
            currentPath={item?.backdrop_path}
            t={t}
            toast={toast}
            item={item}
            closeOnSelect={false}
          />
        </Suspense>
      )}

      {lightboxUrl && (
        <Suspense fallback={null}>
          <Lightbox
            imageUrl={lightboxUrl}
            onClose={() => setLightboxUrl(null)}
            t={t}
          />
        </Suspense>
      )}
    </MediaDetailProvider>
  );
}
