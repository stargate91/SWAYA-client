import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { QK } from '../lib/queryKeys';

export const useContinueWatchingQuery = (params) => useQuery({
  queryKey: [...QK.continueWatching, params],
  queryFn: () => api.library.getContinueWatching(params),
  staleTime: 30000,
});

export const useRecommendationsQuery = (language, includeAdult, adultTagBlacklist) => useQuery({
  queryKey: [...QK.recommendations, language, includeAdult, adultTagBlacklist],
  queryFn: () => api.recommendations.get(language, includeAdult),
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
});

export const useAdultDiscoveryInfiniteQuery = (provider, focusTag, sortMode) => useInfiniteQuery({
  queryKey: [...QK.adultDiscoveryInfinite, provider, focusTag, sortMode],
  queryFn: ({ pageParam = 1 }) => api.recommendations.getAdultDiscoveryPaginated(provider, focusTag, sortMode, pageParam, 20),
  initialPageParam: 1,
  enabled: Boolean(provider) && Boolean(focusTag),
  staleTime: 5 * 60 * 1000,
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.length > 0 ? allPages.length + 1 : undefined;
  },
});

export const useRecentlyActivatedPeopleInfiniteQuery = (includeAdult, gender) => useInfiniteQuery({
  queryKey: [...QK.recentlyActivatedPeople, includeAdult, gender],
  queryFn: ({ pageParam = 1 }) => api.recommendations.getRecentlyActivatedPeople(pageParam, 20, includeAdult, gender),
  initialPageParam: 1,
  staleTime: 2 * 60 * 1000,
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.length === 20 ? allPages.length + 1 : undefined;
  },
});

export const useRecentlyFollowedStudiosInfiniteQuery = (includeAdult) => useInfiniteQuery({
  queryKey: [...QK.recentlyFollowedStudios, includeAdult],
  queryFn: ({ pageParam = 1 }) => api.recommendations.getRecentlyFollowedStudios(pageParam, 20, includeAdult),
  initialPageParam: 1,
  staleTime: 2 * 60 * 1000,
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.length === 20 ? allPages.length + 1 : undefined;
  },
});

export const useRecentlyAddedInfiniteQuery = (language, includeAdult, mediaType) => useInfiniteQuery({
  queryKey: [...QK.recentlyAdded, language, includeAdult, mediaType],
  queryFn: ({ pageParam = 1 }) => api.recommendations.getRecentlyAdded(pageParam, 20, includeAdult, language, mediaType),
  initialPageParam: 1,
  staleTime: 60 * 1000,
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.length === 20 ? allPages.length + 1 : undefined;
  },
});

