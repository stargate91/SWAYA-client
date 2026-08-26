import { useState, useLayoutEffect } from 'react';

/**
 * Hook to responsively measure the virtual grid container width using ResizeObserver
 * and initial layout measurement for dynamic column count computation.
 *
 * @param {React.RefObject} containerRef - Reference to grid container element
 * @returns {{
 *   containerWidth: number,
 *   measuredWidth: number
 * }}
 */
export function useVirtualGridMeasurement(containerRef) {
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const el = containerRef?.current;
    if (!el || typeof window === 'undefined') return undefined;

    let rafId = null;

    const updateWidth = () => {
      const width = el.clientWidth || el.getBoundingClientRect?.().width || 0;
      if (width > 0 && Math.abs(containerWidth - width) > 0.5) {
        setContainerWidth(width);
      }
    };

    updateWidth();

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect?.width || 0;
          if (width > 0) {
            if (rafId) {
              cancelAnimationFrame(rafId);
            }
            rafId = requestAnimationFrame(() => {
              setContainerWidth((prev) => (Math.abs(prev - width) > 0.5 ? width : prev));
            });
          }
        }
      });

      resizeObserver.observe(el);
      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        resizeObserver.disconnect();
      };
    }
  }, [containerRef]);

  return {
    containerWidth,
    measuredWidth: containerWidth,
  };
}

export default useVirtualGridMeasurement;
