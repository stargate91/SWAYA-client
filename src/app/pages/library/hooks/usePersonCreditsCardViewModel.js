import { useMemo } from 'react';
import { resolveDetailsImageUrl } from '@/lib/imageUrls';
import { API_BASE } from '@/lib/backend';
import { getCreditSource, navigateToCreditDetail } from '@/lib/routes';
import { normalizeMediaEntity } from '@/lib/normalizeMediaEntity';
import { formatReleaseDate, formatTvAirYearRange, formatYear } from '@/lib/formatters';

export function usePersonCreditsCardViewModel({
  item,
  mediaType,
  navigate,
  playMutation,
  t,
  showLibraryBadge = false,
  showPlayOverlay = true,
  settings,
  sortBy,
  torrentEnabled = false,
  openTorrentModal,
}) {
  return useMemo(() => {
    const resolvedSource = getCreditSource(item);
    const n = normalizeMediaEntity(item, { context: 'credits', settings, provider: resolvedSource });
    const creditTitle = n.title;

    const isScene = mediaType === 'scenes' || String(mediaType || '').includes('scene');
    const posterPath = isScene
      ? (item.still_path || item.local_still_path || item.backdrop_path || item.local_backdrop_path || item.poster_path || item.local_poster_path)
      : (item.poster_path || item.local_poster_path || item.still_path || item.local_still_path || item.backdrop_path || item.local_backdrop_path);
    const posterUrl = posterPath ? resolveDetailsImageUrl(posterPath, API_BASE, isScene ? 'backdrop' : 'poster') : null;

    const itemType = item.media_type || item.type;
    const isSceneOrThePornDbMovie = (itemType === 'scene' || itemType === 'scenes') || resolvedSource === 'theporndb';
    const isTvItem = itemType === 'tv' || itemType === 'tvshows';

    const getYearRange = () => {
      if (sortBy === 'release_date') {
        const formatted = formatReleaseDate(item);
        if (formatted) return formatted;
      }
      if (isTvItem || item.media_type === 'tv' || item.type === 'tv') {
        return formatTvAirYearRange(item);
      }
      return formatYear(item);
    };

    const cleanCharacter = item.character && !['actor', 'cast'].includes(item.character.toLowerCase())
      ? item.character
      : '';

    const cleanJob = item.job && !['actor', 'cast'].includes(item.job.toLowerCase())
      ? item.job
      : '';

    const displayRole = cleanCharacter ? `as ${cleanCharacter}` : cleanJob;

    let subtitleText;
    let hoverSubtitleText = '';
    let showRatings = true;
    let sceneDateText = '';

    if (isSceneOrThePornDbMovie && isScene) {
      sceneDateText = formatReleaseDate(item);
      subtitleText = '';
      showRatings = false;
    } else if (resolvedSource === 'tmdb') {
      subtitleText = getYearRange();
      hoverSubtitleText = displayRole;
    } else {
      const isMovie = mediaType === 'movies' || itemType === 'movie' || itemType === 'movies' || item.media_type === 'movie';
      subtitleText = isMovie
        ? formatYear(item)
        : formatReleaseDate(item);
    }

    const isLibraryBadgeVisible = Boolean(showLibraryBadge && item.in_library);
    const inLibraryBadgeTitle = t?.('library.details.inLibrary') || 'Have';

    let playOverlay = null;
    if (showPlayOverlay && item.in_library && !isTvItem) {
      playOverlay = {
        type: 'play',
        label: 'Play',
        onClick: (e) => {
          e.stopPropagation();
          playMutation?.mutate(item.library_item_id || item.id);
        },
      };
    } else if (!item.in_library && torrentEnabled && openTorrentModal) {
      playOverlay = {
        type: 'download',
        label: t?.('common.download') || 'Download',
        onClick: (e) => {
          e.stopPropagation();
          openTorrentModal({
            title: creditTitle,
            mediaType: item.media_type || mediaType || 'movie',
            provider: resolvedSource || 'tmdb',
            externalId: item.tmdb_id || item.stashdb_id || item.theporndb_id || item.id,
            isAdult: Boolean(item.is_adult || (resolvedSource && resolvedSource !== 'tmdb')),
          });
        },
      };
    }

    const handleCardClick = () => {
      navigateToCreditDetail(navigate, item, mediaType, resolvedSource);
    };

    return {
      creditTitle,
      posterUrl,
      aspect: isScene ? 'landscape' : 'poster',
      subtitleText: subtitleText || undefined,
      hoverSubtitleText: hoverSubtitleText || undefined,
      ratingImdb: showRatings ? n.ratingImdb : undefined,
      ratingTmdb: showRatings ? n.ratingTmdb : undefined,
      ratingTheporndb: showRatings ? n.ratingTheporndb : undefined,
      performers: (resolvedSource === 'theporndb' && !isScene) ? undefined : n.performers,
      dateText: isScene ? (sceneDateText || undefined) : undefined,
      isLibraryBadgeVisible,
      inLibraryBadgeTitle,
      playOverlay,
      handleCardClick,
    };
  }, [
    item,
    mediaType,
    navigate,
    playMutation,
    t,
    showLibraryBadge,
    showPlayOverlay,
    settings,
    sortBy,
    torrentEnabled,
    openTorrentModal,
  ]);
}
