import { useState, useRef, useEffect } from 'react';
import { useLibraryModeStore } from '@/stores/useLibraryModeStore';
import { getSavedPlayerVolume, getSavedPlayerMute } from '@/lib/playerAudio';

export default function usePlayerState(isTrailer, queryTitle) {
  const [isPlaying, setIsPlaying] = useState(isTrailer);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => getSavedPlayerVolume(50));
  const [isMuted, setIsMuted] = useState(() => getSavedPlayerMute());
  const [title, setTitle] = useState(isTrailer ? (queryTitle || 'Trailer') : 'Loading...');
  const [logoUrl, setLogoUrl] = useState(null);
  const [mediaImage, setMediaImage] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [isPip, setIsPip] = useState(false);

  // Ending Overlay States
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [episodeNumber, setEpisodeNumber] = useState(null);
  const [speed, setSpeed] = useState(1.0);
  const [isAdult, setIsAdult] = useState(() => {
    try {
      const mode = useLibraryModeStore.getState().sessionMode;
      return mode === 'nsfw';
    } catch {
      return false;
    }
  });
  const [mediaType, setMediaType] = useState(null);
  const [justAddedPeak, setJustAddedPeak] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [clockTime, setClockTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [trackList, setTrackList] = useState([]);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [videoParams, setVideoParams] = useState(null);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [osdMessage, setOsdMessage] = useState('');

  // Delay states
  const [subDelay, setSubDelay] = useState(0);
  const [audioDelay, setAudioDelay] = useState(0);

  // Discovery / End Overlay states
  const [peaksCount, setPeaksCount] = useState(0);
  const [tvShowId, setTvShowId] = useState(null);
  const [tvShowTitle, setTvShowTitle] = useState(null);
  const [tvShowPoster, setTvShowPoster] = useState(null);
  const [tvShowRating, setTvShowRating] = useState(null);
  const [seasonNumber, setSeasonNumber] = useState(null);
  const [seasonPoster, setSeasonPoster] = useState(null);

  // Sync menu state when controls hide during render
  if (!showControls) {
    if (showAudioMenu) setShowAudioMenu(false);
    if (showSubMenu) setShowSubMenu(false);
  }

  // Sync logo error reset during render
  const [prevLogoUrl, setPrevLogoUrl] = useState(null);
  if (logoUrl !== prevLogoUrl) {
    setPrevLogoUrl(logoUrl);
    setLogoError(false);
  }

  const currentTimeRef = useRef(currentTime);
  const durationRef = useRef(duration);
  const volumeRef = useRef(volume);
  const isMutedRef = useRef(isMuted);
  const chaptersRef = useRef(chapters);
  const videoParamsRef = useRef(videoParams);

  useEffect(() => {
    currentTimeRef.current = currentTime;
    durationRef.current = duration;
    volumeRef.current = volume;
    isMutedRef.current = isMuted;
    chaptersRef.current = chapters;
    videoParamsRef.current = videoParams;
  }, [currentTime, duration, volume, isMuted, chapters, videoParams]);

  return {
    isPlaying, setIsPlaying,
    isPaused, setIsPaused,
    currentTime, setCurrentTime,
    duration, setDuration,
    volume, setVolume,
    isMuted, setIsMuted,
    title, setTitle,
    logoUrl, setLogoUrl,
    mediaImage, setMediaImage,
    showControls, setShowControls,
    isPip, setIsPip,
    showEndOverlay, setShowEndOverlay,
    userRating, setUserRating,
    hoverRating, setHoverRating,
    episodeNumber, setEpisodeNumber,
    speed, setSpeed,
    isAdult, setIsAdult,
    mediaType, setMediaType,
    justAddedPeak, setJustAddedPeak,
    logoError, setLogoError,
    chapters, setChapters,
    clockTime, setClockTime,
    endTime, setEndTime,
    trackList, setTrackList,
    showAudioMenu, setShowAudioMenu,
    showSubMenu, setShowSubMenu,
    videoParams, setVideoParams,
    bottomOffset, setBottomOffset,
    osdMessage, setOsdMessage,
    subDelay, setSubDelay,
    audioDelay, setAudioDelay,
    peaksCount, setPeaksCount,
    tvShowId, setTvShowId,
    tvShowTitle, setTvShowTitle,
    tvShowPoster, setTvShowPoster,
    tvShowRating, setTvShowRating,
    seasonNumber, setSeasonNumber,
    seasonPoster, setSeasonPoster,

    // Refs
    currentTimeRef,
    durationRef,
    volumeRef,
    isMutedRef,
    chaptersRef,
    videoParamsRef,
  };
}
