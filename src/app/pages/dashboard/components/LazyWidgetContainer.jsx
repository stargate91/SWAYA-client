import PropTypes from 'prop-types';
import { useLazyHydration } from '@/hooks/useLazyHydration';
import styles from './LazyWidgetContainer.module.css';

/**
 * LazyWidgetContainer
 *
 * Progressively renders Dashboard widgets:
 * 1. Priority widgets mount immediately.
 * 2. Approaching widgets mount before entering viewport (rootMargin: 1000px).
 * 3. Offscreen widgets progressively hydrate in background idle frames.
 * 4. Offscreen rendered content uses CSS content-visibility for zero-cost GPU compositing.
 */
export default function LazyWidgetContainer({
  children,
  priority = false,
  rootMargin = '1000px',
  minHeight = '14rem',
  className = '',
  idleDelay = 400,
}) {
  const { hasBeenVisible, containerRef } = useLazyHydration({
    priority,
    rootMargin,
    idleDelay,
  });

  const wrapperClass = `${styles.container} ${className}`.trim();

  if (hasBeenVisible) {
    return (
      <div className={wrapperClass}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.placeholder} ${className}`.trim()}
      /* eslint-disable-next-line react/forbid-dom-props */
      style={{ minHeight, width: '100%' }}
      aria-hidden="true"
    />
  );
}

LazyWidgetContainer.propTypes = {
  children: PropTypes.node.isRequired,
  priority: PropTypes.bool,
  rootMargin: PropTypes.string,
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  idleDelay: PropTypes.number,
};

