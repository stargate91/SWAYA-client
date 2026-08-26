import { useState, useEffect, useRef, useCallback } from 'react';

export function useHeroVideoPreview({ isPreviewPlaying, onPlayingChange }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const [prevIsPreviewPlaying, setPrevIsPreviewPlaying] = useState(isPreviewPlaying);
  if (isPreviewPlaying !== prevIsPreviewPlaying) {
    setPrevIsPreviewPlaying(isPreviewPlaying);
    if (!isPreviewPlaying) {
      setIsVideoPlaying(false);
    }
  }

  useEffect(() => {
    onPlayingChange?.(isVideoPlaying);
  }, [isVideoPlaying, onPlayingChange]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPreviewPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPreviewPlaying]);

  const handleTimeUpdate = useCallback((e) => {
    if (e.target.currentTime > 0) {
      setIsVideoPlaying(true);
    }
  }, []);

  const setVideoRef = useCallback((el) => {
    videoRef.current = el;
    if (el) {
      el.muted = true;
      el.defaultMuted = true;
    }
  }, []);

  return {
    videoRef,
    setVideoRef,
    isVideoPlaying,
    handleTimeUpdate,
  };
}

export default useHeroVideoPreview;
