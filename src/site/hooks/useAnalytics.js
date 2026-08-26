import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, initVitalsMonitoring } from '../lib/analytics';

/**
 * Hook to automatically track page navigation and initialize Core Web Vitals monitoring.
 * @param {string} [locale]
 */
export function useAnalytics(locale) {
  const location = useLocation();
  const vitalsInitialized = useRef(false);

  // Initialize Core Web Vitals once
  useEffect(() => {
    if (!vitalsInitialized.current) {
      initVitalsMonitoring();
      vitalsInitialized.current = true;
    }
  }, []);

  // Track pageviews on location changes
  useEffect(() => {
    const fullPath = location.pathname + (location.search || '');
    trackPageView(fullPath, locale);
  }, [location.pathname, location.search, locale]);
}

export default useAnalytics;
