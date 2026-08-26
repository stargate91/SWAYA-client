const RETRY_KEY = 'swaya_chunk_reload_timestamp';
const RELOAD_THROTTLE_MS = 15000;

/**
 * Determines if an error is caused by a missing chunk/asset (e.g. after a new deployment).
 * @param {unknown} error
 * @returns {boolean}
 */
export function isChunkLoadError(error) {
  if (!error) return false;
  const msg = (typeof error === 'string' ? error : error.message || String(error)).toLowerCase();
  return (
    msg.includes('unable to preload css') ||
    msg.includes('failed to fetch dynamically imported module') ||
    msg.includes('error loading dynamically imported module') ||
    msg.includes('loading chunk') ||
    msg.includes('dynamically imported module') ||
    msg.includes('failed to load module script')
  );
}

/**
 * Initializes Vite dynamic chunk preload error listener to seamlessly reload
 * the page on new deployments when older chunk hashes are no longer present on the server.
 */
export function setupPreloadErrorHandler() {
  if (typeof window === 'undefined') return;

  window.addEventListener('vite:preloadError', (event) => {
    // Prevent Vite's default behavior of propagating the unhandled rejection
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    const lastRetryStr = sessionStorage.getItem(RETRY_KEY);
    const lastRetry = lastRetryStr ? Number(lastRetryStr) : 0;
    const now = Date.now();

    // Prevent infinite reload loops if network is completely down
    if (!lastRetry || now - lastRetry > RELOAD_THROTTLE_MS) {
      sessionStorage.setItem(RETRY_KEY, String(now));
      window.location.reload();
    } else {
      console.error('[Swaya Deployment] Chunk reload throttled. Original error:', event?.payload || event);
    }
  });
}
