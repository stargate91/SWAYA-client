import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';

export const useSearchMetadataQuery = (query, itemType, year, season, episode, includeAdult, provider, options = {}) => useQuery({
  queryKey: [...QK.metadataSearch, query, itemType, year, season, episode, includeAdult, provider],
  queryFn: () => api.metadata.search({ query, itemType, year, season, episode, includeAdult, provider }),
  ...options,
});

export const useTvSeasonsQuery = (tvId, options = {}) => {
  const { language = 'en-US', ...queryOptions } = options;
  return useQuery({
    queryKey: [...QK.tvSeasons, tvId, language],
    queryFn: () => api.tv.getSeasons(tvId, { language }),
    ...queryOptions,
  });
};

export const useTvEpisodesQuery = (tvId, seasonNumber, options = {}) => {
  const { language = 'en-US', ...queryOptions } = options;
  return useQuery({
    queryKey: [...QK.tvEpisodes, tvId, seasonNumber, language],
    queryFn: () => api.tv.getEpisodes(tvId, seasonNumber, { language }),
    ...queryOptions,
  });
};

export const useResolveMetadataMutation = () => useMutation({
  mutationFn: (payload) => api.metadata.resolve(payload),
  meta: {
    invalidates: [QK.organizer, QK.organizerCount],
  },
});

export const useBulkResolveMetadataMutation = () => useMutation({
  mutationFn: (payload) => api.metadata.bulkResolve(payload),
  meta: {
    invalidates: [QK.organizer, QK.organizerCount],
  },
});

export const useFullMetadataQuery = (itemId, mediaType, options = {}) => {
  const { language, ...queryOptions } = options;
  return useQuery({
    queryKey: [...QK.fullMetadata, itemId, mediaType || null, language || null],
    queryFn: () => api.metadata.getItemFullMetadata(itemId, mediaType, { language }),
    ...queryOptions,
  });
};

export const useSyncLanguageMutation = () => useMutation({
  mutationFn: () => api.metadata.syncLanguage(),
  meta: {
    invalidates: [
      QK.libraryItemDetail,
      QK.libraryTvDetail,
      QK.libraryCollectionDetail,
      QK.fullMetadata,
      QK.personDetail,
      QK.personCredits,
      QK.library,
    ],
  },
});

export const useLibraryItemDetailQuery = (itemId, options = {}) => {
  const { mediaType, ...queryOptions } = options;
  const parsed = (() => {
    if (typeof itemId === 'string' && itemId.includes('_')) {
      const parts = itemId.split('_');
      let provider = parts[0];
      const externalId = parts.slice(1).join('_');
      return { provider, externalId };
    }
    return {};
  })();

  return useQuery({
    queryKey: [...QK.libraryItemDetail, itemId, mediaType || null],
    queryFn: () => api.library.getItemDetail(itemId, { mediaType, ...parsed }),
    placeholderData: (previousData) => previousData,
    staleTime: 0,
    ...queryOptions,
  });
};

export const useLibraryTvDetailQuery = (tvId, options = {}) => {
  const { seasonsLimit = 5, initialEpisodesLimit = 4, language, ...queryOptions } = options;
  return useQuery({
    queryKey: [...QK.libraryTvDetail, tvId, language || null],
    queryFn: () => api.library.getTvDetail(tvId, { seasonsLimit, initialEpisodesLimit, language }),
    placeholderData: (previousData) => previousData,
    staleTime: 0,
    ...queryOptions,
  });
};

export const useLibraryCollectionDetailQuery = (collectionId, options = {}) => {
  const { language, ...queryOptions } = options;
  return useQuery({
    queryKey: [...QK.libraryCollectionDetail, collectionId, language || null],
    queryFn: () => api.library.getCollectionDetail(collectionId, { language }),
    ...queryOptions,
  });
};

export const usePersonDetailQuery = (personId, options = {}) => useQuery({
  queryKey: [...QK.personDetail, personId],
  queryFn: () => api.people.getDetail(personId),
  refetchInterval: (query) => {
    const data = query?.state?.data;
    if (data && !data.is_fully_cached) {
      return 3000;
    }
    return false;
  },
  ...options,
});

