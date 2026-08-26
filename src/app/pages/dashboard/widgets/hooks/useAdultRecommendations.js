import { useMemo } from 'react';
import { useSettingsQuery } from '@/queries/settingsQueries';
import {
  useRecommendationsQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
} from '@/queries/dashboardQueries';
import useWatchlistHandler from './useWatchlistHandler';
import useRecommendationActions from './useRecommendationActions';

export default function useAdultRecommendations() {
  const { data: settings = {} } = useSettingsQuery();
  const includeAdult = settings?.include_adult;
  const language = settings?.primary_metadata_language;
  const adultTagBlacklist = settings?.adult_tag_blacklist;

  const { data: rawRecommendations, isLoading } = useRecommendationsQuery(language, includeAdult, adultTagBlacklist);
  
  const recommendations = useMemo(() => {
    if (!rawRecommendations) return null;
    const discoverAdult = rawRecommendations.discover_adult || [];
    const withPoster = discoverAdult.filter(item => !!item.poster_path);
    const withoutPoster = discoverAdult.filter(item => !item.poster_path);
    return {
      ...rawRecommendations,
      discover_adult: [...withPoster, ...withoutPoster],
    };
  }, [rawRecommendations]);

  const watchlistIdsFromQuery = recommendations?.watchlist_item_ids;

  const addToWatchlistMutation = useAddToWatchlistMutation();
  const removeFromWatchlistMutation = useRemoveFromWatchlistMutation();

  const { actualWatchlistIds, handleWatchlist } = useWatchlistHandler(
    watchlistIdsFromQuery,
    addToWatchlistMutation,
    removeFromWatchlistMutation
  );

  const { handlePlayClick, handleCardClick, playMutationPending } = useRecommendationActions();

  return {
    includeAdult,
    recommendations,
    isLoading,
    actualWatchlistIds,
    handleWatchlist,
    handlePlayClick,
    handleCardClick,
    playMutationPending,
    settings,
  };
}
