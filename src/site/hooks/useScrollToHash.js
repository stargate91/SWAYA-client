import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles smooth scrolling to hash anchors or scrolling to the top on page change.
 */
export function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      const timeoutId = setTimeout(() => {
        const delayedEl = document.getElementById(targetId);
        if (delayedEl) {
          delayedEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.hash]);
}

export default useScrollToHash;
