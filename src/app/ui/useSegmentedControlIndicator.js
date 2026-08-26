import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Calculates CSS variables for active segmented control indicator.
 *
 * @param {HTMLElement | { offsetLeft: number, offsetWidth: number } | null} element
 * @returns {object}
 */
export function calculateSegmentedControlIndicatorStyle(element) {
  if (!element || !element.offsetWidth) return {};
  const { offsetLeft, offsetWidth } = element;
  return {
    '--active-offset': `${offsetLeft}px`,
    '--active-width': `${offsetWidth}px`,
  };
}

/**
 * Hook to measure active option geometry and compute sliding indicator styling.
 *
 * @param {object} params
 * @param {any} params.activeValue - Currently selected value
 * @param {Array<any>} [params.options] - Options array
 * @param {boolean} [params.animated=false] - Whether animated sliding indicator is active
 * @returns {{
 *   indicatorStyle: object,
 *   activeOptionRef: React.RefObject,
 *   updateIndicator: () => void
 * }}
 */
export function useSegmentedControlIndicator({
  activeValue,
  options = [],
  animated = false,
} = {}) {
  const activeOptionRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const updateIndicator = useCallback(() => {
    if (animated && activeOptionRef.current) {
      setIndicatorStyle(calculateSegmentedControlIndicatorStyle(activeOptionRef.current));
    }
  }, [animated]);

  useEffect(() => {
    updateIndicator();
  }, [activeValue, options, animated, updateIndicator]);

  useEffect(() => {
    if (!animated || typeof window === 'undefined') return;

    window.addEventListener?.('resize', updateIndicator);
    return () => window.removeEventListener?.('resize', updateIndicator);
  }, [animated, updateIndicator]);

  return {
    indicatorStyle,
    activeOptionRef,
    updateIndicator,
  };
}

export default useSegmentedControlIndicator;
