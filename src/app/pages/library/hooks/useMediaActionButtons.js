import { useMediaDetailContext } from '../components/detail/MediaDetailContext';
import useListManagement from './useListManagement';
import { useMediaActionModals } from './useMediaActionModals';
import { useUi } from '@/providers/UiProvider';
import { ROUTES } from '@/lib/routes';
import { formatEpisodeNumber } from '@/lib/formatters';

export function useMediaActionButtons() {
  const { state, actions, mutations, t, navigate, setIsDrawerOpen } = useMediaDetailContext();
  const {
    isOwned,
    isMovie,
    isScene,
    item,
    isTracked,
    canToggleTracked,
    isWatched,
    canToggleWatched,
    nextEpisodeInfo,
    cleanId,
    effectiveId,
    settings,
    type: detailType,
  } = state;

  const type = isMovie
    ? 'movie'
    : isScene
      ? (detailType || item?.type || 'scene')
      : 'tv';

  const { watchlist, isWatchlistAdded, handleToggleList } = useListManagement({ item, type });

  const {
    handleTrailerClick,
    handleToggleWatched,
    handleToggleTracked,
    handlePlayClick,
  } = actions;

  const {
    updateStatusMutation,
    bulkUpdateWatchedMutation,
    toggleTrackedMutation,
    playMutation,
    addPeakMutation,
  } = mutations;

  const hasCollection = Boolean(isMovie && item?.collection_data);
  const hasTrailer = Boolean(item?.trailer_key);
  const torrentEnabled = Boolean(settings?.torrent_enabled);

  const { openModal, closeModal } = useUi();
  const { handleOpenTorrentSearch } = useMediaActionModals({
    cleanId,
    item,
    type,
    t,
    openModal,
    closeModal,
  });

  const showDownload = !isOwned && torrentEnabled;
  const showCollection = hasCollection;
  const showTrailer = hasTrailer;
  const showWatchlist = Boolean(watchlist);
  const showWatched = canToggleWatched;
  const showTracked = canToggleTracked;
  const showDetails = !isScene && !(isMovie && !isOwned) && Boolean(item?.extras?.length > 0 || item?.technical);
  const showAddPeak = Boolean(isOwned && item?.is_adult && (isMovie || isScene));
  const showPlay = Boolean(isOwned && (isMovie || isScene || nextEpisodeInfo));

  const isRowVisible = Boolean(
    isOwned ||
    canToggleTracked ||
    canToggleWatched ||
    hasCollection ||
    hasTrailer ||
    showDownload
  );

  const playButtonLabel = (isMovie || isScene)
    ? ((item?.resume_position || 0) > 0 ? (t('library.details.resume') || 'Resume') : (t('library.details.play') || 'Play'))
    : (nextEpisodeInfo ? t('library.details.continueEpisode', {
        defaultValue: 'Continue S{{season}} E{{episode}}',
        season: nextEpisodeInfo.seasonNumber,
        episode: formatEpisodeNumber(nextEpisodeInfo.episode.episode_number),
      }) : '');

  const handleCollectionClick = () => {
    if (item?.collection_data?.tmdb_id) {
      navigate(ROUTES.COLLECTION_DETAIL(item.collection_data.tmdb_id));
    }
  };

  const handleWatchlistClick = () => {
    if (watchlist) {
      handleToggleList(watchlist);
    }
  };

  const handleDetailsClick = () => {
    setIsDrawerOpen(true);
  };

  const handleAddPeakClick = () => {
    addPeakMutation.mutate({ itemId: effectiveId, tvId: cleanId });
  };

  return {
    t,
    isRowVisible,
    // Download
    showDownload,
    handleOpenTorrentSearch,
    // Collection
    showCollection,
    handleCollectionClick,
    // Trailer
    showTrailer,
    handleTrailerClick,
    // Watchlist
    showWatchlist,
    isWatchlistAdded,
    handleWatchlistClick,
    // Watched
    showWatched,
    isWatched,
    handleToggleWatched,
    isWatchedPending: Boolean(updateStatusMutation?.isPending || bulkUpdateWatchedMutation?.isPending),
    // Tracked
    showTracked,
    isTracked,
    handleToggleTracked,
    isTrackedPending: Boolean(toggleTrackedMutation?.isPending),
    // Details
    showDetails,
    handleDetailsClick,
    // Add Peak
    showAddPeak,
    handleAddPeakClick,
    // Play
    showPlay,
    playButtonLabel,
    handlePlayClick,
    isPlayPending: Boolean(playMutation?.isPending),
  };
}