export const useAddToWatchlistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tmdbId, mediaItemId, type, isAdult, title, posterPath, year }) =>
      api.recommendations.addToWatchlist({ tmdbId, mediaItemId, type, isAdult, title, posterPath, year }),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: QK.recommendations });
      await queryClient.cancelQueries({ queryKey: QK.listDetails });
      const previousRecommendations = queryClient.getQueriesData({ queryKey: QK.recommendations });
      const previousListDetails = queryClient.getQueriesData({ queryKey: QK.listDetails });

      const watchlistId = variables.type === 'scene' ? variables.mediaItemId : variables.tmdbId;

      // Update recommendations watchlist IDs
      queryClient.setQueriesData({ queryKey: QK.recommendations }, (old) => {
        if (!old) return old;
        const currentIds = old.watchlist_item_ids || [];
        if (currentIds.includes(watchlistId)) return old;
        return {
          ...old,
          watchlist_item_ids: [...currentIds, watchlistId],
        };
      });

      // Find the watchlist ID matching targetWatchlistName
      let targetWatchlistName = 'Watchlist';
      if (variables.isAdult) {
        if (variables.type === 'movie' || variables.type === 'tv') {
          targetWatchlistName = 'Adult Movies';
        } else {
          targetWatchlistName = 'Adult Scenes';
        }
      } else {
        if (variables.type === 'scene' || variables.type === 'video' || variables.type === 'videos') {
          targetWatchlistName = 'Video Watchlist';
        } else {
          targetWatchlistName = 'Watchlist';
        }
      }

      let targetWatchlistId = null;
      const listsQueries = queryClient.getQueriesData({ queryKey: QK.lists });
      for (const [key, listArray] of listsQueries) {
        if (key.length <= 2 && Array.isArray(listArray)) {
          const found = listArray.find((l) => l.name === targetWatchlistName);
          if (found) {
            targetWatchlistId = found.id;
            break;
          }
        }
      }

      if (targetWatchlistId !== null) {
        const matchingQueries = queryClient.getQueryCache().findAll({ queryKey: QK.listDetails });
        for (const query of matchingQueries) {
          const queryKey = query.queryKey;
          const listId = queryKey[2];
          if (String(listId) === String(targetWatchlistId)) {
            queryClient.setQueryData(queryKey, (old) => {
              if (!old || !old.items) return old;
              const exists = old.items.some(
                (item) => item.tmdb_id === variables.tmdbId || item.media_item_id === variables.mediaItemId
              );
              if (exists) return old;

              const newItem = {
                id: 'temp_' + (variables.tmdbId || variables.mediaItemId || Date.now()),
                media_item_id: variables.mediaItemId || null,
                match_id: null,
                person_id: null,
                studio_id: null,
                collection_id: null,
                added_at: new Date().toISOString(),
                title: variables.title || 'Loading...',
                tmdb_id: variables.tmdbId || null,
                media_type: variables.type,
                poster_path: variables.posterPath || null,
                year: variables.year ? parseInt(variables.year, 10) : null,
                rating: null,
                is_adult: !!variables.isAdult,
                external_id: variables.tmdbId || null,
                provider: variables.type === 'scene' ? 'theporndb' : 'tmdb',
                release_date: null,
                people: null,
                user_rating: null,
                is_watched: false,
                genres: [],
              };

              return {
                ...old,
                items: [newItem, ...old.items],
              };
            });
          }
        }
      }

      return { previousRecommendations, previousListDetails };
    },
    onError: (err, variables, context) => {
      console.error("useAddToWatchlistMutation: Error occurred:", err);
      if (context?.previousRecommendations) {
        context.previousRecommendations.forEach(([queryKey, value]) => {
          queryClient.setQueryData(queryKey, value);
        });
      }
      if (context?.previousListDetails) {
        context.previousListDetails.forEach(([queryKey, value]) => {
          queryClient.setQueryData(queryKey, value);
        });
      }
    },
    meta: {
      invalidates: [QK.lists, QK.listDetails, QK.listMembership, QK.libraryItemDetail, QK.libraryTvDetail, QK.recommendations],
    },
  });
};

export const useRemoveFromWatchlistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tmdbId) => api.recommendations.removeFromWatchlist(tmdbId),
    onMutate: async (watchlistId) => {
      await queryClient.cancelQueries({ queryKey: QK.recommendations });
      await queryClient.cancelQueries({ queryKey: QK.listDetails });
      const previousRecommendations = queryClient.getQueriesData({ queryKey: QK.recommendations });
      const previousListDetails = queryClient.getQueriesData({ queryKey: QK.listDetails });

      queryClient.setQueriesData({ queryKey: QK.recommendations }, (old) => {
        if (!old) return old;
        return {
          ...old,
          watchlist_item_ids: (old.watchlist_item_ids || []).filter((id) => id !== watchlistId),
        };
      });

      queryClient.setQueriesData({ queryKey: QK.listDetails }, (old) => {
        if (!old || !old.items) return old;
        return {
          ...old,
          items: old.items.filter(
            (item) =>
              item.tmdb_id !== watchlistId &&
              item.media_item_id !== watchlistId &&
              item.id !== watchlistId
          ),
        };
      });

      return { previousRecommendations, previousListDetails };
    },
    onError: (err, watchlistId, context) => {
      console.error("useRemoveFromWatchlistMutation: Error occurred:", err);
      if (context?.previousRecommendations) {
        context.previousRecommendations.forEach(([queryKey, value]) => {
          queryClient.setQueryData(queryKey, value);
        });
      }
      if (context?.previousListDetails) {
        context.previousListDetails.forEach(([queryKey, value]) => {
          queryClient.setQueryData(queryKey, value);
        });
      }
    },
    meta: {
      invalidates: [QK.lists, QK.listDetails, QK.listMembership, QK.libraryItemDetail, QK.libraryTvDetail, QK.recommendations],
    },
  });
};

export const useDiscoverQuery = (genreId, year) => useQuery({
  queryKey: [...QK.discover, genreId, year],
  queryFn: () => api.recommendations.discover(genreId, year),
});

