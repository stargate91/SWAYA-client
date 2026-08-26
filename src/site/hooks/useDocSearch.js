import { useMemo } from 'react';
import { filterDocSections } from '../data/docQueries';

/**
 * Reusable hook for filtering doc sections by search query.
 */
export function useDocSearch(docSections, searchQuery) {
  return useMemo(() => {
    return filterDocSections(docSections, searchQuery);
  }, [docSections, searchQuery]);
}

export default useDocSearch;
