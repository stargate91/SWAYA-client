import PropTypes from 'prop-types';
import styles from './Skeleton.module.css';

export default function Skeleton({
  className = '',
  variant = 'rect',
  shimmer = true,
  width,
  height,
  radius,
  style,
  ...props
}) {
  const classes = [
    styles.skeleton,
    variant !== 'rect' ? styles[variant] : '',
    shimmer ? styles.shimmer : '',
    className,
  ].filter(Boolean).join(' ');

  const mergedStyle = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(radius ? { borderRadius: radius } : {}),
    ...style,
  };

  /* eslint-disable-next-line react/forbid-dom-props */
  return <div className={classes} style={mergedStyle} {...props} />;
}

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['rect', 'circle', 'text', 'title-sm', 'dist-title', 'dist-bar']),
  shimmer: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
};


Skeleton.Row = function SkeletonRow({ children, className = '', ...props }) {
  return <div className={`${styles.row} ${className}`.trim()} {...props}>{children}</div>;
};
Skeleton.Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Skeleton.Card = function SkeletonCard({ aspect, className = '', noMetadata = false, ...props }) {
  const containerClasses = [
    styles.card,
    aspect && styles[`card--aspect-${aspect}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      <div className={`${styles['card-media']} ${styles.shimmer}`} />
      {!noMetadata && (
        <div className={styles['card-metadata']}>
          <div className={`${styles['card-title']} ${styles.shimmer}`} />
          <div className={styles['card-subtitle-row']}>
            <div className={`${styles['card-subtitle']} ${styles.shimmer}`} />
          </div>
        </div>
      )}
    </div>
  );
};
Skeleton.Card.propTypes = {
  aspect: PropTypes.oneOf(['scene', 'poster', 'landscape', 'logo']),
  className: PropTypes.string,
  noMetadata: PropTypes.bool,
};

Skeleton.Banner = function SkeletonBanner({ className = '', ...props }) {
  return <div className={`${styles.banner} ${styles.shimmer} ${className}`.trim()} {...props} />;
};
Skeleton.Banner.propTypes = {
  className: PropTypes.string,
};

Skeleton.Title = function SkeletonTitle({ className = '', ...props }) {
  return <div className={`${styles.title} ${styles.shimmer} ${className}`.trim()} {...props} />;
};
Skeleton.Title.propTypes = {
  className: PropTypes.string,
};

Skeleton.CompactCard = function SkeletonCompactCard({ aspect = 'circle', className = '', ...props }) {
  const containerClasses = [
    styles['compact-card'],
    aspect && styles[`compact-card--aspect-${aspect}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      <div className={`${styles['compact-card-media']} ${styles.shimmer}`} />
      <div className={styles['compact-card-body']}>
        <div className={`${styles['compact-card-title']} ${styles.shimmer}`} />
        <div className={`${styles['compact-card-subtitle']} ${styles.shimmer}`} />
      </div>
      <div className={`${styles['compact-card-button']} ${styles.shimmer}`} />
    </div>
  );
};
Skeleton.CompactCard.propTypes = {
  aspect: PropTypes.oneOf(['circle', 'landscape', 'poster', 'square']),
  className: PropTypes.string,
};
