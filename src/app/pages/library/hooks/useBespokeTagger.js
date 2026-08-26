import { useCallback } from 'react';

/**
 * Hook to manage custom tag update mutations for bespoke media items.
 *
 * @param {object} params
 * @param {object} params.state - Media detail state object containing item, cleanId, effectiveId
 * @param {object} params.mutations - Mutation handlers including updateStatusMutation
 * @param {string} params.type - Media type
 * @returns {{
 *   customTags: Array<any>,
 *   suggestedTags: Array<any>,
 *   isAdult: boolean,
 *   handleUpdateTags: (nextTags: Array<any>) => void
 * }}
 */
export function useBespokeTagger({ state = {}, mutations = {}, type }) {
  const { item, cleanId, effectiveId } = state;
  const { updateStatusMutation } = mutations;

  const handleUpdateTags = useCallback(
    (nextTags) => {
      if (updateStatusMutation?.mutate) {
        updateStatusMutation.mutate({
          itemId: effectiveId,
          tvId: cleanId,
          payload: {
            custom_tags: nextTags,
            media_type: type,
          },
        });
      }
    },
    [effectiveId, cleanId, type, updateStatusMutation]
  );

  return {
    customTags: item?.custom_tags,
    suggestedTags: item?.suggested_tags,
    isAdult: item?.is_adult,
    handleUpdateTags,
  };
}

export default useBespokeTagger;
