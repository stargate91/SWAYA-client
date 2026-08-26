import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook to manage individual toast timer lifecycle, pause on hover, and automatic removal.
 *
 * @param {object} params
 * @param {string} params.id - Toast identifier
 * @param {number} params.duration - Total duration in milliseconds
 * @param {(id: string) => void} params.onRemove - Removal callback
 * @returns {{
 *   startTimer: () => void,
 *   pauseTimer: () => void,
 *   handleClose: () => void
 * }}
 */
export function useToastTimer({ id, duration, onRemove }) {
  const timerRef = useRef(null);
  const remainingTimeRef = useRef(duration);
  const startTimeRef = useRef(null);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onRemove(id);
    }, remainingTimeRef.current);
  }, [id, onRemove]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      remainingTimeRef.current -= Date.now() - startTimeRef.current;
    }
  }, []);

  const handleClose = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onRemove(id);
  }, [id, onRemove]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [startTimer]);

  return {
    startTimer,
    pauseTimer,
    handleClose,
  };
}

export default useToastTimer;
