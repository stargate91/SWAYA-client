import { useLibraryModeStore, isNsfwMode } from '@/stores/useLibraryModeStore';
import { useSettingsQuery } from '@/queries/settingsQueries';
import {
  useRecommendationsQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
} from '@/queries/dashboardQueries';
import useWatchlistHandler from './useWatchlistHandler';
import useRecommendationActions from './useRecommendationActions';

export default function useSpotlight() {
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const { data: settings = {} } = useSettingsQuery();
  const includeAdult = Boolean(settings?.include_adult) && isNsfwMode(sessionMode);
  const language = settings?.primary_metadata_language;
  const adultTagBlacklist = settings?.adult_tag_blacklist;

  const { data: recommendations, isLoading } = useRecommendationsQuery(language, includeAdult, adultTagBlacklist);
  const watchlistIdsFromQuery = recommendations?.watchlist_item_ids;

  const addToWatchlistMutation = useAddToWatchlistMutation();
  const removeFromWatchlistMutation = useRemoveFromWatchlistMutation();

  const { actualWatchlistIds, handleWatchlist } = useWatchlistHandler(
    watchlistIdsFromQuery,
    addToWatchlistMutation,
    removeFromWatchlistMutation
  );

  const { handleCardClick } = useRecommendationActions();

  return {
    recommendations,
    isLoading,
    actualWatchlistIds,
    handleWatchlist,
    handleCardClick,
  };
}
