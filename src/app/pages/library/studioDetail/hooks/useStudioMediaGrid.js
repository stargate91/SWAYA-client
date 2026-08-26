import { useCallback, useMemo } from 'react';
import { useTorrentModal } from '@/hooks/useTorrentModal';
import { navigateToLibraryItem } from '@/lib/routes';
import { usePlayOverlayAction } from '@/pages/library/hooks/usePlayOverlayAction';

/**
 * Custom hook to encapsulate layout variants, aspects,
 * empty states, and item interaction actions for StudioMediaGrid.
 *
 * @param {object} params
 * @param {string} [params.viewMode] - 'library' | 'discover'
 * @param {string} [params.effectiveActiveTab] - e.g. 'movies' | 'tv' | 'scenes'
 * @param {Array<{value: string, label: string}>} [params.tabOptions=[]] - Tab configurations
 * @param {boolean} [params.isTmdbSource] - Whether discover source is TMDB
 * @param {boolean} [params.isMultiTypeSource] - Whether discover source supports multi-types
 * @param {string} [params.effectiveDiscoverSource] - e.g. 'tmdb' | 'theporndb'
 * @param {string} [params.effectiveDiscoverMediaType] - e.g. 'movies' | 'scenes'
 * @param {Function} [params.navigate] - Navigation function
 * @param {Function} [params.t] - Translation function
 */
export function useStudioMediaGrid({
  viewMode = 'library',
  effectiveActiveTab,
  tabOptions = [],
  isTmdbSource = false,
  isMultiTypeSource = false,
  effectiveDiscoverSource,
  effectiveDiscoverMediaType,
  navigate,
  t = (k) => k,
} = {}) {
  const { torrentEnabled, openTorrentModal } = useTorrentModal();
  const { handlePlayOverlayClick, playMutation } = usePlayOverlayAction({ tab: effectiveActiveTab });

  const isLibraryView = viewMode === 'library';
  const isLibraryScene = effectiveActiveTab === 'scenes';
  const isDiscoverPoster = Boolean(
    isTmdbSource || (effectiveDiscoverSource === 'theporndb' && effectiveDiscoverMediaType === 'movies')
  );

  const libraryVariant = isLibraryScene ? 'auto-scene' : 'auto-poster';
  const libraryAspect = isLibraryScene ? 'scene' : 'poster';

  const discoverVariant = isDiscoverPoster ? 'auto-poster' : 'auto-scene';
  const discoverAspect = isDiscoverPoster ? 'poster' : 'scene';

  const discoverMediaType = isMultiTypeSource ? effectiveDiscoverMediaType : 'scenes';

  const tabLabel = useMemo(() => {
    return tabOptions.find((o) => o.value === effectiveActiveTab)?.label || effectiveActiveTab;
  }, [tabOptions, effectiveActiveTab]);

  const emptyLibraryTitle = useMemo(() => {
    return t('library.studios.emptyTabTitle', { tab: tabLabel });
  }, [t, tabLabel]);

  const emptyLibraryDesc = useMemo(() => {
    return t('library.studios.emptyTabDesc', { tab: tabLabel });
  }, [t, tabLabel]);

  const emptyDiscoverTitle = useMemo(() => {
    return t('library.details.emptyCredits') || 'No items found for this source.';
  }, [t]);

  const emptyDiscoverDesc = useMemo(() => {
    return t('library.details.emptyCreditsDesc') || 'Try selecting another source or media type.';
  }, [t]);

  const handleLibraryItemClick = useCallback(
    (clickedItem) => {
      if (navigate && clickedItem) {
        navigateToLibraryItem(navigate, clickedItem, effectiveActiveTab);
      }
    },
    [navigate, effectiveActiveTab]
  );

  return {
    isLibraryView,
    isLibraryScene,
    isDiscoverPoster,
    libraryVariant,
    libraryAspect,
    discoverVariant,
    discoverAspect,
    discoverMediaType,
    emptyLibraryTitle,
    emptyLibraryDesc,
    emptyDiscoverTitle,
    emptyDiscoverDesc,
    torrentEnabled,
    openTorrentModal,
    handlePlayOverlayClick,
    playMutationPending: playMutation?.isPending || false,
    handleLibraryItemClick,
  };
}

export default useStudioMediaGrid;
