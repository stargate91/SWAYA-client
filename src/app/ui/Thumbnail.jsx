import PropTypes from 'prop-types';
import IconButton from './IconButton';
import Tooltip from './Tooltip';
import { X } from './icons';
import styles from './Thumbnail.module.css';

export default function Thumbnail({
  src,
  videoSrc,
  alt = 'Thumbnail',
  size = 'md', // 'sm' | 'md' | 'preview' | 'lg' | 'xl'
  position,
  repositionable = false,
  hoverZoom = false,
  onRemove,
  removeLabel = 'Remove image',
  onClick,
  onMouseDown,
  onTouchStart,
  className = '',
  children,
  ...props
}) {
  const isInteractive = Boolean(onClick || hoverZoom);

  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  const imgStyle = position
    ? { objectPosition: `${position.x ?? 50}% ${position.y ?? 50}%` }
    : undefined;

  return (
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div
      className={`${styles.root} ${className}`.trim()}
      data-size={size}
      data-hover-zoom={hoverZoom || undefined}
      data-repositionable={repositionable || undefined}
      onClick={onClick}
      onKeyDown={isInteractive && onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      {...props}
    >
      {children || (
        videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className={styles.video}
          />
        ) : src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={styles.image}
            data-repositionable={repositionable || undefined}
            // eslint-disable-next-line react/forbid-dom-props
            style={imgStyle}
            draggable={repositionable ? false : undefined}
          />
        ) : null
      )}

      {onRemove && (
        <Tooltip content={removeLabel} side="top">
          <IconButton
            variant="close-overlay"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(e);
            }}
            className={styles['remove-btn']}
            label={removeLabel}
            title={null}
          >
            <X size={12} />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}

Thumbnail.propTypes = {
  src: PropTypes.string,
  videoSrc: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'preview', 'lg', 'xl']),
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  repositionable: PropTypes.bool,
  hoverZoom: PropTypes.bool,
  onRemove: PropTypes.func,
  removeLabel: PropTypes.string,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

