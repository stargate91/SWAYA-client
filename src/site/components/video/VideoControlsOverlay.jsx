import { Play } from 'lucide-react';
import styles from './VideoControlsOverlay.module.css';

export default function VideoControlsOverlay({ isPlaying }) {
  return (
    <>
      <div
        className={`${styles['dark-overlay']} ${isPlaying ? styles['dark-overlay--hidden'] : ''}`}
        aria-hidden="true"
      />

      <div
        className={`${styles['play-overlay']} ${isPlaying ? styles['play-overlay--hidden'] : ''}`}
        aria-hidden="true"
      >
        <div className={styles['play-button-wrapper']}>
          <div className={styles['play-button-ring']} />
          <div className={styles['play-button']}>
            <Play size={28} fill="currentColor" className={styles['play-icon']} aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  );
}
