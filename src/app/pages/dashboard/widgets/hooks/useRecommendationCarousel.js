import { useCallback, useMemo, createElement } from 'react';
import { Play, Download } from '@/ui/icons';
import { useLibraryModeStore } from '@/stores/useLibraryModeStore';
import { resolveMediaImageUrl, buildImageProxyUrl } from '@/lib/imageUrls';
import { normalizeMediaEntity, formatReleaseDate, resolveTitle, resolveMediaType } from '@/lib/normalizeMediaEntity';
import { normalizeMediaType } from '@/lib/mediaTypes';
import { useTranslation } from '@/providers/LanguageContext';
import { useTorrentModal } from '@/hooks/useTorrentModal';

export function useRecommendationCarousel({
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
  showWatchlist = true,
}) {
  const { t: T } = useTranslation();
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const { torrentEnabled, openTorrentModal } = useTorrentModal();

  const handleScroll = useCallback((e) => {
    const element = e.currentTarget;
    if (!element) return;
    const isNearEnd = element.scrollLeft >= element.scrollWidth - element.clientWidth - 150;

    if (isNearEnd && hasMore && !isLoadingMore && onLoadMore) {
      onLoadMore();
    }
  }, [hasMore, isLoadingMore, onLoadMore]);

  const isLandscape = isAdultCarousel || items[0]?.media_type === 'scene' || items[0]?.type === 'scene';

  const carouselItems = useMemo(() => {
    return items.map((item) => {
      const n = normalizeMediaEntity(item, {
        context: 'recommendations',
        settings,
        sessionMode,
        isAdultContext: isAdultCarousel,
      });

      const watchlistId = n.isScene ? item.id : (item.tmdb_id || item.tv_tmdb_id || item.id);
      const isWatchlisted = watchlistIds.includes(watchlistId);

      const rawPosterUrl = n.isStudio
        ? (item.logo_path ? resolveMediaImageUrl(item.logo_path, 'logo') : '')
        : (n.isPerson
          ? resolveMediaImageUrl(item.profile_path || item.local_profile_path, 'personThumb')
          : resolveMediaImageUrl(n.isScene ? (item.backdrop_path || item.poster_path) : item.poster_path, n.isScene ? 'backdrop' : 'poster'));

      const posterUrl = (() => {
        if (!rawPosterUrl) return '';
        if (n.isScene && !rawPosterUrl.startsWith('http://') && !rawPosterUrl.startsWith('https://')) {
          return buildImageProxyUrl(rawPosterUrl, { width: 600 });
        }
        return rawPosterUrl;
      })();

      const yearLabel = n.subtitle;
      const performers = n.performers;
      const displayDate = formatReleaseDate(item);

      let roleLabel = null;
      if (n.isPerson) {
        const dept = item.known_for_department || (item.is_adult ? 'performer' : 'artist');
        roleLabel = T(`dynamic.roles.${dept.toLowerCase()}`, { defaultValue: dept }) || dept;
      }

      let subtitle = null;
      if (n.isPerson) {
        subtitle = roleLabel;
      } else if (!n.isScene) {
        subtitle = yearLabel;
      }

      const canPlay = !n.isPerson && !n.isStudio && item.in_library && onPlayClick;
      const canDownload = !n.isPerson && !n.isStudio && !item.in_library && torrentEnabled;

      let playOverlay = null;
      if (canPlay) {
        playOverlay = {
          title: null,
          onClick: (e) => {
            e.stopPropagation();
            onPlayClick(item);
          },
          pending: playMutationPending,
          icon: createElement(Play, { size: 16, fill: 'currentColor' }),
        };
      } else if (canDownload) {
        playOverlay = {
          title: null,
          onClick: (e) => {
            e.stopPropagation();
            openTorrentModal({
              title: resolveTitle(item),
              mediaType: resolveMediaType(item),
              provider: item.provider || (n.isScene ? 'stashdb' : 'tmdb'),
              externalId: item.tmdb_id || item.stashdb_id || item.id,
              isAdult: Boolean(isAdultCarousel || item.is_adult),
            });
          },
          icon: createElement(Download, { size: 18 }),
          label: T('common.download') || 'Download',
        };
      }

      const showWatchlistButton = !n.isPerson && !n.isStudio && showWatchlist && onWatchlist;

      const handleWatchlistClick = (e) => {
        e.stopPropagation();
        e.currentTarget.blur();
        const rawType = resolveMediaType(item);
        const type = normalizeMediaType(rawType) === 'scene' ? 'scene' : rawType;
        onWatchlist(item, type);
      };

      const handleCardClick = () => {
        if (onCardClick) {
          onCardClick(item);
        }
      };

      return {
        id: item.id,
        key: `${item.id}-${item.media_type || item.type || 'media'}`,
        size: (n.isScene || n.isStudio) ? 'scene' : 'default',
        aspect: n.isStudio ? 'logo' : (n.isScene ? 'landscape' : 'poster'),
        imageUrl: posterUrl,
        isWatched: n.isStudio ? false : item.is_watched,
        title: resolveTitle(item),
        subtitle,
        performers: n.isScene ? performers : null,
        date: n.isScene ? displayDate : null,
        ratingImdb: n.isStudio ? undefined : n.ratingImdb,
        ratingTmdb: n.isStudio ? undefined : n.ratingTmdb,
        userRating: Number(item?.user_rating) || 0,
        isFavorite: !!item?.is_favorite,
        isWatchlisted,
        showWatchlistButton,
        playOverlay,
        handleCardClick,
        handleWatchlistClick,
      };
    });
  }, [
    items,
    settings,
    sessionMode,
    isAdultCarousel,
    watchlistIds,
    T,
    onPlayClick,
    playMutationPending,
    torrentEnabled,
    openTorrentModal,
    showWatchlist,
    onWatchlist,
    onCardClick,
  ]);

  return {
    T,
    handleScroll,
    isLandscape,
    carouselItems,
  };
}

export default useRecommendationCarousel;
