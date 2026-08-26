import { memo } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Eye,
  Play,
  Clapperboard,
  Star,
  Droplets,
  Calendar,
  Clock,
  Tv,
  Film,
  Sparkles,
} from '@/ui/icons';
import Pill from '@/ui/Pill';
import PosterCard from '@/ui/PosterCard';
import IconButton from '@/ui/IconButton';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Text from '@/ui/Text';
import EmptyState from '@/ui/EmptyState';
import Skeleton from '@/ui/Skeleton';
import { formatRating } from '@/lib/formatters';
import { useMediaDetailContext } from '../MediaDetailContext';
import { useEpisodeDetailViewModel } from '../../../hooks/useEpisodeDetailViewModel';

const BULLET_CHAR = '\u2022';

const META_ICON_MAP = {
  calendar: Calendar,
  clock: Clock,
  tv: Tv,
  film: Film,
  sparkles: Sparkles,
};

export function BespokeEpisodeDetailSkeleton() {
  return (
    <Inline
      wrap={false}
      align="stretch"
      gap="md"
      padding="md"
      fullWidth
      height="11.25rem"
      className="u-relative"
    >
      <Skeleton
        width="17.3125rem"
        height="100%"
        radius="var(--radius-md)"
        className="u-flex-shrink-0"
      />
      <Stack
        gap="xs"
        flex={1}
        padding="none"
      >
        <Inline justify="between" align="center" fullWidth>
          <Skeleton width="55%" height="1.5rem" radius="var(--radius-sm)" />
          <Skeleton width="2rem" height="1.5rem" radius="var(--radius-sm)" />
        </Inline>
        <Skeleton width="30%" height="0.875rem" radius="var(--radius-xs)" />
        <Stack gap="2xs">
          <Skeleton width="95%" height="0.75rem" radius="var(--radius-xs)" />
          <Skeleton width="85%" height="0.75rem" radius="var(--radius-xs)" />
          <Skeleton width="60%" height="0.75rem" radius="var(--radius-xs)" />
        </Stack>
      </Stack>
    </Inline>
  );
}

function BespokeEpisodeDetail({
  activeEpisode,
  activeEpisodeIndex,
  episodes,
  stepEpisode,
  handleOpenLightbox,
}) {
  const { state, mutations, t } = useMediaDetailContext();
  const { item, cleanId } = state;

  const {
    stillUrl,
    originalStillUrl,
    metaItems,
    displayTitle,
    canPlay,
    canAddPeak,
    handlePlayEpisode,
    handleAddPeak,
    handleToggleWatched,
    isWatched,
  } = useEpisodeDetailViewModel({
    activeEpisode,
    item,
    cleanId,
    mutations,
  });

  if (!activeEpisode) {
    return (
      <Inline
        wrap={false}
        justify="center"
        align="center"
        padding="md"
        fullWidth
        height="11.25rem"
        className="u-relative"
      >
        <EmptyState
          size="sm"
          background="none"
          border="none"
          title={item?.progressive_seasons && activeEpisode === false
            ? (t('library.details.loadingSeason') || 'Loading season...')
            : (t('library.details.noEpisodesFound') || 'No episodes found.')
          }
        />
      </Inline>
    );
  }

  return (
    <Inline
      wrap={false}
      align="stretch"
      gap="md"
      padding="md"
      fullWidth
      height="11.25rem"
      className="u-relative"
    >
      {/* Overlaid Nav Chevrons */}
      {activeEpisodeIndex > 0 && (
        <button
          type="button"
          className="ui-carousel-arrow is-left"
          onClick={() => stepEpisode('left')}
          title={t('library.details.previousEpisode') || 'Previous Episode'}
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {activeEpisodeIndex < episodes.length - 1 && (
        <button
          type="button"
          className="ui-carousel-arrow is-right"
          onClick={() => stepEpisode('right')}
          title={t('library.details.nextEpisode') || 'Next Episode'}
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Cinematic 16:9 Still */}
      <PosterCard
        className="u-flex-shrink-0"
        size="17.3125rem"
        fillHeight={true}
        aspect="landscape"
        imageUrl={stillUrl}
        onClick={stillUrl ? () => handleOpenLightbox(originalStillUrl) : undefined}
        icon={Clapperboard}
        disableHoverAnimation={true}
        playOverlay={canPlay ? {
          onClick: handlePlayEpisode,
          label: t('library.details.playEpisode') || 'Play Episode',
          icon: <Play size={20} fill="currentColor" />,
        } : null}
      />

      {/* Right Column: Metadata & Copy */}
      <Stack
        gap="2xs"
        scrollable
        flex={1}
        padding="xs"
      >
        <Inline
          justify="between"
          align="center"
          gap="md"
          fullWidth
          wrap={false}
        >
          <Text as="h4" variant="display" weight="bold" truncate>
            {displayTitle}
          </Text>

          <Inline gap="sm" align="center" wrap={false}>
            {/* Finish button */}
            {canAddPeak && (
              <IconButton
                variant="ghost"
                size="sm"
                wrapped
                onClick={handleAddPeak}
                title={t('library.details.addPeak') || 'Add Finish'}
              >
                <Droplets size={15} color="var(--color-state-danger)" />
              </IconButton>
            )}

            {/* Watch toggle */}
            <IconButton
              variant={isWatched ? 'success' : 'ghost'}
              size="sm"
              wrapped
              onClick={handleToggleWatched}
              title={isWatched ? 'Mark unwatched' : 'Mark watched'}
            >
              {isWatched ? <Check size={15} /> : <Eye size={15} />}
            </IconButton>
          </Inline>
        </Inline>

        {/* Episode Meta details */}
        <Inline gap="xs" align="center">
          {metaItems.map((meta, idx) => {
            const IconComp = meta.icon ? META_ICON_MAP[meta.icon] : null;
            return (
              <Inline key={meta.key || meta.text} gap="3xs" align="center">
                {idx > 0 && (
                  <Text variant="small" color="faint" className="u-mr-3xs">
                    {BULLET_CHAR}
                  </Text>
                )}
                {IconComp && <IconComp size={12} />}
                <Text variant="small" color="muted">
                  {meta.text}
                </Text>
              </Inline>
            );
          })}
          {activeEpisode.vote_average != null && activeEpisode.vote_average > 0 && (
            <Pill variant="tmdb">
              <Star size={10} fill="currentColor" strokeWidth={1.8} />
              {formatRating(activeEpisode.vote_average)}
            </Pill>
          )}
        </Inline>

        {/* Episode description */}
        {activeEpisode.overview && (
          <Text as="p" variant="small" color="secondary" clamp={3} maxWidth="90ch">
            {activeEpisode.overview}
          </Text>
        )}
      </Stack>
    </Inline>
  );
}

export default memo(BespokeEpisodeDetail);
