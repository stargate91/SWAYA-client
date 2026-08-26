import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { usePlayMediaMutation, fetchTvNextEpisode } from '@/queries';
import { isTvEntityId, stripEntityPrefix } from '@/lib/entityIds';
import { getCreditDetailPath } from '@/lib/routes';

export const useRecommendationActions = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const playMutation = usePlayMediaMutation();

  const handlePlayClick = useCallback(async (item) => {
    if (playMutation.isPending) return;

    const isTv = item.media_type === 'tv' || item.media_type === 'episode' || item.type === 'tv' || item.type === 'episode' || isTvEntityId(item.id);
    if (!isTv) {
      const playId = item.in_library ? item.media_item_id : item.id;
      playMutation.mutate(playId);
      return;
    }

    try {
      const tvId = stripEntityPrefix(item.id);
      const nextEpisode = await fetchTvNextEpisode(queryClient, tvId);

      if (nextEpisode?.id) {
        playMutation.mutate(nextEpisode.id);
      } else if (item.media_item_id) {
        playMutation.mutate(item.media_item_id);
      }
    } catch (err) {
      console.error('Failed to play TV show:', err);
      if (item.media_item_id) {
        playMutation.mutate(item.media_item_id);
      }
    }
  }, [playMutation, queryClient]);

  const handleCardClick = useCallback((item) => {
    const type = item.media_type || (item.title ? 'movie' : (item.profile_path ? 'person' : 'tv'));
    const path = getCreditDetailPath(item, type, item.source);
    if (path) {
      navigate(path, { state: { allowAdult: true } });
    }
  }, [navigate]);

  return { handlePlayClick, handleCardClick, playMutationPending: playMutation.isPending };
};

export default useRecommendationActions;
