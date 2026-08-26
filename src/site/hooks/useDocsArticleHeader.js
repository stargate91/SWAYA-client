import { useMemo } from 'react';
import { getDocDate } from '../data/docDates';

/**
 * Custom hook to prepare formatted presentation data and date strings for DocsArticleHeader.
 * @param {object} params
 * @param {object} params.activeDoc - Active document object
 * @param {string} [params.activeCategory] - Active category name
 * @param {number} [params.readingTimeMinutes] - Estimated reading time in minutes
 * @param {string} params.homeUrl - Localized home URL
 * @param {string} params.docsUrl - Localized docs hub URL
 * @param {Function} [params.t] - Translation function
 * @param {string} [params.locale] - Current locale code
 * @returns {object} Formatted article header properties
 */
export function useDocsArticleHeader({
  activeDoc,
  activeCategory,
  readingTimeMinutes = 3,
  homeUrl,
  docsUrl,
  t = (k) => k,
  locale = 'en',
}) {
  return useMemo(() => {
    const title = activeDoc?.title || '';
    const description = activeDoc?.description || null;
    const docDates = activeDoc?.slug ? getDocDate(activeDoc.slug) : null;

    let formattedModifiedDate = null;
    if (docDates?.modified) {
      try {
        formattedModifiedDate = new Date(docDates.modified).toLocaleDateString(locale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      } catch {
        formattedModifiedDate = docDates.modified;
      }
    }

    return {
      title,
      description,
      activeCategory,
      readingTimeMinutes,
      homeUrl,
      docsUrl,
      formattedModifiedDate,
      t,
    };
  }, [activeDoc, activeCategory, readingTimeMinutes, homeUrl, docsUrl, t, locale]);
}

export default useDocsArticleHeader;