export const usePersonCreditsQuery = (personId, mediaType, page, pageSize, options = {}) => {
  const { excludeKnownFor = false, source, tag, studio, local_only, sort_by, ...queryOptions } = options;
  return useQuery({
    queryKey: [...QK.personCredits, personId, mediaType, page, pageSize, excludeKnownFor, source || null, tag || null, studio || null, local_only || null, sort_by || null],
    queryFn: () => api.people.getCredits(personId, mediaType, { page, pageSize, excludeKnownFor, source, tag, studio, local_only, sort_by }),
    placeholderData: (previousData) => previousData,
    ...queryOptions,
  });
};

export const usePersonCreditsInfiniteQuery = (personId, mediaType, pageSize, options = {}) => {
  const { excludeKnownFor = false, source, tag, studio, local_only, ...queryOptions } = options;
  return useInfiniteQuery({
    queryKey: [...QK.personCredits, 'infinite', personId, mediaType, pageSize, excludeKnownFor, source || null, tag || null, studio || null, local_only || null],
    queryFn: ({ pageParam = 1 }) => api.people.getCredits(personId, mediaType, { page: pageParam, pageSize, excludeKnownFor, source, tag, studio, local_only }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil((lastPage.total_items || 0) / pageSize);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
    ...queryOptions,
  });
};

export const usePersonCreditBackdropsQuery = (personId, tmdbId, mediaType, options = {}) => useQuery({
  queryKey: [...QK.personCreditBackdrops, personId, tmdbId, mediaType],
  queryFn: () => api.people.getCreditBackdrops(personId, tmdbId, mediaType),
  ...options,
});

export const useActiveSessionsQuery = (options = {}) => useQuery({
  queryKey: QK.activeSessions,
  queryFn: () => api.media.activeSessions(),
  ...options,
});

export const useStudiosQuery = (params, options = {}) => useQuery({
  queryKey: [...QK.studios, params],
  queryFn: () => api.metadata.getStudios(params),
  ...options,
});

export const updateStudioStatusOptimistic = async (queryClient, studioId, updates) => {
  const idStr = String(studioId);
  const idNum = Number(studioId);
  const isNumValid = !isNaN(idNum);

  // Find all studio-detail query keys matching the ID
  const allStudioDetailQueries = queryClient.getQueriesData({ queryKey: QK.studioDetail });
  const studioKeys = [];

  allStudioDetailQueries.forEach(([queryKey, queryData]) => {
    const keyId = queryKey[1];
    if (keyId === undefined || keyId === null) return;
    const isMatch =
      String(keyId) === idStr ||
      (isNumValid && Number(keyId) === idNum) ||
      (queryData && (String(queryData.id) === idStr || (isNumValid && Number(queryData.id) === idNum)));
    if (isMatch) {
      studioKeys.push(queryKey);
    }
  });

  if (studioKeys.length === 0) {
    studioKeys.push([...QK.studioDetail, idStr]);
    if (isNumValid) {
      studioKeys.push([...QK.studioDetail, idNum]);
    }
  }

  // Cancel outgoing refetches
  for (const key of studioKeys) {
    await queryClient.cancelQueries({ queryKey: key });
  }
  await queryClient.cancelQueries({ queryKey: QK.studios });
  await queryClient.cancelQueries({ queryKey: QK.studiosInfinite });
  await queryClient.cancelQueries({ queryKey: QK.recentlyFollowedStudios });

  // Snapshot the previous values
  const previousDetails = studioKeys.map((key) => [key, queryClient.getQueryData(key)]);
  const previousList = queryClient.getQueriesData({ queryKey: QK.studios });
  const previousListInfinite = queryClient.getQueriesData({ queryKey: QK.studiosInfinite });
  const previousListRecentlyFollowed = queryClient.getQueriesData({ queryKey: QK.recentlyFollowedStudios });

  // Optimistically update the details cache
  const updateData = (old) => {
    if (!old) return old;
    return { ...old, ...updates };
  };

  for (const key of studioKeys) {
    queryClient.setQueryData(key, updateData);
  }

  // Optimistically update the list caches
  const updateListItems = (old) => {
    if (!old) return old;
    if (Array.isArray(old.items)) {
      return {
        ...old,
        items: old.items.map((item) => {
          const matches = String(item.id) === idStr || (isNumValid && Number(item.id) === idNum);
          return matches ? { ...item, ...updates } : item;
        }),
      };
    }
    if (Array.isArray(old)) {
      return old.map((item) => {
        const matches = String(item.id) === idStr || (isNumValid && Number(item.id) === idNum);
        return matches ? { ...item, ...updates } : item;
      });
    }
    return old;
  };

  previousList.forEach(([queryKey]) => {
    queryClient.setQueryData(queryKey, updateListItems);
  });

  // For infinite lists
  const updateInfiniteItems = (old) => {
    if (!old) return old;
    return {
      ...old,
      pages: old.pages.map((page) => {
        if (!page || !Array.isArray(page.items)) return page;
        return {
          ...page,
          items: page.items.map((item) => {
            const matches = String(item.id) === idStr || (isNumValid && Number(item.id) === idNum);
            return matches ? { ...item, ...updates } : item;
          }),
        };
      }),
    };
  };

  previousListInfinite.forEach(([queryKey]) => {
    queryClient.setQueryData(queryKey, updateInfiniteItems);
  });

  // For recently followed infinite list
  const updateRecentlyFollowedItems = (old) => {
    if (!old) return old;
    return {
      ...old,
      pages: old.pages.map((page) => {
        if (!Array.isArray(page)) return page;
        return page.map((item) => {
          const matches = String(item.id) === idStr || (isNumValid && Number(item.id) === idNum);
          return matches ? { ...item, ...updates } : item;
        });
      }),
    };
  };

  previousListRecentlyFollowed.forEach(([queryKey]) => {
    queryClient.setQueryData(queryKey, updateRecentlyFollowedItems);
  });

  return {
    previousDetails,
    previousList,
    previousListInfinite,
    previousListRecentlyFollowed,
    studioKeys,
  };
};

export const useUpdateStudioStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ studioId, isActive, isFavorite, userRating, userComment, isAdult }) => {
      const payload = {};
      if (isActive !== undefined) payload.is_active = isActive;
      if (isFavorite !== undefined) payload.is_favorite = isFavorite;
      if (userRating !== undefined) payload.user_rating = userRating;
      if (userComment !== undefined) payload.user_comment = userComment;
      if (isAdult !== undefined) payload.is_adult = isAdult;
      return api.metadata.updateStudioStatus(studioId, payload);
    },
    onMutate: async ({ studioId, isActive, isFavorite, userRating, userComment, isAdult }) => {
      const updates = {};
      if (isActive !== undefined) updates.is_active = isActive;
      if (isFavorite !== undefined) updates.is_favorite = isFavorite;
      if (userRating !== undefined) updates.user_rating = userRating;
      if (userComment !== undefined) updates.user_comment = userComment;
      if (isAdult !== undefined) updates.is_adult = isAdult;

      return updateStudioStatusOptimistic(queryClient, studioId, updates);
    },
    onError: (err, variables, context) => {
      if (context) {
        if (context.previousDetails) {
          context.previousDetails.forEach(([key, val]) => queryClient.setQueryData(key, val));
        }
        if (context.previousList) {
          context.previousList.forEach(([key, val]) => queryClient.setQueryData(key, val));
        }
        if (context.previousListInfinite) {
          context.previousListInfinite.forEach(([key, val]) => queryClient.setQueryData(key, val));
        }
        if (context.previousListRecentlyFollowed) {
          context.previousListRecentlyFollowed.forEach(([key, val]) => queryClient.setQueryData(key, val));
        }
      }
    },
    onSuccess: (data, variables, context) => {
      const updateCache = (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          is_active: data.is_active !== undefined ? data.is_active : oldData.is_active,
          is_favorite: data.is_favorite !== undefined ? data.is_favorite : oldData.is_favorite,
          user_rating: data.user_rating !== undefined ? data.user_rating : oldData.user_rating,
          user_comment: data.user_comment !== undefined ? data.user_comment : oldData.user_comment,
          is_adult: data.is_adult !== undefined ? data.is_adult : oldData.is_adult,
        };
      };

      if (context?.studioKeys) {
        context.studioKeys.forEach((key) => {
          if (data) {
            queryClient.setQueryData(key, updateCache);
          }
        });
      }
    },
    meta: {
      invalidates: (_data, variables) => [
        [...QK.studioDetail, variables?.studioId],
        QK.studios,
        QK.studiosInfinite,
        QK.recentlyFollowedStudios,
        QK.library,
        QK.libraryInfinite,
        QK.libraryCounts,
        QK.ratingsStats,
      ],
    },
  });
};

