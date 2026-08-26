import { useMemo, useCallback } from 'react';
import { buildStructurePreviewModel } from '../config';

export const TONE_COLOR_MAP = {
  folder: 'primary',
  success: 'success',
  adult: 'danger',
  muted: 'muted',
  default: 'secondary',
};

/**
 * Hook to build and memoize the structure preview model and resolve tone colors.
 *
 * @param {object} form - Settings form data
 * @param {Function} t - Translation function
 * @param {string} [filterType] - Filter type
 * @returns {{
 *   model: object,
 *   resolveToneColor: (tone?: string) => string
 * }}
 */
export function useStructurePreviewModel(form, t, filterType) {
  const model = useMemo(
    () => buildStructurePreviewModel(form, t, filterType),
    [form, t, filterType]
  );

  const resolveToneColor = useCallback((tone = 'default') => {
    return TONE_COLOR_MAP[tone] || 'secondary';
  }, []);

  return {
    model,
    resolveToneColor,
  };
}

export default useStructurePreviewModel;
