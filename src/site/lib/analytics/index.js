/**
 * Unified Analytics & Telemetry Layer
 * Exports page view tracking, event measurement, conversion funnels, error reporting, and Core Web Vitals monitoring.
 */

export {
  trackPageView,
  trackEvent,
  trackConversion,
  trackError,
  trackWebVital,
} from './telemetry';

export { initVitalsMonitoring } from './vitals';

