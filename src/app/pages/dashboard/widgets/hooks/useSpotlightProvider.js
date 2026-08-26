import { useState, useMemo, useCallback } from 'react';
import useSpotlight from './useSpotlight';
import { useLibraryModeStore, isNsfwMode } from '@/stores/useLibraryModeStore';
import { useSettingsQuery } from '@/queries/settingsQueries';

export function useSpotlightProvider() {
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const { data: settings = {} } = useSettingsQuery();
  const showAdult = Boolean(settings?.include_adult);
  const isNsfw = showAdult && isNsfwMode(sessionMode);

  const {
    recommendations,
    isLoading,
    actualWatchlistIds,
    handleWatchlist,
    handleCardClick,
  } = useSpotlight();

  const { providersList, initialAdultProvider } = useMemo(() => {
    const stashdbItems = recommendations?.discover_adult_providers?.stashdb || [];
    const tmdbAdultItems = recommendations?.discover_adult || [];
    const fansdbItems = recommendations?.discover_adult_providers?.fansdb || [];

    const list = [];
    if (stashdbItems.length > 0) list.push({ id: 'stashdb', label: 'StashDB', items: stashdbItems });
    if (tmdbAdultItems.length > 0) list.push({ id: 'tmdb', label: 'TMDb Adult', items: tmdbAdultItems });
    if (fansdbItems.length > 0) list.push({ id: 'fansdb', label: 'FansDB', items: fansdbItems });

    let initial = 'stashdb';
    if (stashdbItems.length > 0) initial = 'stashdb';
    else if (tmdbAdultItems.length > 0) initial = 'tmdb';
    else if (fansdbItems.length > 0) initial = 'fansdb';

    return { providersList: list, initialAdultProvider: initial };
  }, [recommendations]);

  const [adultProvider, setAdultProvider] = useState(initialAdultProvider);

  const activeProviderObj = useMemo(() => {
    if (providersList.length === 0) return null;
    return providersList.find((p) => p.id === adultProvider) || providersList[0];
  }, [providersList, adultProvider]);

  const item = useMemo(() => {
    if (isNsfw) {
      return activeProviderObj?.items?.[0] || null;
    }
    return recommendations?.trending?.[0] || null;
  }, [isNsfw, activeProviderObj, recommendations]);

  const handleNextProvider = useCallback(() => {
    if (providersList.length <= 1 || !activeProviderObj) return;
    const currentIndex = providersList.findIndex((p) => p.id === activeProviderObj.id);
    const nextIndex = (currentIndex + 1) % providersList.length;
    setAdultProvider(providersList[nextIndex].id);
  }, [providersList, activeProviderObj]);

  const handlePrevProvider = useCallback(() => {
    if (providersList.length <= 1 || !activeProviderObj) return;
    const currentIndex = providersList.findIndex((p) => p.id === activeProviderObj.id);
    const prevIndex = (currentIndex - 1 + providersList.length) % providersList.length;
    setAdultProvider(providersList[prevIndex].id);
  }, [providersList, activeProviderObj]);

  const isAdult = isNsfw && activeProviderObj?.id !== 'tmdb';
  const hasMultipleProviders = isNsfw && providersList.length > 1;
  const isVisible = Boolean(!isLoading && item);

  return {
    isLoading,
    isVisible,
    isNsfw,
    item,
    activeProviderObj,
    hasMultipleProviders,
    actualWatchlistIds,
    handleWatchlist,
    handleCardClick,
    handleNextProvider,
    handlePrevProvider,
    isAdult,
  };
}

export default useSpotlightProvider;
