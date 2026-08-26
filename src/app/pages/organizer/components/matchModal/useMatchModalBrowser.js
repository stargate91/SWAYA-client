import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

/**
 * Custom hook managing pagination, infinite scroll, and active match state
 * for MatchModalBrowser seasons/episodes view.
 */
export function useMatchModalBrowser({
  browserState,
  isBrowserLoading,
  row,
  episode,
}) {
  const [visibleCount, setVisibleCount] = useState(30);
  const [prevViewSeason, setPrevViewSeason] = useState('');

  const currentViewSeason = `${browserState.view}-${browserState.selectedSeason?.id || browserState.selectedSeason?.season_number || ''}`;
  if (currentViewSeason !== prevViewSeason) {
    setPrevViewSeason(currentViewSeason);
    setVisibleCount(30);
  }

  // Ensure searched episode is rendered even if it's beyond initial visibleCount
  const targetEpisodeNum = Number.parseInt(episode, 10);
  const matchedEpisodeIndex = Number.isFinite(targetEpisodeNum)
    ? browserState.episodes.findIndex((e) => e.episode_number === targetEpisodeNum)
    : -1;

  if (matchedEpisodeIndex >= visibleCount) {
    setVisibleCount(matchedEpisodeIndex + 10);
  }

  const observerRef = useRef(null);
  const loadMoreRef = useCallback(
    (node) => {
      if (isBrowserLoading) return;
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCount((prev) => prev + 20);
          }
        },
        {
          rootMargin: '300px',
        }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isBrowserLoading]
  );

  // Clean up observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const visibleEpisodes = useMemo(
    () => browserState.episodes.slice(0, visibleCount),
    [browserState.episodes, visibleCount]
  );

  const candidateId = Number(browserState.tvCandidate?.tmdb_id || browserState.tvCandidate?.id || 0);
  const rowTvId = Number(row?.rawPayload?.tv_tmdb_id || row?.rawPayload?.tmdb_id || 0);
  const isCurrentTv = candidateId > 0 && rowTvId > 0 && candidateId === rowTvId;

  const rawPayload = row?.rawPayload;
  const payloadEpisode = rawPayload?.episode;
  const payloadSeason = rawPayload?.season;

  const currentEpisodes = useMemo(() => {
    if (!rawPayload) return [];
    if (Array.isArray(payloadEpisode)) {
      return payloadEpisode.map(Number);
    }
    if (payloadEpisode != null) {
      return [Number(payloadEpisode)];
    }
    return [];
  }, [rawPayload, payloadEpisode]);

  const isSeasonActive = useCallback(
    (seasonEntry) => {
      return isCurrentTv && Number(seasonEntry.season_number) === Number(payloadSeason);
    },
    [isCurrentTv, payloadSeason]
  );

  const getEpisodeStatus = useCallback(
    (episodeEntry) => {
      const isActiveSeason = isCurrentTv && Number(browserState.selectedSeason?.season_number) === Number(row?.rawPayload?.season);
      const isActive = isActiveSeason && currentEpisodes.includes(Number(episodeEntry.episode_number));
      const isHighlighted = Number.isFinite(targetEpisodeNum) && Number(episodeEntry.episode_number) === targetEpisodeNum;
      return { isActive, isHighlighted };
    },
    [isCurrentTv, browserState.selectedSeason?.season_number, row?.rawPayload?.season, currentEpisodes, targetEpisodeNum]
  );

  return {
    visibleEpisodes,
    loadMoreRef,
    hasMoreEpisodes: browserState.episodes.length > visibleCount,
    isSeasonActive,
    getEpisodeStatus,
  };
}
