import PropTypes from 'prop-types';
import styles from './PosterCardMedia.module.css';

export default function PosterCardMedia({
  imageUrl,
  imageError = false,
  handleImageError,
  altText = '',
  imageClassName = '',
  backgroundColor,
  icon: IconComponent,
  placeholderText,
  previewSrc = null,
  isVideoPlaying = false,
  handleVideoPlaying,
  aspect = 'poster',
  fillHeight = false,
  isMissing = false,
  disableHoverAnimation = false,
  loading = 'lazy',
  children,
}) {
  const showPlaceholder = !imageUrl || imageError;

  return (
    <div
      className={styles.media}
      data-aspect={aspect}
      data-fill-height={fillHeight || undefined}
      data-missing={isMissing || undefined}
      data-no-hover-animation={disableHoverAnimation || undefined}
    >
      {showPlaceholder && (
        <div
          className={styles.placeholder}
          // eslint-disable-next-line react/forbid-dom-props
          style={backgroundColor ? { background: backgroundColor } : undefined}
        >
          {IconComponent && (
            <IconComponent size={32} className={styles['placeholder-icon']} />
          )}
          {placeholderText && (
            <span className={styles['placeholder-text']}>
              {placeholderText}
            </span>
          )}
        </div>
      )}

      {imageUrl && !imageError && (
        <img
          src={imageUrl}
          alt={altText || ''}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          className={`${styles.image} ${imageClassName}`.trim()}
          onError={handleImageError}
        />
      )}
      {previewSrc && (
        <video
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
            }
          }}
          src={previewSrc}
          autoPlay
          muted
          loop
          playsInline
          onPlay={handleVideoPlaying}
          onPlaying={handleVideoPlaying}
          className={`${styles.image} ${styles['preview-video']} ${imageClassName}`.trim()}
          // eslint-disable-next-line react/forbid-dom-props
          style={{
            opacity: isVideoPlaying ? 1 : 0,
          }}
        />
      )}
      {children}
    </div>
  );
}

PosterCardMedia.propTypes = {
  imageUrl: PropTypes.string,
  imageError: PropTypes.bool,
  handleImageError: PropTypes.func,
  altText: PropTypes.string,
  imageClassName: PropTypes.string,
  backgroundColor: PropTypes.string,
  icon: PropTypes.elementType,
  placeholderText: PropTypes.string,
  previewSrc: PropTypes.string,
  isVideoPlaying: PropTypes.bool,
  handleVideoPlaying: PropTypes.func,
  aspect: PropTypes.string,
  fillHeight: PropTypes.bool,
  isMissing: PropTypes.bool,
  disableHoverAnimation: PropTypes.bool,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  children: PropTypes.node,
};
