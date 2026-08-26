import { useState, useCallback, useLayoutEffect, useEffect } from 'react';

/**
 * Calculate menu coordinates relative to the split button container.
 *
 * @param {DOMRect | null} rect - Bounding client rect of container element
 * @param {Window | object} [windowObj] - Window reference
 * @returns {{ top: number, left: number, width: number }}
 */
export function calculateSplitButtonMenuCoords(
  rect,
  windowObj = typeof window !== 'undefined' ? window : { scrollY: 0, scrollX: 0 }
) {
  if (!rect) return { top: 0, left: 0, width: 0 };
  return {
    top: rect.bottom + (windowObj.scrollY || 0) + 6,
    left: rect.left + (windowObj.scrollX || 0),
    width: rect.width,
  };
}

/**
 * Hook to manage coordinates, viewport listeners, and outside click/Escape dismissal
 * for SplitButton dropdown menu.
 *
 * @param {object} params
 * @param {React.RefObject} params.containerRef - Reference to split button container
 * @param {boolean} params.isOpen - Dropdown menu open state
 * @param {() => void} params.onClose - Close callback handler
 * @param {string} [params.menuSelector] - Menu class selector to ignore on outside click
 * @returns {{
 *   menuCoords: { top: number, left: number, width: number },
 *   updateMenuCoords: () => void
 * }}
 */
export function useSplitButtonMenu({
  containerRef,
  isOpen,
  onClose,
  menuSelector = 'split-button-menu',
} = {}) {
  const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0, width: 0 });

  const updateMenuCoords = useCallback(() => {
    if (containerRef?.current && typeof window !== 'undefined') {
      const rect = containerRef.current.getBoundingClientRect?.();
      if (rect) {
        setMenuCoords(calculateSplitButtonMenuCoords(rect, window));
      }
    }
  }, [containerRef]);

  useLayoutEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      updateMenuCoords();
      window.addEventListener?.('scroll', updateMenuCoords, true);
      window.addEventListener?.('resize', updateMenuCoords);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener?.('scroll', updateMenuCoords, true);
        window.removeEventListener?.('resize', updateMenuCoords);
      }
    };
  }, [isOpen, updateMenuCoords]);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    function handleClickOutside(event) {
      if (containerRef?.current && !containerRef.current.contains(event.target)) {
        if (event.target?.closest?.(`.${menuSelector}`)) return;
        onClose?.();
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose?.();
      }
    }

    document.addEventListener?.('mousedown', handleClickOutside);
    document.addEventListener?.('keydown', handleKeyDown);
    return () => {
      document.removeEventListener?.('mousedown', handleClickOutside);
      document.removeEventListener?.('keydown', handleKeyDown);
    };
  }, [isOpen, containerRef, menuSelector, onClose]);

  return {
    menuCoords,
    updateMenuCoords,
  };
}

export default useSplitButtonMenu;
