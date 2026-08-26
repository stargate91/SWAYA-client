import { useState, useEffect, useRef, useMemo, useCallback, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download } from '@/ui/icons';
import { useSettingsQuery } from '@/queries/settingsQueries';
import {
  useRecommendationsQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
  useDiscoverQuery,
} from '@/queries/dashboardQueries';
import { useTranslation } from '@/providers/LanguageContext';
import { useTorrentModal } from '@/hooks/useTorrentModal';
import { useWatchlistHandler } from './useWatchlistHandler';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { ROUTES } from '@/lib/routes';

export const GENRES = [
  { value: '', label: 'All Genres' },
  { value: 28, label: 'Action' },
  { value: 12, label: 'Adventure' },
  { value: 16, label: 'Animation' },
  { value: 35, label: 'Comedy' },
  { value: 80, label: 'Crime' },
  { value: 99, label: 'Documentary' },
  { value: 18, label: 'Drama' },
  { value: 10751, label: 'Family' },
  { value: 14, label: 'Fantasy' },
  { value: 36, label: 'History' },
  { value: 27, label: 'Horror' },
  { value: 10402, label: 'Music' },
  { value: 9648, label: 'Mystery' },
  { value: 10749, label: 'Romance' },
  { value: 878, label: 'Sci-Fi' },
  { value: 53, label: 'Thriller' },
  { value: 10752, label: 'War' },
  { value: 37, label: 'Western' },
];

export const YEARS = (() => {
  const currentYear = new Date().getFullYear();
  const list = [{ value: '', label: 'All Time' }];
  for (let y = currentYear; y >= 1950; y--) {
    list.push({ value: y, label: String(y) });
  }
  return list;
})();

export default function useTMDBDiscovery() {
  const { t: T } = useTranslation();
  const navigate = useNavigate();
  const [genreId, setGenreId] = useState('');
  const [year, setYear] = useState('');

  const scrollRef = useRef(null);
  const { torrentEnabled, openTorrentModal } = useTorrentModal();

  const { data: settings = {} } = useSettingsQuery();
  const includeAdult = settings?.include_adult;
  const language = settings?.primary_metadata_language;
  const adultTagBlacklist = settings?.adult_tag_blacklist;

  const { data: recommendations } = useRecommendationsQuery(language, includeAdult, adultTagBlacklist);
  const watchlistIdsFromQuery = recommendations?.watchlist_item_ids;

  const addToWatchlistMutation = useAddToWatchlistMutation();
  const removeFromWatchlistMutation = useRemoveFromWatchlistMutation();

  const { actualWatchlistIds, handleWatchlist } = useWatchlistHandler(
    watchlistIdsFromQuery,
    addToWatchlistMutation,
    removeFromWatchlistMutation
  );

  const { data: rawItems = [], isLoading: loading } = useDiscoverQuery(genreId, year);
  const items = useMemo(() => {
    return (rawItems || []).filter((item) => Boolean(item?.poster_path || item?.poster || item?.image_url));
  }, [rawItems]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [genreId, year, items]);

  const handleCardClick = useCallback((item) => {
    const type = item.media_type || 'movie';
    const idToUse = item.in_library ? item.media_item_id : `tmdb_${item.id}`;
    navigate(ROUTES.MEDIA_DETAIL(type, idToUse), { state: { allowAdult: true } });
  }, [navigate]);

  const translatedGenres = useMemo(() => {
    return GENRES.map((g) => ({
      value: g.value,
      label: g.value === '' ? (T('dashboard.recommendations.genres_all') || 'All Genres') : (T(`dynamic.genres.${g.label}`, { defaultValue: g.label }) || g.label),
    }));
  }, [T]);

  const translatedYears = useMemo(() => {
    return YEARS.map((y) => ({
      value: y.value,
      label: y.value === '' ? (T('dashboard.recommendations.years_all') || 'All Time') : y.label,
    }));
  }, [T]);

  const discoveryItems = useMemo(() => {
    return items.map((item) => {
      const posterUrl = resolveMediaImageUrl(item.poster_path, 'poster');
      const watchlistId = item.tmdb_id || item.tv_tmdb_id || item.id;
      const isWatchlisted = actualWatchlistIds.includes(watchlistId);
      const ratingImdb = item.rating_imdb;
      const ratingTmdb = item.rating_tmdb || item.vote_average;
      const yearLabel = item.release_date ? String(new Date(item.release_date).getFullYear()) : null;

      const downloadOverlay = torrentEnabled ? {
        onClick: (e) => {
          e.stopPropagation();
          openTorrentModal({
            title: item.title || item.name,
            mediaType: item.media_type || 'movie',
            provider: 'tmdb',
            externalId: item.tmdb_id || item.id,
            isAdult: Boolean(item.is_adult),
          });
        },
        icon: createElement(Download, { size: 18 }),
        label: T('common.download') || 'Download',
      } : null;

      const handleToggleWatchlist = (e) => {
        e.stopPropagation();
        e.currentTarget?.blur?.();
        const type = item.media_type || 'movie';
        handleWatchlist(item, type);
      };

      return {
        key: `${item.id}-${item.media_type || 'movie'}`,
        item,
        posterUrl,
        title: item.title,
        subtitle: yearLabel,
        ratingImdb,
        ratingTmdb,
        isWatchlisted,
        playOverlay: downloadOverlay,
        handleCardClick: () => handleCardClick(item),
        handleToggleWatchlist,
      };
    });
  }, [items, actualWatchlistIds, torrentEnabled, openTorrentModal, handleWatchlist, handleCardClick, T]);

  return {
    T,
    genreId,
    setGenreId,
    year,
    setYear,
    scrollRef,
    items,
    discoveryItems,
    loading,
    actualWatchlistIds,
    handleWatchlist,
    handleCardClick,
    translatedGenres,
    translatedYears,
  };
}

