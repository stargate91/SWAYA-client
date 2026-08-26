import { useState, useEffect, useCallback } from 'react';
import {
  useLibraryQuery,
  useUpdatePersonStatusMutation,
  useUpdateMediaStatusMutation,
  useUpdateStudioStatusMutation,
  useSettingsQuery,
} from '@/queries';
import { resolveLibraryBackendTab } from '@/lib/libraryTabs';
import { useLibraryModeStore } from '@/stores/useLibraryModeStore';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';

export function useRatingsPageState() {
  const { data: settings } = useSettingsQuery();
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const { getString, getNumber, setParam, setParams } = useQueryParams();

  const hasAdultSupport = settings?.include_adult;
  const activeSessionMode = hasAdultSupport ? sessionMode : 'sfw';
  const resolvedAdultGenderPreference =
    activeSessionMode === 'nsfw' && settings?.adult_gender_preference && settings.adult_gender_preference !== 'all'
      ? settings.adult_gender_preference
      : undefined;

  // Read URL parameters with defaults
  const rawTab = getString('tab', 'unrated');
  const activeTab = rawTab === 'rated' ? 'rated' : 'unrated';

  const rawMediaType = getString('type', 'movies');
  const effectiveMediaType = activeSessionMode !== 'nsfw' && rawMediaType === 'scenes'
    ? 'movies'
    : rawMediaType;

  const searchQuery = getString('q', '');
  const currentPage = Math.max(1, getNumber('page', 1));
  const pageSize = Math.max(1, getNumber('pageSize', 40));
  const sortKey = getString('sort', 'title');
  const sortDirection = getString('dir', 'asc');

  const getSortParam = (key, dir) => {
    if (key === 'rating') {
      return dir === 'desc' ? 'rating_desc' : 'user_rating_asc';
    }
    if (key === 'comment') {
      return dir === 'desc' ? 'comment_desc' : 'comment_asc';
    }
    return dir === 'desc' ? 'title_desc' : 'title_asc';
  };

  // Active tab/type paginated query
  const activeListQuery = useLibraryQuery({
    tab: resolveLibraryBackendTab(effectiveMediaType, activeSessionMode),
    page: currentPage,
    pageSize: pageSize,
    search: searchQuery,
    filter_ownership: 'all',
    filter_status: effectiveMediaType === 'people' ? 'active' : 'all',
    filter_gender: effectiveMediaType === 'people' ? resolvedAdultGenderPreference : undefined,
    include_adult: activeSessionMode === 'nsfw',
    filter_rating: activeTab,
    sort_by: getSortParam(sortKey, sortDirection),
  });

  const rawItems = activeListQuery.data?.items || [];
  const isLoading = activeListQuery.isLoading;

  // Mutations
  const updateMediaMutation = useUpdateMediaStatusMutation();
  const updatePersonMutation = useUpdatePersonStatusMutation();
  const updateStudioMutation = useUpdateStudioStatusMutation();

  const handleRateItem = async (item, rating) => {
    if (effectiveMediaType === 'people') {
      await updatePersonMutation.mutateAsync({
        personId: item.id,
        payload: { user_rating: rating },
      });
    } else if (effectiveMediaType === 'studios') {
      await updateStudioMutation.mutateAsync({
        studioId: item.id,
        userRating: rating,
      });
    } else {
      await updateMediaMutation.mutateAsync({
        itemId: item.id,
        payload: { user_rating: rating },
      });
    }
  };

  const handleToggleFavorite = async (item) => {
    if (effectiveMediaType === 'people') {
      await updatePersonMutation.mutateAsync({
        personId: item.id,
        payload: { is_favorite: !item.is_favorite },
      });
    } else if (effectiveMediaType === 'studios') {
      await updateStudioMutation.mutateAsync({
        studioId: item.id,
        isFavorite: !item.is_favorite,
      });
    }
  };

  const handleSaveComment = useCallback(async (item, comment) => {
    if (effectiveMediaType === 'people') {
      await updatePersonMutation.mutateAsync({
        personId: item.id,
        payload: { user_comment: comment },
      });
    } else if (effectiveMediaType === 'studios') {
      await updateStudioMutation.mutateAsync({
        studioId: item.id,
        userComment: comment,
      });
    } else {
      await updateMediaMutation.mutateAsync({
        itemId: item.id,
        payload: { user_comment: comment },
      });
    }
  }, [effectiveMediaType, updatePersonMutation, updateStudioMutation, updateMediaMutation]);

  // Pagination and Items (fully managed by backend)
  const totalItems = activeListQuery.data?.total_items || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedItems = rawItems;

  // URL State setters
  const handleSetActiveTab = useCallback((tab) => {
    setParams({ tab, page: 1 });
  }, [setParams]);

  const handleSetMediaType = useCallback((type) => {
    setParams({ type, page: 1 });
  }, [setParams]);

  const handleSetSearchQuery = useCallback((query) => {
    setParams({ q: query || undefined, page: 1 }, { replace: true });
  }, [setParams]);

  const handleSetCurrentPage = useCallback((page) => {
    setParam('page', page);
  }, [setParam]);

  const handleSetPageSize = useCallback((size) => {
    setParams({ pageSize: size, page: 1 });
  }, [setParams]);

  const handleSortToggle = useCallback((key) => {
    const nextDir = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setParams({ sort: key, dir: nextDir });
  }, [sortKey, sortDirection, setParams]);

  // Review Drawer state
  const [editingItem, setEditingItem] = useState(null);
  const [reviewText, setReviewText] = useState('');

  const handleOpenReviewDrawer = useCallback((e, item) => {
    e.stopPropagation();
    setEditingItem(item);
    setReviewText(item.user_comment || '');
  }, []);

  const handleSaveReview = useCallback(async () => {
    if (!editingItem) return;
    await handleSaveComment(editingItem, reviewText);
    setEditingItem(null);
  }, [editingItem, reviewText, handleSaveComment]);

  // Local Search Input with Debounce Sync
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setLocalSearch(searchQuery);
  }
  const debouncedSearch = useDebounce(localSearch, 150);

  useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      handleSetSearchQuery(debouncedSearch);
    }
  }, [debouncedSearch, searchQuery, handleSetSearchQuery]);

  return {
    activeTab,
    setActiveTab: handleSetActiveTab,
    mediaType: effectiveMediaType,
    setMediaType: handleSetMediaType,
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    currentPage,
    setCurrentPage: handleSetCurrentPage,
    pageSize,
    setPageSize: handleSetPageSize,
    sortKey,
    sortDirection,
    handleSortToggle,
    isLoading,
    paginatedItems,
    totalPages,
    totalItems,
    handleRateItem,
    handleToggleFavorite,
    handleSaveComment,
    activeSessionMode,
    hasAdultSupport,
    settings,
    editingItem,
    setEditingItem,
    reviewText,
    setReviewText,
    handleOpenReviewDrawer,
    handleSaveReview,
    localSearch,
    setLocalSearch,
  };
}
