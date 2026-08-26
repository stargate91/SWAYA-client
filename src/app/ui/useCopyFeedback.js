import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Hook to manage clipboard copying with timed success feedback indicator.
 *
 * @param {object} [params]
 * @param {number} [params.resetDelay=1500] - Duration in ms before copied state resets
 * @returns {{
 *   copiedIndex: number | string | null,
 *   copy: (value: any, key: number | string) => void
 * }}
 */
export function useCopyFeedback({ resetDelay = 1500 } = {}) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const timeoutRef = useRef(null);

  const copy = useCallback(
    (value, key) => {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(String(value));
      }
      setCopiedIndex(key);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCopiedIndex(null);
      }, resetDelay);
    },
    [resetDelay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    copiedIndex,
    copy,
  };
}

export default useCopyFeedback;
