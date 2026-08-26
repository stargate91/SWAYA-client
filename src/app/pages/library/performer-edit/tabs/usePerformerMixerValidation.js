import { useCallback } from 'react';

/**
 * Validates whether a raw/formatted value from a provider is present and non-empty.
 *
 * @param {any} rawVal - Raw value from provider
 * @param {string} [formatted] - Formatted display string
 * @returns {boolean}
 */
export function isNonEmptyProviderValue(rawVal, formatted) {
  if (rawVal === null || rawVal === undefined || rawVal === '') return false;
  if (formatted === '-') return false;
  if (typeof rawVal === 'object') {
    const values = Object.values(rawVal);
    if (values.length === 0) return false;
    if (values.every((v) => v === null || v === undefined || String(v).trim() === '')) return false;
  }
  if (String(rawVal).trim() === '') return false;
  return true;
}

/**
 * Hook to provide validation and emptiness checking helpers for performer mixer values.
 *
 * @returns {{
 *   hasValue: (rawVal: any, formatted?: string) => boolean
 * }}
 */
export function usePerformerMixerValidation() {
  const hasValue = useCallback((rawVal, formatted) => {
    return isNonEmptyProviderValue(rawVal, formatted);
  }, []);

  return {
    hasValue,
  };
}

export default usePerformerMixerValidation;
