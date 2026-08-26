import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useStudiosInfiniteQuery } from '@/queries';

export function useAddStudiosLocalState({
  isAdult,
  searchQuery = '',
  optimisticStatus = {},
  t,
}) {
  const [statusFilter, setStatusFilter] = useState('not_added'); // 'added', 'not_added', 'all'
  const [relationType, setRelationType] = useState('studio');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const listRef = useRef(null);

  const isActiveParam = statusFilter === 'added' ? true : (statusFilter === 'not_added' ? false : undefined);

  const queryParams = useMemo(() => ({
    search: searchQuery.trim() || undefined,
    isActive: isActiveParam,
    adultOnly: isAdult,
    relationType: !isAdult ? relationType : undefined,
    sortBy: `${sortBy}_${sortDirection}`,
    pageSize: 50,
  }), [searchQuery, isActiveParam, isAdult, relationType, sortBy, sortDirection]);

  // Fetch local studios
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useStudiosInfiniteQuery(queryParams);

  const studiosList = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) || [];
  }, [data]);

  const visibleStudios = useMemo(() => {
    return studiosList.filter((studio) => {
      const isActive = optimisticStatus[studio.id] !== undefined
        ? optimisticStatus[studio.id]
        : studio.is_active;
      if (statusFilter === 'added') return isActive;
      if (statusFilter === 'not_added') return !isActive;
      return true;
    });
  }, [studiosList, statusFilter, optimisticStatus]);

  useEffect(() => {
    if (listRef.current) {
      const { scrollHeight, clientHeight } = listRef.current;
      if (scrollHeight > 0 && scrollHeight <= clientHeight && hasNextPage && !isFetchingNextPage && !isLoading) {
        fetchNextPage();
      }
    }
  }, [visibleStudios, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 50 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const toggleSortDirection = useCallback(() => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasActiveFilters = statusFilter !== 'all';

  const statusOptions = useMemo(() => [
    { value: 'not_added', label: t('library.filter.unfollowed') || 'Unfollowed' },
    { value: 'added', label: t('library.filter.followed') || 'Followed' },
    { value: 'all', label: t('library.filter.all') || 'All' },
  ], [t]);

  const sortOptions = useMemo(() => [
    { value: 'name', label: t('library.sort.name') || 'Name' },
    { value: 'library_count', label: t('library.sort.libraryCount') || 'Library Count' },
  ], [t]);

  const typeOptions = useMemo(() => [
    { value: 'studio', label: t('library.studios.typeCompanies') || 'Companies' },
    { value: 'network', label: t('library.studios.typeNetworks') || 'Networks' },
  ], [t]);

  return {
    listRef,
    statusFilter,
    setStatusFilter,
    relationType,
    setRelationType,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    toggleSortDirection,
    isLoading,
    visibleStudios,
    hasSearchQuery,
    hasActiveFilters,
    statusOptions,
    sortOptions,
    typeOptions,
    handleScroll,
  };
}
