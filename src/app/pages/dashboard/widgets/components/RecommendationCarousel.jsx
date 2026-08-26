import PropTypes from 'prop-types';
import { Check, Plus, Minus } from '@/ui/icons';
import Button from '@/ui/Button';
import Skeleton from '@/ui/Skeleton';
import PosterCard from '@/ui/PosterCard';
import posterCardStyles from '@/ui/PosterCard.module.css';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Card from '@/ui/Card';
import ScrollRow from '@/ui/ScrollRow';
import Text from '@/ui/Text';
import { useRecommendationCarousel } from '../hooks/useRecommendationCarousel';

export const RecommendationCarousel = ({
  title,
  items = [],
  watchlistIds = [],
  onWatchlist,
  onCardClick,
  isAdultCarousel = false,
  onLoadMore = null,
  hasMore = false,
  isLoadingMore = false,
  settings = {},
  onPlayClick,
  playMutationPending = false,
  headerActions = null,
  showWatchlist = true,
}) => {
  const {
    T,
    handleScroll,
    isLandscape,
    carouselItems,
  } = useRecommendationCarousel({
    items,
    watchlistIds,
    onWatchlist,
    onCardClick,
    isAdultCarousel,
    onLoadMore,
    hasMore,
    isLoadingMore,
    settings,
    onPlayClick,
    playMutationPending,
    showWatchlist,
  });

  return (
    <Stack gap="xl">
      <Inline align="center" justify="between" fullWidth>
        <Text as="h3" variant="display" weight="extrabold">{title}</Text>
        {headerActions}
      </Inline>

      {!items || items.length === 0 ? (
        <Card variant="subtle" padding="lg">
          <Text color="muted" italic align="center" variant="body">
            {T('dashboard.recommendations.discovery_no_results') || 'No discoveries found matching the selected focus.'}
          </Text>
        </Card>
      ) : (
        <ScrollRow
          hasMore={hasMore}
          onLoadMore={onLoadMore}
          onScroll={handleScroll}
        >
          {carouselItems.map((item) => (
            <PosterCard
              key={item.key}
              size={item.size}
              aspect={item.aspect}
              imageUrl={item.imageUrl}
              loading="eager"
              onClick={item.handleCardClick}
              isWatched={item.isWatched}
              title={item.title}
              subtitle={item.subtitle}
              performers={item.performers}
              date={item.date}
              ratingImdb={item.ratingImdb}
              ratingTmdb={item.ratingTmdb}
              ratingPill={null}
              userRating={item.userRating}
              isFavorite={item.isFavorite}
              playOverlay={item.playOverlay}
              bottomAction={
                item.showWatchlistButton ? (
                  <Button
                    onClick={item.handleWatchlistClick}
                    className={posterCardStyles['action-btn']}
                    variant="glass"
                    aria-pressed={item.isWatchlisted}
                    destructiveHover={true}
                    size="sm"
                  >
                    {item.isWatchlisted ? (
                      <>
                        <span data-state="active">
                          <Check size={12} strokeWidth={3} /> {T('dashboard.watchlist.added') || 'Watchlisted'}
                        </span>
                        <span data-state="hover">
                          <Minus size={12} strokeWidth={3} /> {T('common.remove') || 'Remove'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Plus size={12} strokeWidth={3} /> {T('dashboard.watchlist.add_short') || 'Watchlist'}
                      </>
                    )}
                  </Button>
                ) : null
              }
            />
          ))}
          {isLoadingMore && (
            <Skeleton
              variant="rect"
              width={isLandscape ? '25.875rem' : '12.5rem'}
              height={isLandscape ? '14.5625rem' : '18.75rem'}
              radius="var(--radius-lg)"
            />
          )}
        </ScrollRow>
      )}
    </Stack>
  );
};

RecommendationCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array,
  watchlistIds: PropTypes.array.isRequired,
  onWatchlist: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  isAdultCarousel: PropTypes.bool,
  onLoadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  isLoadingMore: PropTypes.bool,
  settings: PropTypes.object,
  onPlayClick: PropTypes.func,
  playMutationPending: PropTypes.bool,
  headerActions: PropTypes.node,
  showWatchlist: PropTypes.bool,
};

export default RecommendationCarousel;
