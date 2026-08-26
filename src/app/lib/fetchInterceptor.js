import { getApiToken } from './ipc';
import { API_BASE } from './backend';

/**
 * Injects the X-API-Token header into fetch requests directed to the backend API.
 */
export function setupFetchInterceptor() {
  const token = getApiToken();
  if (!token) return;

  const originalFetch = window.fetch;
  window.fetch = async (url, options = {}) => {
    const urlStr = url.toString();
    if (urlStr.startsWith(API_BASE) || urlStr.startsWith('/api')) {
      let headers = options.headers;
      if (headers instanceof Headers) {
        headers = new Headers(headers);
        headers.set('X-API-Token', token);
      } else if (Array.isArray(headers)) {
        headers = [...headers, ['X-API-Token', token]];
      } else {
        headers = {
          ...headers,
          'X-API-Token': token,
        };
      }
      return originalFetch(url, { ...options, headers });
    }
    return originalFetch(url, options);
  };
}

export default setupFetchInterceptor;
