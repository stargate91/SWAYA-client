import { useMemo } from 'react';

/**
 * Hook to derive context-sensitive parent field labels and hints according to the active scan mode.
 *
 * @param {object} [params={}]
 * @param {string} [params.scanMode] - Active scan mode ('movies' | 'tv' | 'scenes')
 * @param {Function} [params.t] - Translation function
 * @returns {{
 *   label: string,
 *   hint: string
 * }}
 */
export function useParentFieldLabels({ scanMode, t } = {}) {
  return useMemo(() => {
    const translate = typeof t === 'function' ? t : ((_, defaultVal) => defaultVal);

    if (scanMode === 'movies') {
      return {
        label: translate('organizer.overrideModal.labels.parentMovie') || 'Parent Movie',
        hint: translate('organizer.overrideModal.hints.parentIdMovie') || 'Pick the main movie that this extra file belongs to.',
      };
    }
    if (scanMode === 'tv') {
      return {
        label: translate('organizer.overrideModal.labels.parentEpisode') || 'Parent Episode',
        hint: translate('organizer.overrideModal.hints.parentIdEpisode') || 'Pick the main episode that this extra file belongs to.',
      };
    }
    if (scanMode === 'scenes') {
      return {
        label: translate('organizer.overrideModal.labels.parentScene') || 'Parent Scene',
        hint: translate('organizer.overrideModal.hints.parentIdScene') || 'Pick the main scene that this extra file belongs to.',
      };
    }
    return {
      label: translate('organizer.overrideModal.labels.parentMovieOrEpisode') || 'Parent Movie or Episode',
      hint: translate('organizer.overrideModal.hints.parentId') || 'Pick the main movie or episode that this extra file belongs to.',
    };
  }, [scanMode, t]);
}

export default useParentFieldLabels;
