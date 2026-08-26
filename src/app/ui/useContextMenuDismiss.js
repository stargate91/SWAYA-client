import { useEffect } from 'react';

/**
 * Calculates clamped context menu coordinates to keep the menu inside viewport bounds.
 *
 * @param {number} x - Target horizontal position
 * @param {number} y - Target vertical position
 * @param {DOMRect | { width: number, height: number } | null} menuRect - Menu element bounds
 * @param {Window | object} [windowObj] - Window reference
 * @returns {{ x: number, y: number }}
 */
export function calculateContextMenuPosition(
  x,
  y,
  menuRect,
  windowObj = typeof window !== 'undefined' ? window : { innerWidth: 1920, innerHeight: 1080 }
) {
  if (!menuRect) return { x, y };
  const viewportWidth = windowObj.innerWidth || 1920;
  const viewportHeight = windowObj.innerHeight || 1080;

  let adjustedX = x;
  let adjustedY = y;

  if (x + menuRect.width > viewportWidth) {
    adjustedX = Math.max(0, viewportWidth - menuRect.width - 8);
  }
  if (y + menuRect.height > viewportHeight) {
    adjustedY = Math.max(0, viewportHeight - menuRect.height - 8);
  }

  return { x: adjustedX, y: adjustedY };
}

/**
 * Hook to manage context menu outside click/contextmenu/Escape dismissal and viewport bounds clamping.
 *
 * @param {object} params
 * @param {React.RefObject} params.menuRef - Reference to rendered context menu element
 * @param {() => void} params.onClose - Dismiss callback
 * @param {number} [params.x] - Horizontal coordinate
 * @param {number} [params.y] - Vertical coordinate
 */
export function useContextMenuDismiss({ menuRef, onClose, x, y } = {}) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    function handleClickOutside(event) {
      if (menuRef?.current && !menuRef.current.contains(event.target)) {
        onClose?.();
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose?.();
      }
    }

    document.addEventListener?.('mousedown', handleClickOutside, true);
    document.addEventListener?.('contextmenu', handleClickOutside, true);
    document.addEventListener?.('keydown', handleKeyDown);

    return () => {
      document.removeEventListener?.('mousedown', handleClickOutside, true);
      document.removeEventListener?.('contextmenu', handleClickOutside, true);
      document.removeEventListener?.('keydown', handleKeyDown);
    };
  }, [menuRef, onClose]);

  useEffect(() => {
    if (menuRef?.current && x !== undefined && y !== undefined && typeof window !== 'undefined') {
      const menuRect = menuRef.current.getBoundingClientRect?.();
      if (menuRect) {
        const { x: adjustedX, y: adjustedY } = calculateContextMenuPosition(x, y, menuRect, window);
        menuRef.current.style.setProperty('--context-menu-left', `${adjustedX}px`);
        menuRef.current.style.setProperty('--context-menu-top', `${adjustedY}px`);
      }
    }
  }, [menuRef, x, y]);
}

export default useContextMenuDismiss;
