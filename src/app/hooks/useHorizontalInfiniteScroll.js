import { useState, useMemo, useCallback, useRef, useEffect } from 'react';

/**
 * Calculates responsive CSS column count for horizontal two-row collection grid.
 *
 * @param {number} count - Visible items count
 * @returns {number} CSS column count
 */
export function calculateCollectionColumns(count) {
  if (!count || count <= 0) return 1;
  return Math.max(1, count <= 12 ? count : Math.ceil(count / 2));
}

/**
 * Custom hook for horizontal infinite scrolling / pagination and dynamic layout calculations.
 *
 * @param {Object} [options]
 * @param {Array} [options.items=[]] - Array of items
 * @param {number} [options.initialLimit=30] - Initial number of items to show
 * @param {number} [options.step=20] - Number of items to add on scroll near end
 * @param {number} [options.threshold=300] - Pixel distance from right edge to trigger loading next batch
 * @returns {Object} { visibleItems, cols, handleScroll, limit, setLimit, hasMore }
 */
export function useHorizontalInfiniteScroll({
  items = [],
  initialLimit = 30,
  step = 20,
  threshold = 300,
} = {}) {
  const [limit, setLimit] = useState(initialLimit);
  const itemsLength = items?.length || 0;

  const prevItemsRef = useRef(items);
  useEffect(() => {
    if (items !== prevItemsRef.current) {
      prevItemsRef.current = items;
      setLimit(initialLimit);
    }
  }, [items, initialLimit]);

  const handleScroll = useCallback(
    (e) => {
      const container = e?.currentTarget;
      if (!container) return;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollWidth - scrollLeft - clientWidth < threshold) {
        setLimit((prev) => Math.min(itemsLength, prev + step));
      }
    },
    [itemsLength, step, threshold]
  );

  const visibleItems = useMemo(() => {
    return (items || []).slice(0, limit);
  }, [items, limit]);

  const cols = useMemo(() => {
    return calculateCollectionColumns(visibleItems.length);
  }, [visibleItems.length]);

  const hasMore = visibleItems.length < itemsLength;

  return {
    visibleItems,
    cols,
    handleScroll,
    limit,
    setLimit,
    hasMore,
  };
}

export default useHorizontalInfiniteScroll;
