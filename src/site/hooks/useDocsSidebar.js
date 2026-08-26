import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDocSections } from '../data/docQueries';
import { getDocPath } from '../lib/urlUtils';
import { useTranslation } from '@/providers/LanguageContext';
import { useDocSearch } from './useDocSearch';
import { useLocalizedUrls } from './useLocalizedUrls';

/**
 * Hook managing documentation sidebar category navigation, active guide tracking, and client search queries.
 * @param {string} [activeSlug] - Slug of the currently active documentation guide
 * @returns {{
 *   t: Function,
 *   searchQuery: string,
 *   filteredSections: Array<object>,
 *   searchAnnouncement: string|null,
 *   handleSearchChange: (query: string) => void,
 *   handleClearSearch: () => void
 * }}
 */
export function useDocsSidebar(activeSlug) {
  const { t, locale } = useTranslation();
  const { prefix } = useLocalizedUrls();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const docSections = useMemo(() => {
    return getDocSections(t, locale);
  }, [t, locale]);

  const rawFilteredSections = useDocSearch(docSections, searchQuery);

  const filteredSections = useMemo(() => {
    return rawFilteredSections.map((section) => ({
      ...section,
      items: (section.items || []).map((item) => ({
        ...item,
        path: getDocPath(item.slug, prefix),
        isActive: activeSlug === item.slug,
      })),
    }));
  }, [rawFilteredSections, prefix, activeSlug]);

  const searchAnnouncement = useMemo(() => {
    if (!searchQuery) return null;
    if (filteredSections.length === 0) {
      return t('docs.ui.noGuidesFound', { query: searchQuery });
    }
    const count = filteredSections.reduce((acc, s) => acc + s.items.length, 0);
    return `${count} ${t('docs.ui.allGuides', { defaultValue: 'guides' })}`;
  }, [searchQuery, filteredSections, t]);

  const handleSearchChange = useCallback(
    (value) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value && value.trim()) {
            next.set('q', value);
          } else {
            next.delete('q');
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const clearSearch = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('q');
        return next;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  return {
    searchQuery,
    setSearchQuery: handleSearchChange,
    clearSearch,
    filteredSections,
    searchAnnouncement,
    prefix,
    locale,
    t,
  };
}

export default useDocsSidebar;


