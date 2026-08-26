import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to manage mobile drawer state with automatic route-change auto-closing.
 * @returns {{ isOpen: boolean, toggle: () => void, close: () => void, open: () => void }}
 */
export function useMobileDrawer() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsOpen(false);
  }

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    toggle,
    close,
    open,
  };
}

export default useMobileDrawer;
