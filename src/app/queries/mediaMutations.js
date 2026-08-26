import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';
import { useSettingsQuery } from './settingsQueries';
import { isElectron, openMpvFullscreen } from '@/lib/ipc';
import { ROUTES } from '@/lib/routes';

const prettifyOrganizerLanguage = (value) => String(value || '')
  .replace(/[_-]+/g, ' ')
  .replace(/\b\w/g, (char) => char.toUpperCase());

const applyOrganizerItemUpdates = (item, variables) => {
  if (!item || typeof item !== 'object') return item;
  
  const nextItem = { ...item };
  
  if (variables.custom_language !== undefined) {
    nextItem.target_language = variables.custom_language;
    nextItem.language = prettifyOrganizerLanguage(variables.custom_language);
  }
  if (variables.custom_audio_type !== undefined) {
    nextItem.custom_audio_type = variables.custom_audio_type;
  }
  if (variables.custom_source !== undefined) {
    nextItem.custom_source = variables.custom_source;
  }
  if (variables.custom_edition !== undefined) {
    nextItem.custom_edition = variables.custom_edition;
  }
  if (variables.main_type !== undefined) {
    nextItem.type = variables.main_type;
  }
  if (variables.season !== undefined) {
    nextItem.season = variables.season != null ? String(variables.season) : null;
  }
  if (variables.episode !== undefined) {
    nextItem.episode = variables.episode != null ? String(variables.episode) : null;
  }
  if (variables.parent_id !== undefined) {
    nextItem.parent_id = variables.parent_id;
  }
  
  return nextItem;
};

const updateOrganizerItemsOptimistic = (organizerData, itemIds, variables) => {
  if (!organizerData || typeof organizerData !== 'object' || !variables) return organizerData;

  const targetIds = new Set((itemIds || []).map((itemId) => String(itemId)));
  let changed = false;

  const updateList = (items = []) => items.map((item) => {
    if (!targetIds.has(String(item?.id))) return item;
    changed = true;
    return applyOrganizerItemUpdates(item, variables);
  });

  const nextData = {
    ...organizerData,
    manual: updateList(organizerData.manual || []),
    movies: updateList(organizerData.movies || []),
    tv: updateList(organizerData.tv || []),
    collisions: updateList(organizerData.collisions || []),
  };

  return changed ? nextData : organizerData;
};

const updateSeasonsEpisodesWatched = (seasons, targetIds, isWatched, tvId) => {
  if (!Array.isArray(seasons) || isWatched === undefined) return seasons;
  const idsSet = targetIds instanceof Set
    ? targetIds
    : new Set((Array.isArray(targetIds) ? targetIds : [targetIds]).map((id) => String(id)));

  const isTvTarget = (tvId && (idsSet.has(String(tvId)) || idsSet.has(`tmdb_${tvId}`) || idsSet.has(`tv_${tvId}`))) ||
    Array.from(idsSet).some(id => tvId && (id === String(tvId) || id === `tmdb_${tvId}` || id === `tv_${tvId}`));

  return seasons.map((season) => {
    const sNum = season?.season_number;
    const isSeasonTarget = isTvTarget ||
      idsSet.has(String(season?.id)) ||
      (sNum != null && (idsSet.has(`s${sNum}`) || (tvId && (idsSet.has(`tmdb_${tvId}_s${sNum}`) || idsSet.has(`tmdb_${tvId}_${sNum}`)))));

    const episodes = Array.isArray(season?.episodes) ? season.episodes : [];
    const updatedEpisodes = episodes.map((ep) => {
      const isEpTarget = isSeasonTarget ||
        idsSet.has(String(ep?.id)) ||
        (ep?.media_item_id != null && idsSet.has(String(ep.media_item_id)));
      if (isEpTarget) {
        return { ...ep, is_watched: isWatched, resume_position: isWatched ? (ep.resume_position || 0) : 0 };
      }
      return ep;
    });

    let isSeasonWatched = season.is_watched;
    if (isSeasonTarget) {
      isSeasonWatched = isWatched;
    } else if (updatedEpisodes.length > 0) {
      isSeasonWatched = updatedEpisodes.every((ep) => ep.is_watched);
    }

    return {
      ...season,
      episodes: Array.isArray(season?.episodes) ? updatedEpisodes : season.episodes,
      is_watched: isSeasonWatched,
    };
  });
};

