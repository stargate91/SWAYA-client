import { IS_DEV, sendCustomBeacon } from './telemetryTransport.js';
import { telemetryQueue } from './telemetryQueue.js';


/**
 * Tracks a page view event across active privacy-focused analytics providers.
 * @param {string} url
 * @param {string} [locale]
 */
export function trackPageView(url, locale) {
  if (typeof window === 'undefined') return;

  const path = url || window.location.pathname;

  // Plausible Analytics
  if (typeof window.plausible === 'function') {
    window.plausible('pageview', { u: path, props: { locale } });
  }

  // Fathom Analytics
  if (typeof window.fathom === 'object' && typeof window.fathom.trackPageview === 'function') {
    window.fathom.trackPageview({ url: path });
  }

  // Google Analytics 4 (GA4 / gtag)
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
      locale,
    });
  }

  // Custom Beacon Endpoint (if configured)
  sendCustomBeacon('pageview', { path, locale, referrer: document.referrer });

  if (IS_DEV) {
    console.debug('[Telemetry] PageView:', path, { locale });
  }
}

/**
 * Tracks a custom user interaction event (e.g. docs search, language switch, video play).
 * @param {string} eventName
 * @param {Record<string, unknown>} [props]
 */
export function trackEvent(eventName, props = {}) {
  if (typeof window === 'undefined' || !eventName) return;

  // Plausible Analytics
  if (typeof window.plausible === 'function') {
    window.plausible(eventName, { props });
  }

  // Fathom Analytics
  if (typeof window.fathom === 'object' && typeof window.fathom.trackEvent === 'function') {
    window.fathom.trackEvent(eventName, props);
  }

  // Google Analytics 4 (GA4 / gtag)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, props);
  }

  // Custom Beacon Endpoint
  sendCustomBeacon('event', { name: eventName, props });
  telemetryQueue.enqueue('event', { name: eventName, props });

  if (IS_DEV) {
    console.debug('[Telemetry] Event:', eventName, props);
  }
}

/**
 * Tracks a commercial conversion or checkout intent (Stripe checkout funnel).
 * @param {Object} options
 * @param {string} [options.tier='lifetime']
 * @param {number} [options.price=39]
 * @param {string} [options.currency='EUR']
 * @param {string} [options.source='unknown']
 */
export function trackConversion({
  tier = 'lifetime',
  price = 39,
  currency = 'EUR',
  source = 'direct',
} = {}) {
  const conversionData = {
    tier,
    price,
    currency,
    source,
    timestamp: new Date().toISOString(),
  };

  trackEvent('checkout_click', conversionData);

  // Google Analytics 4 E-commerce Checkout Event
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency,
      value: price,
      items: [{ item_name: 'SWAYA Lifetime License', price, item_category: tier }],
      checkout_source: source,
    });
  }

  if (IS_DEV) {
    console.info('[Telemetry] Conversion Click:', conversionData);
  }
}

/**
 * Dispatches runtime error reports to Sentry or custom error ingest.
 * @param {Error|unknown} error
 * @param {Record<string, unknown>} [context]
 */
export function trackError(error, context = {}) {
  if (typeof window === 'undefined') return;

  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  // Sentry (if installed / loaded on window)
  if (typeof window.Sentry === 'object' && typeof window.Sentry.captureException === 'function') {
    window.Sentry.captureException(error, { extra: context });
  }

  // Google Analytics 4 Exception
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'exception', {
      description: errorMessage,
      fatal: false,
    });
  }

  // Custom Error Beacon
  sendCustomBeacon('error', {
    message: errorMessage,
    stack: errorStack,
    context,
    url: window.location.href,
  });

  if (IS_DEV) {
    console.error('[Telemetry] Error Captured:', errorMessage, context);
  }
}

/**
 * Tracks Core Web Vitals performance metrics (LCP, CLS, FID, INP, TTFB, FCP).
 * @param {Object} metric
 * @param {string} metric.name
 * @param {number} metric.value
 * @param {string} metric.rating
 * @param {number} metric.delta
 */
export function trackWebVital(metric) {
  if (!metric || !metric.name) return;

  const vitalValue = Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value);

  trackEvent(`web_vital_${metric.name.toLowerCase()}`, {
    value: vitalValue,
    rating: metric.rating,
    delta: Math.round(metric.delta || 0),
  });

  // Google Analytics 4 Web Vitals Event
  if (typeof window.gtag === 'function') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.rating,
      value: vitalValue,
      non_interaction: true,
    });
  }

  if (IS_DEV) {
    console.debug(`[Telemetry:WebVital] ${metric.name}:`, metric.value, `(${metric.rating})`);
  }
}
