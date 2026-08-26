import { useRef, useEffect } from 'react';

/**
 * Automatically scrolls a target element into view when a condition (e.g. isHighlighted) becomes true.
 *
 * @param {boolean} isHighlighted - Trigger condition to scroll into view.
 * @param {Object} [options] - Options for scrollIntoView and timing.
 * @param {number} [options.delay=150] - Milliseconds to delay before triggering scrollIntoView.
 * @param {ScrollBehavior} [options.behavior='smooth'] - Scroll behavior.
 * @param {ScrollLogicalPosition} [options.block='center'] - Vertical alignment.
 * @param {ScrollLogicalPosition} [options.inline='nearest'] - Horizontal alignment.
 * @returns {React.MutableRefObject} ref to attach to the DOM element.
 */
export function useAutoScrollHighlight(
  isHighlighted = false,
  {
    delay = 150,
    behavior = 'smooth',
    block = 'center',
    inline = 'nearest',
  } = {}
) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (isHighlighted && elementRef.current) {
      const timer = setTimeout(() => {
        elementRef.current?.scrollIntoView({ behavior, block, inline });
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isHighlighted, delay, behavior, block, inline]);

  return elementRef;
}

export default useAutoScrollHighlight;
