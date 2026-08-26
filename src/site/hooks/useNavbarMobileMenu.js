import { useEffect, useCallback } from 'react';

/**
 * Custom hook managing accessibility, keyboard navigation, and interactions for the NavbarMobileMenu drawer.
 * @param {object} params
 * @param {boolean} params.mobileMenuOpen - Open state of mobile drawer
 * @param {Function} [params.onClose] - Close handler callback
 * @returns {object} Drawer helper properties and event handlers
 */
export function useNavbarMobileMenu({ mobileMenuOpen, onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && mobileMenuOpen && onClose) {
        onClose();
      }
    },
    [mobileMenuOpen, onClose]
  );

  useEffect(() => {
    if (!mobileMenuOpen) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen, handleKeyDown]);

  return {
    handleKeyDown,
  };
}

export default useNavbarMobileMenu;
