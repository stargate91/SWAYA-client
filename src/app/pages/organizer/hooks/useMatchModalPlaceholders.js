import { useMemo } from 'react';

/**
 * Hook to compute context-aware query placeholder text for match modal search inputs.
 *
 * @param {object} [params={}]
 * @param {string} [params.mode] - Media search mode ('movie' | 'tv' | 'scene')
 * @param {boolean} [params.isTvMode=false] - Whether TV mode is active
 * @param {Function} [params.t] - Translation function
 * @returns {{
 *   queryPlaceholder: string
 * }}
 */
export function useMatchModalPlaceholders({ mode, isTvMode = false, t } = {}) {
  const queryPlaceholder = useMemo(() => {
    const translate = typeof t === 'function' ? t : ((_, defaultVal) => defaultVal);

    if (mode === 'scene') {
      return translate('organizer.details.matchModal.queryPlaceholderScene') || 'Search scene title...';
    }
    if (isTvMode) {
      return translate('organizer.details.matchModal.queryPlaceholderTv') || 'Search TV series...';
    }
    return translate('organizer.details.matchModal.queryPlaceholderMovie') || 'Search movie title...';
  }, [mode, isTvMode, t]);

  return {
    queryPlaceholder,
  };
}

export default useMatchModalPlaceholders;
