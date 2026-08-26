/**
 * Privacy-friendly, zero-PII telemetry and event tracking module for SWAYA.
 * Aggregates modularized client, transport, and queue implementations.
 */

export {
  trackPageView,
  trackEvent,
  trackConversion,
  trackError,
  trackWebVital,
} from './telemetryClient.js';

export {
  sendCustomBeacon,
  IS_DEV,
} from './telemetryTransport.js';

export {
  telemetryQueue,
} from './telemetryQueue.js';


