import PropTypes from 'prop-types';
import { Layers, User, PenLine, Maximize2 } from '@/ui/icons';
import PosterCard from '@/ui/PosterCard';
import Badge from '@/ui/Badge';
import IconButton from '@/ui/IconButton';
import { getFlagUrl } from '@/lib/languages';
import { useImageLoadState } from '@/hooks/useImageLoadState';
import styles from './EditableMediaCard.module.css';

export default function EditableMediaCard({
  mediaUrl,
  onClick,
  onEditClick,
  editTitle,
  type = 'poster', // 'poster' or 'profile'
  aspect = 'poster',
  size = 'auto',
  flagEmoji,
  countryISO,
  flagTooltip,
  className = '',
}) {
  const PlaceholderIcon = type === 'profile' ? User : Layers;
  const { hasImageError, handleImageError } = useImageLoadState();
  const sizeClass = size === 'hero' ? styles['size-hero'] : '';
  const isFluid = size !== 'hero';

  const editButton = onEditClick ? (
    <IconButton
      variant="image-edit"
      onClick={(event) => {
        event.stopPropagation();
        onEditClick();
      }}
      title={editTitle}
      aria-label={editTitle}
    >
      <PenLine size={14} />
    </IconButton>
  ) : null;

  const flagBadge = (countryISO && !hasImageError('flag')) ? (
    <Badge
      variant="glass-flag"
      title={flagTooltip}
    >
      <img
        src={getFlagUrl(countryISO, 'svg')}
        alt={flagTooltip}
        onError={() => handleImageError('flag')}
      />
    </Badge>
  ) : flagEmoji ? (
    <Badge
      variant="glass-flag"
      title={flagTooltip}
    >
      {flagEmoji}
    </Badge>
  ) : null;

  const overlay = mediaUrl ? (
    <div className={styles['hover-overlay']}>
      <div className={styles['hover-icon']}>
        <IconButton
          variant="glass"
          size="lg"
          radius="full"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Maximize2 size={16} />
        </IconButton>
      </div>
    </div>
  ) : null;

  const effectiveAspect = mediaUrl ? (aspect || 'auto') : 'poster';

  return (
    <PosterCard
      imageUrl={mediaUrl}
      onClick={onClick}
      aspect={effectiveAspect}
      fillHeight={true}
      fluid={isFluid}
      placeholderText={null}
      icon={PlaceholderIcon}
      topLeftAction={flagBadge}
      topRightAction={editButton}
      overlay={overlay}
      title={null}
      className={`${styles.card} ${sizeClass} ${className}`.trim()}
      disableHoverAnimation={true}
    />
  );
}

EditableMediaCard.propTypes = {
  mediaUrl: PropTypes.string,
  onClick: PropTypes.func,
  onEditClick: PropTypes.func,
  editTitle: PropTypes.string,
  type: PropTypes.string,
  aspect: PropTypes.string,
  size: PropTypes.string,
  flagEmoji: PropTypes.string,
  countryISO: PropTypes.string,
  flagTooltip: PropTypes.string,
  className: PropTypes.string,
};
