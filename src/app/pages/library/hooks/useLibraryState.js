import { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { useSettingsQuery } from '@/queries/settingsQueries';
import {
  useLibraryQuery,
  useCollectionsQuery,
  useLibraryFiltersQuery,
  useLibraryInfiniteQuery,
  useLibraryCountsQuery,
} from '@/queries/libraryQueries';
import { useLibraryTags } from './useLibraryTags';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';
import { usePaginationVisibility } from '@/hooks/usePaginationVisibility';
import { useTranslation } from '@/providers/LanguageContext';
import { Clapperboard, Tv, Users, Tag, Layers, Video, Film } from '@/ui/icons';
import {
  getLibraryEmptyStateKey,
  getLibraryTabTranslationKey,
  isLibraryCollectionTab,
  isLibraryPeopleTab,
  isLibraryTagsTab,
  resolveLibraryBackendTab,
} from '@/lib/libraryTabs';

import { useLibraryModeStore, isPaginationInfinite } from '@/stores/useLibraryModeStore';

const DEFAULT_FILTERS = {
  ownershipFilter: 'owned',
  watchedFilter: 'all',
  genreFilter: '',
  collectionStatusFilter: 'all',
  peopleRoleFilter: 'all',
  genderFilter: 'all',
  favoriteFilter: 'all',
  decadeFilter: 'all',
  yearFilter: '',
  performerFilter: '',
  studioFilter: '',
  networkFilter: '',
  hairColorFilter: '',
  ethnicityFilter: '',
  eyeColorFilter: '',
  tattoosFilter: '',
  piercingsFilter: '',
  breastTypeFilter: '',
  breastSizeFilter: '',
  buttShapeFilter: '',
  buttSizeFilter: '',
  selectedTags: [],
  studioTypeFilter: '',
};

export function useLibraryState({ initialTab = 'movies', lockTab = false, includeTagsTab = false } = {}) {
  const location = useLocation();
  const currentPath = location.pathname;
  const savedState = useNavigationStore.getState().getPageState(currentPath);

  const { data: settings, isLoading } = useSettingsQuery();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState(savedState.activeTab ?? initialTab);
  const [searchQuery, setSearchQuery] = useState(savedState.searchQuery ?? '');

  const [filters, setFilters] = useState(() => ({
    ownershipFilter: savedState.ownershipFilter ?? DEFAULT_FILTERS.ownershipFilter,
    watchedFilter: savedState.watchedFilter ?? DEFAULT_FILTERS.watchedFilter,
    genreFilter: savedState.genreFilter ?? DEFAULT_FILTERS.genreFilter,
    collectionStatusFilter: savedState.collectionStatusFilter ?? DEFAULT_FILTERS.collectionStatusFilter,
    peopleRoleFilter: savedState.peopleRoleFilter ?? DEFAULT_FILTERS.peopleRoleFilter,
    genderFilter: savedState.genderFilter ?? DEFAULT_FILTERS.genderFilter,
    favoriteFilter: savedState.favoriteFilter ?? DEFAULT_FILTERS.favoriteFilter,
    decadeFilter: savedState.decadeFilter ?? DEFAULT_FILTERS.decadeFilter,
    yearFilter: savedState.yearFilter ?? DEFAULT_FILTERS.yearFilter,
    performerFilter: savedState.performerFilter ?? DEFAULT_FILTERS.performerFilter,
    studioFilter: savedState.studioFilter ?? DEFAULT_FILTERS.studioFilter,
    networkFilter: savedState.networkFilter ?? DEFAULT_FILTERS.networkFilter,
    hairColorFilter: savedState.hairColorFilter ?? DEFAULT_FILTERS.hairColorFilter,
    ethnicityFilter: savedState.ethnicityFilter ?? DEFAULT_FILTERS.ethnicityFilter,
    eyeColorFilter: savedState.eyeColorFilter ?? DEFAULT_FILTERS.eyeColorFilter,
    tattoosFilter: savedState.tattoosFilter ?? DEFAULT_FILTERS.tattoosFilter,
    piercingsFilter: savedState.piercingsFilter ?? DEFAULT_FILTERS.piercingsFilter,
    breastTypeFilter: savedState.breastTypeFilter ?? DEFAULT_FILTERS.breastTypeFilter,
    breastSizeFilter: savedState.breastSizeFilter ?? DEFAULT_FILTERS.breastSizeFilter,
    buttShapeFilter: savedState.buttShapeFilter ?? DEFAULT_FILTERS.buttShapeFilter,
    buttSizeFilter: savedState.buttSizeFilter ?? DEFAULT_FILTERS.buttSizeFilter,
    selectedTags: savedState.selectedTags ?? DEFAULT_FILTERS.selectedTags,
    studioTypeFilter: savedState.studioTypeFilter ?? DEFAULT_FILTERS.studioTypeFilter,
  }));

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: typeof value === 'function' ? value(prev[key]) : value,
    }));
  }, []);

  const {
    ownershipFilter,
    watchedFilter,
    genreFilter,
    collectionStatusFilter,
    peopleRoleFilter,
    genderFilter,
    favoriteFilter,
    decadeFilter,
    yearFilter,
    performerFilter,
    studioFilter,
    networkFilter,
    hairColorFilter,
    ethnicityFilter,
    eyeColorFilter,
    tattoosFilter,
    piercingsFilter,
    breastTypeFilter,
    breastSizeFilter,
    buttShapeFilter,
    buttSizeFilter,
    selectedTags,
    studioTypeFilter,
  } = filters;

  const setOwnershipFilter = useCallback((v) => updateFilter('ownershipFilter', v), [updateFilter]);
  const setWatchedFilter = useCallback((v) => updateFilter('watchedFilter', v), [updateFilter]);
  const setGenreFilter = useCallback((v) => updateFilter('genreFilter', v), [updateFilter]);
  const setCollectionStatusFilter = useCallback((v) => updateFilter('collectionStatusFilter', v), [updateFilter]);
  const setPeopleRoleFilter = useCallback((v) => updateFilter('peopleRoleFilter', v), [updateFilter]);
  const setGenderFilter = useCallback((v) => updateFilter('genderFilter', v), [updateFilter]);
  const setFavoriteFilter = useCallback((v) => updateFilter('favoriteFilter', v), [updateFilter]);
  const setDecadeFilter = useCallback((v) => updateFilter('decadeFilter', v), [updateFilter]);
  const setYearFilter = useCallback((v) => updateFilter('yearFilter', v), [updateFilter]);
  const setPerformerFilter = useCallback((v) => updateFilter('performerFilter', v), [updateFilter]);
  const setStudioFilter = useCallback((v) => updateFilter('studioFilter', v), [updateFilter]);
  const setNetworkFilter = useCallback((v) => updateFilter('networkFilter', v), [updateFilter]);
  const setHairColorFilter = useCallback((v) => updateFilter('hairColorFilter', v), [updateFilter]);
  const setEthnicityFilter = useCallback((v) => updateFilter('ethnicityFilter', v), [updateFilter]);
  const setEyeColorFilter = useCallback((v) => updateFilter('eyeColorFilter', v), [updateFilter]);
  const setTattoosFilter = useCallback((v) => updateFilter('tattoosFilter', v), [updateFilter]);
  const setPiercingsFilter = useCallback((v) => updateFilter('piercingsFilter', v), [updateFilter]);
  const setBreastTypeFilter = useCallback((v) => updateFilter('breastTypeFilter', v), [updateFilter]);
  const setBreastSizeFilter = useCallback((v) => updateFilter('breastSizeFilter', v), [updateFilter]);
  const setButtShapeFilter = useCallback((v) => updateFilter('buttShapeFilter', v), [updateFilter]);
  const setButtSizeFilter = useCallback((v) => updateFilter('buttSizeFilter', v), [updateFilter]);
  const setSelectedTags = useCallback((v) => updateFilter('selectedTags', v), [updateFilter]);
  const setStudioTypeFilter = useCallback((v) => updateFilter('studioTypeFilter', v), [updateFilter]);

  const [timeFilterMode, setTimeFilterMode] = useState(savedState.timeFilterMode ?? 'decade');
  const [currentPage, setCurrentPage] = useState(savedState.currentPage ?? 1);
  const [pageSize, setPageSize] = useState(savedState.pageSize ?? 40);
  const [sortKey, setSortKey] = useState(savedState.sortKey ?? 'title');
  const [sortDirection, setSortDirection] = useState(savedState.sortDirection ?? 'asc');
  const {
    sessionMode,
    setSessionMode,
    paginationMode,
    setPaginationMode: setStorePaginationMode,
  } = useLibraryModeStore();

  const setPaginationMode = useCallback((mode) => {
    setStorePaginationMode(mode);
    setCurrentPage(1);
  }, [setStorePaginationMode]);

  const [accumulatedItems] = useState(savedState.accumulatedItems ?? []);

  const [lastCounts, setLastCounts] = useState({});

  const hasAdultSupport = settings?.include_adult;
  const activeSessionMode = hasAdultSupport ? sessionMode : (settings ? 'sfw' : null);

  const handleSetSessionMode = (mode) => {
    setSessionMode(mode);
    setActiveTab('movies');
    setCurrentPage(1);
    setSearchQuery('');
    setFilters(DEFAULT_FILTERS);
  };

  useEffect(() => {
    useNavigationStore.getState().setPageState(currentPath, {
      activeTab,
      searchQuery,
      ...filters,
      timeFilterMode,
      currentPage,
      pageSize,
      sortKey,
      sortDirection,
      paginationMode,
      accumulatedItems
    });
  }, [
    currentPath,
    activeTab,
    searchQuery,
    filters,
    timeFilterMode,
    currentPage,
    pageSize,
    sortKey,
    sortDirection,
    paginationMode,
    accumulatedItems
  ]);

  const isCollections = isLibraryCollectionTab(activeTab);
  const isTags = isLibraryTagsTab(activeTab);
  const isPeople = isLibraryPeopleTab(activeTab);

  const backendTab = useMemo(
    () => resolveLibraryBackendTab(activeTab, activeSessionMode),
    [activeTab, activeSessionMode]
  );

  const effectiveTab = useMemo(
    () => backendTab,
    [backendTab]
  );

  const resolvedGenderFilter = isPeople
    ? (activeSessionMode === 'nsfw' && settings?.adult_gender_preference && settings.adult_gender_preference !== 'all'
      ? settings.adult_gender_preference
      : genderFilter)
    : undefined;

  const libraryQueryParams = useMemo(() => {
    if (isCollections || isTags || !activeSessionMode) return null;
    return {
      tab: backendTab,
      page: currentPage,
      pageSize: pageSize,
      search: searchQuery || undefined,
      sortBy: `${sortKey}_${sortDirection}`,
      filter_ownership: ownershipFilter,
      filter_watched: watchedFilter,
      selected_genre: genreFilter || undefined,
      people_role: isPeople ? peopleRoleFilter : undefined,
      filter_gender: resolvedGenderFilter,
      filter_favorite: (isPeople || activeTab === 'studios') ? favoriteFilter : undefined,
      selected_decade: decadeFilter !== 'all' ? decadeFilter : undefined,
      selected_year: yearFilter !== '' ? Number(yearFilter) : undefined,
      include_adult: activeSessionMode === 'nsfw',
      selected_performer_id: performerFilter !== '' ? Number(performerFilter) : undefined,
      selected_studio_id: studioFilter !== '' ? Number(studioFilter) : undefined,
      selected_network_id: networkFilter !== '' ? Number(networkFilter) : undefined,
      filter_hair_color: hairColorFilter !== '' ? hairColorFilter : undefined,
      filter_ethnicity: ethnicityFilter !== '' ? ethnicityFilter : undefined,
      filter_eye_color: eyeColorFilter !== '' ? eyeColorFilter : undefined,
      filter_tattoos: tattoosFilter !== '' ? tattoosFilter : undefined,
      filter_piercings: piercingsFilter !== '' ? piercingsFilter : undefined,
      filter_breast_type: breastTypeFilter !== '' ? breastTypeFilter : undefined,
      filter_breast_size: breastSizeFilter !== '' ? breastSizeFilter : undefined,
      filter_butt_shape: buttShapeFilter !== '' ? buttShapeFilter : undefined,
      filter_butt_size: buttSizeFilter !== '' ? buttSizeFilter : undefined,
      selected_tags: selectedTags.length > 0 ? selectedTags.join(',') : undefined,
      selected_studio_type: activeSessionMode === 'sfw' ? studioTypeFilter : undefined,
    };
  }, [
    activeTab,
    isCollections,
    isTags,
    activeSessionMode,
    backendTab,
    currentPage,
    pageSize,
    searchQuery,
    sortKey,
    sortDirection,
    ownershipFilter,
    watchedFilter,
    genreFilter,
    isPeople,
    peopleRoleFilter,
    resolvedGenderFilter,
    favoriteFilter,
    decadeFilter,
    yearFilter,
    performerFilter,
    studioFilter,
    networkFilter,
    hairColorFilter,
    ethnicityFilter,
    eyeColorFilter,
    tattoosFilter,
    piercingsFilter,
    breastTypeFilter,
    breastSizeFilter,
    buttShapeFilter,
    buttSizeFilter,
    selectedTags,
    studioTypeFilter,
  ]);

  const filtersQueryParams = useMemo(() => {
    if (isCollections || isTags || !activeSessionMode) return null;
    return {
      tab: effectiveTab,
      filter_ownership: ownershipFilter,
      filter_watched: watchedFilter,
      include_adult: activeSessionMode === 'nsfw',
      lang: settings?.primary_metadata_language,
      search: searchQuery || undefined,
      selected_genre: genreFilter || undefined,
      people_role: isPeople ? peopleRoleFilter : undefined,
      filter_gender: resolvedGenderFilter,
      filter_favorite: isPeople ? favoriteFilter : undefined,
      selected_decade: decadeFilter !== 'all' ? decadeFilter : undefined,
      selected_year: yearFilter !== '' ? Number(yearFilter) : undefined,
      selected_performer_id: performerFilter !== '' ? Number(performerFilter) : undefined,
      selected_studio_id: studioFilter !== '' ? Number(studioFilter) : undefined,
      selected_network_id: networkFilter !== '' ? Number(networkFilter) : undefined,
      filter_hair_color: hairColorFilter !== '' ? hairColorFilter : undefined,
      filter_ethnicity: ethnicityFilter !== '' ? ethnicityFilter : undefined,
      filter_eye_color: eyeColorFilter !== '' ? eyeColorFilter : undefined,
      filter_tattoos: tattoosFilter !== '' ? tattoosFilter : undefined,
      filter_piercings: piercingsFilter !== '' ? piercingsFilter : undefined,
      filter_breast_type: breastTypeFilter !== '' ? breastTypeFilter : undefined,
      filter_breast_size: breastSizeFilter !== '' ? breastSizeFilter : undefined,
      filter_butt_shape: buttShapeFilter !== '' ? buttShapeFilter : undefined,
      filter_butt_size: buttSizeFilter !== '' ? buttSizeFilter : undefined,
      selected_tags: selectedTags.length > 0 ? selectedTags.join(',') : undefined,
    };
  }, [
    isCollections,
    isTags,
    activeSessionMode,
    effectiveTab,
    ownershipFilter,
    watchedFilter,
    settings?.primary_metadata_language,
    searchQuery,
    genreFilter,
    isPeople,
    peopleRoleFilter,
    resolvedGenderFilter,
    favoriteFilter,
    decadeFilter,
    yearFilter,
    performerFilter,
    studioFilter,
    networkFilter,
    hairColorFilter,
    ethnicityFilter,
    eyeColorFilter,
    tattoosFilter,
    piercingsFilter,
    breastTypeFilter,
    breastSizeFilter,
    buttShapeFilter,
    buttSizeFilter,
    selectedTags,
  ]);

  const isInfinite = isPaginationInfinite(paginationMode);

  const libraryQueryParamsNoPage = useMemo(() => {
    if (!libraryQueryParams) return null;
    const rest = { ...libraryQueryParams };
    delete rest.page;
    return rest;
  }, [libraryQueryParams]);

  const { data: libraryData, isLoading: isLibraryLoading } = useLibraryQuery(
    !isInfinite && libraryQueryParams
      ? libraryQueryParams
      : null
  );

  const {
    data: libraryInfiniteData,
    isLoading: isLibraryInfiniteLoading,
    fetchNextPage,
  } = useLibraryInfiniteQuery(
    isInfinite && libraryQueryParamsNoPage
      ? libraryQueryParamsNoPage
      : null
  );

  const { data: filterData } = useLibraryFiltersQuery(filtersQueryParams);

  const { data: collectionsData, isLoading: isCollectionsLoading } = useCollectionsQuery(
    isCollections && activeSessionMode
      ? {
        page: currentPage,
        pageSize: pageSize,
        search: searchQuery || undefined,
        tab: activeSessionMode === 'nsfw' ? 'adult' : 'movies',
        include_adult: activeSessionMode === 'nsfw',
        status: collectionStatusFilter,
        sort_by: sortKey,
        sort_direction: sortDirection,
      }
      : null
  );

  const { processedTags, isTagsLoading, tagsResponse } = useLibraryTags({
    activeSessionMode,
    page: isTags ? currentPage : 1,
    pageSize: isTags ? pageSize : 40,
    searchQuery: isTags ? searchQuery : '',
  });

  const countsQueryEnabled = isCollections || isTags;
  const { data: countsData } = useLibraryCountsQuery(activeSessionMode, {
    enabled: countsQueryEnabled,
  });

  const currentCounts = libraryData?.counts || libraryInfiniteData?.pages?.[0]?.counts || countsData?.counts;

  useEffect(() => {
    if (currentCounts && Object.keys(currentCounts).length > 0) {
      queueMicrotask(() => {
        setLastCounts(currentCounts);
      });
    }
  }, [currentCounts]);

  const counts = (currentCounts || lastCounts) ?? {};
  const movieCountKey = resolveLibraryBackendTab('movies', activeSessionMode);
  const tvCountKey = resolveLibraryBackendTab('tv', activeSessionMode);
  const collectionCountKey = resolveLibraryBackendTab('collections', activeSessionMode);
  const peopleCountKey = resolveLibraryBackendTab('people', activeSessionMode);
  const studiosCountKey = resolveLibraryBackendTab('studios', activeSessionMode);
  const scenesCountKey = resolveLibraryBackendTab('scenes', activeSessionMode);
  const videosCountKey = resolveLibraryBackendTab('videos', activeSessionMode);
 
  const tabs = [
    { value: 'movies', label: t('library.tabs.movies'), count: counts[movieCountKey], icon: Clapperboard },
    ...(settings?.folder_collection_mode !== 'never' ? [
      { value: 'collections', label: t('library.tabs.collections'), count: counts[collectionCountKey], icon: Layers }
    ] : []),
    { value: 'tv', label: t('library.tabs.tv'), count: counts[tvCountKey], icon: Tv },
    ...(activeSessionMode === 'nsfw' ? [
      { value: 'scenes', label: t('library.tabs.scenes') || 'Scenes', count: counts[scenesCountKey] ?? 0, icon: Video }
    ] : []),
    { value: 'videos', label: t('library.tabs.videos') || 'Videos', count: counts[videosCountKey] ?? 0, icon: Video },
    { value: 'people', label: activeSessionMode === 'nsfw' ? (t('library.tabs.adultPeople') || 'Stars') : t('library.tabs.people'), count: counts[peopleCountKey], icon: Users },
    { value: 'studios', label: t('library.tabs.studios') || 'Studios', count: counts[studiosCountKey] ?? 0, icon: Film },
    ...(includeTagsTab ? [
      { value: 'tags', label: t('library.tabs.tags'), count: processedTags.length, icon: Tag },
    ] : []),
  ];

  const fallbackTab = initialTab === 'tags' ? 'tags' : 'movies';
  const resolvedTab = tabs.some(tab => tab.value === activeTab) ? activeTab : fallbackTab;

  useEffect(() => {
    if (lockTab && activeTab !== initialTab) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(initialTab);
    }
  }, [activeTab, initialTab, lockTab]);

  const handleTabChange = (newTab) => {
    if (lockTab) return;
    setActiveTab(newTab);
    const tabToUse = tabs.some(tab => tab.value === newTab) ? newTab : fallbackTab;
    if (tabToUse === 'collections') {
      setSortKey('owned_count');
      setSortDirection('desc');
    } else if (tabToUse === 'tags') {
      setSortKey('total_count');
      setSortDirection('desc');
    } else if (tabToUse === 'people') {
      setSortKey('library_count');
      setSortDirection('desc');
      setPageSize(40);
    } else if (tabToUse === 'studios') {
      setSortKey('name');
      setSortDirection('asc');
      setPageSize(40);
    } else {
      setSortKey('title');
      setSortDirection('asc');
      setPageSize(40);
    }
    setCurrentPage(1);
    setSearchQuery('');
    setGenreFilter('');
    setCollectionStatusFilter('all');
    setPeopleRoleFilter('all');
    setGenderFilter('all');
    setFavoriteFilter('all');
    setDecadeFilter('all');
    setYearFilter('');
    setPerformerFilter('');
    setStudioFilter('');
    setHairColorFilter('');
    setEthnicityFilter('');
    setEyeColorFilter('');
    setTattoosFilter('');
    setPiercingsFilter('');
    setBreastTypeFilter('');
    setButtShapeFilter('');
    setButtSizeFilter('');
    setSelectedTags([]);
  };

  const handleOwnershipFilterChange = (newOwnership) => {
    setOwnershipFilter(newOwnership);
    if (newOwnership === 'unowned' && (sortKey === 'file_size' || sortKey === 'last_watched')) {
      setSortKey('title');
    }
    setCurrentPage(1);
    setSearchQuery('');
    setGenreFilter('');
    setCollectionStatusFilter('all');
    setPeopleRoleFilter('all');
    setGenderFilter('all');
    setFavoriteFilter('all');
    setDecadeFilter('all');
    setYearFilter('');
    setPerformerFilter('');
    setStudioFilter('');
    setHairColorFilter('');
    setEthnicityFilter('');
    setEyeColorFilter('');
    setTattoosFilter('');
    setPiercingsFilter('');
    setBreastTypeFilter('');
    setButtShapeFilter('');
    setButtSizeFilter('');
    setSelectedTags([]);
  };

  const handleFilterChange = (setter) => (val) => {
    setter((prev) => {
      const newVal = typeof val === 'function' ? val(prev) : val;
      if (prev !== newVal) {
        setCurrentPage(1);
      }
      return newVal;
    });
  };

  const handleSearchQueryChange = (val) => {
    setSearchQuery((prev) => {
      if (prev !== val) {
        setCurrentPage(1);
      }
      return val;
    });
  };

  const handlePageChange = (page) => {
    const pageNum = Math.max(1, Number(page) || 1);
    if (isInfinite && pageNum > currentPage) {
      fetchNextPage();
    }
    setCurrentPage(pageNum);
  };

  const handlePageSizeChange = (size) => {
    setPageSize((prev) => {
      if (prev !== size) {
        setCurrentPage(1);
      }
      return size;
    });
  };

  const getEmptyStateIcon = () => {
    switch (resolvedTab) {
      case 'movies': return Clapperboard;
      case 'collections': return Layers;
      case 'tv': return Tv;
      case 'people': return Users;
      case 'studios': return Film;
      case 'tags': return Tag;
      case 'scenes': return Video;
      case 'videos': return Video;
      default: return initialTab === 'tags' ? Tag : Clapperboard;
    }
  };


  const allItems = useMemo(() => {
    if (isCollections) {
      return collectionsData?.items || [];
    }
    if (isTags) {
      return processedTags;
    }
    if (isInfinite) {
      if (!libraryInfiniteData) return [];
      return libraryInfiniteData.pages.flatMap((page) => page.items || []);
    }
    return libraryData?.items || [];
  }, [isCollections, collectionsData?.items, isTags, processedTags, isInfinite, libraryInfiniteData, libraryData?.items]);

  const { sortedItems, paginatedItems, totalItems, totalPages } = useMemo(() => {
    return {
      sortedItems: allItems,
      paginatedItems: allItems,
      totalItems: isCollections
        ? (collectionsData?.total_items || 0)
        : isTags
          ? (tagsResponse?.total_items || 0)
          : isInfinite
            ? (libraryInfiniteData?.pages[0]?.total_items || 0)
            : (libraryData?.total_items || 0),
      totalPages: isCollections
        ? (collectionsData?.total_pages || 1)
        : isTags
          ? (tagsResponse?.total_pages || 1)
          : isInfinite
            ? (libraryInfiniteData?.pages[0]?.total_pages || 1)
            : (libraryData?.total_pages || 1),
    };
  }, [
    allItems,
    libraryData?.total_items,
    libraryData?.total_pages,
    collectionsData?.total_items,
    collectionsData?.total_pages,
    tagsResponse?.total_items,
    tagsResponse?.total_pages,
    libraryInfiniteData?.pages,
    isCollections,
    isTags,
    isInfinite,
  ]);

  // Background Prefetch next/prev pages (only for normal page mode)
  useEffect(() => {
    if (!isInfinite && libraryQueryParams && currentPage < totalPages) {
      const nextParams = { ...libraryQueryParams, page: currentPage + 1 };
      queryClient.prefetchQuery({
        queryKey: [...QK.library, nextParams],
        queryFn: ({ signal }) => api.library.getItems(nextParams, { signal }),
      });
    }
    if (!isInfinite && libraryQueryParams && currentPage > 1) {
      const prevParams = { ...libraryQueryParams, page: currentPage - 1 };
      queryClient.prefetchQuery({
        queryKey: [...QK.library, prevParams],
        queryFn: ({ signal }) => api.library.getItems(prevParams, { signal }),
      });
    }
  }, [isInfinite, libraryQueryParams, currentPage, totalPages, queryClient]);

  const translationKey = getLibraryTabTranslationKey(resolvedTab, activeSessionMode);
  const emptyStateTranslationKey = getLibraryEmptyStateKey(resolvedTab, activeSessionMode);

  const tabTotalCount = counts[backendTab] ?? allItems.length;
  const tabLabel = t(`library.tabs.${translationKey}`);
  const searchPlaceholder = t('library.searchPlaceholder').replace('{{tab}}', tabLabel);
  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasFilterSelection = Boolean(
    (isCollections && collectionStatusFilter !== 'all') ||
    (isPeople && (
      peopleRoleFilter !== 'all' ||
      genderFilter !== 'all' ||
      favoriteFilter !== 'all' ||
      hairColorFilter !== '' ||
      ethnicityFilter !== '' ||
      eyeColorFilter !== '' ||
      tattoosFilter !== '' ||
      piercingsFilter !== '' ||
      breastTypeFilter !== '' ||
      breastSizeFilter !== '' ||
      buttShapeFilter !== '' ||
      buttSizeFilter !== ''
    )) ||
    (!isCollections && !isTags && !isPeople && (
      ownershipFilter !== 'owned' ||
      watchedFilter !== 'all' ||
      genreFilter !== '' ||
      decadeFilter !== 'all' ||
      yearFilter !== '' ||
      networkFilter !== '' ||
      studioFilter !== ''
    ))
  );
  const hasActiveFilters = tabTotalCount > 0 && totalItems === 0 && (hasSearchQuery || hasFilterSelection);
  const emptyStateVariant = hasSearchQuery
    ? 'page-search'
    : hasFilterSelection
      ? 'page-filter'
      : 'default';
  const emptyTitle = hasSearchQuery
    ? (t('dynamic.emptyStates.search.title', { tab: tabLabel }) || `No matching ${tabLabel} found`)
    : hasFilterSelection
      ? (t('dynamic.emptyStates.filter.title', { tab: tabLabel }) || 'Nothing fits these filters')
      : t(`dynamic.emptyStates.${emptyStateTranslationKey}.title`);
  const emptyDescription = hasSearchQuery
    ? (t('dynamic.emptyStates.search.description', { tab: tabLabel }) || 'Try a different search term or check the spelling.')
    : hasFilterSelection
      ? (t('dynamic.emptyStates.filter.description', { tab: tabLabel }) || `Try clearing or relaxing a few filters to bring ${tabLabel} back into view.`)
      : t(`dynamic.emptyStates.${emptyStateTranslationKey}.description`);
  const emptyIcon = getEmptyStateIcon();
  const shouldShowPagination = usePaginationVisibility(totalItems, pageSize);

  const summaryText = totalItems > 0
    ? `${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, totalItems)} / ${totalItems}`
    : '0-0 / 0';

  const isDataLoading = (!isCollections && !isTags && (isInfinite ? isLibraryInfiniteLoading : isLibraryLoading)) ||
    (isCollections && isCollectionsLoading) ||
    (isTags && isTagsLoading);

  const getRandomPlayableItem = async () => {
    if (!activeSessionMode || !libraryQueryParams) return null;
    const randomParams = {
      ...libraryQueryParams,
      page: 1,
      pageSize: 1,
      sortBy: 'random',
    };
    try {
      const res = await api.library.getItems(randomParams);
      if (res && res.items && res.items.length > 0) {
        return res.items[0];
      }
    } catch (err) {
      console.error('Failed to fetch random playable item:', err);
    }
    return null;
  };

  return {
    settings,
    isLoading,
    t,
    activeTab,
    setActiveTab: handleTabChange,
    searchQuery,
    setSearchQuery: handleSearchQueryChange,
    ownershipFilter,
    setOwnershipFilter: handleOwnershipFilterChange,
    watchedFilter,
    setWatchedFilter: handleFilterChange(setWatchedFilter),
    genreFilter,
    setGenreFilter: handleFilterChange(setGenreFilter),
    collectionStatusFilter,
    setCollectionStatusFilter: handleFilterChange(setCollectionStatusFilter),
    peopleRoleFilter,
    setPeopleRoleFilter: handleFilterChange(peopleRoleFilter ? setPeopleRoleFilter : null),
    genderFilter,
    setGenderFilter: handleFilterChange(setGenderFilter),
    favoriteFilter,
    setFavoriteFilter: handleFilterChange(setFavoriteFilter),
    decadeFilter,
    setDecadeFilter: handleFilterChange(setDecadeFilter),
    yearFilter,
    setYearFilter: handleFilterChange(setYearFilter),
    timeFilterMode,
    setTimeFilterMode,
    currentPage,
    setCurrentPage: handlePageChange,
    pageSize,
    setPageSize: handlePageSizeChange,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    performerFilter,
    setPerformerFilter: handleFilterChange(setPerformerFilter),
    studioFilter,
    setStudioFilter: handleFilterChange(setStudioFilter),
    networkFilter,
    setNetworkFilter: handleFilterChange(setNetworkFilter),
    hairColorFilter,
    setHairColorFilter: handleFilterChange(setHairColorFilter),
    ethnicityFilter,
    setEthnicityFilter: handleFilterChange(setEthnicityFilter),
    eyeColorFilter,
    setEyeColorFilter: handleFilterChange(setEyeColorFilter),
    tattoosFilter,
    setTattoosFilter: handleFilterChange(setTattoosFilter),
    piercingsFilter,
    setPiercingsFilter: handleFilterChange(setPiercingsFilter),
    breastTypeFilter,
    setBreastTypeFilter: handleFilterChange(setBreastTypeFilter),
    breastSizeFilter,
    setBreastSizeFilter: handleFilterChange(setBreastSizeFilter),
    buttShapeFilter,
    setButtShapeFilter: handleFilterChange(setButtShapeFilter),
    buttSizeFilter,
    setButtSizeFilter: handleFilterChange(setButtSizeFilter),
    isCollections,
    isTags,
    isPeople,
    tabs,
    resolvedTab,
    filterData,
    emptyTitle,
    emptyDescription,
    emptyStateVariant,
    emptyIcon,
    hasActiveFilters,
    searchPlaceholder,
    sortedItems,
    paginatedItems,
    totalPages,
    shouldShowPagination,
    summaryText,
    isDataLoading,
    sessionMode,
    activeSessionMode,
    setSessionMode: handleSetSessionMode,
    selectedTags,
    setSelectedTags: handleFilterChange(setSelectedTags),
    paginationMode,
    setPaginationMode,
    getRandomPlayableItem,
    studioTypeFilter,
    setStudioTypeFilter: handleFilterChange(setStudioTypeFilter),
  };
}

