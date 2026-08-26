/**
 * Transport layer for telemetry events and beacons.
 */

export const IS_DEV = typeof process !== 'undefined' ? process.env?.NODE_ENV === 'development' : false;

/**
 * Dispatches privacy-safe navigator.sendBeacon data if custom telemetry endpoint is configured.
 * @param {string} type - Event type (e.g. 'pageview', 'event', 'error')
 * @param {object} data - Payload data
 */
export function sendCustomBeacon(type, data) {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  const endpoint = window.__SWAYA_TELEMETRY_ENDPOINT__;
  if (!endpoint) return;

  try {
    const payload = JSON.stringify({
      type,
      data,
      timestamp: Date.now(),
    });

    if (typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(endpoint, payload);
    } else if (typeof fetch === 'function') {
      fetch(endpoint, {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => undefined);
    }
  } catch {
    // Silently ignore telemetry transmission errors
  }
}
