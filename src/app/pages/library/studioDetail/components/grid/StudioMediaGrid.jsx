import PropTypes from 'prop-types';
import Grid from '@/ui/Grid';
import VirtualGrid from '@/ui/VirtualGrid';
import Stack from '@/ui/Stack';
import Skeleton from '@/ui/Skeleton';
import EmptyState from '@/ui/EmptyState';
import { LibraryPosterCard } from '@/pages/library/components/LibraryPosterCard';
import PersonCreditsCard from '@/pages/library/components/entityDetail/PersonCreditsCard';
import { useStudioMediaGrid } from '../../hooks/useStudioMediaGrid';
import styles from './StudioMediaGrid.module.css';

export default function StudioMediaGrid({
  viewMode,
  mediaQuery,
  mediaItems,
  effectiveActiveTab,
  tabOptions,
  isFetchingNextPage,
  observerRef,
  discoverQuery,
  discoverItems,
  isFetchingNextDiscover,
  discoverObserverRef,
  isTmdbSource,
  isMultiTypeSource,
  effectiveDiscoverSource,
  effectiveDiscoverMediaType,
  navigate,
  settings,
  t,
  sortBy,
}) {
  const {
    isLibraryView,
    libraryVariant,
    libraryAspect,
    discoverVariant,
    discoverAspect,
    discoverMediaType,
    emptyLibraryTitle,
    emptyLibraryDesc,
    emptyDiscoverTitle,
    emptyDiscoverDesc,
    torrentEnabled,
    openTorrentModal,
    handlePlayOverlayClick,
    playMutationPending,
    handleLibraryItemClick,
  } = useStudioMediaGrid({
    viewMode,
    effectiveActiveTab,
    tabOptions,
    isTmdbSource,
    isMultiTypeSource,
    effectiveDiscoverSource,
    effectiveDiscoverMediaType,
    navigate,
    t,
  });

  return (
    <div className={`${styles['media-grid-wrapper']} media-grid-wrapper`}>
      {isLibraryView ? (
        mediaQuery?.isLoading ? (
          <Grid variant={libraryVariant}>
            {Array.from({ length: 12 }).map((_, idx) => (
              <Skeleton.Card
                key={`library-skeleton-${idx}`}
                aspect={libraryAspect}
              />
            ))}
          </Grid>
        ) : mediaItems?.length === 0 ? (
          <EmptyState
            title={emptyLibraryTitle}
            description={emptyLibraryDesc}
          />
        ) : (
          <Stack gap="lg" fullWidth>
            <VirtualGrid
              items={mediaItems}
              variant={libraryVariant}
              scrollSelector={`.${styles['media-grid-wrapper']}`}
              renderItem={(item, idx) => (
                <LibraryPosterCard
                  key={item.id}
                  item={item}
                  index={idx}
                  resolvedTab={effectiveActiveTab}
                  t={t}
                  settings={settings}
                  hideWatchToggle={true}
                  playMutationPending={playMutationPending}
                  onPlayOverlayClick={handlePlayOverlayClick}
                  onItemClick={handleLibraryItemClick}
                />
              )}
            />
            {isFetchingNextPage && (
              <Grid variant={libraryVariant} className="u-mt-md">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <Skeleton.Card
                    key={`library-next-skeleton-${idx}`}
                    aspect={libraryAspect}
                  />
                ))}
              </Grid>
            )}
            <div ref={observerRef} className={styles['sentinel-height']} />
          </Stack>
        )
      ) : (
        discoverQuery?.isLoading ? (
          <Grid variant={discoverVariant}>
            {Array.from({ length: 12 }).map((_, idx) => (
              <Skeleton.Card
                key={`discover-skeleton-${idx}`}
                aspect={discoverAspect}
              />
            ))}
          </Grid>
        ) : discoverItems?.length === 0 ? (
          <EmptyState
            title={emptyDiscoverTitle}
            description={emptyDiscoverDesc}
          />
        ) : (
          <Stack gap="lg" fullWidth>
            <VirtualGrid
              items={discoverItems}
              variant={discoverVariant}
              scrollSelector={`.${styles['media-grid-wrapper']}`}
              renderItem={(item, idx) => (
                <PersonCreditsCard
                  key={`${item.id}-${idx}`}
                  item={item}
                  mediaType={discoverMediaType}
                  navigate={navigate}
                  t={t}
                  showLibraryBadge={true}
                  settings={settings}
                  sortBy={sortBy}
                  torrentEnabled={torrentEnabled}
                  openTorrentModal={openTorrentModal}
                />
              )}
            />
            {isFetchingNextDiscover && (
              <Grid variant={discoverVariant} className="u-mt-md">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <Skeleton.Card
                    key={`discover-next-skeleton-${idx}`}
                    aspect={discoverAspect}
                  />
                ))}
              </Grid>
            )}
            <div ref={discoverObserverRef} className={styles['sentinel-height']} />
          </Stack>
        )
      )}
    </div>
  );
}

StudioMediaGrid.propTypes = {
  viewMode: PropTypes.string,
  mediaQuery: PropTypes.object,
  mediaItems: PropTypes.array,
  effectiveActiveTab: PropTypes.string,
  tabOptions: PropTypes.array,
  isFetchingNextPage: PropTypes.bool,
  observerRef: PropTypes.object,
  discoverQuery: PropTypes.object,
  discoverItems: PropTypes.array,
  isFetchingNextDiscover: PropTypes.bool,
  discoverObserverRef: PropTypes.object,
  isTmdbSource: PropTypes.bool,
  isMultiTypeSource: PropTypes.bool,
  effectiveDiscoverSource: PropTypes.string,
  effectiveDiscoverMediaType: PropTypes.string,
  navigate: PropTypes.func,
  settings: PropTypes.object,
  t: PropTypes.func,
  sortBy: PropTypes.string,
};
