import { memo } from 'react';
import {
  Check, Clapperboard, Calendar, Tv
} from '@/ui/icons';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { formatEpisodeNumber } from '@/lib/formatters';
import { useMediaDetailContext } from '../MediaDetailContext';
import { useTvSeasonsSection } from '../../../hooks/useTvSeasonsSection';
import BespokeEpisodeDetail, { BespokeEpisodeDetailSkeleton } from './BespokeEpisodeDetail';
import Lightbox from '@/ui/Lightbox';
import PosterCard from '@/ui/PosterCard';
import ScrollRow from '@/ui/ScrollRow';
import Inline from '@/ui/Inline';
import Card from '@/ui/Card';
import Divider from '@/ui/Divider';
import Stack from '@/ui/Stack';
import Button from '@/ui/Button';
import Skeleton from '@/ui/Skeleton';
import Text from '@/ui/Text';
import styles from './BespokeSeasonsSection.module.css';

const BULLET_CHAR = '\u2022';

function BespokeSeasonsSection() {
  const { state, mutations, t } = useMediaDetailContext();
  const { item, cleanId, nextEpisodeInfo } = state;
  const { bulkUpdateWatchedMutation } = mutations;

  const {
    seasonsList,
    seasonsCount,
    selectedSeasonNumber,
    activeSeason,
    episodesText,
    episodes,
    isLoadingEpisodes,
    selectedEpisodeId,
    setSelectedEpisodeId,
    activeEpisode,
    activeEpisodeIndex,
    stepEpisode,
    isThisSeasonWatched,
    isSeasonWatched,
    isSeasonPartiallyWatched,
    handleSeasonWatchedToggle,
    handleSelectSeason,
    seasonsScrollRef,
    episodesScrollRef,
    lightboxUrl,
    setLightboxUrl,
    handleOpenLightbox,
  } = useTvSeasonsSection({
    item,
    cleanId,
    nextEpisodeInfo,
    bulkUpdateWatchedMutation,
    t,
  });

  if (seasonsCount === 0) return null;

  return (
    <Stack gap="md">
      {/* Unified Season & Episode Browser Card */}
      <Card variant="glass-shaded" padding="none">

        {/* Row 1 Header: Seasons Horizontal Pills */}
        <Inline gap="sm" align="center" className={styles['pills-header']}>
          <ScrollRow ref={seasonsScrollRef} className={`no-scrollbar ${styles['scroll-track']}`} showArrows={true} enableWheelScroll={true} size="sm">
            {seasonsList.map((season) => {
              const isActive = season.season_number === selectedSeasonNumber;
              const title = season.title || `Season ${season.season_number}`;
              const isWatchedPill = isThisSeasonWatched(season);

              return (
                <button
                  key={season.season_number}
                  type="button"
                  className={`${styles.pill} ${isActive ? styles['is-active'] : ''} ${isWatchedPill ? styles['is-watched'] : ''
                    }`}
                  onClick={() => handleSelectSeason(season.season_number)}
                >
                  <span>{title}</span>
                </button>
              );
            })}
          </ScrollRow>
        </Inline>

        {/* Row 1 Body: Season Details */}
        <Inline
          wrap={false}
          align="stretch"
          gap="md"
          padding="md"
          fullWidth
          height="11.25rem"
          className="u-relative"
        >
          {/* Left Column: Large Season Poster */}
          <PosterCard
            className="u-flex-shrink-0"
            size="6.5rem"
            fillHeight={true}
            imageUrl={activeSeason.poster_path ? resolveMediaImageUrl(activeSeason.poster_path, 'poster') : undefined}
            altText={activeSeason.title || `Season ${activeSeason.season_number}`}
            onClick={activeSeason.poster_path ? () => handleOpenLightbox(resolveMediaImageUrl(activeSeason.poster_path, 'originalPoster')) : undefined}
            icon={Clapperboard}
            disableHoverAnimation={true}
          />

          {/* Right Column: Metadata & Overview */}
          <Stack gap="xs" scrollable flex={1} padding="sm">
            <Inline justify="between" align="center" fullWidth wrap={false}>
              <div>
                <Text as="h3" variant="title" weight="bold">
                  {activeSeason.title || `Season ${activeSeason.season_number}`}
                </Text>
                <Inline gap="xs" align="center">
                  {activeSeason.air_date && (
                    <Inline gap="3xs" align="center">
                      <Calendar size={12} />
                      <Text variant="small" color="muted">
                        {String(activeSeason.air_date).slice(0, 10)}
                      </Text>
                    </Inline>
                  )}
                  {activeSeason.air_date && activeSeason.episode_count > 0 && (
                    <Text variant="small" color="faint">{BULLET_CHAR}</Text>
                  )}
                  {activeSeason.episode_count > 0 && (
                    <Inline gap="3xs" align="center">
                      <Tv size={12} />
                      <Text variant="small" color="muted">
                        {episodesText}
                      </Text>
                    </Inline>
                  )}
                </Inline>
              </div>

              <Button
                variant={isSeasonWatched ? 'success' : 'secondary-neutral'}
                size="sm"
                leftIcon={<Check size={14} />}
                onClick={handleSeasonWatchedToggle}
              >
                {isSeasonWatched
                  ? (t('library.details.watched') || 'Watched')
                  : isSeasonPartiallyWatched
                    ? `${t('library.details.markWatched') || 'Mark Watched'} (-)`
                    : (t('library.details.markWatched') || 'Mark Watched')}
              </Button>
            </Inline>

            {activeSeason.overview && (
              <Text as="p" variant="small" color="secondary" clamp={3} maxWidth="115ch">
                {activeSeason.overview}
              </Text>
            )}
          </Stack>
        </Inline>

        {/* Subtle Divider Line */}
        <Divider />

        {/* Row 2 Header: Episode Pills */}
        {isLoadingEpisodes ? (
          <Inline gap="sm" align="center" className={styles['pills-header']}>
            <ScrollRow ref={episodesScrollRef} className={`no-scrollbar ${styles['scroll-track']}`} showArrows={false} size="sm">
              {Array.from({ length: Math.min(activeSeason?.episode_count || 12, 16) }).map((_, idx) => (
                <Skeleton
                  key={`ep-skeleton-${idx}`}
                  width="2.25rem"
                  height="1.75rem"
                  radius="var(--radius-sm)"
                />
              ))}
            </ScrollRow>
          </Inline>
        ) : episodes.length > 0 ? (
          <Inline gap="sm" align="center" className={styles['pills-header']}>
            <ScrollRow ref={episodesScrollRef} className={`no-scrollbar ${styles['scroll-track']}`} showArrows={true} enableWheelScroll={true} size="sm">
              {episodes.map((episode) => {
                const isActive = episode.id === selectedEpisodeId;
                const formattedEpNum = episode.display_episode_code
                  ? episode.display_episode_code.split('E').pop()
                  : formatEpisodeNumber(episode.episode_number);
                const isNextUp = nextEpisodeInfo?.episode?.id === episode.id;

                return (
                  <button
                    key={episode.id}
                    type="button"
                    data-active-episode={isActive ? 'true' : undefined}
                    className={`${styles.pill} ${isActive ? styles['is-active'] : ''} ${episode.is_watched ? styles['is-watched'] : ''
                      } ${!episode.path || episode.is_missing ? styles['is-unowned'] : ''} ${isNextUp ? styles['is-next-up'] : ''}`}
                    onClick={() => setSelectedEpisodeId(episode.id)}
                  >
                    {isNextUp && <span className={styles['next-dot']} />}
                    <span>{formattedEpNum}</span>
                  </button>
                );
              })}
            </ScrollRow>
          </Inline>
        ) : null}

        {/* Row 2 Body: Episode Details */}
        {isLoadingEpisodes ? (
          <BespokeEpisodeDetailSkeleton />
        ) : (
          <BespokeEpisodeDetail
            activeEpisode={activeEpisode}
            activeEpisodeIndex={activeEpisodeIndex}
            episodes={episodes}
            stepEpisode={stepEpisode}
            handleOpenLightbox={handleOpenLightbox}
          />
        )}
      </Card>

      <Lightbox
        imageUrl={lightboxUrl}
        onClose={() => setLightboxUrl(null)}
        t={t}
      />
    </Stack>
  );
}

export default memo(BespokeSeasonsSection);
