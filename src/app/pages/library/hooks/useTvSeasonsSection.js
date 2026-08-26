import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation as useLangTranslation } from '@/providers/LanguageContext';
import { fetchLibraryTvSeasonDetail } from '@/queries/metadataQueries';
import { QK } from '@/lib/queryKeys';
import { getEntityIdVariants } from '@/lib/entityIds';

export function useTvSeasonsSection({
  item,
  cleanId,
  nextEpisodeInfo,
  bulkUpdateWatchedMutation,
  t,
}) {
  const { locale } = useLangTranslation();
  const metadataLanguage = locale === 'en' ? 'en-US' : locale;
  const queryClient = useQueryClient();

  const [lightboxUrl, setLightboxUrl] = useState(null);

  const handleOpenLightbox = useCallback((url) => {
    if (url) {
      setLightboxUrl(url);
    }
  }, []);

  const seasonsList = useMemo(() => item?.seasons || [], [item?.seasons]);
  const seasonsCount = seasonsList.length;

  // Determine initial season and episode selection
  const userSelectedSeasonRef = useRef(false);
  const initialSeasonNumber = nextEpisodeInfo?.seasonNumber ?? seasonsList[0]?.season_number ?? 1;
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(initialSeasonNumber);

  useEffect(() => {
    if (!userSelectedSeasonRef.current && nextEpisodeInfo?.seasonNumber != null) {
      setSelectedSeasonNumber(nextEpisodeInfo.seasonNumber);
    }
  }, [nextEpisodeInfo?.seasonNumber]);

  const activeSeason = useMemo(() => {
    return seasonsList.find((s) => s.season_number === selectedSeasonNumber) || seasonsList[0];
  }, [seasonsList, selectedSeasonNumber]);

  const episodesText = useMemo(() => {
    if (!activeSeason) return '';
    return `${activeSeason.episode_count} ${t('library.details.episodes') || 'Episodes'}`;
  }, [activeSeason, t]);

  // Load season detail (episodes) progressive loading
  useEffect(() => {
    if (!item?.progressive_seasons || !activeSeason) return;
    if (activeSeason.episodes_complete !== false) return;

    let cancelled = false;
    const run = async () => {
      try {
        const seasonPayload = await fetchLibraryTvSeasonDetail(queryClient, cleanId, activeSeason.season_number);
        if (cancelled) return;

        const updateDetailWithSeason = (current) => {
          if (!current || !seasonPayload) return current;
          const existingSeasons = Array.isArray(current.seasons) ? current.seasons : [];
          const nextMap = new Map(existingSeasons.map((season) => [Number(season?.season_number), season]));
          const currentSeason = nextMap.get(Number(seasonPayload.season_number)) || {};
          nextMap.set(Number(seasonPayload.season_number), {
            ...currentSeason,
            ...seasonPayload,
            episodes_complete: true,
          });
          return {
            ...current,
            seasons: Array.from(nextMap.values()).sort(
              (a, b) => Number(a?.season_number || 0) - Number(b?.season_number || 0)
            ),
          };
        };

        for (const variantId of getEntityIdVariants(cleanId)) {
          queryClient.setQueryData([...QK.libraryTvDetail, variantId, metadataLanguage], updateDetailWithSeason);
          queryClient.setQueryData([...QK.libraryTvDetail, variantId, null], updateDetailWithSeason);
        }

        queryClient.setQueriesData({ queryKey: QK.libraryTvDetail }, updateDetailWithSeason);
      } catch (err) {
        console.error('Failed to load TV season detail:', err);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [activeSeason, cleanId, item?.progressive_seasons, queryClient, metadataLanguage]);

  const episodes = useMemo(() => activeSeason?.episodes || [], [activeSeason?.episodes]);
  const isLoadingEpisodes =
    activeSeason?.episodes_complete === false && (!activeSeason?.episodes || activeSeason.episodes.length === 0);

  const [userSelectedEpisodeId, setUserSelectedEpisodeId] = useState(null);

  const selectedEpisodeId = useMemo(() => {
    if (episodes.length === 0) return null;
    if (userSelectedEpisodeId && episodes.some((ep) => ep.id === userSelectedEpisodeId)) {
      return userSelectedEpisodeId;
    }
    const nextUpEp = episodes.find((ep) => ep.id === nextEpisodeInfo?.episode?.id);
    if (nextEpisodeInfo?.seasonNumber === selectedSeasonNumber && nextUpEp) {
      return nextUpEp.id;
    }
    return episodes[0]?.id ?? null;
  }, [episodes, userSelectedEpisodeId, nextEpisodeInfo, selectedSeasonNumber]);

  const setSelectedEpisodeId = setUserSelectedEpisodeId;

  const activeEpisodeIndex = useMemo(() => {
    return episodes.findIndex((ep) => ep.id === selectedEpisodeId);
  }, [episodes, selectedEpisodeId]);

  const activeEpisode = episodes[activeEpisodeIndex];

  // Carousel scroll refs
  const seasonsScrollRef = useRef(null);
  const episodesScrollRef = useRef(null);

  // Episode stepping
  const stepEpisode = useCallback((direction) => {
    if (episodes.length === 0) return;
    const nextIndex = activeEpisodeIndex + (direction === 'left' ? -1 : 1);
    if (nextIndex >= 0 && nextIndex < episodes.length) {
      setSelectedEpisodeId(episodes[nextIndex].id);
      // Auto-scroll pill into view
      setTimeout(() => {
        const activePill = episodesScrollRef.current?.querySelector(`[data-active-episode="true"]`);
        if (activePill && episodesScrollRef.current) {
          activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }, 50);
    }
  }, [activeEpisodeIndex, episodes, setSelectedEpisodeId]);

  const isThisSeasonWatched = useCallback((season) => {
    if (!season) return false;
    if (Array.isArray(season.episodes) && season.episodes.length > 0) {
      return season.episodes.every((ep) => ep.is_watched);
    }
    return Boolean(season.is_watched);
  }, []);

  const isSeasonWatched = useMemo(() => {
    if (!activeSeason) return false;
    if (episodes.length > 0) {
      return episodes.every((ep) => ep.is_watched);
    }
    return isThisSeasonWatched(activeSeason);
  }, [episodes, activeSeason, isThisSeasonWatched]);

  const isSeasonPartiallyWatched = useMemo(() => {
    if (!activeSeason) return false;
    if (episodes.length > 0) {
      return episodes.some((ep) => ep.is_watched) && !isSeasonWatched;
    }
    return false;
  }, [episodes, isSeasonWatched, activeSeason]);

  const handleSeasonWatchedToggle = useCallback((e) => {
    e.stopPropagation();
    if (!activeSeason) return;
    const targetState = !isSeasonWatched;
    const episodeIds = episodes.map((ep) => ep.id);
    const seasonCompoundId = `tmdb_${cleanId}_s${activeSeason.season_number}`;
    const targetIds = Array.from(new Set([seasonCompoundId, `s${activeSeason.season_number}`, ...episodeIds]));

    bulkUpdateWatchedMutation.mutate({
      itemIds: targetIds,
      isWatched: targetState,
      tvId: cleanId,
      mediaType: 'season',
    });
  }, [activeSeason, isSeasonWatched, episodes, cleanId, bulkUpdateWatchedMutation]);

  const handleSelectSeason = useCallback((seasonNumber) => {
    userSelectedSeasonRef.current = true;
    setSelectedSeasonNumber(seasonNumber);
  }, []);

  return {
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
  };
}
