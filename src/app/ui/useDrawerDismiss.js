import { useEffect } from 'react';

/**
 * Hook to manage Escape key and outside document click dismissal for Drawers.
 *
 * @param {object} params
 * @param {React.RefObject} params.drawerRef - Reference to drawer element
 * @param {boolean} params.isOpen - Drawer open state
 * @param {() => void} params.onClose - Close callback handler
 * @param {boolean} [params.hasBackdrop=true] - Whether a backdrop is rendered
 */
export function useDrawerDismiss({
  drawerRef,
  isOpen,
  onClose,
  hasBackdrop = true,
} = {}) {
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener?.('keydown', handleKeyDown);
    return () => document.removeEventListener?.('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || hasBackdrop || typeof document === 'undefined') return;

    const handleDocumentClick = (e) => {
      if (
        drawerRef?.current &&
        !drawerRef.current.contains(e.target) &&
        document.body?.contains(e.target)
      ) {
        onClose?.();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener?.('click', handleDocumentClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener?.('click', handleDocumentClick);
    };
  }, [isOpen, hasBackdrop, drawerRef, onClose]);
}

export default useDrawerDismiss;
