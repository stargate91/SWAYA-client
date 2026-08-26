import PropTypes from 'prop-types';
import { ENTITY_ICONS } from '@/ui/icons';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { useImageLoadState } from '@/hooks/useImageLoadState';
import styles from './ListCollageIcon.module.css';

export default function ListCollageIcon({
  samplePosters,
  listType,
  color,
  customImagePath,
  iconSize = 20,
}) {
  const iconColor = color || 'var(--color-accent-blue)';
  const { handleImageLoad, isImageLoaded } = useImageLoadState();

  const containerStyle = {
    '--fallback-color': iconColor,
  };

  if (customImagePath) {
    const isLoaded = isImageLoaded('custom');
    return (
      <div
        className={`${styles.collage} ${styles['collage--1']}`}
        // eslint-disable-next-line react/forbid-dom-props
        style={containerStyle}
      >
        <img
          src={resolveMediaImageUrl(customImagePath)}
          className={`${styles['collage-img']} ${styles['collage-img--0']} ${isLoaded ? styles['is-loaded'] : ''}`}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => handleImageLoad('custom')}
        />
      </div>
    );
  }

  if (samplePosters && samplePosters.length > 0) {
    const count = Math.min(4, samplePosters.length);
    return (
      <div
        className={`${styles.collage} ${styles[`collage--${count}`]}`}
        // eslint-disable-next-line react/forbid-dom-props
        style={containerStyle}
      >
        {samplePosters.slice(0, 4).map((path, idx) => {
          const isLoaded = isImageLoaded(idx);
          return (
            <img
              key={path || idx}
              src={resolveMediaImageUrl(path, 'posterThumb')}
              className={`${styles['collage-img']} ${styles[`collage-img--${idx}`]} ${isLoaded ? styles['is-loaded'] : ''}`}
              alt=""
              loading="lazy"
              decoding="async"
              onLoad={() => handleImageLoad(idx)}
            />
          );
        })}
      </div>
    );
  }

  const FallbackIcon = listType === 'person' ? ENTITY_ICONS.performer : ENTITY_ICONS.movie;

  return (
    <div
      className={`${styles.collage} ${styles['collage--fallback']}`}
      // eslint-disable-next-line react/forbid-dom-props
      style={containerStyle}
    >
      <FallbackIcon size={iconSize} className={styles['fallback-icon']} />
    </div>
  );
}

ListCollageIcon.propTypes = {
  samplePosters: PropTypes.arrayOf(PropTypes.string),
  listType: PropTypes.string,
  color: PropTypes.string,
  customImagePath: PropTypes.string,
  iconSize: PropTypes.number,
};

