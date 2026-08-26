import { useState, useRef, useLayoutEffect } from 'react';

export function useTextTruncation(text, { threshold = 1 } = {}) {
  const targetRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const element = targetRef.current;
    if (!element) {
      return undefined;
    }

    let frameId = null;
    let resizeObserver = null;

    const measure = () => {
      setIsTruncated(element.scrollHeight > element.clientHeight + threshold);
    };

    const scheduleMeasure = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(measure);
    };

    scheduleMeasure();

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        scheduleMeasure();
      });
      resizeObserver.observe(element);
    }

    window.addEventListener('resize', scheduleMeasure);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [text, threshold]);

  return {
    targetRef,
    isTruncated,
  };
}

export default useTextTruncation;
