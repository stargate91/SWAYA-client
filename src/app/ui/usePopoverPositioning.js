import { useState, useCallback, useEffect } from 'react';

/**
 * Calculate popover coordinates and upwards/downwards collision direction.
 *
 * @param {DOMRect} rect - Bounding client rect of trigger element
 * @param {'left' | 'right'} [align='right'] - Horizontal alignment
 * @param {Window | object} [windowObj] - Window reference
 * @returns {{ top: number, left: number, openUpwards: boolean }}
 */
export function calculatePopoverCoords(
  rect,
  align = 'right',
  windowObj = typeof window !== 'undefined' ? window : { innerHeight: 800, scrollY: 0, scrollX: 0 }
) {
  if (!rect) return { top: 0, left: 0, openUpwards: false };
  const spaceBelow = (windowObj.innerHeight || 800) - rect.bottom;
  const threshold = 320;
  const openUpwards = spaceBelow < threshold && rect.top > spaceBelow;

  const top = openUpwards
    ? rect.top + (windowObj.scrollY || 0) - 8
    : rect.bottom + (windowObj.scrollY || 0) + 8;

  let left = rect.left + (windowObj.scrollX || 0);
  if (align === 'right') {
    left = rect.right + (windowObj.scrollX || 0);
  }

  return { top, left, openUpwards };
}

/**
 * Hook to manage popover positioning, collision detection (upwards/downwards),
 * viewport resize/scroll updating, and outside click/Escape dismissal.
 *
 * @param {object} params
 * @param {React.RefObject} params.triggerRef - Reference to trigger element
 * @param {React.RefObject} params.popoverRef - Reference to rendered popover element
 * @param {boolean} params.isOpen - Popover visibility state
 * @param {() => void} params.onClose - Close callback handler
 * @param {'left' | 'right'} [params.align='right'] - Horizontal alignment
 * @param {Array<string>} [params.ignoreSelectors=[]] - CSS selectors to ignore when clicking outside
 * @returns {{
 *   coords: { top: number, left: number, openUpwards: boolean },
 *   updateCoords: () => void
 * }}
 */
export function usePopoverPositioning({
  triggerRef,
  popoverRef,
  isOpen,
  onClose,
  align = 'right',
  ignoreSelectors = [],
} = {}) {
  const [coords, setCoords] = useState({ top: 0, left: 0, openUpwards: false });

  const updateCoords = useCallback(() => {
    if (triggerRef?.current && typeof window !== 'undefined') {
      const rect = triggerRef.current.getBoundingClientRect?.();
      if (rect) {
        setCoords(calculatePopoverCoords(rect, align, window));
      }
    }
  }, [triggerRef, align]);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      updateCoords();
      window.addEventListener?.('scroll', updateCoords, true);
      window.addEventListener?.('resize', updateCoords);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener?.('scroll', updateCoords, true);
        window.removeEventListener?.('resize', updateCoords);
      }
    };
  }, [isOpen, updateCoords]);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    const handleClickOutside = (event) => {
      if (
        (triggerRef?.current && triggerRef.current.contains(event.target)) ||
        (popoverRef?.current && popoverRef.current.contains(event.target))
      ) {
        return;
      }

      if (ignoreSelectors.some((selector) => event.target.closest(selector))) {
        return;
      }

      onClose?.();
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener?.('mousedown', handleClickOutside, true);
    document.addEventListener?.('keydown', handleKeyDown);
    return () => {
      document.removeEventListener?.('mousedown', handleClickOutside, true);
      document.removeEventListener?.('keydown', handleKeyDown);
    };
  }, [isOpen, triggerRef, popoverRef, ignoreSelectors, onClose]);

  return {
    coords,
    updateCoords,
  };
}

export default usePopoverPositioning;
