import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Unified, type-safe URL query parameters hook.
 *
 * @returns {{
 *   searchParams: URLSearchParams,
 *   setSearchParams: Function,
 *   getParam: (key: string, defaultVal?: string | null) => string | null,
 *   getString: (key: string, defaultVal?: string) => string,
 *   getNumber: (key: string, defaultVal?: number) => number,
 *   getBoolean: (key: string, defaultVal?: boolean) => boolean,
 *   setParam: (key: string, value: any, options?: { replace?: boolean }) => void,
 *   setParams: (updates: Record<string, any>, options?: { replace?: boolean }) => void,
 *   removeParam: (key: string, options?: { replace?: boolean }) => void,
 *   clearParams: (options?: { replace?: boolean }) => void,
 * }}
 */
export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = useCallback(
    (key, defaultVal = null) => {
      const val = searchParams.get(key);
      if (val !== null) return val;
      if (typeof window !== 'undefined' && window.location) {
        const windowSearch = new URLSearchParams(window.location.search);
        if (windowSearch.has(key)) {
          return windowSearch.get(key);
        }
      }
      return defaultVal;
    },
    [searchParams]
  );

  const getString = useCallback(
    (key, defaultVal = '') => {
      const val = getParam(key, null);
      return val !== null && val !== undefined ? val : defaultVal;
    },
    [getParam]
  );

  const getNumber = useCallback(
    (key, defaultVal = 0) => {
      const val = getParam(key, null);
      if (val === null || val === undefined || val === '') return defaultVal;
      const num = Number(val);
      return Number.isNaN(num) ? defaultVal : num;
    },
    [getParam]
  );

  const getBoolean = useCallback(
    (key, defaultVal = false) => {
      const val = getParam(key, null);
      if (val === null || val === undefined) return defaultVal;
      const lower = String(val).toLowerCase();
      if (lower === 'true' || lower === '1' || lower === 'yes') return true;
      if (lower === 'false' || lower === '0' || lower === 'no') return false;
      return defaultVal;
    },
    [getParam]
  );

  const setParam = useCallback(
    (key, value, options = { replace: true }) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value === null || value === undefined || value === '') {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
        return next;
      }, options);
    },
    [setSearchParams]
  );

  const setParams = useCallback(
    (updates, options = { replace: true }) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(updates || {}).forEach(([key, value]) => {
          if (value === null || value === undefined || value === '') {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        });
        return next;
      }, options);
    },
    [setSearchParams]
  );

  const removeParam = useCallback(
    (key, options = { replace: true }) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete(key);
        return next;
      }, options);
    },
    [setSearchParams]
  );

  const clearParams = useCallback(
    (options = { replace: true }) => {
      setSearchParams(new URLSearchParams(), options);
    },
    [setSearchParams]
  );

  return useMemo(
    () => ({
      searchParams,
      setSearchParams,
      getParam,
      getString,
      getNumber,
      getBoolean,
      setParam,
      setParams,
      removeParam,
      clearParams,
    }),
    [
      searchParams,
      setSearchParams,
      getParam,
      getString,
      getNumber,
      getBoolean,
      setParam,
      setParams,
      removeParam,
      clearParams,
    ]
  );
}

export default useQueryParams;
