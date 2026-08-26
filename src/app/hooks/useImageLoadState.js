import { useState, useCallback } from 'react';

/**
 * Custom hook to track image loading and error states across multiple image keys/indices or single images.
 *
 * @param {Object} [initialState={}] - Initial loaded states dictionary
 * @returns {Object}
 */
export function useImageLoadState(initialState = {}) {
  const [loadedImages, setLoadedImages] = useState(initialState);
  const [errorImages, setErrorImages] = useState({});

  const handleImageLoad = useCallback((key = 'default') => {
    setLoadedImages((prev) => {
      if (prev[key]) return prev;
      return { ...prev, [key]: true };
    });
  }, []);

  const handleImageError = useCallback((key = 'default') => {
    setErrorImages((prev) => {
      if (prev[key]) return prev;
      return { ...prev, [key]: true };
    });
  }, []);

  const isImageLoaded = useCallback(
    (key = 'default') => Boolean(loadedImages[key]),
    [loadedImages]
  );

  const hasImageError = useCallback(
    (key = 'default') => Boolean(errorImages[key]),
    [errorImages]
  );

  const resetLoadedImages = useCallback(() => {
    setLoadedImages({});
    setErrorImages({});
  }, []);

  return {
    loadedImages,
    errorImages,
    handleImageLoad,
    handleImageError,
    isImageLoaded,
    hasImageError,
    resetLoadedImages,
    resetImageState: resetLoadedImages,
  };
}

export default useImageLoadState;
