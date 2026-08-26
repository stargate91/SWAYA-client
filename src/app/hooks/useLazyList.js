import { useState, useMemo, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for paginated / lazy rendering of arrays on scroll.
 *
 * @param {Object} [options]
 * @param {Array} [options.items=[]] - Array of all items
 * @param {number} [options.pageSize=24] - Number of items to display per page/batch
 * @param {number} [options.threshold=50] - Pixel distance from container edge to trigger loading next page
 * @param {'vertical'|'horizontal'|'auto'} [options.direction='vertical'] - Scroll direction
 * @returns {Object} { visibleItems, visibleCount, hasMore, handleScroll, loadMore, reset }
 */
export function useLazyList({
  items = [],
  pageSize = 24,
  threshold = 50,
  direction = 'vertical',
} = {}) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const totalCount = items?.length || 0;

  // Reset when items array changes
  const prevItemsRef = useRef(items);
  useEffect(() => {
    if (items !== prevItemsRef.current) {
      prevItemsRef.current = items;
      setVisibleCount(pageSize);
    }
  }, [items, pageSize]);

  const hasMore = visibleCount < totalCount;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(totalCount, prev + pageSize));
    }
  }, [hasMore, totalCount, pageSize]);

  const reset = useCallback(() => {
    setVisibleCount(pageSize);
  }, [pageSize]);

  const handleScroll = useCallback(
    (e) => {
      const container = e?.target || e?.currentTarget;
      if (!container) return;

      const {
        scrollTop,
        scrollHeight,
        clientHeight,
        scrollLeft,
        scrollWidth,
        clientWidth,
      } = container;

      const isNearEnd = (() => {
        if (direction === 'horizontal') {
          return scrollWidth - scrollLeft - clientWidth < threshold;
        }
        if (direction === 'vertical') {
          return scrollHeight - scrollTop - clientHeight < threshold;
        }
        const isHorizScrollable = scrollWidth > clientWidth;
        const isVertScrollable = scrollHeight > clientHeight;
        if (isHorizScrollable && !isVertScrollable) {
          return scrollWidth - scrollLeft - clientWidth < threshold;
        }
        return scrollHeight - scrollTop - clientHeight < threshold;
      })();

      if (isNearEnd && hasMore) {
        setVisibleCount((prev) => Math.min(totalCount, prev + pageSize));
      }
    },
    [direction, threshold, hasMore, totalCount, pageSize]
  );


  const visibleItems = useMemo(() => {
    return items ? items.slice(0, visibleCount) : [];
  }, [items, visibleCount]);

  return {
    visibleItems,
    visibleCount,
    hasMore,
    handleScroll,
    loadMore,
    reset,
  };
}

export default useLazyList;
