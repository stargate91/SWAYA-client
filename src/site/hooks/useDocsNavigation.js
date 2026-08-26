import { useMemo, useEffect } from 'react';
import { getRelatedDocs } from '../data/docQueries';
import { getDocPath } from '../lib/urlUtils';

/**
 * Hook computing related documentation guides, next/previous pagination, category labels, and estimated reading time.
 * @param {object} options
 * @param {object|null} [options.activeDoc] - Currently viewed guide
 * @param {Array<object>} options.allDocs - All available guides
 * @param {Array<object>} options.docSections - Structured category sections
 * @param {boolean} [options.isHub] - Whether on documentation hub
 * @param {string} [options.locale='en'] - Active locale
 * @param {string} [options.prefix=''] - Localized path prefix
 * @param {Function} options.t - Translation function
 * @returns {{
 *   relatedDocs: Array<object>,
 *   activeCategory: string,
 *   prevDoc: object|null,
 *   nextDoc: object|null,
 *   readingTimeMinutes: number
 * }}
 */
export function useDocsNavigation({ activeDoc, allDocs, docSections, isHub, locale, prefix = '', t }) {
  const activeDocSlug = activeDoc?.slug;
  const relatedDocs = useMemo(() => {
    if (!activeDocSlug) return [];
    return getRelatedDocs(activeDocSlug, t, locale).map((doc) => ({
      ...doc,
      path: getDocPath(doc.slug, prefix),
    }));
  }, [activeDocSlug, t, locale, prefix]);

  const activeCategory = useMemo(() => {
    if (!activeDoc) return t('docs.ui.defaultCategory');
    const section = docSections.find((sec) =>
      sec.items.some((item) => item.slug === activeDoc.slug)
    );
    return section?.category || t('docs.ui.defaultCategory');
  }, [docSections, activeDoc, t]);

  const { prevDoc, nextDoc } = useMemo(() => {
    if (!activeDoc) return { prevDoc: null, nextDoc: null };
    const currentIndex = allDocs.findIndex((d) => d.slug === activeDoc.slug);
    const prev = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
    const next = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;
    return {
      prevDoc: prev ? { ...prev, path: getDocPath(prev.slug, prefix) } : null,
      nextDoc: next ? { ...next, path: getDocPath(next.slug, prefix) } : null,
    };
  }, [allDocs, activeDoc, prefix]);

  const readingTimeMinutes = useMemo(() => {
    if (!activeDoc?.content) return 1;
    const words = activeDoc.content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [activeDoc]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeDoc?.slug, isHub]);

  return {
    relatedDocs,
    activeCategory,
    prevDoc,
    nextDoc,
    readingTimeMinutes,
  };
}

export default useDocsNavigation;

