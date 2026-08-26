import { useMemo, useCallback } from 'react';
import { useCopyFeedback } from './useCopyFeedback';

/**
 * Custom hook to manage item filtering, span layout, copyable states,
 * and copy feedback actions for DescriptionList.
 *
 * @param {object} params
 * @param {Array<object>} params.items - List of description list item objects
 * @param {boolean} [params.copyable=false] - Whether entire list is copyable by default
 * @param {number} [params.resetDelay=1500] - Copy feedback duration in ms
 */
export function useDescriptionListCopy({
  items,
  copyable = false,
  resetDelay = 1500,
} = {}) {
  const { copiedIndex, copy } = useCopyFeedback({ resetDelay });

  const activeItems = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) return [];
    return items.filter(
      (item) => item && item.value !== undefined && item.value !== null && item.value !== ''
    );
  }, [items]);

  const getItemMeta = useCallback(
    (item, idx) => {
      const isSpan2 = Boolean(item.fullWidth || item.span === 2);
      const isItemCopyable = copyable ? !item.noCopy : Boolean(item.copyable);
      const isCopied = copiedIndex === idx;
      const copyTitle = isCopied ? 'Copied!' : 'Copy to clipboard';

      return {
        isSpan2,
        isItemCopyable,
        isCopied,
        copyTitle,
        handleCopy: (e) => {
          e?.preventDefault?.();
          copy(item.value, idx);
        },
      };
    },
    [copiedIndex, copy, copyable]
  );

  return {
    activeItems,
    copiedIndex,
    copy,
    getItemMeta,
  };
}

export default useDescriptionListCopy;
