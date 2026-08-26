import { useMemo } from 'react';

/**
 * Custom hook to normalize peaks history data and evaluate empty state properties.
 *
 * @param {object} params
 * @param {Array|object} [params.peaksData] - Array of logs or { items: [...] }
 * @param {Function} [params.t] - Translation function
 */
export function usePeaksHistoryList({
  peaksData,
  t = (k) => k,
} = {}) {
  const items = useMemo(() => {
    return Array.isArray(peaksData) ? peaksData : (peaksData?.items || []);
  }, [peaksData]);

  const isEmpty = items.length === 0;

  const emptyTitle = useMemo(() => {
    return t('historyPage.peaksEmptyTitle') || 'No marked finishes';
  }, [t]);

  const emptyDesc = useMemo(() => {
    return t('historyPage.peaksEmptyDesc') || 'Moments you mark with the finish button during NSFW playback will be listed here.';
  }, [t]);

  return {
    items,
    isEmpty,
    emptyTitle,
    emptyDesc,
  };
}

export default usePeaksHistoryList;
