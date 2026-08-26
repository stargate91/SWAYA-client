import { useState, useCallback, useEffect } from 'react';

/**
 * Calculates visibility states for left and right scroll navigation arrows.
 *
 * @param {HTMLElement | null} el - Scroll container element
 * @param {boolean} [hasMore=false] - Whether more items can be loaded
 * @returns {{ showLeft: boolean, showRight: boolean }}
 */
export function calculateScrollArrowStates(el, hasMore = false) {
  if (!el) return { showLeft: false, showRight: false };
  const showLeft = el.scrollLeft > 10;
  const showRight = Boolean(hasMore || el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  return { showLeft, showRight };
}

/**
 * Hook to manage arrow visibility, scroll container event listeners, wheel scrolling,
 * and smooth scroll operations for ScrollRow.
 *
 * @param {object} params
 * @param {React.RefObject} params.scrollRef - Reference to scrollable track element
 * @param {React.RefObject} [params.containerRef] - Reference to outer container
 * @param {boolean} [params.hasMore=false] - Whether more items can be loaded
 * @param {any} [params.children] - Children dependency to recalculate arrows on change
 * @param {boolean} [params.enableWheelScroll=false] - Whether horizontal wheel scroll is enabled
 * @param {() => void} [params.onLoadMore] - Load more callback handler
 * @param {() => void} [params.onReachEnd] - Reach end callback handler
 * @returns {{
 *   showLeft: boolean,
 *   showRight: boolean,
 *   updateArrows: () => void,
 *   scroll: (direction: 'left' | 'right') => void
 * }}
 */
export function useScrollRowArrows({
  scrollRef,
  containerRef,
  hasMore = false,
  children,
  enableWheelScroll = false,
  onLoadMore = null,
  onReachEnd = null,
} = {}) {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef?.current;
    if (!el) return;
    const states = calculateScrollArrowStates(el, hasMore);
    setShowLeft(states.showLeft);
    setShowRight(states.showRight);
  }, [scrollRef, hasMore]);

  useEffect(() => {
    updateArrows();
  }, [children, updateArrows]);

  useEffect(() => {
    const container = containerRef?.current;
    const el = scrollRef?.current;
    if (!container || !el || typeof window === 'undefined') return;

    window.addEventListener?.('resize', updateArrows);

    let handleWheel = null;
    if (enableWheelScroll) {
      handleWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollLeft += e.deltaY * 3;
      };
      container.addEventListener?.('wheel', handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener?.('resize', updateArrows);
      if (handleWheel) {
        container.removeEventListener?.('wheel', handleWheel);
      }
    };
  }, [containerRef, scrollRef, updateArrows, enableWheelScroll]);

  const scroll = useCallback(
    (direction) => {
      const el = scrollRef?.current;
      if (!el) return;
      const amount = el.clientWidth * 0.75;
      el.scrollBy?.({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });

      if (direction === 'right' && hasMore) {
        const loadFn = onLoadMore || onReachEnd;
        if (loadFn) {
          const isNearEnd = el.scrollLeft + amount >= el.scrollWidth - el.clientWidth - 150;
          if (isNearEnd) {
            loadFn();
          }
        }
      }
    },
    [scrollRef, hasMore, onLoadMore, onReachEnd]
  );

  return {
    showLeft,
    showRight,
    updateArrows,
    scroll,
  };
}

export default useScrollRowArrows;
