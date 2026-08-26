import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useQueryParams } from '@/hooks/useQueryParams';
import {
  useStudioDetailQuery,
  useLibraryInfiniteQuery,
  useStudioDiscoverInfiniteQuery,
  useUpdateStudioStatusMutation,
  useSettingsQuery,
} from '@/queries';
import { API_BASE } from '@/lib/backend';
import { resolveDetailsImageUrl } from '@/lib/imageUrls';
import { getIconForUrl } from '@/lib/externalLinks';
import { ROUTES } from '@/lib/routes';

export function useStudioDetailPageState() {
  const { id } = useParams();
  const studioId = id;

  const navigate = useNavigate();
  const { getString, setParam } = useQueryParams();
  const { t } = useTranslation();

  const discoverSource = getString('source', '');
  const discoverMediaType = getString('media_type', 'movies');

  const setViewMode = (val) => setParam('view', val);
  const setDiscoverSource = (val) => setParam('source', val);
  const setDiscoverMediaType = (val) => setParam('media_type', val);


  const [activeTab, setActiveTab] = useState('movies');
  const [isLogoDrawerOpen, setIsLogoDrawerOpen] = useState(false);
  const [editingReviewItem, setEditingReviewItem] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [isActivateHovered, setIsActivateHovered] = useState(false);

  const setIsReviewModalOpen = (open) => {
    if (open && studio) {
      setEditingReviewItem(studio);
      setReviewText(studio.user_comment || '');
    } else {
      setEditingReviewItem(null);
    }
  };

  // Queries
  const { data: settings } = useSettingsQuery();
  const { data: studio, isLoading: isStudioLoading, isError: isStudioError, error: studioError } = useStudioDetailQuery(studioId);

  // Auto-redirect if adult content is disabled
  useEffect(() => {
    if (!isStudioLoading && studio && studio.is_adult && !settings?.include_adult) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isStudioLoading, studio, settings?.include_adult, navigate]);

  const hasLibraryItems = useMemo(() => {
    return !!(studio?.available_media_types && studio.available_media_types.length > 0);
  }, [studio]);

  const viewModeOptions = useMemo(() => {
    const opts = [];
    if (hasLibraryItems) {
      opts.push({ value: 'library', label: t('library.details.inLibrary') || 'Have' });
    }
    opts.push({ value: 'discover', label: t('library.details.discover') || 'Discover' });
    return opts;
  }, [hasLibraryItems, t]);

  const viewModeParam = getString('view', '');
  const viewMode = viewModeParam || (hasLibraryItems ? 'library' : 'discover');

  const VALID_DISCOVERY_PROVIDERS = useMemo(() => new Set(['tmdb', 'tmdb_network', 'stashdb', 'fansdb', 'theporndb']), []);

  const discoverSourceOptions = useMemo(() => {
    if (studio?.external_links && studio.external_links.length > 0) {
      const providers = Array.from(
        new Set(
          studio.external_links
            .map(l => l.provider?.toLowerCase())
            .filter(p => p && VALID_DISCOVERY_PROVIDERS.has(p))
        )
      );
      if (providers.length > 1) {
        return providers.map(p => ({
          value: p,
          label: p === 'tmdb' ? 'TMDb' : (p === 'tmdb_network' ? 'TMDb Network' : (p === 'stashdb' ? 'StashDB' : (p === 'fansdb' ? 'FansDB' : (p === 'theporndb' ? 'ThePornDB' : p.toUpperCase()))))
        }));
      }
    }
    return [];
  }, [studio, VALID_DISCOVERY_PROVIDERS]);

  const defaultSource = useMemo(() => {
    if (studio?.external_links && studio.external_links.length > 0) {
      const validLink = studio.external_links.find(l => VALID_DISCOVERY_PROVIDERS.has(l.provider?.toLowerCase()));
      if (validLink) return validLink.provider.toLowerCase();
    }
    return studio?.is_adult ? 'stashdb' : 'tmdb';
  }, [studio, VALID_DISCOVERY_PROVIDERS]);

  const effectiveDiscoverSource = discoverSource || defaultSource;

  const effectiveDiscoverMediaType = useMemo(() => {
    if (effectiveDiscoverSource === 'tmdb_network') return 'tv';
    return discoverMediaType;
  }, [effectiveDiscoverSource, discoverMediaType]);

  const isTmdbSource = effectiveDiscoverSource === 'tmdb' || effectiveDiscoverSource === 'tmdb_network';
  const isMultiTypeSource = isTmdbSource || effectiveDiscoverSource === 'theporndb';

  const sortOptions = useMemo(() => {
    const isAdultGql = viewMode === 'discover' && (effectiveDiscoverSource === 'stashdb' || effectiveDiscoverSource === 'fansdb');
    return [
      { value: 'name', label: t('library.sort.name') || 'Name' },
      { value: 'popularity', label: t('library.sort.popularity') || 'Popularity' },
      isAdultGql
        ? { value: 'trending', label: t('library.sort.trending') || 'Trending' }
        : { value: 'rating', label: t('library.sort.rating') || 'Rating' },
      { value: 'release_date', label: t('library.sort.releaseDate') || 'Release Date' },
    ];
  }, [t, viewMode, effectiveDiscoverSource]);

  const rawSortBy = getString('sort_by', 'popularity');
  const sortBy = useMemo(() => {
    const exists = sortOptions.some(opt => opt.value === rawSortBy);
    if (!exists) {
      if (rawSortBy === 'rating' && sortOptions.some(opt => opt.value === 'trending')) {
        return 'trending';
      }
      if (rawSortBy === 'trending' && sortOptions.some(opt => opt.value === 'rating')) {
        return 'rating';
      }
      return 'popularity';
    }
    return rawSortBy;
  }, [rawSortBy, sortOptions]);

  const sortDirection = getString('sort_dir', 'desc');

  const setSortBy = (val) => setParam('sort_by', val);
  const setSortDirection = (val) => setParam('sort_dir', val);

  const apiSortBy = useMemo(() => {
    const base = sortBy === 'name' ? 'title' : sortBy;
    return `${base}_${sortDirection}`;
  }, [sortBy, sortDirection]);

  const discoverApiSortBy = useMemo(() => {
    const base = sortBy === 'name' ? 'name' : sortBy;
    return `${base}.${sortDirection}`;
  }, [sortBy, sortDirection]);

  const tabOptions = useMemo(() => {
    const allOptions = [
      { value: 'movies', label: t('library.tabs.movies') || 'Movies' },
      { value: 'tv', label: t('library.tabs.tv') || 'TV Shows' },
      { value: 'scenes', label: t('library.tabs.scenes') || 'Scenes' },
    ];
    if (studio?.available_media_types && studio.available_media_types.length > 0) {
      return allOptions.filter(opt => studio.available_media_types.includes(opt.value));
    }
    return [];
  }, [studio, t]);

  const effectiveActiveTab = tabOptions.some(o => o.value === activeTab)
    ? activeTab
    : (tabOptions[0]?.value || 'movies');

  const targetStudioId = studio?.id || studioId;

  // Paginated media items (Library)
  const mediaParams = useMemo(() => ({
    selected_studio_id: targetStudioId,
    tab: effectiveActiveTab,
    pageSize: 24,
    include_adult: studio?.is_adult ?? false,
    filter_ownership: 'owned',
    sortBy: apiSortBy,
  }), [targetStudioId, effectiveActiveTab, studio?.is_adult, apiSortBy]);

  const mediaQuery = useLibraryInfiniteQuery(mediaParams);
  const mediaItems = useMemo(() => {
    return mediaQuery.data?.pages?.flatMap(page => page.items || []) || [];
  }, [mediaQuery.data]);

  const hasMore = mediaQuery.hasNextPage;
  const isFetchingNextPage = mediaQuery.isFetchingNextPage;

  // Infinite scroll for Library
  const observerRef = useInfiniteScroll({
    onIntersect: () => mediaQuery.fetchNextPage(),
    enabled: viewMode === 'library' && hasMore && !isFetchingNextPage,
    root: '.media-grid-wrapper',
    rootMargin: '0px 0px 800px 0px',
    threshold: 0,
  });

  // Discover state & Query

  const discoverQuery = useStudioDiscoverInfiniteQuery(
    targetStudioId,
    isMultiTypeSource ? effectiveDiscoverMediaType : 'scenes',
    24,
    {
      source: effectiveDiscoverSource,
      sort_by: discoverApiSortBy,
      enabled: viewMode === 'discover' && !isStudioLoading && !!studio,
    }
  );

  const discoverItems = useMemo(() => {
    return discoverQuery.data?.pages?.flatMap(page => page.items || []) || [];
  }, [discoverQuery.data]);

  const hasMoreDiscover = discoverQuery.hasNextPage;
  const isFetchingNextDiscover = discoverQuery.isFetchingNextPage;

  const discoverObserverRef = useInfiniteScroll({
    onIntersect: () => discoverQuery.fetchNextPage(),
    enabled: viewMode === 'discover' && hasMoreDiscover && !isFetchingNextDiscover,
    root: '.media-grid-wrapper',
    rootMargin: '0px 0px 800px 0px',
    threshold: 0,
  });

  // Actions
  const updateStatusMutation = useUpdateStudioStatusMutation();

  const handleToggleActive = () => {
    if (!studio) return;
    updateStatusMutation.mutate({
      studioId: studio.id,
      isActive: !studio.is_active,
    });
  };

  const handleToggleFavorite = () => {
    if (!studio) return;
    updateStatusMutation.mutate({
      studioId: studio.id,
      isFavorite: !studio.is_favorite,
    });
  };

  const handleRatingChange = (newRating) => {
    if (!studio) return;
    updateStatusMutation.mutate({
      studioId: studio.id,
      userRating: newRating,
    });
  };

  const handleSaveReview = () => {
    if (!studio) return;
    updateStatusMutation.mutate({
      studioId: studio.id,
      userComment: reviewText,
    });
    setEditingReviewItem(null);
  };

  const logoUrl = resolveDetailsImageUrl(studio?.logo_path, API_BASE, 'logo');

  const socialLinks = useMemo(() => {
    if (!studio?.external_links) return [];
    return studio.external_links
      .map((link) => {
        const href = link.profile_url || '#';
        const key = link.provider.toLowerCase();
        const label = link.provider.toUpperCase();
        return {
          key: `${key}-${link.id}`,
          label,
          href,
          iconSrc: getIconForUrl(href, key, 'links/website.svg'),
        };
      })
      .filter((l) => l.href && l.href !== '#');
  }, [studio]);

  const filteredSubStudios = useMemo(() => {
    if (!studio?.sub_studios) return [];
    if (viewMode === 'library') {
      return studio.sub_studios.filter(child => child.has_library_items);
    }
    return studio.sub_studios;
  }, [studio, viewMode]);


  return {
    studioId,
    studio,
    isStudioLoading,
    isStudioError,
    studioError,
    settings,
    t,
    navigate,

    viewMode,
    setViewMode,
    viewModeOptions,

    sortOptions,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,

    activeTab,
    setActiveTab,
    tabOptions,
    effectiveActiveTab,

    discoverSource,
    setDiscoverSource,
    discoverSourceOptions,
    effectiveDiscoverSource,

    discoverMediaType,
    setDiscoverMediaType,
    effectiveDiscoverMediaType,

    isTmdbSource,
    isMultiTypeSource,

    mediaQuery,
    mediaItems,
    isFetchingNextPage,
    observerRef,

    discoverQuery,
    discoverItems,
    isFetchingNextDiscover,
    discoverObserverRef,

    isLogoDrawerOpen,
    setIsLogoDrawerOpen,
    isReviewModalOpen: !!editingReviewItem,
    setIsReviewModalOpen,
    editingReviewItem,
    setEditingReviewItem,
    reviewText,
    setReviewText,
    handleSaveReview,
    isActivateHovered,
    setIsActivateHovered,

    handleToggleActive,
    handleToggleFavorite,
    handleRatingChange,
    handleReviewSubmit: handleSaveReview,

    logoUrl,
    socialLinks,
    filteredSubStudios,
  };
}
