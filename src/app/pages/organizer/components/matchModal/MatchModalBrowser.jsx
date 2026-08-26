import EmptyState from '@/ui/EmptyState';
import Grid from '@/ui/Grid';
import MatchSeasonCard from './MatchSeasonCard';
import MatchEpisodeCard from './MatchEpisodeCard';
import { useMatchModalBrowser } from './useMatchModalBrowser';
import styles from './MatchModalBrowser.module.css';

export default function MatchModalBrowser({
  browserState,
  isBrowserLoading,
  row,
  bucketEpisodeNumbers,
  isResolvingId,
  onBrowseSeason,
  onSelectEpisode,
  onToggleBucketEpisode,
  episode,
  t,
}) {
  const {
    visibleEpisodes,
    loadMoreRef,
    hasMoreEpisodes,
    isSeasonActive,
    getEpisodeStatus,
  } = useMatchModalBrowser({
    browserState,
    isBrowserLoading,
    row,
    episode,
  });

  return (
    <>
      {browserState.view === 'seasons' && !isBrowserLoading ? (
        browserState.seasons.length > 0 ? (
          <Grid
            variant="auto-fill-xs"
            gap="md"
            className={styles['browser-grid']}
          >
            {browserState.seasons.map((seasonEntry) => (
              <MatchSeasonCard
                key={`season-${seasonEntry.season_number}`}
                seasonEntry={seasonEntry}
                isBrowserLoading={isBrowserLoading}
                onSelect={onBrowseSeason}
                isActive={isSeasonActive(seasonEntry)}
                t={t}
              />
            ))}
          </Grid>
        ) : (
          <EmptyState
            size="md"
            border="dashed"
            background="translucent"
            title={t('organizer.details.matchModal.noSeasons')}
          />
        )
      ) : null}

      {browserState.view === 'episodes' && !isBrowserLoading ? (
        browserState.episodes.length > 0 ? (
          <>
            <Grid
              variant="auto-poster"
              gap="md"
              className={styles['browser-grid']}
            >
              {visibleEpisodes.map((episodeEntry) => {
                const { isActive, isHighlighted } = getEpisodeStatus(episodeEntry);
                return (
                  <MatchEpisodeCard
                    key={`episode-${episodeEntry.id || episodeEntry.episode_number}`}
                    episodeEntry={episodeEntry}
                    isBucketed={bucketEpisodeNumbers.includes(episodeEntry.episode_number)}
                    isDisabled={isResolvingId === (browserState.tvCandidate?.tmdb_id || browserState.tvCandidate?.id)}
                    onSelect={onSelectEpisode}
                    onToggle={onToggleBucketEpisode}
                    isActive={isActive}
                    isHighlighted={isHighlighted}
                    t={t}
                  />
                );
              })}
            </Grid>
            {hasMoreEpisodes && (
              <div
                ref={loadMoreRef}
                className={styles.sentinel}
              />
            )}
          </>
        ) : (
          <EmptyState
            size="md"
            border="dashed"
            background="translucent"
            title={t('organizer.details.matchModal.noEpisodes')}
          />
        )
      ) : null}
    </>
  );
}

