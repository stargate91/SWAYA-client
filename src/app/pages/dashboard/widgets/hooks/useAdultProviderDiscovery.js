import { useMemo, useState, useCallback } from 'react';
import { useSettingsQuery, useUpdateSettingsMutation } from '@/queries/settingsQueries';
import {
  useRecommendationsQuery,
  useAdultDiscoveryInfiniteQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
} from '@/queries/dashboardQueries';
import useWatchlistHandler from './useWatchlistHandler';
import useRecommendationActions from './useRecommendationActions';
import { hasProviderCredential } from '@/lib/providerAvailability';

export function useAdultProviderDiscovery({ provider = 'stashdb' } = {}) {
  const { data: settings = {} } = useSettingsQuery();
  const updateSettingsMutation = useUpdateSettingsMutation();
  const includeAdult = settings?.include_adult;
  const language = settings?.primary_metadata_language;
  const adultTagBlacklist = settings?.adult_tag_blacklist;

  const isStash = provider === 'stashdb';
  const hasCredential = hasProviderCredential(settings, provider);
  const currentFocus = (isStash ? settings?.adult_stashdb_focus_tag : settings?.adult_fansdb_focus_tag) || '';
  const targetSortMode = (isStash ? settings?.adult_stashdb_sort_mode : settings?.adult_fansdb_sort_mode) || 'TRENDING';
  const sortSettingKey = isStash ? 'adult_stashdb_sort_mode' : 'adult_fansdb_sort_mode';

  const [prevSortSetting, setPrevSortSetting] = useState(targetSortMode);
  const [localSortMode, setLocalSortMode] = useState(targetSortMode);

  if (targetSortMode !== prevSortSetting) {
    setPrevSortSetting(targetSortMode);
    setLocalSortMode(targetSortMode);
  }

  const { data: recommendations, isLoading: isRecsLoading } = useRecommendationsQuery(
    language,
    includeAdult,
    adultTagBlacklist
  );
  const watchlistIdsFromQuery = recommendations?.watchlist_item_ids;

  const {
    data: paginatedData,
    isLoading: isPaginatedLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdultDiscoveryInfiniteQuery(provider, currentFocus, localSortMode);

  const items = useMemo(() => {
    if (currentFocus) {
      return paginatedData?.pages?.flat() || [];
    }
    return recommendations?.discover_adult_providers?.[provider] || [];
  }, [currentFocus, paginatedData, recommendations, provider]);

  const isLoading = currentFocus ? isPaginatedLoading : isRecsLoading;

  const addToWatchlistMutation = useAddToWatchlistMutation();
  const removeFromWatchlistMutation = useRemoveFromWatchlistMutation();

  const { actualWatchlistIds, handleWatchlist } = useWatchlistHandler(
    watchlistIdsFromQuery,
    addToWatchlistMutation,
    removeFromWatchlistMutation
  );

  const { handlePlayClick, handleCardClick, playMutationPending } = useRecommendationActions();

  const handleSortChange = useCallback((newSort) => {
    setLocalSortMode(newSort);
    updateSettingsMutation.mutate(
      { [sortSettingKey]: newSort },
      {
        onError: (err) => {
          console.error('Failed to update sort mode:', err);
        },
      }
    );
  }, [sortSettingKey, updateSettingsMutation]);

  const isVisible = Boolean(
    includeAdult &&
    hasCredential &&
    (isLoading || items.length > 0 || currentFocus)
  );

  const defaultTitle = isStash ? 'StashDB Discovery' : 'FansDB Discovery';
  const titleKey = isStash ? 'dashboard.recommendations.discover_stashdb' : 'dashboard.recommendations.discover_fansdb';

  return {
    isVisible,
    isLoading,
    isStash,
    currentFocus,
    localSortMode,
    items,
    settings,
    actualWatchlistIds,
    handleWatchlist,
    handlePlayClick,
    handleCardClick,
    playMutationPending,
    handleSortChange,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    defaultTitle,
    titleKey,
  };
}

export default useAdultProviderDiscovery;