export const useStudiosInfiniteQuery = (params, options = {}) => useInfiniteQuery({
  queryKey: [...QK.studiosInfinite, params],
  queryFn: ({ pageParam = 1 }) => api.metadata.getStudios({ ...params, page: pageParam }),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    const next = (lastPage.page || 1) + 1;
    return next <= (lastPage.total_pages || 1) ? next : undefined;
  },
  ...options,
});

export const useStudioDetailQuery = (studioId, options = {}) => useQuery({
  queryKey: [...QK.studioDetail, studioId],
  queryFn: () => api.metadata.getStudioDetail(studioId),
  enabled: !!studioId,
  placeholderData: (previousData) => previousData,
  ...options,
});

export const useOverrideStudioLogoMutation = () => useMutation({
  mutationFn: ({ studioId, logoPath }) => api.metadata.overrideStudioLogo(studioId, logoPath),
  meta: {
    invalidates: (_data, variables) => [
      [...QK.studioDetail, variables?.studioId],
      QK.studios,
      QK.studiosInfinite,
      QK.library,
      QK.libraryInfinite,
    ],
  },
});

export const useUploadStudioLogoMutation = () => useMutation({
  mutationFn: ({ studioId, file }) => api.metadata.uploadStudioLogo(studioId, file),
  meta: {
    invalidates: (_data, variables) => [
      [...QK.studioDetail, variables?.studioId],
      QK.studios,
      QK.studiosInfinite,
      QK.library,
      QK.libraryInfinite,
    ],
  },
});

