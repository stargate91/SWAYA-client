import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePlayMediaMutation } from '@/queries';
import { fetchLibraryTvDetail } from '@/queries/metadataQueries';
import { isTvEntityId, stripEntityPrefix } from '@/lib/entityIds';

export function useRandomPlay({ getRandomPlayableItem }) {
  const queryClient = useQueryClient();
  const playMutation = usePlayMediaMutation();

  const handleRandomPlay = useCallback(async () => {
    const randomItem = await getRandomPlayableItem();
    if (!randomItem) return;

    const isTv = randomItem.type === 'tv' || isTvEntityId(randomItem.id);
    if (!isTv) {
      playMutation.mutate(randomItem.id);
      return;
    }

    try {
      const tvId = stripEntityPrefix(randomItem.id);
      const tvDetail = await fetchLibraryTvDetail(queryClient, tvId);
      const seasons = Array.isArray(tvDetail?.seasons) ? tvDetail.seasons : [];
      let nextEpisode = null;

      for (const season of seasons) {
        const owned = (season.episodes || []).filter((ep) => ep.path && !ep.is_missing);
        const inProgress = owned.find((ep) => ep.resume_position > 0);
        if (inProgress) {
          nextEpisode = inProgress;
          break;
        }
      }
      if (!nextEpisode) {
        for (const season of seasons) {
          const owned = (season.episodes || []).filter((ep) => ep.path && !ep.is_missing);
          const unwatched = owned.find((ep) => !ep.is_watched);
          if (unwatched) {
            nextEpisode = unwatched;
            break;
          }
        }
      }
      if (!nextEpisode) {
        for (const season of seasons) {
          const owned = (season.episodes || []).filter((ep) => ep.path && !ep.is_missing);
          if (owned.length > 0) {
            nextEpisode = owned[0];
            break;
          }
        }
      }

      if (nextEpisode?.id) {
        playMutation.mutate(nextEpisode.id);
      }
    } catch (err) {
      console.error('Failed to play random TV show:', err);
    }
  }, [getRandomPlayableItem, playMutation, queryClient]);

  return {
    handleRandomPlay,
    playMutation,
  };
}
