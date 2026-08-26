/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useOrganizerSort } from './useOrganizerSort';
import { scrollToTop } from '@/lib/domScroll';


export function useOrganizerPaginationSort({
  activeMainTab,
  activeExtrasTab,
  activeManualTab,
  totalItems = 0,
}) {
  const [inputSearch, setInputSearch] = useState('');
  const searchQuery = useDebounce(inputSearch, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(40);
  const { sortConfig, setSortConfig, handleSortToggle } = useOrganizerSort('source', 'asc');

  // Reset page, search, and sort config when tabs change
  useEffect(() => {
    setCurrentPage(1);
    setSortConfig({ key: 'source', direction: 'asc' });
    setInputSearch('');
  }, [activeMainTab, activeExtrasTab, activeManualTab, setSortConfig]);

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Sync current page with total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pageStart = totalItems === 0 ? 0 : ((currentPage - 1) * pageSize) + 1;
  const pageEnd = Math.min(totalItems, currentPage * pageSize);

  const setPageAndScrollToTop = (nextPage) => {
    setCurrentPage(nextPage);
    scrollToTop(false);
  };

  return {
    searchQuery,
    inputSearch,
    setInputSearch,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    sortConfig,
    setSortConfig,
    handleSortToggle,
    totalPages,
    pageStart,
    pageEnd,
    setPageAndScrollToTop,
  };
}
