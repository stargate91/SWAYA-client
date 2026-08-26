import { useEffect } from 'react';

/**
 * Custom hook to listen for Escape key press and trigger dismiss action.
 *
 * @param {Function} onDismiss - Callback to invoke on Escape
 * @param {boolean} [isEnabled=true] - Whether key listener is active
 */
export function useEscapeKeyDismiss(onDismiss, isEnabled = true) {
  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined' || typeof onDismiss !== 'function') {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDismiss, isEnabled]);
}

export default useEscapeKeyDismiss;
