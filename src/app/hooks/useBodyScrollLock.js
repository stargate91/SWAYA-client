import { useEffect } from 'react';

/**
 * Custom hook to lock body scroll when an overlay/modal is active.
 * Restores the previous body overflow value on teardown.
 *
 * @param {boolean} isLocked - Whether body scroll should be locked
 */
export function useBodyScrollLock(isLocked = false) {
  useEffect(() => {
    if (!isLocked || typeof document === 'undefined') {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}

export default useBodyScrollLock;
