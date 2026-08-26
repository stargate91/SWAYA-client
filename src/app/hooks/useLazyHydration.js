import { useState, useEffect, useRef } from 'react';

export function useLazyHydration({
  priority = false,
  rootMargin = '1000px',
  idleDelay = 400,
  scrollRootSelector = '.shell__content',
} = {}) {
  const [hasBeenVisible, setHasBeenVisible] = useState(priority);
  const containerRef = useRef(null);

  useEffect(() => {
    if (priority || hasBeenVisible) return undefined;

    const el = containerRef.current;
    let idleHandle = null;
    let timerHandle = null;

    // 1. IntersectionObserver with generous rootMargin
    let observer = null;
    if (el && typeof IntersectionObserver !== 'undefined') {
      const scrollRoot = scrollRootSelector ? document.querySelector(scrollRootSelector) : null;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setHasBeenVisible(true);
              break;
            }
          }
        },
        {
          root: scrollRoot || null,
          rootMargin,
          threshold: 0.01,
        }
      );
      observer.observe(el);
    }

    // 2. Idle-time background progressive prefetching
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        idleHandle = window.requestIdleCallback(
          () => {
            setHasBeenVisible(true);
          },
          { timeout: 2500 }
        );
      } else {
        timerHandle = setTimeout(() => {
          setHasBeenVisible(true);
        }, idleDelay);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (idleHandle && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timerHandle) {
        clearTimeout(timerHandle);
      }
    };
  }, [priority, hasBeenVisible, rootMargin, idleDelay, scrollRootSelector]);

  return {
    hasBeenVisible,
    containerRef,
  };
}

export default useLazyHydration;
