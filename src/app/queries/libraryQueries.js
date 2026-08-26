import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';

export const useStatsQuery = (includeAdult = false) => useQuery({
  queryKey: [...QK.stats, includeAdult],
  queryFn: () => api.library.getStats({ include_adult: includeAdult }),
});

export const useRatingsStatsQuery = (includeAdult = false, gender = undefined) => useQuery({
  queryKey: [...QK.ratingsStats, includeAdult, gender],
  queryFn: () => api.library.getRatingsStats({ include_adult: includeAdult, gender }),
});

export const useLibraryQuery = (params) => useQuery({
  queryKey: [...QK.library, params],
  queryFn: ({ signal }) => api.library.getItems(params, { signal }),
  placeholderData: (previousData, previousQuery) => {
    if (!previousData || !previousQuery) return undefined;
    const prevParams = previousQuery.queryKey[1] || {};
    const currentParams = params || {};
    if (prevParams.tab !== currentParams.tab) {
      return undefined;
    }
    return previousData;
  },
});

export const useLibraryInfiniteQuery = (params) => useInfiniteQuery({
  queryKey: [...QK.libraryInfinite, params],
  queryFn: ({ pageParam = 1, signal }) => {
    const fetchParams = { ...params, page: pageParam };
    return api.library.getItems(fetchParams, { signal });
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
  },
  placeholderData: (previousData) => previousData,
  enabled: !!params,
});

export const useCollectionsQuery = (params) => useQuery({
  queryKey: [...QK.libraryCollections, params],
  queryFn: ({ signal }) => api.library.getCollections(params, { signal }),
  placeholderData: (previousData, previousQuery) => {
    if (!previousData || !previousQuery) return undefined;
    const prevParams = previousQuery.queryKey[1] || {};
    const currentParams = params || {};
    if (prevParams.tab !== currentParams.tab) {
      return undefined;
    }
    return previousData;
  },
});

export const useTagsQuery = (isAdult = false, page = 1, pageSize = 40, searchQuery = '') => useQuery({
  queryKey: [...QK.libraryTags, isAdult, page, pageSize, searchQuery],
  queryFn: () => api.library.getTags(isAdult, page, pageSize, searchQuery),
});

export const useTagItemsQuery = (tagName, isAdult = false) => useQuery({
  queryKey: [...QK.tagItems, tagName, isAdult],
  queryFn: () => api.library.getTagItems(tagName, isAdult),
  enabled: !!tagName,
});

export const useAllTagsQuery = (isAdult = false) => useQuery({
  queryKey: [...QK.allTags, isAdult],
  queryFn: () => api.tags.getAll(isAdult),
});

export const useLibraryFiltersQuery = (params) => useQuery({
  queryKey: [...QK.libraryFilters, params],
  queryFn: ({ signal }) => api.library.getFilters(params, { signal }),
  staleTime: 5 * 60 * 1000,
});

export const useTvNextEpisodeQuery = (tvId, options = {}) => useQuery({
  queryKey: [...QK.tvNextEpisode, tvId],
  queryFn: () => api.library.getTvNextEpisode(tvId),
  enabled: Boolean(tvId) && (options.enabled !== false),
  ...options,
});

export const usePlaybackInfoQuery = (itemId, options = {}) => useQuery({
  queryKey: [...QK.playbackInfo, itemId],
  queryFn: () => api.media.getPlaybackInfo(itemId),
  enabled: Boolean(itemId) && (options.enabled !== false),
  staleTime: 60 * 1000,
  ...options,
});

export const fetchPlaybackInfo = (queryClient, itemId) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.playbackInfo, itemId],
    queryFn: () => api.media.getPlaybackInfo(itemId),
    staleTime: 60 * 1000,
  });
};

export const fetchLibraryItems = (queryClient, params) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.library, params],
    queryFn: ({ signal }) => api.library.getItems(params, { signal }),
    staleTime: 60 * 1000,
  });
};

export const fetchTvNextEpisode = (queryClient, tvId) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.tvNextEpisode, tvId],
    queryFn: () => api.library.getTvNextEpisode(tvId),
  });
};

export const useLibraryCountsQuery = (activeSessionMode, options = {}) => {
  const { enabled = true } = options;
  return useQuery({
    queryKey: [...QK.libraryCounts, activeSessionMode],
    queryFn: ({ signal }) => api.library.getItems({
      tab: 'movies',
      page: 1,
      pageSize: 1,
      include_adult: activeSessionMode === 'nsfw'
    }, { signal }),
    enabled: !!activeSessionMode && enabled,
  });
};

