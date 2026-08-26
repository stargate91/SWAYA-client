import { useState, useEffect, useRef, useMemo, useCallback, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@/providers/LanguageContext';
import {
  useLibraryItemDetailQuery,
  useLibraryTvDetailQuery,
  useActiveSessionsQuery,
  fetchLibraryItemDetail,
  fetchLibraryTvSeasonDetail,
} from '@/queries/metadataQueries';
import { useSettingsQuery } from '@/queries/settingsQueries';
import { QK } from '@/lib/queryKeys';
import { isMovieMediaType, isSceneMediaType } from '@/lib/mediaTypes';
import { isElectron, openMpvFullscreen } from '@/lib/ipc';
import { stripEntityPrefix, getEntityIdVariants } from '@/lib/entityIds';
import { normalizeMediaDetail } from '@/lib/normalizeMediaEntity';
import { getYoutubeWatchUrl } from '@/lib/externalLinks';
import { ROUTES } from '@/lib/routes';

import { usePlaybackStore } from '@/stores/usePlaybackStore';
import { useMediaMutations } from './useMediaMutations';
import { useMediaDetailTabs } from './useMediaDetailTabs';
import { useUi } from '@/providers/UiProvider';
import TrailerModalContent from '../components/detail/TrailerModalContent';

export default function useMediaDetail({ id, type, t }) {
  const { openModal } = useUi();
  const normalizedId = id == null ? '' : String(id);
  const cleanId = stripEntityPrefix(normalizedId);
  const isMovie = isMovieMediaType(type);
  const isSceneMedia = isSceneMediaType(type);
  const isSingleItem = isMovie || isSceneMedia;

  const [expandedSeasons, setExpandedSeasons] = useState({ 1: true });
  const [isWatchLogsExpanded, setIsWatchLogsExpanded] = useState(false);
  const [editingReviewItem, setEditingReviewItem] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [isTruncated, setIsTruncated] = useState(false);

  const overviewRef = useRef(null);
  const fullPeoplePrefetchRef = useRef(new Set());
  const unownedSeasonPrefetchRef = useRef(new Set());
  const queryClient = useQueryClient();

  const {
    updateStatusMutation,
    overrideBackdropMutation,
    toggleTrackedMutation,
    addPeakMutation,
    deletePeakMutation,
    playMutation,
    bulkUpdateWatchedMutation,
    deleteLibraryItemMutation
  } = useMediaMutations();

  // Poll active sessions list every 5 seconds
  const { data: activeSessions = [] } = useActiveSessionsQuery({
    refetchInterval: 5000,
  });

  const { locale } = useTranslation();
  const metadataLanguage = locale === 'en' ? 'en-US' : locale;

  const playbackStoreActive = usePlaybackStore((s) => s.active && (String(s.itemId) === String(cleanId) || String(s.itemId) === String(normalizedId)));

  const isPlaying = useMemo(() => {
    if (playbackStoreActive) return true;
    if (!Array.isArray(activeSessions) || activeSessions.length === 0) return false;
    return activeSessions.some(sessionId => {
      const parsedId = stripEntityPrefix(String(sessionId));
      return parsedId === cleanId || parsedId === normalizedId;
    });
  }, [playbackStoreActive, activeSessions, cleanId, normalizedId]);

  const { data: movieDetail, isLoading: isMovieLoading } = useLibraryItemDetailQuery(normalizedId, {
    enabled: isSingleItem,
    mediaType: type,
    refetchInterval: (isSingleItem && isPlaying) ? 5000 : false,
  });

  const { data: tvDetail, isLoading: isTvLoading } = useLibraryTvDetailQuery(cleanId, {
    enabled: !isSingleItem,
    seasonsLimit: 1,
    initialEpisodesLimit: 4,
    language: metadataLanguage,
    refetchInterval: (!isSingleItem && isPlaying) ? 5000 : false,
  });

  const item = isSingleItem ? movieDetail : tvDetail;
  const isLoading = isSingleItem ? isMovieLoading : isTvLoading;
  const effectiveId = item?.library_item_id || item?.id || normalizedId;
  const { data: settings } = useSettingsQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && item && item.is_adult && !settings?.include_adult) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isLoading, item, settings, navigate]);

  const { activePanel, isSideNavVisible, togglePanel, handleToggleSideNav } = useMediaDetailTabs(type, item);

  const normalized = useMemo(() => {
    if (!item) return null;
    return normalizeMediaDetail(item, {
      mediaType: type,
      settings,
      t
    });
  }, [item, type, settings, t]);

  const trackedExternalId = item?.tmdb_id || item?.tv_tmdb_id || cleanId || item?.id || normalizedId;
  const trackedMediaType = isMovie ? 'movie' : (isSceneMedia ? (type || 'scene') : 'tv');

  const prefetchTvSeason = (seasonNumber) => {
    if (!cleanId || isMovie || !seasonNumber) return;
    queryClient.prefetchQuery({
      queryKey: QK.metadata.libraryTvSeason(cleanId, seasonNumber, metadataLanguage),
      queryFn: () => fetchLibraryTvSeasonDetail(queryClient, cleanId, seasonNumber),
      staleTime: 60000,
    });
  };

  const prefetchRelatedPeople = (personId) => {
    const rawId = String(personId || '');
    if (!rawId) return;

    if (fullPeoplePrefetchRef.current.has(rawId)) {
      return;
    }
    fullPeoplePrefetchRef.current.add(rawId);

    const variants = getEntityIdVariants(rawId, 'person');
    variants.forEach((candidateId) => {
      queryClient.prefetchQuery({
        queryKey: QK.metadata.libraryItem(candidateId),
        queryFn: () => fetchLibraryItemDetail(queryClient, candidateId),
        staleTime: 60000,
      });
    });
  };

  const prefetchRelatedSeason = (tvId, seasonNumber) => {
    const rawId = String(tvId || '');
    if (!rawId || seasonNumber == null) return;

    const cacheKey = `${rawId}_s${seasonNumber}`;
    if (unownedSeasonPrefetchRef.current.has(cacheKey)) {
      return;
    }
    unownedSeasonPrefetchRef.current.add(cacheKey);

    const clean = stripEntityPrefix(rawId);
    if (!clean) return;

    queryClient.prefetchQuery({
      queryKey: QK.metadata.libraryTvSeason(clean, seasonNumber, metadataLanguage),
      queryFn: () => fetchLibraryTvSeasonDetail(queryClient, clean, seasonNumber),
      staleTime: 60000,
    });
  };

  const toggleSeason = (seasonNumber) => {
    setExpandedSeasons((prev) => {
      const willExpand = !prev[seasonNumber];
      if (willExpand) {
        prefetchTvSeason(seasonNumber);
      }
      return {
        ...prev,
        [seasonNumber]: willExpand
      };
    });
  };

  const handleRatingChange = (newRating) => {
    updateStatusMutation.mutate({
      itemId: effectiveId,
      tvId: cleanId,
      payload: {
        user_rating: newRating,
        media_type: type
      }
    });
  };

  const currentRating = item?.user_rating ?? 0;
  const isOwned = Boolean(item?.in_library);
  const isTracked = Boolean(item?.is_tracked);
  const canToggleTracked = Boolean(!isOwned && (item?.tmdb_id || item?.tv_tmdb_id || cleanId || item?.id || normalizedId));

  const isScene = isSceneMedia;
  const title = normalized?.title || '';
  const originalTitle = normalized?.originalTitle || '';
  const showOriginalTitle = normalized?.showOriginalTitle || false;
  const tagline = normalized?.tagline || '';
  const taglineText = normalized?.taglineText || '';
  const metaDate = normalized?.metaDate || '';
  const formattedDuration = normalized?.formattedDuration || '';
  const seasonsText = normalized?.seasonsText || '';
  const episodesText = normalized?.episodesText || '';
  const langText = normalized?.langText || '';
  const verticalBarText = normalized?.verticalBarText || '';

  const showImdb = normalized?.showImdb || false;
  const ratingImdb = normalized?.ratingImdb || '';
  const showTmdb = normalized?.showTmdb || false;
  const ratingTmdb = normalized?.ratingTmdb || '';
  const showTheporndb = normalized?.showTheporndb || false;
  const ratingTheporndb = normalized?.ratingTheporndb || '';

  const normalizedGenres = normalized?.normalizedGenres || [];
  const overview = normalized?.overview || '';
  const hasTechnicalPanel = normalized?.hasTechnicalPanel || false;

  const getIsTvWatched = () => {
    if (!item?.seasons) return Boolean(item?.is_watched);
    const validSeasons = item.seasons.filter((s) => s.season_number > 0);
    const regularEpisodes = validSeasons.flatMap((s) => s.episodes || []).filter((e) => e.path && !e.is_missing);
    if (regularEpisodes.length === 0) return Boolean(item?.is_watched);
    return regularEpisodes.every((e) => e.is_watched);
  };

  const isWatched = (isMovie || isScene) ? Boolean(item?.is_watched || item?.overrides?.is_watched) : getIsTvWatched();

  const canToggleWatched = (isMovie || isScene)
    ? Boolean(item)
    : Boolean(
      item?.in_library ||
      item?.next_episode ||
      item?.seasons
        ?.filter((season) => season.season_number > 0)
        .some((season) => (season.episodes || []).length > 0)
    );

  const getNextEpisodeInfo = () => {
    if (item?.next_episode && !item.next_episode.is_watched) {
      return {
        episode: item.next_episode,
        seasonNumber: item.next_episode.season_number
      };
    }
    if (!item?.seasons) return null;
    for (const season of item.seasons) {
      const sNum = season.season_number;
      const ownedEpisodes = (season.episodes || []).filter(e => e.path && !e.is_missing);
      const inProgress = ownedEpisodes.find(e => e.resume_position > 0 && !e.is_watched);
      if (inProgress) {
        return { episode: inProgress, seasonNumber: sNum };
      }
    }
    for (const season of item.seasons) {
      const sNum = season.season_number;
      const ownedEpisodes = (season.episodes || []).filter(e => e.path && !e.is_missing);
      const unwatched = ownedEpisodes.find(e => !e.is_watched);
      if (unwatched) {
        return { episode: unwatched, seasonNumber: sNum };
      }
    }
    for (const season of item.seasons) {
      const sNum = season.season_number;
      const ownedEpisodes = (season.episodes || []).filter(e => e.path && !e.is_missing);
      if (ownedEpisodes.length > 0) {
        return { episode: ownedEpisodes[0], seasonNumber: sNum };
      }
    }
    return null;
  };
  const nextEpisodeInfo = !isMovie ? getNextEpisodeInfo() : null;

  const handleTrailerClick = () => {
    if (!item?.trailer_key) return;

    const isFullUrl = item.trailer_key.startsWith('http://') || item.trailer_key.startsWith('https://') || item.trailer_key.includes('://');
    const trailerUrl = isFullUrl ? item.trailer_key : getYoutubeWatchUrl(item.trailer_key);
    const trailerSuffix = ` - ${t('library.details.trailer') || 'Trailer'}`;
    if (isElectron) {
      openMpvFullscreen({
        url: trailerUrl,
        title: `${title}${trailerSuffix}`
      });
    } else {
      openModal({
        title: `${title}${trailerSuffix}`,
        variant: 'theater',
        width: 'xl',
        content: createElement(TrailerModalContent, {
          trailerKey: item.trailer_key,
          isFullUrl
        })
      });
    }
  };

  const handlePlayClick = () => {
    const targetId = (isMovie || isScene) ? item.id : nextEpisodeInfo?.episode.id;
    if (!targetId) return;
    playMutation.mutate(targetId);
  };

  const handleToggleWatched = () => {
    if (isMovie || isScene) {
      updateStatusMutation.mutate({
        itemId: effectiveId,
        tvId: cleanId,
        payload: {
          is_watched: !item?.is_watched,
          media_type: type
        }
      });
    } else {
      if (!cleanId) return;
      const regularSeasons = (item?.seasons || []).filter(s => s.season_number > 0);
      const seasonCompoundIds = regularSeasons.map(s => `tmdb_${cleanId}_s${s.season_number}`);
      const episodes = regularSeasons.flatMap(s => s.episodes || []);
      const episodeIds = episodes.map(e => e.id);
      const targetIds = Array.from(new Set([
        cleanId,
        `tmdb_${cleanId}`,
        `tv_${cleanId}`,
        ...seasonCompoundIds,
        ...episodeIds
      ]));
      bulkUpdateWatchedMutation.mutate({
        itemIds: targetIds,
        isWatched: !isWatched,
        tvId: cleanId,
        mediaType: 'tv',
      });
    }
  };

  const handleToggleTracked = () => {
    if (!canToggleTracked || toggleTrackedMutation.isPending) {
      return;
    }
    toggleTrackedMutation.mutate({
      tmdbId: trackedExternalId,
      mediaType: trackedMediaType,
      isTracked,
    });
  };

  useEffect(() => {
    if (overviewRef.current) {
      const el = overviewRef.current;
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [overview, isLoading]);

  const backdropUrl = normalized?.backdropUrl || '';
  const logoUrl = normalized?.logoUrl || '';
  const posterUrl = normalized?.posterUrl || '';
  const studioName = normalized?.studioName || '';
  const networkName = normalized?.networkName || '';

  const showStudioPill = false;
  const showNetworkPill = false;

  const handleOpenReviewModal = useCallback(() => {
    if (!item) return;
    setEditingReviewItem(item);
    setReviewText(item.user_comment || '');
  }, [item]);

  const handleSaveReview = useCallback(() => {
    if (!effectiveId) return;
    updateStatusMutation.mutate({
      itemId: effectiveId,
      tvId: cleanId,
      payload: {
        user_comment: reviewText || null,
        media_type: type,
      },
    });
    setEditingReviewItem(null);
  }, [effectiveId, cleanId, type, reviewText, updateStatusMutation]);

  return {
    state: {
      showStudioPill,
      showNetworkPill,
      studioName,
      networkName,
      activePanel,
      expandedSeasons,
      isSideNavVisible,
      isWatchLogsExpanded,
      editingReviewItem,
      reviewText,
      isTruncated,
      overviewRef,
      currentRating,
      verticalBarText,
      title,
      originalTitle,
      showOriginalTitle,
      tagline,
      taglineText,
      metaDate,
      formattedDuration,
      seasonsText,
      episodesText,
      langText,
      showImdb,
      ratingImdb,
      showTmdb,
      ratingTmdb,
      showTheporndb,
      ratingTheporndb,
      normalizedGenres,
      overview,
      hasTechnicalPanel,
      isMovie,
      isScene,
      isOwned,
      isTracked,
      canToggleTracked,
      isWatched,
      canToggleWatched,
      nextEpisodeInfo,
      backdropUrl,
      logoUrl,
      posterUrl,
      item,
      isLoading,
      settings,
      cleanId,
      effectiveId,
      type
    },
    actions: {
      togglePanel,
      handleToggleSideNav,
      toggleSeason,
      handleRatingChange,
      handleTrailerClick,
      handlePlayClick,
      handleToggleWatched,
      handleToggleTracked,
      setIsWatchLogsExpanded,
      setEditingReviewItem,
      setReviewText,
      handleOpenReviewModal,
      handleSaveReview,
      prefetchRelatedPeople,
      prefetchRelatedSeason
    },
    mutations: {
      updateStatusMutation,
      overrideBackdropMutation,
      toggleTrackedMutation,
      playMutation,
      bulkUpdateWatchedMutation,
      addPeakMutation,
      deletePeakMutation,
      deleteLibraryItemMutation
    }
  };
}
