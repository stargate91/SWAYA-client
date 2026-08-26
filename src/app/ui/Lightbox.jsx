import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Overlay from './Overlay';
import styles from './Lightbox.module.css';

export default function Lightbox({ imageUrl, mediaUrl, isVideo = false, onClose, t }) {
  const url = mediaUrl || imageUrl;
  if (!url) return null;

  const isVideoContent =
    isVideo ||
    url.endsWith('.webm') ||
    url.endsWith('.mp4') ||
    url.includes('/vid/') ||
    url.includes('video');

  const content = (
    <Overlay
      centered
      width="fluid"
      padding="flush"
      className={styles.overlay}
      onClose={onClose}
      closeLabel={t?.('common.close') || 'Close'}
    >
      <div className={styles['lightbox-content']} role="presentation" onClick={onClose}>
        {isVideoContent ? (
          <video
            src={url}
            autoPlay
            controls
            loop
            playsInline
            className={styles.image}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            src={url}
            alt="Enlarged preview"
            className={styles.image}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </Overlay>
  );

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return content;
}

Lightbox.propTypes = {
  imageUrl: PropTypes.string,
  mediaUrl: PropTypes.string,
  isVideo: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func,
};
