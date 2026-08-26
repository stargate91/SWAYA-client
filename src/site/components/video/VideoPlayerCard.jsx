import PropTypes from 'prop-types';
import VideoControlsOverlay from './VideoControlsOverlay';
import styles from './VideoPlayerCard.module.css';

export default function VideoPlayerCard({
  posterUrl,
  hasStarted,
  handleCardClick,
  handleKeyDown,
  videoAriaLabel,
  videoPlaceholderTitle,
  videoProps,
}) {
  return (
    <div
      className={`${styles['video-card']} ${hasStarted ? styles['video-card--playing'] : ''}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={videoAriaLabel}
    >
      {videoProps?.src && (
        <video
          {...videoProps}
          poster={posterUrl}
          className={styles['video-element']}
          aria-label={videoPlaceholderTitle}
        />
      )}

      <VideoControlsOverlay isPlaying={hasStarted} />
    </div>
  );
}

VideoPlayerCard.propTypes = {
  posterUrl: PropTypes.string,
  hasStarted: PropTypes.bool.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  videoAriaLabel: PropTypes.string.isRequired,
  videoPlaceholderTitle: PropTypes.string,
  videoProps: PropTypes.object.isRequired,
};