export const useStudioDiscoverInfiniteQuery = (studioId, mediaType, pageSize = 24, options = {}) => {
  const { source, sort_by, ...queryOptions } = options;
  return useInfiniteQuery({
    queryKey: [...QK.studioDiscoverInfinite, studioId, mediaType, pageSize, source || null, sort_by || null],
    queryFn: ({ pageParam = 1 }) => api.metadata.discoverStudioItems(studioId, { mediaType, source, page: pageParam, pageSize, sort_by }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.has_more ? (lastPage.page || 1) + 1 : undefined;
    },
    ...queryOptions,
  });
};

export const useGlobalSearchQuery = ({ query, source, type, includeAdult, page = 1, pageSize = 20 } = {}, options = {}) => {
  const isEnabled = options.enabled !== undefined ? options.enabled : Boolean(query && query.trim());
  return useQuery({
    queryKey: [...QK.globalSearch, query?.trim() || '', source || 'tmdb', type || 'all', includeAdult, page, pageSize],
    queryFn: () => api.metadata.globalSearch({
      query: query.trim(),
      source,
      type: type === 'all' ? undefined : type,
      include_adult: includeAdult,
      page,
      pageSize,
    }),
    enabled: isEnabled,
    staleTime: 60 * 1000,
    ...options,
  });
};

export const usePeopleTmdbSearchQuery = ({ query, adultOnly, source } = {}, options = {}) => {
  const isEnabled = options.enabled !== undefined ? options.enabled : Boolean(query && query.trim());
  return useQuery({
    queryKey: [...QK.peopleSearchTmdb, query?.trim() || '', adultOnly, source || null],
    queryFn: () => api.people.searchTmdb(query.trim(), { adultOnly, source }),
    enabled: isEnabled,
    staleTime: 60 * 1000,
    ...options,
  });
};

