import { useState, useEffect, useMemo, useCallback } from 'react';
import { usePlayMediaMutation } from '@/queries';
import { usePersonCreditsQuery, usePersonCreditsInfiniteQuery } from '@/queries/metadataQueries';
import { usePersonCreditsStore } from '@/stores/usePersonCreditsStore';
import { useSettingsQuery } from '@/queries/settingsQueries';
import { useTorrentModal } from '@/hooks/useTorrentModal';
import { resolveCustomImageUrl } from '@/lib/imageUrls';
import { getProviderTags } from '@/lib/tags';

export function usePersonCreditsSections({ id, item, t }) {
  // Discover state from Zustand store
  const {
    activeDiscoverTab,
    setActiveDiscoverTab,
    viewModeState,
    setViewModeState,
    activeTagFilter,
    setActiveTagFilter,
    tagInputValue,
    setTagInputValue,
    activeStudioFilter,
    setActiveStudioFilter,
    studioInputValue,
    setStudioInputValue,
  } = usePersonCreditsStore();
  const setViewMode = setViewModeState;

  const playMutation = usePlayMediaMutation();
  const { data: settings } = useSettingsQuery();
  const { torrentEnabled, openTorrentModal } = useTorrentModal();

  const hasStashDb = !!item?.external_ids?.stashdb || item?.external_links?.some((l) => l.provider === 'stashdb');
  const hasFansDb = !!item?.external_ids?.fansdb || item?.external_links?.some((l) => l.provider === 'fansdb');
  const hasThePornDb = !!item?.external_ids?.theporndb || item?.external_links?.some((l) => l.provider === 'theporndb');

  const validFinishes = useMemo(() => {
    return item?.finishes?.filter((f) => f.snapshot_path && f.video_position) || [];
  }, [item?.finishes]);

  // Static queries to populate the "My Library" list across all media types
  const tmdbMoviesLibQuery = usePersonCreditsQuery(id, 'movies', 1, 100, { enabled: Boolean(id) && !item?.is_adult, local_only: true });
  const theporndbMoviesLibQuery = usePersonCreditsQuery(id, 'movies', 1, 100, { enabled: Boolean(id) && !!(item?.is_adult && hasThePornDb), source: 'theporndb', local_only: true });
  const tmdbTvLibQuery = usePersonCreditsQuery(id, 'tv', 1, 100, { enabled: Boolean(id) && !item?.is_adult, local_only: true });
  const stashdbScenesLibQuery = usePersonCreditsQuery(id, 'scenes', 1, 100, { enabled: Boolean(id) && !!(item?.is_adult && hasStashDb), source: 'stashdb', local_only: true });
  const fansdbScenesLibQuery = usePersonCreditsQuery(id, 'scenes', 1, 100, { enabled: Boolean(id) && !!(item?.is_adult && hasFansDb), source: 'fansdb', local_only: true });
  const theporndbScenesLibQuery = usePersonCreditsQuery(id, 'scenes', 1, 100, { enabled: Boolean(id) && !!(item?.is_adult && hasThePornDb), source: 'theporndb', local_only: true });

  const tmdbMoviesItems = tmdbMoviesLibQuery.data?.items;
  const theporndbMoviesItems = theporndbMoviesLibQuery.data?.items;
  const tmdbTvItems = tmdbTvLibQuery.data?.items;
  const stashdbScenesItems = stashdbScenesLibQuery.data?.items;
  const fansdbScenesItems = fansdbScenesLibQuery.data?.items;
  const theporndbScenesItems = theporndbScenesLibQuery.data?.items;

  const initialMovieItems = item?.initial_movie_credits_page?.items;
  const initialTvItems = item?.initial_tv_credits_page?.items;
  const initialSceneItems = item?.initial_scene_credits_page?.items;

  // Extract "My Library" items with O(N) Set deduplication
  const myMovies = useMemo(() => {
    const list = [];
    const seen = new Set();
    const addUnique = (creditItem, extraProps = {}) => {
      const cid = creditItem.library_item_id || creditItem.id;
      if (cid != null && !seen.has(cid)) {
        seen.add(cid);
        list.push(Object.keys(extraProps).length > 0 ? { ...creditItem, ...extraProps } : creditItem);
      }
    };
    if (initialMovieItems) {
      for (let i = 0; i < initialMovieItems.length; i++) {
        const c = initialMovieItems[i];
        if (c.in_library) addUnique(c);
      }
    }
    if (tmdbMoviesItems) {
      for (let i = 0; i < tmdbMoviesItems.length; i++) {
        const c = tmdbMoviesItems[i];
        if (c.in_library) addUnique(c, { source: 'tmdb' });
      }
    }
    if (theporndbMoviesItems) {
      for (let i = 0; i < theporndbMoviesItems.length; i++) {
        const c = theporndbMoviesItems[i];
        if (c.in_library) addUnique(c, { source: 'theporndb' });
      }
    }
    return list;
  }, [initialMovieItems, tmdbMoviesItems, theporndbMoviesItems]);

  const myTv = useMemo(() => {
    const list = [];
    const seen = new Set();
    const addUnique = (creditItem, extraProps = {}) => {
      const cid = creditItem.library_item_id || creditItem.id;
      if (cid != null && !seen.has(cid)) {
        seen.add(cid);
        list.push(Object.keys(extraProps).length > 0 ? { ...creditItem, ...extraProps } : creditItem);
      }
    };
    if (initialTvItems) {
      for (let i = 0; i < initialTvItems.length; i++) {
        const c = initialTvItems[i];
        if (c.in_library) addUnique(c);
      }
    }
    if (tmdbTvItems) {
      for (let i = 0; i < tmdbTvItems.length; i++) {
        const c = tmdbTvItems[i];
        if (c.in_library) addUnique(c, { source: 'tmdb' });
      }
    }
    return list;
  }, [initialTvItems, tmdbTvItems]);

  const myScenes = useMemo(() => {
    const list = [];
    const seen = new Set();
    const addUnique = (creditItem, extraProps = {}) => {
      const cid = creditItem.library_item_id || creditItem.id;
      if (cid != null && !seen.has(cid)) {
        seen.add(cid);
        list.push(Object.keys(extraProps).length > 0 ? { ...creditItem, ...extraProps } : creditItem);
      }
    };
    if (initialSceneItems) {
      for (let i = 0; i < initialSceneItems.length; i++) {
        const c = initialSceneItems[i];
        if (c.in_library) addUnique(c);
      }
    }
    if (stashdbScenesItems) {
      for (let i = 0; i < stashdbScenesItems.length; i++) {
        const c = stashdbScenesItems[i];
        if (c.in_library) addUnique(c, { source: 'stashdb' });
      }
    }
    if (fansdbScenesItems) {
      for (let i = 0; i < fansdbScenesItems.length; i++) {
        const c = fansdbScenesItems[i];
        if (c.in_library) addUnique(c, { source: 'fansdb' });
      }
    }
    if (theporndbScenesItems) {
      for (let i = 0; i < theporndbScenesItems.length; i++) {
        const c = theporndbScenesItems[i];
        if (c.in_library) addUnique(c, { source: 'theporndb' });
      }
    }
    return list;
  }, [initialSceneItems, stashdbScenesItems, fansdbScenesItems, theporndbScenesItems]);

  const hasTmdbMovies = ((!!item?.external_ids?.tmdb || item?.external_links?.some((l) => l.provider === 'tmdb')) && Number(item?.total_movie_credits) > 0) || myMovies.length > 0;
  const hasMovies = hasTmdbMovies || (item?.is_adult && hasThePornDb);
  const hasTv = ((!!item?.external_ids?.tmdb || item?.external_links?.some((l) => l.provider === 'tmdb')) && Number(item?.total_tv_credits) > 0) || myTv.length > 0;
  const hasScenes = Number(item?.total_scene_credits) > 0 || (item?.is_adult && (hasStashDb || hasFansDb || hasThePornDb)) || myScenes.length > 0;

  const [activeLibraryTabState, setActiveLibraryTab] = useState('');

  const myLibraryTabs = useMemo(() => {
    const tabs = [];
    if (myMovies.length > 0) {
      tabs.push({ id: 'movies', label: t('library.details.movies') || 'Movies', count: myMovies.length, items: myMovies });
    }
    if (myTv.length > 0) {
      tabs.push({ id: 'tv', label: t('library.details.tvShows') || 'TV Shows', count: myTv.length, items: myTv });
    }
    if (myScenes.length > 0) {
      tabs.push({ id: 'scenes', label: t('library.details.scenes') || 'Scenes', count: myScenes.length, items: myScenes });
    }
    return tabs;
  }, [myMovies, myTv, myScenes, t]);

  const activeLibraryTab = useMemo(() => {
    if (activeLibraryTabState && myLibraryTabs.some((t) => t.id === activeLibraryTabState)) {
      return activeLibraryTabState;
    }
    if (myLibraryTabs.length > 0) {
      return myLibraryTabs[0].id;
    }
    return '';
  }, [activeLibraryTabState, myLibraryTabs]);

  const sceneTabs = useMemo(() => {
    const tabs = [];
    if (hasStashDb) tabs.push({ value: 'scenes_stashdb', label: t('library.details.stashdb') || 'StashDB' });
    if (hasFansDb) tabs.push({ value: 'scenes_fansdb', label: t('library.details.fansdb') || 'FansDB' });
    if (item?.is_adult && hasThePornDb) tabs.push({ value: 'scenes_theporndb', label: t('library.details.theporndb') || 'ThePornDB' });
    return tabs;
  }, [hasStashDb, hasFansDb, hasThePornDb, item?.is_adult, t]);

  const movieTabs = useMemo(() => {
    const tabs = [];
    if (hasTmdbMovies) tabs.push({ value: 'movies_tmdb', label: t('library.details.tmdb') || 'TMDb' });
    if (item?.is_adult && hasThePornDb) tabs.push({ value: 'movies_theporndb', label: t('library.details.theporndb') || 'ThePornDB' });
    return tabs;
  }, [hasTmdbMovies, hasThePornDb, item?.is_adult, t]);

  const tvTabs = useMemo(() => {
    const tabs = [];
    if (hasTv) tabs.push({ value: 'tv', label: t('library.details.tmdb') || 'TMDb' });
    return tabs;
  }, [hasTv, t]);

  // Fallback default discover tab
  useEffect(() => {
    const hasDefaultOption = !!activeDiscoverTab && (
      (activeDiscoverTab === 'movies_tmdb' && hasTmdbMovies) ||
      (activeDiscoverTab === 'movies_theporndb' && item?.is_adult && hasThePornDb) ||
      (activeDiscoverTab === 'tv' && hasTv) ||
      (activeDiscoverTab === 'scenes_stashdb' && hasStashDb) ||
      (activeDiscoverTab === 'scenes_fansdb' && hasFansDb) ||
      (activeDiscoverTab === 'scenes_theporndb' && item?.is_adult && hasThePornDb)
    );

    if (!hasDefaultOption) {
      if (hasTmdbMovies) setActiveDiscoverTab('movies_tmdb');
      else if (item?.is_adult && hasThePornDb) setActiveDiscoverTab('movies_theporndb');
      else if (hasTv) setActiveDiscoverTab('tv');
      else if (hasScenes) {
        if (hasStashDb) setActiveDiscoverTab('scenes_stashdb');
        else if (hasFansDb) setActiveDiscoverTab('scenes_fansdb');
        else setActiveDiscoverTab('scenes_theporndb');
      }
    }
  }, [activeDiscoverTab, hasTmdbMovies, hasMovies, hasTv, hasScenes, hasStashDb, hasFansDb, hasThePornDb, item?.is_adult, setActiveDiscoverTab]);

  // Map active discover tab to query params
  const getActiveParams = (tab) => {
    if (tab === 'movies_tmdb') return { mediaType: 'movies', source: 'tmdb' };
    if (tab === 'movies_theporndb') return { mediaType: 'movies', source: 'theporndb' };
    if (tab === 'tv') return { mediaType: 'tv', source: 'tmdb' };
    if (tab === 'scenes_stashdb') return { mediaType: 'scenes', source: 'stashdb' };
    if (tab === 'scenes_fansdb') return { mediaType: 'scenes', source: 'fansdb' };
    if (tab === 'scenes_theporndb') return { mediaType: 'scenes', source: 'theporndb' };
    return { mediaType: 'movies', source: undefined };
  };

  const { mediaType: activeMediaType, source: activeSource } = getActiveParams(activeDiscoverTab);

  useEffect(() => {
    setActiveTagFilter('');
    setTagInputValue('');
    setActiveStudioFilter('');
    setStudioInputValue('');
  }, [activeDiscoverTab, setActiveTagFilter, setTagInputValue, setActiveStudioFilter, setStudioInputValue]);

  const initialPageData = useMemo(() => {
    if (!activeDiscoverTab || activeTagFilter || activeStudioFilter) return undefined;
    if (activeDiscoverTab === 'movies_tmdb' && item?.initial_movie_credits_page?.items?.length) {
      const hasRemote = item.initial_movie_credits_page.items.some((x) => !x.in_library);
      if (hasRemote) {
        return { pages: [item.initial_movie_credits_page], pageParams: [1] };
      }
    }
    if (activeDiscoverTab === 'tv' && item?.initial_tv_credits_page?.items?.length) {
      const hasRemote = item.initial_tv_credits_page.items.some((x) => !x.in_library);
      if (hasRemote) {
        return { pages: [item.initial_tv_credits_page], pageParams: [1] };
      }
    }
    if (activeDiscoverTab?.startsWith('scenes') && item?.initial_scene_credits_page?.items?.length) {
      const hasRemote = item.initial_scene_credits_page.items.some((x) => !x.in_library);
      if (hasRemote) {
        return { pages: [item.initial_scene_credits_page], pageParams: [1] };
      }
    }
    return undefined;
  }, [activeDiscoverTab, activeTagFilter, activeStudioFilter, item]);

  // Dynamic paginated query for infinite scroll using useInfiniteQuery
  const activeGridQuery = usePersonCreditsInfiniteQuery(id, activeMediaType, 24, {
    source: activeSource,
    tag: activeTagFilter || undefined,
    studio: activeStudioFilter || undefined,
    enabled: !!activeDiscoverTab,
    initialData: initialPageData,
  });

  const accumulatedItems = useMemo(
    () => activeGridQuery.data?.pages?.flatMap((page) => page.items) || [],
    [activeGridQuery.data?.pages]
  );

  const currentProviderTags = useMemo(() => {
    if (!activeSource) return [];

    // 1. Try to get specific tags returned by the paginated query for this tab
    const queryTags = activeGridQuery.data?.pages?.[0]?.suggested_tags;
    if (queryTags && queryTags.length > 0) {
      return queryTags;
    }

    // 2. Fallback to performer-level aggregated suggested tags
    if (activeSource !== 'tmdb' && item?.suggested_tags && item.suggested_tags.length > 0) {
      return item.suggested_tags;
    }

    // 3. Fallback to global provider tags
    return getProviderTags(activeSource);
  }, [activeSource, activeGridQuery.data, item]);

  const filteredTagSuggestions = useMemo(() => {
    if (!tagInputValue.trim()) return currentProviderTags;
    const term = tagInputValue.toLowerCase();
    return currentProviderTags.filter((tag) => tag.toLowerCase().includes(term));
  }, [tagInputValue, currentProviderTags]);

  const currentProviderStudios = useMemo(() => {
    if (!activeSource) return [];
    const queryStudios = activeGridQuery.data?.pages?.[0]?.suggested_studios;
    if (queryStudios && queryStudios.length > 0) {
      return queryStudios;
    }
    return [];
  }, [activeSource, activeGridQuery.data]);

  const filteredStudioSuggestions = useMemo(() => {
    if (!studioInputValue.trim()) return currentProviderStudios;
    const term = studioInputValue.toLowerCase();
    return currentProviderStudios.filter((studio) => studio.toLowerCase().includes(term));
  }, [studioInputValue, currentProviderStudios]);

  const hasMore = activeGridQuery.hasNextPage;
  const isFetchingNextPage = activeGridQuery.isFetchingNextPage;

  const [lightboxUrl, setLightboxUrl] = useState(null);

  const getSnapshotUrl = (path) => resolveCustomImageUrl(path);

  const activeLibraryItems = myLibraryTabs.find((t) => t.id === activeLibraryTab)?.items || [];
  const isSceneGrid = activeMediaType === 'scenes';

  const navigationOptions = useMemo(() => {
    const opts = [];
    if (myLibraryTabs.length > 0) {
      opts.push({ value: 'library', label: t('library.details.inLibrary') || 'Have' });
    }
    opts.push({ value: 'discover', label: t('library.details.discover') || 'Discover' });
    if (item?.is_adult && validFinishes.length > 0) {
      opts.push({ value: 'gallery', label: t('library.details.gallery') || 'Gallery' });
    }
    return opts;
  }, [myLibraryTabs, item?.is_adult, validFinishes, t]);

  const viewMode = useMemo(() => {
    const isAvailable = navigationOptions.some((opt) => opt.value === viewModeState);
    if (isAvailable) return viewModeState;
    return 'discover';
  }, [navigationOptions, viewModeState]);

  const headerTitle = useMemo(() => {
    if (viewMode === 'library') {
      return t('library.details.inLibrary') || 'Have';
    }
    if (viewMode === 'gallery') {
      return t('library.details.gallery') || 'Highlights';
    }
    return t('library.details.filmography') || 'Filmography';
  }, [viewMode, t]);

  const handleEndReached = useCallback(() => {
    if (hasMore && !isFetchingNextPage) {
      activeGridQuery.fetchNextPage();
    }
  }, [hasMore, isFetchingNextPage, activeGridQuery]);

  const handlePlayFinish = useCallback((finish) => {
    playMutation.mutate({ itemId: finish.media_item_id, start: finish.video_position });
  }, [playMutation]);

  return {
    settings,
    playMutation,
    torrentEnabled,
    openTorrentModal,
    viewMode,
    setViewMode,
    headerTitle,
    navigationOptions,
    // Library
    myLibraryTabs,
    activeLibraryTab,
    setActiveLibraryTab,
    activeLibraryItems,
    // Discover
    hasMovies,
    movieTabs,
    hasTv,
    tvTabs,
    hasScenes,
    sceneTabs,
    activeDiscoverTab,
    setActiveDiscoverTab,
    activeSource,
    activeMediaType,
    // Filters & Autocomplete
    currentProviderStudios,
    activeStudioFilter,
    setActiveStudioFilter,
    studioInputValue,
    setStudioInputValue,
    filteredStudioSuggestions,
    currentProviderTags,
    activeTagFilter,
    setActiveTagFilter,
    tagInputValue,
    setTagInputValue,
    filteredTagSuggestions,
    // Infinite Query Grid
    activeGridQuery,
    accumulatedItems,
    hasMore,
    isFetchingNextPage,
    handleEndReached,
    isSceneGrid,
    // Gallery / Finishes
    validFinishes,
    getSnapshotUrl,
    handlePlayFinish,
    lightboxUrl,
    setLightboxUrl,
  };
}
