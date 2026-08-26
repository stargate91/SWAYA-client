import { useState, useCallback } from 'react';
import { media } from '@/lib/api/media';

export function useMediaDetailDrawers({ id } = {}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOverviewDrawerOpen, setIsOverviewDrawerOpen] = useState(false);
  const [isLogoDrawerOpen, setIsLogoDrawerOpen] = useState(false);
  const [isPosterDrawerOpen, setIsPosterDrawerOpen] = useState(false);
  const [isBackdropDrawerOpen, setIsBackdropDrawerOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);

  const [prevId, setPrevId] = useState(id);
  if (id !== prevId) {
    setPrevId(id);
    setIsPreviewPlaying(false);
    setIsVideoPlaying(false);
    setPreviewSrc(null);
  }

  const handleTogglePreview = useCallback(() => {
    if (isPreviewPlaying) {
      setIsPreviewPlaying(false);
      setIsVideoPlaying(false);
    } else {
      const url = media.getPreviewUrl(id, { resolution: 1080 });
      setPreviewSrc(url);
      setIsPreviewPlaying(true);
    }
  }, [isPreviewPlaying, id]);

  const handleOpenBackdropModal = useCallback(() => {
    setIsBackdropDrawerOpen(true);
  }, []);

  const handleOpenPosterModal = useCallback(() => {
    setIsPosterDrawerOpen(true);
  }, []);

  const handleOpenLogoModal = useCallback(() => {
    setIsLogoDrawerOpen(true);
  }, []);

  const isAnyDrawerOpen = isLogoDrawerOpen || isPosterDrawerOpen || isBackdropDrawerOpen || isDrawerOpen || isOverviewDrawerOpen;

  return {
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
    setIsPreviewPlaying,
    isVideoPlaying,
    setIsVideoPlaying,
    previewSrc,
    setPreviewSrc,
    handleTogglePreview,
    handleOpenBackdropModal,
    handleOpenPosterModal,
    handleOpenLogoModal,
    isAnyDrawerOpen,
  };
}
