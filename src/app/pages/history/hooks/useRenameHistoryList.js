import { useMemo } from 'react';

/**
 * Custom hook to evaluate rename history list state and empty state properties.
 *
 * @param {object} params
 * @param {Array} [params.history] - Array of batch history items
 * @param {Function} [params.t] - Translation function
 */
export function useRenameHistoryList({
  history,
  t = (k) => k,
} = {}) {
  const isEmpty = useMemo(() => {
    return !history || history.length === 0;
  }, [history]);

  const emptyTitle = useMemo(() => {
    return t('historyPage.emptyTitle') || 'No action history';
  }, [t]);

  const emptyDesc = useMemo(() => {
    return t('historyPage.emptyDesc') || 'Reversible file organization batches will be listed here.';
  }, [t]);

  return {
    isEmpty,
    emptyTitle,
    emptyDesc,
  };
}

export default useRenameHistoryList;
