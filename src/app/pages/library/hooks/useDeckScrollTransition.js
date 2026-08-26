import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * High-performance 2-View Deck Slide controller hook.
 *
 * Implements discrete 2-slide deck navigation with:
 * 1. Animation transition locks to prevent mid-flight interruptions.
 * 2. Intentional wheel delta accumulation thresholds (prevents single micro-tick jumps).
 * 3. Inner scroll boundary protection with cooldown for smooth list browsing.
 * 4. Deterministic 1:1 button sync.
 */
/**
 * Helper to determine if an event target or any of its ancestors is an active
 * scrollable container (grid, horizontal row, list), or an overlay (modal, drawer, popover, menu).
 */
function isInteractiveScrollTarget(target, boundaryElement) {
  if (!target || typeof window === 'undefined') return false;

  let el = (typeof Element !== 'undefined' && target instanceof Element) ? target : (target?.nodeType === 1 ? target : target?.parentElement || target);

  while (el && el !== boundaryElement && el !== document.body && el !== document.documentElement) {
    // 1. Check for dialogs, drawers, popovers, menus, autocomplete
    const role = el.getAttribute?.('role');
    if (
      role === 'dialog' ||
      role === 'menu' ||
      role === 'listbox' ||
      role === 'combobox' ||
      el.hasAttribute?.('data-modal') ||
      el.hasAttribute?.('data-drawer') ||
      el.hasAttribute?.('data-popover')
    ) {
      return true;
    }

    // 2. Check for portal containers and global overlays
    if (
      el.classList?.contains('ui-modal') ||
      el.classList?.contains('ui-modal-backdrop') ||
      el.classList?.contains('global-search') ||
      el.classList?.contains('global-search__overlay')
    ) {
      return true;
    }

    // 3. Check for DOM-native scrollable containers (virtual grids, scroll rows, scrollable panels)
    const hasVerticalScroll = el.scrollHeight > el.clientHeight + 2;
    const hasHorizontalScroll = el.scrollWidth > el.clientWidth + 2;

    if (hasVerticalScroll || hasHorizontalScroll) {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY || style.overflow;
      const overflowX = style.overflowX || style.overflow;

      const isScrollableY = overflowY === 'auto' || overflowY === 'scroll';
      const isScrollableX = overflowX === 'auto' || overflowX === 'scroll';

      if (hasVerticalScroll && isScrollableY) {
        return true;
      }
      if (hasHorizontalScroll && isScrollableX) {
        return true;
      }
    }

    el = el.parentElement;
  }

  return false;
}

export function useDeckScrollTransition({
  isAnyDrawerOpen = false,
  isPreviewPlaying = false,
  innerScrollSelector = '.media-detail-page__inline-sections, [class*="discover-grid-wrapper"], [class*="inline-sections"]',
} = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isTransitioningRef = useRef(false);
  const deltaAccumulatorRef = useRef(0);
  const resetDeltaTimerRef = useRef(null);
  const cooldownUntilRef = useRef(0);

  const triggerSlide = useCallback((toScrolled) => {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    setIsScrolled(toScrolled);
    deltaAccumulatorRef.current = 0;

    // Transition lock for 320ms (pure ref, zero React state update to avoid landing freeze)
    setTimeout(() => {
      isTransitioningRef.current = false;
      cooldownUntilRef.current = Date.now() + 100;
    }, 320);
  }, []);

  const handleScrollToggle = useCallback(() => {
    triggerSlide(!isScrolled);
  }, [isScrolled, triggerSlide]);

  useEffect(() => {
    if (isAnyDrawerOpen || isPreviewPlaying) return undefined;

    const handleWheel = (e) => {
      // Ignore if currently transitioning
      if (isTransitioningRef.current) {
        return;
      }

      const target = e.target;
      if (isInteractiveScrollTarget(target)) {
        return;
      }

      const deltaY = e.deltaY;
      if (Math.abs(deltaY) < 2) return;

      // Accumulate deltas
      deltaAccumulatorRef.current += deltaY;
      if (resetDeltaTimerRef.current) clearTimeout(resetDeltaTimerRef.current);
      resetDeltaTimerRef.current = setTimeout(() => {
        deltaAccumulatorRef.current = 0;
      }, 200);

      // Slide 0: Hero View
      if (!isScrolled) {
        if (deltaAccumulatorRef.current >= 25) {
          triggerSlide(true);
        }
        return;
      }

      // Slide 1: Details / Content View
      if (isScrolled) {
        // Find active inner scrollable element
        let innerEl = null;
        if (innerScrollSelector) {
          innerEl = target.closest?.(innerScrollSelector);
          if (!innerEl) {
            const potential = document.querySelector(innerScrollSelector);
            if (potential && potential.contains(target)) {
              innerEl = potential;
            }
          }
        }

        // If scrolling down, let inner scroll container work naturally
        if (deltaY > 0) {
          return;
        }

        // Scrolling UP (deltaY < 0)
        if (innerEl && innerEl.scrollTop > 4) {
          // Inner scroll is not at the top yet, allow natural upward scroll inside container
          cooldownUntilRef.current = Date.now() + 150;
          return;
        }

        // Inner scroll is at top (scrollTop <= 4)
        // Check cooldown to avoid accidental bounce-backs
        if (Date.now() < cooldownUntilRef.current) {
          return;
        }

        if (deltaAccumulatorRef.current <= -25) {
          triggerSlide(false);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      if (resetDeltaTimerRef.current) clearTimeout(resetDeltaTimerRef.current);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isScrolled, isAnyDrawerOpen, isPreviewPlaying, innerScrollSelector, triggerSlide]);

  return {
    isScrolled,
    setIsScrolled: triggerSlide,
    handleScrollToggle,
  };
}

export default useDeckScrollTransition;
