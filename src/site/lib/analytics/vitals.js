import { trackWebVital } from './telemetry';

/**
 * Lightweight, zero-dependency Core Web Vitals collector using native PerformanceObserver.
 */
export function initVitalsMonitoring() {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return;

  // Track TTFB (Time to First Byte)
  try {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries && navEntries.length > 0) {
      const nav = navEntries[0];
      const ttfb = nav.responseStart - nav.requestStart;
      if (ttfb > 0) {
        trackWebVital({
          name: 'TTFB',
          value: ttfb,
          rating: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor',
        });
      }
    }
  } catch {
    // Navigation timing not supported or unavailable
  }

  // Track FCP (First Contentful Paint)
  try {
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          trackWebVital({
            name: 'FCP',
            value: entry.startTime,
            rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor',
          });
          paintObserver.disconnect();
        }
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });
  } catch {
    // Paint timing observer not supported
  }

  // Track LCP (Largest Contentful Paint)
  try {
    let largestLcp = 0;
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry && lastEntry.startTime > largestLcp) {
        largestLcp = lastEntry.startTime;
      }
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Report final LCP on page hide / unload
    window.addEventListener(
      'visibilitychange',
      () => {
        if (document.visibilityState === 'hidden' && largestLcp > 0) {
          trackWebVital({
            name: 'LCP',
            value: largestLcp,
            rating: largestLcp < 2500 ? 'good' : largestLcp < 4000 ? 'needs-improvement' : 'poor',
          });
          largestLcp = 0;
        }
      },
      { once: true }
    );
  } catch {
    // LCP observer not supported
  }

  // Track CLS (Cumulative Layout Shift)
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
    });

    clsObserver.observe({ type: 'layout-shift', buffered: true });

    window.addEventListener(
      'visibilitychange',
      () => {
        if (document.visibilityState === 'hidden') {
          trackWebVital({
            name: 'CLS',
            value: clsValue,
            rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
          });
        }
      },
      { once: true }
    );
  } catch {
    // Layout shift observer not supported
  }

  // Track INP / FID (Interaction / First Input Delay)
  try {
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const delay = entry.processingStart - entry.startTime;
        trackWebVital({
          name: 'FID',
          value: delay,
          rating: delay < 100 ? 'good' : delay < 300 ? 'needs-improvement' : 'poor',
        });
        fidObserver.disconnect();
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch {
    // First input observer not supported
  }
}
