import { useMemo } from 'react';

/**
 * Custom hook to prepare caching flags, loading labels, empty state strings,
 * and grid layout properties for PersonCreditsDiscoverGrid.
 *
 * @param {object} params
 * @param {object} [params.item] - Person entity item
 * @param {string} [params.activeSource] - Selected metadata source
 * @param {string} [params.activeDiscoverTab] - Selected discover tab
 * @param {object} [params.activeGridQuery] - React Query state object
 * @param {Array} [params.accumulatedItems] - Fetched credit items
 * @param {boolean} [params.hasMore] - Whether more items exist
 * @param {boolean} [params.isSceneGrid] - Whether rendering scenes vs posters
 * @param {Function} [params.t] - Translation function
 */
export function usePersonCreditsGrid({
  item,
  activeSource,
  activeDiscoverTab,
  activeGridQuery = {},
  accumulatedItems = [],
  hasMore = false,
  isSceneGrid = false,
  t = (k) => k,
} = {}) {
  const isCachingNeeded = useMemo(() => {
    return (
      !item?.is_fully_cached &&
      (item?.is_adult ||
        Boolean(item?.external_ids?.tmdb) ||
        item?.external_links?.some((l) => l.provider === 'tmdb'))
    );
  }, [item?.is_fully_cached, item?.is_adult, item?.external_ids?.tmdb, item?.external_links]);

  const loadingLabel = useMemo(() => {
    const name = item?.name || 'this performer';
    const sourceName =
      activeSource === 'theporndb'
        ? 'ThePornDB'
        : activeSource === 'stashdb'
          ? 'StashDB'
          : activeSource === 'fansdb'
            ? 'FansDB'
            : 'TMDb';

    return t('library.details.cachingFilmography', {
      defaultValue: `Downloading and caching ${name}'s complete filmography from ${sourceName}... This only happens once to make browsing instant!`,
      name,
      source: sourceName,
    });
  }, [item?.name, activeSource, t]);

  const emptyStateTitle = useMemo(() => {
    return (
      t(`dynamic.emptyStates.emptyCredits_${activeDiscoverTab}.title`) ||
      t('library.details.emptyCredits') ||
      'No credits found for this source.'
    );
  }, [activeDiscoverTab, t]);

  const emptyStateDescription = useMemo(() => {
    return t(`dynamic.emptyStates.emptyCredits_${activeDiscoverTab}.description`) || '';
  }, [activeDiscoverTab, t]);

  const gridVariant = isSceneGrid ? 'auto-scene' : 'auto-poster';
  const skeletonAspect = isSceneGrid ? 'scene' : 'poster';

  const isLoading = Boolean(activeGridQuery.isLoading);
  const isEmpty = !isLoading && accumulatedItems.length === 0;
  const isFinished = !hasMore && accumulatedItems.length > 0;

  return {
    isCachingNeeded,
    loadingLabel,
    emptyStateTitle,
    emptyStateDescription,
    gridVariant,
    skeletonAspect,
    isLoading,
    isEmpty,
    isFinished,
  };
}

export default usePersonCreditsGrid;
