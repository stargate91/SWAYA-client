import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { usePeopleInfiniteQuery, useSettingsQuery } from '@/queries';

export function useAddPeopleLocalState({
  isAdult,
  searchQuery = '',
  optimisticStatus = {},
  t,
}) {
  const { data: settings } = useSettingsQuery();
  const listRef = useRef(null);
  const [roleFilter, setRoleFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [sortBy, setSortBy] = useState('library_count');
  const [sortDirection, setSortDirection] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('not_added'); // 'added', 'not_added'

  const hideGenderFilter = Boolean(
    isAdult && settings?.adult_gender_preference && settings.adult_gender_preference !== 'all'
  );

  const roleParam = useMemo(() => {
    if (roleFilter === 'all') return undefined;
    return {
      actor: 'Actor',
      director: 'Director',
      writer: 'Writer',
      sound: 'Sound',
    }[roleFilter];
  }, [roleFilter]);

  const genderParam = useMemo(() => {
    if (hideGenderFilter) return settings?.adult_gender_preference;
    return genderFilter !== 'all' ? genderFilter : undefined;
  }, [hideGenderFilter, settings, genderFilter]);

  const sortByParam = useMemo(() => {
    return sortBy === 'library_count' ? `library_count_${sortDirection}` : `name_${sortDirection}`;
  }, [sortBy, sortDirection]);

  // Fetch people with pagination and infinite scroll
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePeopleInfiniteQuery({
    include_inactive: true,
    is_active: statusFilter === 'added' ? true : (statusFilter === 'not_added' ? false : undefined),
    adult_only: isAdult,
    pageSize: 100,
    search: searchQuery.trim() || undefined,
    role: roleParam,
    gender: genderParam,
    sort_by: sortByParam,
  });

  const people = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) || [];
  }, [data]);

  const visiblePeople = useMemo(() => {
    return people.filter((person) => {
      const isActive = optimisticStatus[person.id] !== undefined
        ? optimisticStatus[person.id]
        : person.is_active;
      if (statusFilter === 'added') return isActive;
      if (statusFilter === 'not_added') return !isActive;
      return true;
    });
  }, [people, statusFilter, optimisticStatus]);

  useEffect(() => {
    if (listRef.current) {
      const { scrollHeight, clientHeight } = listRef.current;
      if (scrollHeight > 0 && scrollHeight <= clientHeight && hasNextPage && !isFetchingNextPage && !isLoading) {
        fetchNextPage();
      }
    }
  }, [visiblePeople, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

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
  const hasActiveFilters = roleFilter !== 'all' || (!hideGenderFilter && genderFilter !== 'all') || statusFilter !== 'all';

  const sortOptions = useMemo(() => [
    { value: 'library_count', label: t('library.sort.libraryCount') || 'Library Count' },
    { value: 'name', label: t('library.sort.name') || 'Name' },
  ], [t]);

  const roleOptions = useMemo(() => [
    { value: 'all', label: t('library.filter.all') || 'All Roles' },
    { value: 'actor', label: t('dynamic.roles.actor') || 'Actor' },
    { value: 'director', label: t('dynamic.roles.director') || 'Director' },
    { value: 'writer', label: t('dynamic.roles.writer') || 'Writer' },
    { value: 'sound', label: t('dynamic.roles.sound') || 'Composer' },
  ], [t]);

  const genderOptions = useMemo(() => [
    { value: 'all', label: t('library.filter.all') || 'All Genders' },
    { value: 'female', label: t('library.filter.female') || 'Female' },
    { value: 'male', label: t('library.filter.male') || 'Male' },
  ], [t]);

  const statusOptions = useMemo(() => [
    { value: 'not_added', label: t('library.filter.unfollowed') || 'Unfollowed' },
    { value: 'added', label: t('library.filter.followed') || 'Followed' },
  ], [t]);

  return {
    listRef,
    roleFilter,
    setRoleFilter,
    genderFilter,
    setGenderFilter,
    sortBy,
    setSortBy,
    sortDirection,
    toggleSortDirection,
    statusFilter,
    setStatusFilter,
    hideGenderFilter,
    isLoading,
    visiblePeople,
    hasSearchQuery,
    hasActiveFilters,
    sortOptions,
    roleOptions,
    genderOptions,
    statusOptions,
    handleScroll,
  };
}
