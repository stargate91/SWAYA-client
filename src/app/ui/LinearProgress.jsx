import PropTypes from 'prop-types';
import styles from './LinearProgress.module.css';

/**
 * Pure linear progress bar.
 *
 * @param {object} props
 * @param {number} props.value - Percentage value between 0 and 100
 * @param {'blue' | 'accent' | 'success' | 'danger' | 'dna' | 'timeline'} [props.variant] - Visual style theme
 * @param {string} [props.className] - Custom classes for container styling
 */
export default function LinearProgress({
  value = 0,
  steps,
  currentStep = 0,
  variant = 'blue',
  size = 'md',
  flat = false,
  className = '',
  ...props
}) {
  if (typeof steps === 'number' && steps > 1) {
    return (
      <div className={`${styles['segmented-container']} ${className}`.trim()} data-size={size} {...props}>
        {Array.from({ length: steps }).map((_, idx) => (
          <div
            key={idx}
            className={`${styles.segment} ${idx === currentStep ? styles['segment--active'] : idx < currentStep ? styles['segment--passed'] : ''}`}
            data-variant={variant}
          />
        ))}
      </div>
    );
  }

  const progressRatio = Math.min(1, Math.max(0, (value ?? 0) / 100));

  const fillStyle = {
    transform: `scaleX(${progressRatio})`,
  };

  return (
    <div
      className={`${styles.container} ${className}`.trim()}
      data-size={size}
      {...props}
    >
      {/* eslint-disable-next-line react/forbid-dom-props */}
      <div className={styles.bar} data-variant={variant} data-flat={flat || undefined} style={fillStyle} />
    </div>
  );
}

LinearProgress.propTypes = {
  value: PropTypes.number,
  steps: PropTypes.number,
  currentStep: PropTypes.number,
  variant: PropTypes.oneOf(['blue', 'accent', 'success', 'danger', 'dna', 'timeline', 'sub']),
  size: PropTypes.oneOf(['md', 'xs']),
  flat: PropTypes.bool,
  className: PropTypes.string,
};
