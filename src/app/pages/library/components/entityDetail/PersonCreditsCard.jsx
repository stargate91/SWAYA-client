import { memo } from 'react';
import PropTypes from 'prop-types';
import { Layers, Bookmark, Play, Download } from '@/ui/icons';
import PosterCard from '@/ui/PosterCard';
import Badge from '@/ui/Badge';
import { usePersonCreditsCardViewModel } from '../../hooks/usePersonCreditsCardViewModel';
import styles from './PersonCreditsCard.module.css';

const PersonCreditsCard = memo(function PersonCreditsCard({
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
  const {
    creditTitle,
    posterUrl,
    aspect,
    subtitleText,
    hoverSubtitleText,
    ratingImdb,
    ratingTmdb,
    ratingTheporndb,
    performers,
    dateText,
    isLibraryBadgeVisible,
    inLibraryBadgeTitle,
    playOverlay,
    handleCardClick,
  } = usePersonCreditsCardViewModel({
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
  });

  const overlay = isLibraryBadgeVisible ? (
    <Badge
      size="xs"
      variant="top-right"
      family="status"
      tone="success"
      roundness="full"
      leftIcon={<Bookmark size={10} />}
      title={inLibraryBadgeTitle}
    />
  ) : null;

  const playOverlayProp = playOverlay ? {
    onClick: playOverlay.onClick,
    label: playOverlay.label,
    icon: playOverlay.type === 'play'
      ? <Play size={14} fill="currentColor" />
      : <Download size={18} />,
  } : null;

  return (
    <PosterCard
      className={styles.card}
      aspect={aspect}
      imageUrl={posterUrl}
      title={creditTitle}
      subtitle={subtitleText}
      hoverSubtitle={hoverSubtitleText}
      ratingImdb={ratingImdb}
      ratingTmdb={ratingTmdb}
      ratingTheporndb={ratingTheporndb}
      performers={performers}
      date={dateText}
      overlay={overlay}
      playOverlay={playOverlayProp}
      onClick={handleCardClick}
      icon={Layers}
      loading="eager"
    />
  );
});

PersonCreditsCard.displayName = 'PersonCreditsCard';

PersonCreditsCard.propTypes = {
  item: PropTypes.object.isRequired,
  mediaType: PropTypes.string,
  navigate: PropTypes.func,
  playMutation: PropTypes.object,
  t: PropTypes.func,
  showLibraryBadge: PropTypes.bool,
  showPlayOverlay: PropTypes.bool,
  settings: PropTypes.object,
  sortBy: PropTypes.string,
  torrentEnabled: PropTypes.bool,
  openTorrentModal: PropTypes.func,
};

export default PersonCreditsCard;


