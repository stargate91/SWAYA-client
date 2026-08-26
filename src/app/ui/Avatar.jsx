import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.css';
import { UserRound } from './icons';

export default function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  shape = 'circle',
  variant = 'default',
  className = '',
  fallbackIcon = null,
  ...props
}) {
  const [hasError, setHasError] = useState(false);

  const classes = [
    styles.root,
    size && styles[`size-${size}`],
    shape && styles[`shape-${shape}`],
    variant && styles[`variant-${variant}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
        />
      ) : (
        fallbackIcon || <UserRound size={size === 'sm' ? 18 : size === 'xl' ? 36 : 24} />
      )}
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  shape: PropTypes.oneOf(['circle', 'square', 'rounded']),
  variant: PropTypes.oneOf(['default', 'accent', 'soft']),
  className: PropTypes.string,
  fallbackIcon: PropTypes.node,
};

