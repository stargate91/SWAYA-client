// Mock API implementation for SWAYA Web Demo
import { dispatchMockRequest } from './mock/handlers/router';

export function setupMockApi() {
  const originalFetch = window.fetch;

  window.fetch = async (url, options = {}) => {
    const urlStr = typeof url === 'string' ? url : url.toString();
    
    // Intercept database/media server APIs
    if (urlStr.includes('/api/')) {
      // Extract the path after /api/ or /api/v1/ and strip query parameters
      let path = urlStr;
      if (path.includes('/api/v1/')) {
        path = path.slice(path.indexOf('/api/v1/') + 8);
      } else if (path.includes('/api/')) {
        path = path.slice(path.indexOf('/api/') + 5);
      }
      if (path.includes('?')) {
        path = path.split('?')[0];
      }
      
      // Clean up leading/trailing slashes
      if (path.startsWith('/')) path = path.slice(1);
      if (path.endsWith('/')) path = path.slice(0, -1);

      return dispatchMockRequest(path, options, urlStr);
    }

    return originalFetch(url, options);
  };
}
