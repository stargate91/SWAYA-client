import { useRef, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import { useUi } from '@/providers/UiProvider';
import { normalizeMediaType } from '@/lib/mediaTypes';
import { resolveMediaImageUrl } from '@/lib/imageUrls';

// Hooks
import useMediaDetail from './useMediaDetail';
import useMediaSocialLinks from './useMediaSocialLinks';
import { useMediaDetailDrawers } from './useMediaDetailDrawers';
import { useMediaDeleteAction } from './useMediaDeleteAction';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import { useDeckScrollTransition } from './useDeckScrollTransition';

export function useMediaDetailPageController({ type = 'movie' } = {}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { openModal, closeModal, toast } = useUi();

  const normalizedType = normalizeMediaType(type, type);

  const detailState = useMediaDetail({
    id,
    type: normalizedType,
    t,
  });

  const { state, actions, mutations } = detailState;
  const { setEditingReviewItem, setReviewText, handleSaveReview } = actions;
  const { deleteLibraryItemMutation } = mutations;
  const {
    backdropUrl,
    posterUrl,
    item,
    isLoading,
    isMovie,
    isScene,
    editingReviewItem,
    reviewText,
    title,
    logoUrl,
    isOwned,
  } = state;

  useScrollRestoration('.media-detail-page__container', [isLoading]);

  const {
    isDrawerOpen,
    setIsDrawerOpen,
    isOverviewDrawerOpen,
    setIsOverviewDrawerOpen,
    isLogoDrawerOpen,
    setIsLogoDrawerOpen,
    isPosterDrawerOpen,
    setIsPosterDrawerOpen,
    isBackdropDrawerOpen,
    setIsBackdropDrawerOpen,
    lightboxUrl,
    setLightboxUrl,
    isPreviewPlaying,
    isVideoPlaying,
    setIsVideoPlaying,
    previewSrc,
    handleTogglePreview,
    handleOpenBackdropModal,
    handleOpenPosterModal,
    handleOpenLogoModal,
    isAnyDrawerOpen,
  } = useMediaDetailDrawers({ id });

  const { handleDeleteClick } = useMediaDeleteAction({
    id,
    normalizedType,
    deleteLibraryItemMutation,
    t,
    openModal,
    closeModal,
    toast,
    navigate,
  });

  const containerRef = useRef(null);

  const { isScrolled, isTransitioning, handleScrollToggle } = useDeckScrollTransition({
    isAnyDrawerOpen,
    isPreviewPlaying,
    innerScrollSelector: '.media-detail-page__inline-sections',
  });

  const socialLinks = useMediaSocialLinks(item, t, normalizedType);

  const isSceneType = Boolean(item?.type === 'scene' || item?.type === 'video');

  const isFallback = useMemo(() => {
    if (isSceneType) return false;
    if (!backdropUrl) return true;
    if (item?.backdrop_path === item?.poster_path) return true;
    if (item?.backdrop_path && item?.poster_path) {
      const backdropFile = item.backdrop_path.split('/').pop();
      const posterFile = item.poster_path.split('/').pop();
      if (backdropFile && posterFile && backdropFile === posterFile) {
        return true;
      }
    }
    return false;
  }, [isSceneType, backdropUrl, item?.backdrop_path, item?.poster_path]);

  const getOriginalPosterUrl = useCallback(() => {
    if (!item) return null;
    const path = item.poster_path || item.local_poster_path;
    if (!path) return null;
    return resolveMediaImageUrl(path, 'originalPoster');
  }, [item]);

  const handlePosterClick = useCallback(() => {
    const url = getOriginalPosterUrl();
    if (url) {
      setLightboxUrl(url);
    }
  }, [getOriginalPosterUrl, setLightboxUrl]);

  const handleReadMore = useCallback(() => {
    setIsOverviewDrawerOpen(true);
  }, [setIsOverviewDrawerOpen]);

  const providerValue = useMemo(() => ({
    ...detailState,
    t,
    navigate,
    toast,
    type: normalizedType,
    id,
    handleOpenLogoModal,
    handleOpenPosterModal,
    isDrawerOpen,
    setIsDrawerOpen,
    actions: {
      ...detailState.actions,
      handleReadMore,
    },
  }), [
    detailState,
    t,
    navigate,
    toast,
    normalizedType,
    id,
    handleOpenLogoModal,
    handleOpenPosterModal,
    isDrawerOpen,
    setIsDrawerOpen,
    handleReadMore,
  ]);

  return {
    id,
    normalizedType,
    t,
    toast,
    navigate,
    isLoading,
    item,
    isMovie,
    isScene,
    isSceneType,
    isFallback,
    isOwned,
    title,
    logoUrl,
    backdropUrl,
    posterUrl,
    editingReviewItem,
    setEditingReviewItem,
    reviewText,
    setReviewText,
    handleSaveReview,
    deleteLibraryItemMutation,
    handleDeleteClick,
    containerRef,
    isScrolled,
    isTransitioning,
    handleScrollToggle,
    socialLinks,
    isPreviewPlaying,
    isVideoPlaying,
    setIsVideoPlaying,
    previewSrc,
    handleTogglePreview,
    handleOpenBackdropModal,
    handleOpenPosterModal,
    handleOpenLogoModal,
    isDrawerOpen,
    setIsDrawerOpen,
    isOverviewDrawerOpen,
    setIsOverviewDrawerOpen,
    isLogoDrawerOpen,
    setIsLogoDrawerOpen,
    isPosterDrawerOpen,
    setIsPosterDrawerOpen,
    isBackdropDrawerOpen,
    setIsBackdropDrawerOpen,
    lightboxUrl,
    setLightboxUrl,
    isAnyDrawerOpen,
    handlePosterClick,
    providerValue,
  };
}

export default useMediaDetailPageController;