const updateSingleSeasonEpisodesWatched = (seasonData, targetIds, isWatched, tvId) => {
  if (!seasonData || !Array.isArray(seasonData.episodes)) return seasonData;
  const updatedSeasons = updateSeasonsEpisodesWatched([seasonData], targetIds, isWatched, tvId);
  return updatedSeasons[0] || seasonData;
};

export const useUpdateMediaMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => api.media.update(payload),
    onMutate: async (variables) => {
      const scanMode = variables?.scanMode;
      const sessionMode = variables?.sessionMode;
      if (scanMode === undefined && sessionMode === undefined) {
        return {};
      }

      await queryClient.cancelQueries({ queryKey: QK.organizer });
      const previousQueries = queryClient.getQueriesData({ queryKey: QK.organizer });
      queryClient.setQueriesData({ queryKey: QK.organizer }, (oldData) =>
        updateOrganizerItemsOptimistic(oldData, [variables?.id], variables)
      );
      return { previousQueries };
    },
    onError: (err, variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
      }
    },
    meta: {
      invalidateAllMedia: true,
    },
  });
};

export const useBulkUpdateMediaMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => api.media.bulkUpdate(payload),
    onMutate: async (variables) => {
      const scanMode = variables?.scanMode;
      const sessionMode = variables?.sessionMode;
      const itemIds = variables?.ids || variables?.item_ids || [];
      if ((scanMode === undefined && sessionMode === undefined) || itemIds.length === 0) {
        return {};
      }

      await queryClient.cancelQueries({ queryKey: QK.organizer });
      const previousQueries = queryClient.getQueriesData({ queryKey: QK.organizer });
      queryClient.setQueriesData({ queryKey: QK.organizer }, (oldData) =>
        updateOrganizerItemsOptimistic(oldData, itemIds, variables)
      );
      return { previousQueries };
    },
    onError: (err, variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
      }
    },
    meta: {
      invalidateAllMedia: true,
    },
  });
};

