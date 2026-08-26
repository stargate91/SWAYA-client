import PropTypes from 'prop-types';
import { useImageLoadState } from '@/hooks/useImageLoadState';
import Text from './Text';
import styles from './CompactCard.module.css';

/**
 * Compact horizontal card component.
 *
 * @param {object} props
 * @param {string} props.title - Card title header
 * @param {string} [props.description] - Supporting card description text
 * @param {string} [props.imageUrl] - Image source URL
 * @param {'poster' | 'landscape' | 'square' | 'circle'} [props.aspect] - Image container crop layout aspect ratio
 * @param {string} [props.size] - Card size
 * @param {string} [props.objectFit] - Image object-fit
 * @param {React.ComponentType} [props.fallbackIcon] - Icon to show when image fails/is missing
 * @param {React.ReactNode} [props.badge] - Subtitle badge row component
 * @param {React.ReactNode} [props.meta] - Small metadata text detail element
 * @param {React.ReactNode} [props.rightElement] - Action slot rendered on the right side
 * @param {React.ReactNode} [props.overlay] - Poster overlay element
 * @param {boolean} [props.active] - Visual active selected state border highlight
 * @param {boolean} [props.disabled] - Disabled non-interactive state
 * @param {function} [props.onClick] - Card click callback handler
 * @param {string} [props.className] - Additional parent class names
 */
export default function CompactCard({
  title,
  description,
  imageUrl,
  aspect = 'poster',
  size = 'md',
  objectFit = 'cover',
  fallbackIcon: FallbackIcon = null,
  badge = null,
  meta = null,
  rightElement = null,
  overlay = null,
  active = false,
  disabled = false,
  onClick = null,
  className = '',
  ...props
}) {
  const { hasImageError, handleImageError } = useImageLoadState();
  const imageError = Boolean(imageUrl && hasImageError(imageUrl));

  const hasInteractive = typeof onClick === 'function' && !disabled;
  const Component = hasInteractive ? 'button' : 'div';
  const rightSlot = rightElement;

  return (
    <Component
      type={hasInteractive ? 'button' : undefined}
      data-aspect={aspect}
      data-size={size}
      data-active={active}
      data-disabled={disabled}
      className={`${styles.card} ${className}`.trim()}
      onClick={hasInteractive ? onClick : undefined}
      disabled={disabled || undefined}
      {...props}
    >
      <div className={styles['poster-wrapper']}>
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className={styles.image}
            data-object-fit={objectFit}
            onError={() => handleImageError(imageUrl)}
          />
        ) : (
          <div className={styles.placeholder}>
            {FallbackIcon && <FallbackIcon size={18} />}
          </div>
        )}
        {overlay}
      </div>

      <div className={styles.body}>
        <div className={styles.topline}>
          <strong className={styles.title}>{title}</strong>
          {badge && <div className={styles.badge}>{badge}</div>}
        </div>

        {meta && <div className={styles.meta}>{meta}</div>}
        {description && (
          <Text as="p" clamp={2} className={styles.description}>
            {description}
          </Text>
        )}
      </div>

      {rightSlot && (
        <div className={styles.right}>
          {rightSlot}
        </div>
      )}
    </Component>
  );
}

CompactCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  aspect: PropTypes.string,
  size: PropTypes.string,
  objectFit: PropTypes.string,
  fallbackIcon: PropTypes.elementType,
  badge: PropTypes.node,
  meta: PropTypes.node,
  rightElement: PropTypes.node,
  overlay: PropTypes.node,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
