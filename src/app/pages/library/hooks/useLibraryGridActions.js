import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useSettingsQuery,
  useUpdateStudioStatusMutation,
  useBulkUpdateWatchedMutation,
} from '@/queries';
import {
  getPosterImagePath,
  getProfileImagePath,
  getTvPosterImagePath,
  resolveMediaImageUrl,
} from '@/lib/imageUrls';
import {
  isLibraryPeopleTab,
  isLibraryTvTab,
  isLibraryScenesTab,
} from '@/lib/libraryTabs';
import { ROUTES, navigateToLibraryItem } from '@/lib/routes';
import { usePlayOverlayAction } from './usePlayOverlayAction';

export function useLibraryGridActions({ resolvedTab, isTags, isCollections, onEditImage, t }) {
  const navigate = useNavigate();
  const { handlePlayOverlayClick, playMutation } = usePlayOverlayAction({ tab: resolvedTab });
  const bulkUpdateWatchedMutation = useBulkUpdateWatchedMutation();
  const { data: settings } = useSettingsQuery();
  const updateStudioStatusMutation = useUpdateStudioStatusMutation();

  const handleUnfollowStudio = useCallback((studio) => {
    updateStudioStatusMutation.mutate({
      studioId: studio.id,
      isActive: false,
    });
  }, [updateStudioStatusMutation]);

  const handleItemClick = useCallback((item) => {
    if (isTags) return;

    if (isCollections) {
      navigate(ROUTES.COLLECTION_DETAIL(item.tmdb_id || item.id));
    } else {
      navigateToLibraryItem(navigate, item, resolvedTab);
    }
  }, [isTags, isCollections, resolvedTab, navigate]);

  const openImagePicker = useCallback((item) => {
    const isPeopleCard = isLibraryPeopleTab(resolvedTab);
    const isSceneCard = isLibraryScenesTab(resolvedTab);
    const entityId = isCollections
      ? `collection_${item.tmdb_id || item.id}`
      : item.id;
    const entityType = isPeopleCard
      ? 'person'
      : isCollections
        ? 'collection'
        : isLibraryTvTab(resolvedTab)
          ? 'tv'
          : isSceneCard
            ? 'scene'
            : 'movie';
    const imageType = isPeopleCard ? 'profile' : (isSceneCard ? 'backdrop' : 'poster');
    const currentPath = isPeopleCard
      ? getProfileImagePath(item)
      : isLibraryTvTab(resolvedTab)
        ? getTvPosterImagePath(item)
        : isSceneCard
          ? (item.backdrop_path || item.local_backdrop_path || item.still_path)
          : getPosterImagePath(item);
    const tmdbId = isPeopleCard ? item.id : (item.tmdb_id || item.tv_tmdb_id || item.id);

    onEditImage?.({
      entityId,
      entityType,
      imageType,
      currentPath,
      tmdbId,
      externalIds: item?.external_ids || item,
      item,
      title: isPeopleCard
        ? (t('library.details.changeProfile') || 'Change Profile Picture')
        : isSceneCard
          ? (t('library.details.changeBackdrop') || 'Change Backdrop')
          : (t('library.details.changePoster') || 'Change Poster'),
    });
  }, [resolvedTab, isCollections, t, onEditImage]);

  const resolvePosterUrl = useCallback((path) => {
    return resolveMediaImageUrl(path, 'poster');
  }, []);

  return {
    settings,
    playMutation,
    bulkUpdateWatchedMutation,
    handlePlayOverlayClick,
    handleUnfollowStudio,
    handleItemClick,
    openImagePicker,
    resolvePosterUrl,
  };
}

export default useLibraryGridActions;
