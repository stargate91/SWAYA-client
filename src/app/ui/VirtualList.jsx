import { useRef, useLayoutEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useVirtualizer } from '@tanstack/react-virtual';
import styles from './VirtualList.module.css';

/**
 * Headless 1-column Virtualized List Component.
 */
export default function VirtualList({
  items = [],
  renderItem,
  estimateSize = 80,
  gap = 'lg',
  className = '',
  scrollElementRef,
  scrollSelector = '.shell__content',
  overscan = 5,
}) {
  const containerRef = useRef(null);
  const cachedScrollElementRef = useRef(null);

  useLayoutEffect(() => {
    if (scrollElementRef?.current) {
      cachedScrollElementRef.current = scrollElementRef.current;
      return;
    }
    if (scrollSelector && typeof document !== 'undefined') {
      const el = document.querySelector(scrollSelector);
      if (el) {
        cachedScrollElementRef.current = el;
        return;
      }
    }
    if (containerRef.current && typeof window !== 'undefined') {
      let parent = containerRef.current.parentElement;
      while (parent && parent !== document.body && parent !== document.documentElement) {
        const style = window.getComputedStyle(parent);
        const overflowY = style.overflowY || style.overflow;
        if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
          cachedScrollElementRef.current = parent;
          return;
        }
        parent = parent.parentElement;
      }
    }
    cachedScrollElementRef.current = typeof window !== 'undefined' ? window : null;
  }, [scrollElementRef, scrollSelector]);

  const getScrollElement = useCallback(() => {
    if (scrollElementRef?.current) {
      return scrollElementRef.current;
    }
    if (cachedScrollElementRef.current && (cachedScrollElementRef.current === window || cachedScrollElementRef.current.isConnected)) {
      return cachedScrollElementRef.current;
    }
    if (scrollSelector && typeof document !== 'undefined') {
      const el = document.querySelector(scrollSelector);
      if (el) {
        cachedScrollElementRef.current = el;
        return el;
      }
    }
    return typeof window !== 'undefined' ? window : null;
  }, [scrollElementRef, scrollSelector]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement,
    estimateSize: () => estimateSize,
    overscan,
  });

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`${styles['virtual-list-wrapper']} ${className}`.trim()}
      /* eslint-disable-next-line react/forbid-dom-props */
      style={{
        height: `${virtualizer.getTotalSize()}px`,
      }}
    >
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const item = items[virtualItem.index];

        return (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            {...(gap ? { 'data-gap': gap } : {})}
            ref={virtualizer.measureElement}
            className={styles['virtual-list-item']}
            /* eslint-disable-next-line react/forbid-dom-props */
            style={{
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(item, virtualItem.index)}
          </div>
        );
      })}
    </div>
  );
}

VirtualList.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  estimateSize: PropTypes.number,
  gap: PropTypes.string,
  className: PropTypes.string,
  scrollElementRef: PropTypes.shape({ current: PropTypes.any }),
  scrollSelector: PropTypes.string,
  overscan: PropTypes.number,
};
