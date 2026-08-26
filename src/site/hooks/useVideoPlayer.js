import { useState, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';

/**
 * Hook managing inline video playback, modal fallback, keyboard shortcuts, video transcripts, and HTML5 video props.
 * @param {object} options
 * @param {string} options.videoUrl - Source URL of the video file
 * @returns {{
 *   t: Function,
 *   videoRef: React.RefObject<HTMLVideoElement>,
 *   isPlaying: boolean,
 *   setIsPlaying: Function,
 *   hasStarted: boolean,
 *   setHasStarted: Function,
 *   isPlayingModal: boolean,
 *   setIsPlayingModal: Function,
 *   handleCardClick: () => void,
 *   handleKeyDown: (e: React.KeyboardEvent) => void,
 *   videoAriaLabel: string,
 *   videoPlaceholderTitle: string,
 *   transcript: { title: string, description: string, items: Array<string> },
 *   videoProps: object
 * }}
 */
export function useVideoPlayer({ videoUrl }) {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const videoRef = useRef(null);

  const handleCardClick = useCallback(() => {
    // If video has already started, all controls, seeking and playback are handled natively by <video>
    if (hasStarted) return;

    if (videoRef.current) {
      setHasStarted(true);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlayingModal(true);
      });
    } else if (videoUrl) {
      setIsPlayingModal(true);
    }
  }, [hasStarted, videoUrl]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  }, [handleCardClick]);

  const onPlay = useCallback(() => setIsPlaying(true), []);

  const onPause = useCallback(() => {
    if (videoRef.current && !videoRef.current.seeking) {
      setIsPlaying(false);
    }
  }, []);

  const onSeeked = useCallback(() => {
    if (videoRef.current && !videoRef.current.paused) {
      setIsPlaying(true);
    }
  }, []);

  const onEnded = useCallback(() => setIsPlaying(false), []);

  const videoAriaLabel = useMemo(() => {
    return isPlaying
      ? t('landing.video.pause', { defaultValue: 'Pause demo video' })
      : t('landing.video.play', { defaultValue: 'Play demo video' });
  }, [isPlaying, t]);

  const videoPlaceholderTitle = useMemo(() => {
    return t('landing.video.placeholderTitle', {
      defaultValue: 'SWAYA Action Video Demo',
    });
  }, [t]);

  const transcript = useMemo(
    () => ({
      title: t('landing.video.transcriptTitle', {
        defaultValue: 'Video Walkthrough Highlights & Feature Summary',
      }),
      description: t('landing.video.placeholderSubtitle', {
        defaultValue:
          'Full walkthrough showing batch file organizing, library curation, and built-in MPV playback.',
      }),
      items: [
        t('landing.video.transcriptOrganizer'),
        t('landing.video.transcriptCuration'),
        t('landing.video.transcriptPrivacy'),
      ],
    }),
    [t]
  );

  const videoProps = {
    ref: videoRef,
    src: videoUrl,
    controls: hasStarted,
    playsInline: true,
    preload: 'none',
    onPlay,
    onPause,
    onSeeked,
    onEnded,
  };

  return {
    t,
    videoRef,
    isPlaying,
    setIsPlaying,
    hasStarted,
    setHasStarted,
    isPlayingModal,
    setIsPlayingModal,
    handleCardClick,
    handleKeyDown,
    videoAriaLabel,
    videoPlaceholderTitle,
    transcript,
    videoProps,
  };
}

export default useVideoPlayer;
