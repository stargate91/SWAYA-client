import AbsoluteOverlay from '@/ui/AbsoluteOverlay';
import styles from './HeroSection.module.css';
import { useHeroVideoPreview } from '@/pages/library/hooks/useHeroVideoPreview';

export default function HeroSection({ backdropUrl, isFallback, isPreviewPlaying, previewSrc, onPlayingChange }) {
  const {
    setVideoRef,
    isVideoPlaying,
    handleTimeUpdate,
  } = useHeroVideoPreview({ isPreviewPlaying, onPlayingChange });

  return (
    <div className={styles.hero}>
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt="Backdrop"
          className={`${styles.backdrop} ${isFallback ? styles['backdrop--blurred'] : ''} ${isVideoPlaying && isPreviewPlaying ? styles['backdrop--hidden'] : ''}`}
        />
      )}
      {previewSrc && (
        <video
          ref={setVideoRef}
          src={previewSrc}
          poster={backdropUrl}
          muted
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className={`${styles.video} ${isVideoPlaying && isPreviewPlaying ? styles['video--visible'] : ''}`}
        />
      )}
      <AbsoluteOverlay
        variant="hero"
        hidden={isPreviewPlaying && isVideoPlaying}
      />
    </div>
  );
}