export const useMediaPreviewUrlQuery = (previewItemId, options = {}) => {
  return useQuery({
    queryKey: [...QK.mediaPreviewUrl, previewItemId],
    queryFn: ({ signal }) => api.media.checkPreviewAvailable(previewItemId, { signal }),
    enabled: Boolean(previewItemId) && (options.enabled !== false),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useScrapeHealthyCelebMutation = () => useMutation({
  mutationFn: ({ personId, healthyCelebUrl }) => api.people.scrapeHealthyCeleb(personId, healthyCelebUrl),
  meta: {
    invalidates: (_data, variables) => [
      [...QK.personDetail, variables?.personId],
      QK.people,
    ],
  },
});

export const fetchGlobalSearch = (queryClient, { query, source, type, searchType, includeAdult, page = 1, pageSize = 20 } = {}) => {
  const effectiveType = searchType || type || 'all';
  return queryClient.fetchQuery({
    queryKey: [...QK.globalSearch, query?.trim() || '', source || 'tmdb', effectiveType, includeAdult, page, pageSize],
    queryFn: () => api.metadata.globalSearch({
      query: query?.trim() || '',
      source: source || 'tmdb',
      searchType: effectiveType,
      includeAdult,
      page,
      pageSize,
    }),
    staleTime: 60 * 1000,
  });
};

export const fetchPeopleTmdbSearch = (queryClient, { query, adultOnly, source } = {}) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.peopleSearchTmdb, query?.trim() || '', adultOnly, source || null],
    queryFn: () => api.people.searchTmdb(query?.trim() || '', { adultOnly, source }),
    staleTime: 60 * 1000,
  });
};

export const fetchItemFullMetadata = (queryClient, itemId) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.fullMetadata, itemId],
    queryFn: () => api.metadata.getItemFullMetadata(itemId),
    staleTime: 60 * 1000,
  });
};

export const fetchSearchMetadata = (queryClient, { query, itemType, year, season, episode, includeAdult, provider } = {}) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.metadataSearch, query, itemType, year, season, episode, includeAdult, provider || null],
    queryFn: () => api.metadata.search({ query, itemType, year, season, episode, includeAdult, provider }),
    staleTime: 60 * 1000,
  });
};

export const fetchMediaPreviewUrl = (queryClient, previewItemId, signal) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.mediaPreviewUrl, previewItemId],
    queryFn: () => api.media.checkPreviewAvailable(previewItemId, { signal }),
    staleTime: 5 * 60 * 1000,
  });
};

export const fetchLibraryTvDetail = (queryClient, tvId, options = {}) => {
  const { seasonsLimit = 5, initialEpisodesLimit = 4, language } = options;
  return queryClient.fetchQuery({
    queryKey: [...QK.libraryTvDetail, tvId, language || null],
    queryFn: () => api.library.getTvDetail(tvId, { seasonsLimit, initialEpisodesLimit, language }),
  });
};

export const fetchLibraryItemDetail = (queryClient, itemId, options = {}) => {
  const { mediaType, fullPeople } = options;
  return queryClient.fetchQuery({
    queryKey: [...QK.libraryItemDetail, itemId, mediaType || null, Boolean(fullPeople)],
    queryFn: () => api.library.getItemDetail(itemId, { mediaType, fullPeople }),
  });
};

export const fetchLibraryTvSeasonDetail = (queryClient, tvId, seasonNumber) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.tvSeasons, `${tvId}:s${seasonNumber}`],
    queryFn: () => api.library.getTvSeasonDetail(tvId, seasonNumber),
    staleTime: 60 * 1000,
  });
};

export const fetchPersonCredits = (queryClient, personId, type, params = {}) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.personCredits, personId, type, params],
    queryFn: () => api.people.getCredits(personId, type, params),
    staleTime: 60 * 1000,
  });
};

export const fetchPersonCreditBackdrops = (queryClient, personId, tmdbId, mediaType) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.personCreditBackdrops, personId, tmdbId, mediaType],
    queryFn: () => api.people.getCreditBackdrops(personId, tmdbId, mediaType),
    staleTime: 5 * 60 * 1000,
  });
};
