import PropTypes from 'prop-types';
import styles from './LogoCard.module.css';
import Text from '../Text';
import { useImageLoadState } from '@/hooks/useImageLoadState';

export default function LogoCard({ src, alt, size = 'sm', invert = false, fallbackText, className = '', ...props }) {
  const { hasImageError, handleImageError } = useImageLoadState();

  const logoClasses = [
    styles.logo,
    invert && styles['logo-invert']
  ].filter(Boolean).join(' ');

  return (
    <div
      className={`${styles.card} ${className}`.trim()}
      {...props}
    >
      {src && !hasImageError('logo') ? (
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className={logoClasses}
          data-size={size}
          onError={() => handleImageError('logo')}
        />
      ) : (
        <Text variant="small" weight="bold" color="secondary">
          {fallbackText || alt}
        </Text>
      )}
    </div>
  );
}

LogoCard.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  invert: PropTypes.bool,
  fallbackText: PropTypes.string,
  className: PropTypes.string,
};
