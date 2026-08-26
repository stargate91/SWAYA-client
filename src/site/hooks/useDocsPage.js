import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDocBySlug, getDocSections, getAllDocs } from '../data/docQueries';
import { getDocPath } from '../lib/urlUtils';
import { useTranslation } from '@/providers/LanguageContext';
import { useDocsArticleMeta } from './useDocsArticleMeta';
import { useDocsNavigation } from './useDocsNavigation';
import { useLocalizedUrls } from './useLocalizedUrls';
import { useDocSearch } from './useDocSearch';

/**
 * Main state and routing orchestrator hook for Documentation Hub and Guide Article pages.
 * @param {string} [slug] - Optional guide slug (undefined when viewing hub)
 * @returns {{
 *   isHub: boolean,
 *   activeDoc: object|null,
 *   slug: string|undefined,
 *   docSections: Array<object>,
 *   allDocs: Array<object>,
 *   headings: Array<object>,
 *   setHeadings: Function,
 *   relatedDocs: Array<object>,
 *   activeCategory: string,
 *   prevDoc: object|null,
 *   nextDoc: object|null,
 *   readingTimeMinutes: number,
 *   homeUrl: string,
 *   docsUrl: string,
 *   prefix: string,
 *   t: Function,
 *   locale: string
 * }}
 */
export function useDocsPage(slug) {
  const { t, locale } = useTranslation();
  const { prefix, homeUrl, docsUrl } = useLocalizedUrls();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [headings, setHeadings] = useState([]);
  const isHub = !slug;

  const docSections = useMemo(() => {
    return getDocSections(t, locale).map((section) => ({
      ...section,
      items: (section.items || []).map((item) => ({
        ...item,
        path: getDocPath(item.slug, prefix),
      })),
    }));
  }, [t, locale, prefix]);

  const filteredDocSections = useDocSearch(docSections, searchQuery);
  const sectionsToRender = searchQuery ? filteredDocSections : docSections;

  const allDocs = useMemo(() => {
    return getAllDocs(t, locale);
  }, [t, locale]);

  const activeDoc = useMemo(() => {
    if (isHub) return null;
    return getDocBySlug(slug, t, locale);
  }, [isHub, slug, t, locale]);

  const {
    relatedDocs,
    activeCategory,
    prevDoc,
    nextDoc,
    readingTimeMinutes,
  } = useDocsNavigation({
    activeDoc,
    allDocs,
    docSections,
    isHub,
    locale,
    prefix,
    t,
  });

  useDocsArticleMeta({
    isHub,
    activeDoc,
    allDocs,
    locale,
    prefix,
    t,
  });

  return {
    isHub,
    activeDoc,
    docSections,
    filteredDocSections,
    sectionsToRender,
    searchQuery,
    allDocs,
    activeCategory,
    prevDoc,
    nextDoc,
    relatedDocs,
    readingTimeMinutes,
    headings,
    setHeadings,
    locale,
    prefix,
    homeUrl,
    docsUrl,
    t,
  };
}

export default useDocsPage;

