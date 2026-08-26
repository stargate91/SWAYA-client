import PropTypes from 'prop-types';
import { Film } from 'lucide-react';
import Badge from '@/ui/Badge';
import Lightbox from '@/ui/Lightbox';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import VideoPlayerCard from './VideoPlayerCard';
import VideoTranscript from './VideoTranscript';
import defaultActionVideo from '../../../assets/action.mp4';
import styles from './VideoSection.module.css';

export default function VideoSection({ videoUrl = defaultActionVideo, posterUrl = '/video-poster.webp' }) {
  const {
    t,
    hasStarted,
    isPlayingModal,
    setIsPlayingModal,
    handleCardClick,
    handleKeyDown,
    videoAriaLabel,
    videoPlaceholderTitle,
    transcript,
    videoProps,
  } = useVideoPlayer({ videoUrl });

  return (
    <section id="demo-video" className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <Badge tone="accent" size="md" leftIcon={<Film size={14} aria-hidden="true" />}>
            {t('landing.video.tag')}
          </Badge>

          <h2 className={styles.title}>
            {t('landing.video.title')}{' '}
            <span className={styles['title-accent']}>
              {t('landing.video.titleAccent')}
            </span>
          </h2>

          <p className={styles.subtitle}>
            {t('landing.video.subtitle')}
          </p>
        </div>

        {/* Video Player Card */}
        <VideoPlayerCard
          posterUrl={posterUrl}
          hasStarted={hasStarted}
          handleCardClick={handleCardClick}
          handleKeyDown={handleKeyDown}
          videoAriaLabel={videoAriaLabel}
          videoPlaceholderTitle={videoPlaceholderTitle}
          videoProps={videoProps}
        />

        {/* Accessible Video Transcript / Feature Summary */}
        <VideoTranscript transcript={transcript} />
      </div>

      {isPlayingModal && videoUrl && (
        <Lightbox
          mediaUrl={videoUrl}
          isVideo
          onClose={() => setIsPlayingModal(false)}
        />
      )}
    </section>
  );
}

VideoSection.propTypes = {
  videoUrl: PropTypes.string,
  posterUrl: PropTypes.string,
};
