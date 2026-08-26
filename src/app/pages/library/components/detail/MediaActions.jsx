import { FolderOpen, Video, Check, Eye, Play, BellPlus, Droplets, Info, Download, Bookmark } from '@/ui/icons';
import Button from '@/ui/Button';
import Inline from '@/ui/Inline';
import { useMediaActionButtons } from '../../hooks/useMediaActionButtons';

export default function MediaActions() {
  const {
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
    isWatchedPending,
    // Tracked
    showTracked,
    isTracked,
    handleToggleTracked,
    isTrackedPending,
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
    isPlayPending,
  } = useMediaActionButtons();

  if (!isRowVisible) {
    return null;
  }

  return (
    <Inline gap="lg" align="center" className="media-detail-page__actions-row">
      {showDownload && (
        <Button
          variant="ghost"
          onClick={handleOpenTorrentSearch}
        >
          <Download size={16} />
          {t('common.download') || 'Download'}
        </Button>
      )}

      {showCollection && (
        <Button
          variant="ghost"
          onClick={handleCollectionClick}
        >
          <FolderOpen size={16} />
          {t('library.details.collection') || 'Collection'}
        </Button>
      )}

      {showTrailer && (
        <Button
          variant="ghost"
          onClick={handleTrailerClick}
        >
          <Video size={16} />
          {t('library.details.trailer') || 'Trailer'}
        </Button>
      )}

      {showWatchlist && (
        <Button
          variant="ghost"
          onClick={handleWatchlistClick}
        >
          {isWatchlistAdded ? <Check size={16} /> : <Bookmark size={16} />}
          {isWatchlistAdded ? (t('dashboard.watchlist.added') || 'Watchlisted') : (t('dashboard.watchlist.add_short') || 'Watchlist')}
        </Button>
      )}

      {showWatched && (
        <Button
          variant="ghost"
          onClick={handleToggleWatched}
          disabled={isWatchedPending}
        >
          {isWatched ? <Check size={16} /> : <Eye size={16} />}
          {isWatched ? (t('library.details.watched') || 'Watched') : (t('library.details.markWatched') || 'Mark as Watched')}
        </Button>
      )}

      {showTracked && (
        <Button
          variant="ghost"
          onClick={handleToggleTracked}
          disabled={isTrackedPending}
        >
          {isTracked ? <Check size={16} /> : <BellPlus size={16} />}
          {isTracked ? (t('library.details.tracked') || 'Tracked') : (t('library.details.track') || 'Track')}
        </Button>
      )}

      {showDetails && (
        <Button
          variant="ghost"
          onClick={handleDetailsClick}
        >
          <Info size={16} />
          {t('library.details.details') || 'Details'}
        </Button>
      )}

      {showAddPeak && (
        <Button
          variant="ghost"
          onClick={handleAddPeakClick}
        >
          <Droplets size={16} />
          {t('library.details.addPeak') || 'Add Peak'}
        </Button>
      )}

      {showPlay && (
        <Button
          variant="secondary"
          onClick={handlePlayClick}
          disabled={isPlayPending}
        >
          <Play size={16} fill="currentColor" />
          {playButtonLabel}
        </Button>
      )}
    </Inline>
  );
}
