import PropTypes from 'prop-types';
import styles from './AriaLiveRegion.module.css';

/**
 * Accessible live announcer region for screen readers.
 * Visually hidden but announces dynamic text changes (e.g. search result counts, filter changes).
 */
export default function AriaLiveRegion({ message, politeness = 'polite', atomic = true }) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic={atomic}
      className={styles['sr-only']}
    >
      {message}
    </div>
  );
}

AriaLiveRegion.propTypes = {
  message: PropTypes.node,
  politeness: PropTypes.oneOf(['polite', 'assertive', 'off']),
  atomic: PropTypes.bool,
};
