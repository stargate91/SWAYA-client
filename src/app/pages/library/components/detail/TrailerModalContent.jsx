import { getYoutubeEmbedUrl } from '@/lib/externalLinks';
import styles from './TrailerModalContent.module.css';

export default function TrailerModalContent({ trailerKey, isFullUrl }) {
  if (isFullUrl) {
    return (
      <video
        src={trailerKey}
        controls
        autoPlay
        className={styles['trailer-video']}
      />
    );
  }

  return (
    <iframe
      src={getYoutubeEmbedUrl(trailerKey)}
      title="Trailer"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className={styles['trailer-iframe']}
    />
  );
}
