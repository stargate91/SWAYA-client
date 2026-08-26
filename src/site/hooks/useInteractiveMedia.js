import { useCallback } from 'react';

/**
 * Hook to provide keyboard and click accessibility bindings for interactive media cards.
 */
export function useInteractiveMedia({ onActivate, label }) {
  const handleClick = useCallback(() => {
    if (onActivate) onActivate();
  }, [onActivate]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onActivate) onActivate();
    }
  }, [onActivate]);

  return {
    role: 'button',
    tabIndex: 0,
    'aria-label': label,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };
}

export default useInteractiveMedia;
