import PropTypes from 'prop-types';
import Spinner from '@/ui/Spinner';
import Grid from '@/ui/Grid';
import VirtualGrid from '@/ui/VirtualGrid';
import PersonCreditsCard from './PersonCreditsCard';
import EmptyState from '@/ui/EmptyState';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Skeleton from '@/ui/Skeleton';
import Divider from '@/ui/Divider';
import { usePersonCreditsGrid } from '../../hooks/usePersonCreditsGrid';
import styles from './PersonCreditsSections.module.css';

export default function PersonCreditsDiscoverGrid({
  item,
  activeSource,
  activeDiscoverTab,
  activeMediaType,
  activeGridQuery = {},
  accumulatedItems = [],
  hasMore = false,
  isFetchingNextPage = false,
  handleEndReached,
  isSceneGrid = false,
  navigate,
  playMutation,
  settings,
  torrentEnabled,
  openTorrentModal,
  t,
}) {
  const {
    isCachingNeeded,
    loadingLabel,
    emptyStateTitle,
    emptyStateDescription,
    gridVariant,
    skeletonAspect,
    isLoading,
    isEmpty,
    isFinished,
  } = usePersonCreditsGrid({
    item,
    activeSource,
    activeDiscoverTab,
    activeGridQuery,
    accumulatedItems,
    hasMore,
    isSceneGrid,
    t,
  });

  return (
    <>
      {isCachingNeeded && (
        <Inline
          align="center"
          gap="xs"
          className="u-p-xs u-px-sm u-mb-xs u-rounded-sm u-border"
          /* eslint-disable-next-line react/forbid-component-props */
          style={{
            background: 'color-mix(in srgb, var(--color-accent-blue) 8%, var(--color-surface-card))',
            borderColor: 'color-mix(in srgb, var(--color-accent-blue) 15%, var(--color-border-default))',
          }}
        >
          <Spinner size="xs" />
          <Text variant="xsmall" color="secondary">
            {t('library.details.cachingBackgroundProgress', {
              defaultValue:
                'Downloading and caching remaining filmography items in the background... Suggested tags and studios will update automatically once complete.',
            })}
          </Text>
        </Inline>
      )}

      {activeDiscoverTab && (
        <div className={styles['discover-grid-wrapper']}>
          {isLoading ? (
            <Inline justify="center" align="center" className="u-py-4xl" fullWidth>
              <Spinner label={loadingLabel} />
            </Inline>
          ) : isEmpty ? (
            <EmptyState
              title={emptyStateTitle}
              description={emptyStateDescription}
              border="dashed"
              background="translucent"
              size="sm"
            />
          ) : (
            <>
              <VirtualGrid
                items={accumulatedItems}
                variant={gridVariant}
                scrollSelector={`.${styles['discover-grid-wrapper']}`}
                hasMore={hasMore}
                isLoadingMore={isFetchingNextPage}
                onEndReached={handleEndReached}
                renderItem={(credit, i) => (
                  <PersonCreditsCard
                    key={`${credit.id}-${credit.type || activeMediaType}-discover-${i}`}
                    item={credit}
                    mediaType={activeMediaType}
                    navigate={navigate}
                    playMutation={playMutation}
                    t={t}
                    showLibraryBadge={true}
                    showPlayOverlay={false}
                    placeholderIconSize={22}
                    settings={settings}
                    torrentEnabled={torrentEnabled}
                    openTorrentModal={openTorrentModal}
                  />
                )}
              />

              {/* Skeletons on loading page */}
              {isFetchingNextPage && (
                <Grid
                  variant={gridVariant}
                  className="u-mt-md"
                >
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <Skeleton.Card
                      key={`loading-skeleton-${idx}`}
                      aspect={skeletonAspect}
                    />
                  ))}
                </Grid>
              )}

              {isFinished && (
                <Stack fullWidth gap="md">
                  <Divider className="u-mb-2xl" />
                  <Text
                    as="div"
                    variant="xs"
                    color="muted"
                    align="center"
                    className="u-pb-2xl"
                  >
                    {t('library.details.finishedCredits') ||
                      'All credits loaded.'}
                  </Text>
                </Stack>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

PersonCreditsDiscoverGrid.propTypes = {
  item: PropTypes.object,
  activeSource: PropTypes.string,
  activeDiscoverTab: PropTypes.string,
  activeMediaType: PropTypes.string,
  activeGridQuery: PropTypes.object,
  accumulatedItems: PropTypes.array,
  hasMore: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool,
  handleEndReached: PropTypes.func,
  isSceneGrid: PropTypes.bool,
  navigate: PropTypes.func,
  playMutation: PropTypes.object,
  settings: PropTypes.object,
  torrentEnabled: PropTypes.bool,
  openTorrentModal: PropTypes.func,
  t: PropTypes.func.isRequired,
};
