import { useMemo } from 'react';

/**
 * Hook to partition a tags structure or array into common and additional tags.
 *
 * @param {object | Array<string>} [tags={}] - Tags configuration object { common: [], all: [] } or array of tags
 * @returns {{
 *   commonTags: Array<string>,
 *   allTags: Array<string>,
 *   additionalTags: Array<string>,
 *   hasCommonTags: boolean,
 *   hasAdditionalTags: boolean
 * }}
 */
export function useTemplateTags(tags = {}) {
  return useMemo(() => {
    const commonTags = tags && Array.isArray(tags.common) ? tags.common : [];
    const allTags = tags && Array.isArray(tags.all)
      ? tags.all
      : Array.isArray(tags)
        ? tags
        : [];
    const additionalTags = allTags.filter((tag) => !commonTags.includes(tag));

    return {
      commonTags,
      allTags,
      additionalTags,
      hasCommonTags: commonTags.length > 0,
      hasAdditionalTags: additionalTags.length > 0,
    };
  }, [tags]);
}

export default useTemplateTags;
