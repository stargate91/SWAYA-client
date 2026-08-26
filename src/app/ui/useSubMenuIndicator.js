import { useState, useEffect, useRef } from 'react';

/**
 * Hook to dynamically calculate top position and height of active sub-menu item
 * for animated sub-indicator rendering.
 *
 * @param {object} params
 * @param {boolean} params.isSubMenuVisible - Whether sub-menu is expanded/visible
 * @param {Array<{ id: string, label: string, isActive?: boolean }>} params.subItems - List of sub-menu items
 * @param {string} [params.activeSelector] - Query selector for active element
 * @returns {{
 *   containerRef: React.RefObject,
 *   indicatorStyle: { top?: string, height?: string, opacity: number }
 * }}
 */
export function useSubMenuIndicator({
  isSubMenuVisible,
  subItems = [],
  activeSelector = '.sub-item.active',
} = {}) {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 });

  const activeSubItem = subItems?.find((sub) => sub.isActive);

  useEffect(() => {
    if (isSubMenuVisible && containerRef?.current) {
      const activeEl = containerRef.current.querySelector?.(activeSelector);
      if (activeEl) {
        setIndicatorStyle({
          top: `${activeEl.offsetTop}px`,
          height: `${activeEl.offsetHeight}px`,
          opacity: 1,
        });
        return;
      }
    }
    setIndicatorStyle({ opacity: 0 });
  }, [isSubMenuVisible, subItems, activeSubItem, activeSelector]);

  return {
    containerRef,
    indicatorStyle,
  };
}

export default useSubMenuIndicator;