export const useUpdateMediaStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, payload }) => api.media.updateStatus(itemId, payload),
    onMutate: async ({ itemId, payload, tvId }) => {
      const targetId = tvId || itemId;

      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: [...QK.libraryTvDetail, targetId] });
      await queryClient.cancelQueries({ queryKey: [...QK.libraryItemDetail, targetId] });
      await queryClient.cancelQueries({ queryKey: QK.library });

      // Snapshot previous values
      const prevTvQueries = queryClient.getQueriesData({ queryKey: [...QK.libraryTvDetail, targetId] });
      const prevItemQueries = queryClient.getQueriesData({ queryKey: [...QK.libraryItemDetail, targetId] });
      const prevLibraryList = queryClient.getQueriesData({ queryKey: QK.library });

      const updates = {};
      if (payload) {
        if ('user_rating' in payload) updates.user_rating = payload.user_rating;
        if ('is_watched' in payload) updates.is_watched = payload.is_watched;
        if ('custom_tags' in payload) updates.custom_tags = payload.custom_tags;
      }

      // Optimistically update details
      if (Object.keys(updates).length > 0) {
        queryClient.setQueriesData({ queryKey: QK.libraryTvDetail }, (queryData) => {
          if (!queryData) return queryData;
          const isSingleEpisode = payload?.media_type === 'episode' || (tvId && String(itemId) !== String(tvId));
          const newSeasons = updateSeasonsEpisodesWatched(queryData.seasons, itemId, updates.is_watched, isSingleEpisode ? null : tvId);

          const regularSeasons = (newSeasons || []).filter(s => s.season_number > 0);
          const allEpisodes = regularSeasons.flatMap(s => s.episodes || []);
          const totalEps = queryData.watch_stats?.total_episodes_count || queryData.number_of_episodes || allEpisodes.length || 0;

          let watchedCount = queryData.watch_stats?.watched_episodes_count || 0;
          if (isSingleEpisode && 'is_watched' in updates) {
            if (updates.is_watched) {
              watchedCount = Math.min(totalEps, watchedCount + 1);
            } else {
              watchedCount = Math.max(0, watchedCount - 1);
            }
          } else if (!isSingleEpisode && 'is_watched' in updates) {
            watchedCount = updates.is_watched ? totalEps : 0;
          }

          const isTvWatched = totalEps > 0 && watchedCount >= totalEps;

          return {
            ...queryData,
            ...(isSingleEpisode ? {} : updates),
            is_watched: isSingleEpisode ? isTvWatched : ('is_watched' in updates ? updates.is_watched : queryData.is_watched),
            watch_stats: {
              ...(queryData.watch_stats || {}),
              watched_episodes_count: watchedCount,
            },
            seasons: newSeasons,
          };
        });
        if ('is_watched' in updates) {
          queryClient.setQueriesData({ queryKey: QK.tvSeasons }, (seasonData) =>
            updateSingleSeasonEpisodesWatched(seasonData, itemId, updates.is_watched, payload?.media_type === 'episode' ? null : tvId)
          );
        }
        prevItemQueries.forEach(([queryKey, queryData]) => {
          if (queryData) {
            queryClient.setQueryData(queryKey, {
              ...queryData,
              ...updates
            });
          }
        });

        // Optimistically update lists
        prevLibraryList.forEach(([queryKey, queryData]) => {
          if (!queryData) return;
          let changed = false;
          const params = queryKey[1] || {};
          const filterRating = params.filter_rating;

          const matchesTarget = (x) => x && (
            String(x.id) === String(targetId) ||
            String(x.id) === `tv_${targetId}` ||
            (tvId && String(x.id) === String(tvId))
          );

          const updateItem = (obj) => {
            if (!obj || typeof obj !== 'object') return obj;
            if (Array.isArray(obj)) {
              if ('user_rating' in updates) {
                const hasNewRating = updates.user_rating !== null && updates.user_rating !== undefined && Number(updates.user_rating) > 0;
                if (filterRating === 'unrated' && hasNewRating) {
                  const filtered = obj.filter(x => !matchesTarget(x));
                  if (filtered.length !== obj.length) changed = true;
                  return filtered;
                }
                if (filterRating === 'rated' && !hasNewRating) {
                  const filtered = obj.filter(x => !matchesTarget(x));
                  if (filtered.length !== obj.length) changed = true;
                  return filtered;
                }
              }
              return obj.map(x => {
                if (matchesTarget(x)) {
                  changed = true;
                  return { ...x, ...updates };
                }
                return updateItem(x);
              });
            }
            const nextObj = {};
            for (const key in obj) {
              nextObj[key] = updateItem(obj[key]);
            }
            return nextObj;
          };

          const updatedData = updateItem(queryData);
          if (changed) {
            if (updatedData && typeof updatedData === 'object' && 'total_items' in updatedData && Array.isArray(queryData.items)) {
              const diff = (queryData.items?.length || 0) - (updatedData.items?.length || 0);
              if (diff > 0) {
                updatedData.total_items = Math.max(0, (queryData.total_items || 0) - diff);
              }
            }
            queryClient.setQueryData(queryKey, updatedData);
          }
        });
      }

      return { prevTvQueries, prevItemQueries, prevLibraryList, targetId };
    },
    onError: (err, variables, context) => {
      if (context?.prevTvQueries) {
        context.prevTvQueries.forEach(([queryKey, queryData]) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
      if (context?.prevItemQueries) {
        context.prevItemQueries.forEach(([queryKey, queryData]) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
      if (context?.prevLibraryList) {
        context.prevLibraryList.forEach(([queryKey, queryData]) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
    onSuccess: (data, variables) => {
      const updateDetailCache = (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          user_rating: data.user_rating !== undefined ? data.user_rating : oldData.user_rating,
          user_comment: data.user_comment !== undefined ? data.user_comment : oldData.user_comment,
          is_watched: data.is_watched !== undefined ? data.is_watched : oldData.is_watched,
          custom_tags: data.custom_tags !== undefined ? data.custom_tags : (data.tags !== undefined ? data.tags : oldData.custom_tags),
          tags: data.tags !== undefined ? data.tags : oldData.tags,
        };
      };

      queryClient.setQueryData([...QK.fullMetadata, variables.itemId], updateDetailCache);
      queryClient.setQueryData([...QK.libraryItemDetail, variables.itemId], updateDetailCache);
      queryClient.setQueryData([...QK.libraryTvDetail, variables.itemId], updateDetailCache);

      if (variables.tvId) {
        const updateTvCacheWithEpisode = (oldData) => {
          if (!oldData) return oldData;
          const isSingleEpisode = variables.payload?.media_type === 'episode' || String(variables.itemId) !== String(variables.tvId);
          const newSeasons = updateSeasonsEpisodesWatched(oldData.seasons, variables.itemId, data.is_watched, isSingleEpisode ? null : variables.tvId);

          const regularSeasons = (newSeasons || []).filter(s => s.season_number > 0);
          const allEpisodes = regularSeasons.flatMap(s => s.episodes || []);
          const totalEps = oldData.watch_stats?.total_episodes_count || oldData.number_of_episodes || allEpisodes.length || 0;

          let watchedCount = oldData.watch_stats?.watched_episodes_count || 0;
          if (isSingleEpisode && data.is_watched !== undefined) {
            const allLoaded = regularSeasons.length > 0 && regularSeasons.every(s => s.episodes_complete !== false && (s.episodes || []).length > 0);
            if (allLoaded && allEpisodes.length > 0) {
              watchedCount = allEpisodes.filter(e => e.is_watched).length;
            }
          }

          const isTvWatched = totalEps > 0 && watchedCount >= totalEps;

          return {
            ...oldData,
            is_watched: isTvWatched,
            watch_stats: {
              ...(oldData.watch_stats || {}),
              watched_episodes_count: watchedCount,
            },
            seasons: newSeasons,
          };
        };

        queryClient.setQueriesData({ queryKey: QK.libraryTvDetail }, updateTvCacheWithEpisode);
        queryClient.setQueryData([...QK.libraryItemDetail, variables.tvId], updateDetailCache);
        queryClient.setQueryData([...QK.libraryItemDetail, `tv_${variables.tvId}`], updateDetailCache);

        if (data.is_watched !== undefined) {
          queryClient.setQueriesData({ queryKey: QK.tvSeasons }, (seasonData) =>
            updateSingleSeasonEpisodesWatched(seasonData, variables.itemId, data.is_watched, variables.payload?.media_type === 'episode' ? null : variables.tvId)
          );
        }
      }

      // Update matching items in the library query cache instead of invalidating everything
      queryClient.setQueriesData({ queryKey: QK.library }, (oldData, query) => {
        if (!oldData) return oldData;
        let changed = false;
        const params = query?.queryKey?.[1] || {};
        const filterRating = params.filter_rating;

        const matchesTarget = (x) => x && (
          String(x.id) === String(variables.itemId) ||
          String(x.id) === `tv_${variables.itemId}` ||
          (variables.tvId && String(x.id) === String(variables.tvId))
        );

        const newRating = data.user_rating !== undefined ? data.user_rating : undefined;
        const hasNewRating = newRating !== undefined && newRating !== null && Number(newRating) > 0;

        const updateItem = (obj) => {
          if (!obj || typeof obj !== 'object') return obj;
          if (Array.isArray(obj)) {
            if (newRating !== undefined) {
              if (filterRating === 'unrated' && hasNewRating) {
                const filtered = obj.filter(x => !matchesTarget(x));
                if (filtered.length !== obj.length) changed = true;
                return filtered;
              }
              if (filterRating === 'rated' && !hasNewRating) {
                const filtered = obj.filter(x => !matchesTarget(x));
                if (filtered.length !== obj.length) changed = true;
                return filtered;
              }
            }
            return obj.map(x => {
              if (matchesTarget(x)) {
                changed = true;
                return {
                  ...x,
                  user_rating: data.user_rating !== undefined ? data.user_rating : x.user_rating,
                  user_comment: data.user_comment !== undefined ? data.user_comment : x.user_comment,
                  is_watched: data.is_watched !== undefined ? data.is_watched : x.is_watched,
                  custom_tags: data.custom_tags !== undefined ? data.custom_tags : x.custom_tags,
                  tags: data.tags !== undefined ? data.tags : x.tags,
                };
              }
              return updateItem(x);
            });
          }
          const nextObj = {};
          for (const key in obj) {
            nextObj[key] = updateItem(obj[key]);
          }
          return nextObj;
        };

        const nextData = updateItem(oldData);
        if (changed && nextData && typeof nextData === 'object' && 'total_items' in nextData && Array.isArray(oldData.items)) {
          const diff = (oldData.items?.length || 0) - (nextData.items?.length || 0);
          if (diff > 0) {
            nextData.total_items = Math.max(0, (oldData.total_items || 0) - diff);
          }
        }
        return changed ? nextData : oldData;
      });
    },
    meta: {
      invalidates: (_data, variables) => {
        const payload = variables?.payload || {};
        const keys = [QK.ratingsStats];
        if ('user_rating' in payload || 'is_watched' in payload || 'user_comment' in payload) {
          keys.push(
            QK.library,
            QK.stats,
            QK.watchedHistory,
            QK.recommendations,
            QK.recentlyAdded,
            QK.recentlyActivated,
            QK.discover,
            QK.continueWatching,
          );
        }
        if ('custom_tags' in payload || 'is_tracked' in payload) {
          keys.push(
            QK.libraryTags,
            QK.allTags,
            QK.libraryFilters,
            QK.tagItems,
          );
        }
        return keys;
      },
      invalidateEntity: (_data, variables) => {
        const ids = [variables?.itemId];
        if (variables?.tvId) ids.push(variables.tvId);
        return ids.map((id) => ({
          id,
          opts: {
            detail: false,
            lists: true,
            stats: true,
            continueWatching: true,
            watchedHistory: true,
            recommendations: true,
          },
        }));
      },
    },
  });
};

export const useBulkUpdateWatchedMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemIds, isWatched, mediaType }) => {
      console.log('[useBulkUpdateWatchedMutation] Executing mutation:', { itemIds, isWatched, mediaType });
      return api.media.bulkWatched(itemIds, isWatched, mediaType);
    },
    onMutate: async (variables) => {
      const { itemIds, isWatched, tvId, mediaType } = variables;
      const idsSet = new Set(itemIds.map(id => String(id)));
      console.log('[useBulkUpdateWatchedMutation] onMutate optimistic update:', { itemIds, isWatched, tvId, mediaType });
      
      if (tvId) {
        await queryClient.cancelQueries({ queryKey: QK.libraryTvDetail });
      }
      await queryClient.cancelQueries({ queryKey: QK.library });

      // Optimistically update library listing cache
      const prevLibraryQueries = queryClient.getQueriesData({ queryKey: QK.library });
      queryClient.setQueriesData({ queryKey: QK.library }, (oldData) => {
        if (!oldData || !oldData.items) return oldData;
        return {
          ...oldData,
          items: oldData.items.map(item =>
            idsSet.has(String(item.id))
              ? { ...item, is_watched: isWatched, watch_count: isWatched ? Math.max(item.watch_count || 0, 1) : 0 }
              : item
          ),
        };
      });

      const prevTvQueries = queryClient.getQueriesData({ queryKey: QK.libraryTvDetail });

      const updateTvCache = (oldData) => {
        if (!oldData) return oldData;
        const totalEps = oldData.watch_stats?.total_episodes_count || oldData.number_of_episodes || 0;
        const isTvTarget = !tvId || idsSet.has(String(tvId)) || idsSet.has(`tmdb_${tvId}`) || idsSet.has(`tv_${tvId}`);
        const newSeasons = updateSeasonsEpisodesWatched(oldData.seasons, idsSet, isWatched, tvId);

        let newIsWatched;
        let newWatchStats;
        if (isTvTarget) {
          newIsWatched = isWatched;
          newWatchStats = {
            ...(oldData.watch_stats || {}),
            watched_episodes_count: isWatched ? totalEps : 0,
            in_progress_episodes: isWatched ? (oldData.watch_stats?.in_progress_episodes || []) : [],
            playback_logs: isWatched ? (oldData.watch_stats?.playback_logs || []) : [],
          };
        } else {
          const regularSeasons = (newSeasons || []).filter(s => s.season_number > 0);
          const allEpisodes = regularSeasons.flatMap(s => s.episodes || []);
          const allLoaded = regularSeasons.length > 0 && regularSeasons.every(s => s.episodes_complete !== false && (s.episodes || []).length > 0);
          let watchedCount = oldData.watch_stats?.watched_episodes_count || 0;
          if (allLoaded && allEpisodes.length > 0) {
            watchedCount = allEpisodes.filter(e => e.is_watched).length;
          }
          newIsWatched = totalEps > 0 && watchedCount >= totalEps;
          newWatchStats = {
            ...(oldData.watch_stats || {}),
            watched_episodes_count: watchedCount,
          };
        }

        return {
          ...oldData,
          is_watched: newIsWatched,
          watch_stats: newWatchStats,
          seasons: newSeasons,
        };
      };

      queryClient.setQueriesData({ queryKey: QK.libraryTvDetail }, updateTvCache);
      queryClient.setQueriesData({ queryKey: QK.tvSeasons }, (seasonData) =>
        updateSingleSeasonEpisodesWatched(seasonData, idsSet, isWatched, tvId)
      );

      return { prevTvQueries, prevLibraryQueries };
    },
    onError: (err, variables, context) => {
      if (context?.prevLibraryQueries) {
        for (const [queryKey, data] of context.prevLibraryQueries) {
          queryClient.setQueryData(queryKey, data);
        }
      }
      if (context?.prevTvQueries) {
        for (const [queryKey, data] of context.prevTvQueries) {
          queryClient.setQueryData(queryKey, data);
        }
      }
    },
    onSuccess: (_data, variables) => {
      const { itemIds, isWatched, tvId } = variables;
      const idsSet = new Set(itemIds.map(id => String(id)));

      const updateTvCache = (oldData) => {
        if (!oldData) return oldData;
        const totalEps = oldData.watch_stats?.total_episodes_count || oldData.number_of_episodes || 0;
        const isTvTarget = !tvId || idsSet.has(String(tvId)) || idsSet.has(`tmdb_${tvId}`) || idsSet.has(`tv_${tvId}`);
        const newSeasons = updateSeasonsEpisodesWatched(oldData.seasons, idsSet, isWatched, tvId);

        let newIsWatched;
        let newWatchStats;
        if (isTvTarget) {
          newIsWatched = isWatched;
          newWatchStats = {
            ...(oldData.watch_stats || {}),
            watched_episodes_count: isWatched ? totalEps : 0,
            in_progress_episodes: isWatched ? (oldData.watch_stats?.in_progress_episodes || []) : [],
            playback_logs: isWatched ? (oldData.watch_stats?.playback_logs || []) : [],
          };
        } else {
          const regularSeasons = (newSeasons || []).filter(s => s.season_number > 0);
          const allEpisodes = regularSeasons.flatMap(s => s.episodes || []);
          const allLoaded = regularSeasons.length > 0 && regularSeasons.every(s => s.episodes_complete !== false && (s.episodes || []).length > 0);
          let watchedCount = oldData.watch_stats?.watched_episodes_count || 0;
          if (allLoaded && allEpisodes.length > 0) {
            watchedCount = allEpisodes.filter(e => e.is_watched).length;
          }
          newIsWatched = totalEps > 0 && watchedCount >= totalEps;
          newWatchStats = {
            ...(oldData.watch_stats || {}),
            watched_episodes_count: watchedCount,
          };
        }

        return {
          ...oldData,
          is_watched: newIsWatched,
          watch_stats: newWatchStats,
          seasons: newSeasons,
        };
      };

      queryClient.setQueriesData({ queryKey: QK.libraryTvDetail }, updateTvCache);
      queryClient.setQueriesData({ queryKey: QK.tvSeasons }, (seasonData) =>
        updateSingleSeasonEpisodesWatched(seasonData, idsSet, isWatched, tvId)
      );
    },
    meta: {
      invalidates: () => [
        QK.library,
        QK.stats,
        QK.watchedHistory,
        QK.ratingsStats,
        QK.recommendations,
        QK.discover,
        QK.continueWatching,
      ],
      invalidateEntity: (_data, variables) => {
        const ids = variables.itemIds ? [...variables.itemIds] : (variables.entityId ? [variables.entityId] : []);
        if (variables?.tvId) ids.push(variables.tvId);
        return ids.map((id) => ({
          id,
          opts: {
            detail: false,
            lists: true,
            stats: true,
            continueWatching: true,
            watchedHistory: true,
            recommendations: true,
          },
        }));
      },
    },
  });
};

