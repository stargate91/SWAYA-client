import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePlayMediaMutation, fetchLibraryTvDetail } from '@/queries';
import { isTvEntityId, stripEntityPrefix } from '@/lib/entityIds';

export const getNextOwnedEpisode = (tvDetail) => {
  const seasons = Array.isArray(tvDetail?.seasons) ? tvDetail.seasons : [];

  for (const season of seasons) {
    const ownedEpisodes = (season.episodes || []).filter((episode) => episode.path && !episode.is_missing);
    const inProgress = ownedEpisodes.find((episode) => episode.resume_position > 0);
    if (inProgress) return inProgress;
  }

  for (const season of seasons) {
    const ownedEpisodes = (season.episodes || []).filter((episode) => episode.path && !episode.is_missing);
    const unwatched = ownedEpisodes.find((episode) => !episode.is_watched);
    if (unwatched) return unwatched;
  }

  for (const season of seasons) {
    const ownedEpisodes = (season.episodes || []).filter((episode) => episode.path && !episode.is_missing);
    if (ownedEpisodes.length > 0) return ownedEpisodes[0];
  }

  return null;
};

export function usePlayOverlayAction({ tab } = {}) {
  const queryClient = useQueryClient();
  const playMutation = usePlayMediaMutation();

  const handlePlayOverlayClick = useCallback(async (event, item) => {
    if (event?.stopPropagation) {
      event.stopPropagation();
    }

    if (playMutation.isPending) return;

    const isTv = tab === 'tv' || item?.type === 'tv' || isTvEntityId(item?.id);
    if (!isTv) {
      playMutation.mutate(item?.id);
      return;
    }

    try {
      const tvId = stripEntityPrefix(item?.id);
      const tvDetail = await fetchLibraryTvDetail(queryClient, tvId);
      const nextEpisode = getNextOwnedEpisode(tvDetail);
      if (nextEpisode?.id) {
        playMutation.mutate(nextEpisode.id);
      }
    } catch {
      // Ignore overlay play failures and leave normal card navigation intact.
    }
  }, [tab, playMutation, queryClient]);

  return {
    handlePlayOverlayClick,
    playMutation,
    isPending: playMutation.isPending,
  };
}
