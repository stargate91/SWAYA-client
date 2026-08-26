import PropTypes from 'prop-types';
import { useInteractiveMedia } from '../../hooks/useInteractiveMedia';
import styles from './ShowcaseMediaPreview.module.css';

export default function ShowcaseMediaPreview({ image, srcSet, altText, onOpenLightbox }) {
  const interactiveProps = useInteractiveMedia({
    onActivate: () => onOpenLightbox(image),
    label: altText,
  });

  return (
    <div className={styles['visual-content']}>
      <div className={styles['image-card']} {...interactiveProps}>
        <picture>
          {srcSet && (
            <source
              type="image/webp"
              srcSet={srcSet}
              sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1200px) 50vw, 680px"
            />
          )}
          <img
            src={image}
            srcSet={srcSet}
            sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1200px) 50vw, 680px"
            alt={altText}
            width={1920}
            height={1040}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  );
}

ShowcaseMediaPreview.propTypes = {
  image: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  altText: PropTypes.string.isRequired,
  onOpenLightbox: PropTypes.func.isRequired,
};
