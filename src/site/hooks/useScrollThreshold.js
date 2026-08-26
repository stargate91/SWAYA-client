import { useState, useEffect } from 'react';

/**
 * Custom hook that monitors window scroll position against a threshold.
 * @param {number} threshold - Scroll Y offset threshold in pixels (default 20)
 * @returns {{ isScrolled: boolean }}
 */
export function useScrollThreshold(threshold = 20) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { isScrolled };
}

export default useScrollThreshold;