export const usePlayMediaMutation = () => {
  const navigate = useNavigate();
  const { data: settings = {} } = useSettingsQuery();

  return useMutation({
    mutationFn: async (arg) => {
      const itemId = typeof arg === 'object' ? arg.itemId : arg;
      const start = typeof arg === 'object' ? arg.start : undefined;
      const preferredPlayer = settings.preferred_player || 'swaya';
      if (preferredPlayer === 'swaya') {
        if (isElectron) {
          await openMpvFullscreen({ itemId, start });
        } else {
          const startQ = start !== undefined ? `?start=${start}` : '';
          navigate(ROUTES.PLAYER(itemId, startQ));
        }
        return { success: true };
      } else {
        return api.media.play(itemId);
      }
    },
    meta: {
      invalidateEntity: (_data, arg) => {
        const itemId = typeof arg === 'object' ? arg.itemId : arg;
        return { id: itemId, opts: { watchedHistory: true, continueWatching: true } };
      },
    },
  });
};

export const useResetProgressMutation = () => useMutation({
  mutationFn: (itemId) => api.media.resetProgress(itemId),
  meta: {
    invalidateEntity: (_data, itemId) => ({
      id: itemId,
      opts: { continueWatching: true, watchedHistory: true },
    }),
  },
});

export const usePreviewMediaMutation = () => {
  return useMutation({
    mutationFn: (filePath) => api.media.preview(filePath),
  });
};

export const useUpdateProgressMutation = () => useMutation({
  mutationFn: (payload) => api.media.updateProgress(payload),
  meta: {
    invalidateEntity: (_data, variables) => ({
      id: variables?.item_id || variables?.itemId,
      opts: { continueWatching: true, watchedHistory: true },
    }),
    broadcast: (_data, variables) => ({
      entityId: variables?.item_id || variables?.itemId,
      options: { continueWatching: true, watchedHistory: true },
    }),
  },
});

export const useDeleteLibraryItemMutation = () => useMutation({
  mutationFn: ({ itemId, mediaType, mode }) => api.library.deleteItem(itemId, mediaType, mode),
  meta: {
    invalidateAllMedia: true,
    invalidateEntity: (_data, { itemId }) => ({
      id: itemId,
      opts: {
        lists: true,
        stats: true,
        continueWatching: true,
        watchedHistory: true,
        recommendations: true,
        organizer: true,
      },
    }),
  },
});

