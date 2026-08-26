import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isChunkLoadError, setupPreloadErrorHandler } from '../../src/app/lib/preloadErrorHandler';

describe('preloadErrorHandler', () => {
  describe('isChunkLoadError', () => {
    it('detects Vite CSS preload errors', () => {
      const error = new Error('Unable to preload CSS for https://swaya.xyz/assets/Card-CbiqeMMw.css');
      expect(isChunkLoadError(error)).toBe(true);
    });

    it('detects dynamic import fetch failures', () => {
      const error = new Error('Failed to fetch dynamically imported module: https://swaya.xyz/assets/DashboardPage.js');
      expect(isChunkLoadError(error)).toBe(true);
    });

    it('detects chunk loading failures', () => {
      const error = new Error('Loading chunk 42 failed.');
      expect(isChunkLoadError(error)).toBe(true);
    });

    it('detects string errors', () => {
      expect(isChunkLoadError('error loading dynamically imported module')).toBe(true);
    });

    it('returns false for unrelated errors', () => {
      const error = new TypeError('Cannot read properties of undefined (reading "map")');
      expect(isChunkLoadError(error)).toBe(false);
      expect(isChunkLoadError(null)).toBe(false);
      expect(isChunkLoadError(undefined)).toBe(false);
    });
  });

  describe('setupPreloadErrorHandler', () => {
    let addEventListenerSpy;
    let mockSessionStorage;

    beforeEach(() => {
      const storage = {};
      mockSessionStorage = {
        getItem: vi.fn((key) => storage[key] || null),
        setItem: vi.fn((key, value) => {
          storage[key] = String(value);
        }),
        removeItem: vi.fn((key) => {
          delete storage[key];
        }),
      };

      vi.stubGlobal('sessionStorage', mockSessionStorage);
      vi.stubGlobal('window', {
        addEventListener: vi.fn(),
        location: { reload: vi.fn() },
      });

      addEventListenerSpy = window.addEventListener;
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('registers vite:preloadError event listener on window', () => {
      setupPreloadErrorHandler();
      expect(addEventListenerSpy).toHaveBeenCalledWith('vite:preloadError', expect.any(Function));
    });

    it('triggers window.location.reload when event is fired', () => {
      setupPreloadErrorHandler();
      const handler = addEventListenerSpy.mock.calls.find(
        (call) => call[0] === 'vite:preloadError'
      )[1];

      const mockEvent = {
        preventDefault: vi.fn(),
        payload: new Error('Unable to preload CSS for https://swaya.xyz/assets/Card-CbiqeMMw.css'),
      };

      handler(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        'swaya_chunk_reload_timestamp',
        expect.any(String)
      );
      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });

    it('throttles rapid reload loops within 15 seconds', () => {
      mockSessionStorage.getItem.mockReturnValue(String(Date.now())); // Just reloaded
      setupPreloadErrorHandler();

      const handler = addEventListenerSpy.mock.calls.find(
        (call) => call[0] === 'vite:preloadError'
      )[1];

      const mockEvent = {
        preventDefault: vi.fn(),
        payload: new Error('Unable to preload CSS for https://swaya.xyz/assets/Card-CbiqeMMw.css'),
      };

      handler(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(window.location.reload).not.toHaveBeenCalled();
    });
  });
});
