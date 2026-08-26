import PropTypes from 'prop-types';
import styles from './Spinner.module.css';

export default function Spinner({
  label = 'Loading',
  description = '',
  className = '',
  size = 'md',
  centered = false,
  fullHeight = false,
}) {
  const isPreset = ['xs', 'sm', 'md', 'lg'].includes(size);
  const spinnerStyle = !isPreset && size ? { width: size, height: size } : undefined;

  return (
    <div
      className={`${styles.wrap} ${className}`.trim()}
      data-centered={centered}
      data-full-height={fullHeight}
      data-size={isPreset ? size : undefined}
      aria-live="polite"
      aria-label={label || undefined}
      role="status"
    >
      {/* eslint-disable-next-line react/forbid-dom-props */}
      <span className={styles.spinner} style={spinnerStyle} />
      {label ? (
        <div className={styles.text}>
          <span className={styles.label}>{label}</span>
          {description ? <span className={styles.description}>{description}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

Spinner.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  centered: PropTypes.bool,
  fullHeight: PropTypes.bool,
};
