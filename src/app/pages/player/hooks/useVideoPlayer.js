import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateMediaStatusMutation, useAddPeakMutation, useUpdateProgressMutation, fetchPlaybackInfo } from '@/queries';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { sendIpc, invokeIpc, isElectron } from '@/lib/ipc';
import { setSavedPlayerVolume, setSavedPlayerMute } from '@/lib/playerAudio';
import { API_BASE } from '@/lib/backend';
import { useQueryParams } from '@/hooks/useQueryParams';
import { formatClockTime } from '@/lib/formatters';
import { isAdultEntityId } from '@/lib/entityIds';

// Sub-hooks imports
import usePlayerState from './usePlayerState';
import usePlayerKeyboardControls from './usePlayerKeyboardControls';
import usePlayerIpc from './usePlayerIpc';

const deduplicateTracks = (tracks) => {
  const seen = new Set();

  const getBasename = (pathStr) => {
    if (!pathStr) return '';
    const parts = pathStr.split(/[\\/]/);
    return parts[parts.length - 1].toLowerCase();
  };

  const getTrackKey = (track, index) => {
    const extFile = track['external-filename'] || track.externalFilename || '';
    const extFilename = getBasename(extFile);
    if (extFilename) {
      return `${track.type}-file-${extFilename}`;
    }
    if (track.lang || track.title) {
      return `${track.type}-${track.lang || ''}-${track.title || ''}`;
    }
    return `${track.type}-id-${track.id || index}`;
  };

  tracks.forEach((track, index) => {
    if (track.selected) {
      seen.add(getTrackKey(track, index));
    }
  });

  return tracks.filter((track, index) => {
    if (track.selected) return true;
    const key = getTrackKey(track, index);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const isExternalTrack = (t) => Boolean(t.external || t['external-filename'] || t.externalFilename);

export default function useVideoPlayer(arg) {
  const itemId = typeof arg === 'object' && arg !== null ? arg.itemId : arg;
  const passedContainerRef = typeof arg === 'object' && arg !== null ? arg.containerRef : null;
  const fallbackContainerRef = useRef(null);
  const containerRef = passedContainerRef || fallbackContainerRef;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { getBoolean, getString, getNumber } = useQueryParams();
  const isTrailer = itemId === 'trailer' || getBoolean('is_trailer');
  const queryTitle = getString('title', null) || null;

  const updateStatusMutation = useUpdateMediaStatusMutation();
  const updateProgressMutation = useUpdateProgressMutation();
  const addPeakMutation = useAddPeakMutation();

  const hasTriggeredEndRef = useRef(false);

  const state = usePlayerState(isTrailer, queryTitle);
  const osdTimeoutRef = useRef(null);

  const { setBottomOffset } = state;

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const updateBottomOffset = useCallback((vParams) => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.clientHeight;

    if (!vParams || !vParams.w || !vParams.h || containerHeight === 0) {
      setBottomOffset(16);
      return;
    }

    const containerWidth = containerRef.current.clientWidth;
    const videoAspect = vParams.w / vParams.h;
    const containerAspect = containerWidth / containerHeight;

    const renderedHeight = containerAspect > videoAspect ? containerHeight : containerWidth / videoAspect;

    const blackBarHeight = (containerHeight - renderedHeight) / 2;
    const newOffset = Math.max(16, Math.round(blackBarHeight + 16));
    setBottomOffset(newOffset);
  }, [containerRef, setBottomOffset]);

  useEffect(() => {
    updateBottomOffset(state.videoParams);
  }, [state.videoParams, updateBottomOffset]);

  const sendCommand = useCallback((args) => {
    sendIpc('mpv-command', args);
  }, []);

  const saveProgress = useCallback(async () => {
    if (itemId === 'trailer' || getBoolean('is_trailer')) return;
    const cTime = state.currentTimeRef.current || 0;
    const dur = state.durationRef.current || 0;
    if (cTime < 0) return;

    try {
      await updateProgressMutation.mutateAsync({
        item_id: String(itemId),
        current_time: Math.round(cTime),
        total_length: Math.round(dur),
      });
    } catch (err) {
      console.error('Background progress save failed:', err);
    }
  }, [itemId, getBoolean, state.currentTimeRef, state.durationRef, updateProgressMutation]);

  const handleClose = useCallback(async () => {
    await saveProgress();
    sendIpc('mpv-close');
    navigate(-1);
  }, [navigate, saveProgress]);

  const handleCloseRef = useRef(handleClose);
  useEffect(() => {
    handleCloseRef.current = handleClose;
  }, [handleClose]);

  const {
    speed,
    setSpeed,
    subDelay,
    audioDelay,
    setShowEndOverlay,
    isMuted,
    setIsMuted,
    currentTime,
    duration,
    setClockTime,
    setEndTime,
    setJustAddedPeak,
    setOsdMessage,
  } = state;

  const hasDismissedEndRef = useRef(false);

  const handleDismissOverlay = useCallback(() => {
    setShowEndOverlay(false);
    hasTriggeredEndRef.current = true;
    hasDismissedEndRef.current = true;
  }, [setShowEndOverlay]);

  const handlePlayPause = useCallback(() => {
    sendCommand(['cycle', 'pause']);
  }, [sendCommand]);

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    state.setCurrentTime(val);
    sendCommand(['seek', val, 'absolute']);
  };

  const handleVolumeChange = (e) => {
    const val = parseInt(e.target.value, 10);
    state.setVolume(val);
    setSavedPlayerVolume(val);
    sendCommand(['set_property', 'volume', val]);
  };

  const toggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setSavedPlayerMute(nextMuted);
    sendCommand(['set_property', 'mute', nextMuted]);
  }, [isMuted, setIsMuted, sendCommand]);

  const handleSpeedUp = useCallback(() => {
    const nextSpeed = Math.min(16.0, Number((speed * 2).toFixed(2)));
    setSpeed(nextSpeed);
    sendCommand(['set_property', 'speed', nextSpeed]);
  }, [speed, setSpeed, sendCommand]);

  const handleSpeedDown = useCallback(() => {
    const nextSpeed = Math.max(0.25, Number((speed / 2).toFixed(2)));
    setSpeed(nextSpeed);
    sendCommand(['set_property', 'speed', nextSpeed]);
  }, [speed, setSpeed, sendCommand]);

  // Helper to trigger OSD message
  const triggerOsd = useCallback((text) => {
    setOsdMessage(text);
    if (osdTimeoutRef.current) {
      clearTimeout(osdTimeoutRef.current);
    }
    osdTimeoutRef.current = setTimeout(() => {
      setOsdMessage('');
    }, 2000);
  }, [setOsdMessage]);

  const {
    setIsPlaying,
    setTitle,
    setIsAdult,
    setMediaType,
    setUserRating,
    setPeaksCount,
    setTvShowId,
    setTvShowTitle,
    setTvShowRating,
    setSeasonNumber,
    setEpisodeNumber,
    setTvShowPoster,
    setSeasonPoster,
    setLogoUrl,
    setMediaImage
  } = state;

  const handleAddPeak = useCallback(async (e) => {
    if (e && e.currentTarget) {
      e.currentTarget.blur();
    }
    setJustAddedPeak(true);
    setTimeout(() => setJustAddedPeak(false), 1500);

    let snapshotPath = null;
    if (isElectron) {
      try {
        const filename = `finish_${itemId}_${Date.now()}.jpg`;
        const result = await invokeIpc('mpv-take-snapshot', { filename });
        if (result && result.success) {
          snapshotPath = result.filepath;
        } else {
          console.error('Snapshot IPC returned unsuccessful status:', result);
        }
      } catch (err) {
        console.error('Failed to take mpv snapshot:', err);
      }
    }

    try {
      const res = await addPeakMutation.mutateAsync({
        itemId,
        video_position: Math.round(currentTime),
        snapshot_path: snapshotPath,
      });
      if (res && res.peaks_count !== undefined) {
        setPeaksCount(res.peaks_count);
      }
    } catch (err) {
      console.error('Failed to add peak:', err);
      triggerOsd('Failed to save peak mark');
    }
  }, [itemId, currentTime, setJustAddedPeak, triggerOsd, addPeakMutation, setPeaksCount]);

  const handleAddPeakRef = useRef(handleAddPeak);
  useEffect(() => {
    handleAddPeakRef.current = handleAddPeak;
  }, [handleAddPeak]);

  // Key & Mouse Controls Hook
  const { handleMouseMove, handleWheel, handleDoubleClick } = usePlayerKeyboardControls({
    isAdult: state.isAdult,
    isPaused: state.isPaused,
    volume: state.volume,
    isMuted: state.isMuted,
    setVolume: state.setVolume,
    setIsMuted: state.setIsMuted,
    setShowControls: state.setShowControls,
    sendCommand,
    handlePlayPause,
    toggleMute,
    handleTogglePip: () => {
      sendIpc('mpv-toggle-pip');
    },
    handleSpeedUp,
    handleSpeedDown,
    setSpeed: state.setSpeed,
    triggerOsd,
    handleAddPeakRef,
  });

  // IPC Event Listener Hook
  usePlayerIpc({
    itemId,
    isTrailer,
    containerRef,
    currentTimeRef: state.currentTimeRef,
    videoParamsRef: state.videoParamsRef,
    durationRef: state.durationRef,
    volumeRef: state.volumeRef,
    isMutedRef: state.isMutedRef,
    chaptersRef: state.chaptersRef,
    hasTriggeredEndRef,
    hasDismissedEndRef,
    setCurrentTime: state.setCurrentTime,
    setShowEndOverlay: state.setShowEndOverlay,
    setDuration: state.setDuration,
    setIsPaused: state.setIsPaused,
    setVolume: state.setVolume,
    setIsMuted: state.setIsMuted,
    setSpeed: state.setSpeed,
    setChapters: state.setChapters,
    setTrackList: state.setTrackList,
    setSubDelay: state.setSubDelay,
    setAudioDelay: state.setAudioDelay,
    setIsPip: state.setIsPip,
    setVideoParams: state.setVideoParams,
    updateStatusMutation,
    updateBottomOffset,
    handleCloseRef,
    sendCommand,
  });

  // Periodic progress saving
  useEffect(() => {
    if (!state.isPlaying) return;
    const interval = setInterval(saveProgress, 5000);
    return () => clearInterval(interval);
  }, [state.isPlaying, saveProgress]);

  // Clock Update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClockTime(formatClockTime(now));

      if (duration > 0) {
        const remainingSeconds = duration - currentTime;
        const end = new Date(now.getTime() + remainingSeconds * 1000);
        setEndTime(formatClockTime(end));
      }
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    return () => clearInterval(clockInterval);
  }, [currentTime, duration, setClockTime, setEndTime]);

  // Page Load / Controls Only
  useEffect(() => {
    if (!itemId) return;

    let isMounted = true;

    const fetchInfoAndStart = async () => {
      if (isTrailer) return;
      try {
        const data = await fetchPlaybackInfo(queryClient, itemId);

        if (!isMounted) return;
        setTitle(data.title);
        const isAdultMedia = Boolean(
          data.is_adult ||
          data.media_type === 'scene' ||
          data.provider === 'stashdb' ||
          data.provider === 'theporndb' ||
          data.provider === 'fansdb' ||
          isAdultEntityId(itemId)
        );
        setIsAdult(isAdultMedia);
        setMediaType(data.media_type);
        setUserRating(data.user_rating);
        setPeaksCount(data.peaks_count || 0);
        setTvShowId(data.tv_show_id);
        setTvShowTitle(data.tv_show_title);
        setTvShowRating(data.tv_show_rating);
        setSeasonNumber(data.season_number);
        setEpisodeNumber(data.episode_number);
        if (data.tv_show_poster) {
          const resolvedTvPoster = resolveMediaImageUrl(data.tv_show_poster, 'poster', API_BASE);
          setTvShowPoster(resolvedTvPoster);
        }
        if (data.season_poster) {
          const resolvedSeasonPoster = resolveMediaImageUrl(data.season_poster, 'poster', API_BASE);
          setSeasonPoster(resolvedSeasonPoster);
        }
        if (data.logo_path) {
          const resolved = resolveMediaImageUrl(data.logo_path, 'logo', API_BASE);
          setLogoUrl(resolved);
        }
        if (data.media_image) {
          const resolvedImage = resolveMediaImageUrl(
            data.media_image,
            data.media_type === 'episode' ? 'still' : (data.media_type === 'scene' || data.is_adult ? 'scene_stills' : 'poster'),
            API_BASE
          );
          setMediaImage(resolvedImage);
        }

        if (controlsOnly) {
          setIsPlaying(true);
          return;
        }

        if (isElectron && containerRef.current) {
          const bounds = containerRef.current.getBoundingClientRect();
          await invokeIpc('mpv-play', {
            filePath: data.file_path,
            bounds: {
              x: bounds.x,
              y: bounds.y,
              width: bounds.width,
              height: bounds.height
            }
          });

          const startSec = getNumber('start', 0) || data.start_seconds;
          if (startSec > 0) {
            sendIpc('mpv-command', ['seek', startSec, 'absolute']);
          }

          setIsPlaying(true);
        }
      } catch (err) {
        console.error(err);
        setTitle('Error playing file');
      }
    };

    fetchInfoAndStart();

    const controlsOnly = getBoolean('controls_only');
    if (controlsOnly) {
      document.body.style.backgroundColor = 'transparent';
      document.body.style.background = 'transparent';
      document.documentElement.style.backgroundColor = 'transparent';
      document.documentElement.style.background = 'transparent';
    }
    return () => {
      isMounted = false;
      if (controlsOnly) {
        document.body.style.backgroundColor = '';
        document.body.style.background = '';
        document.documentElement.style.backgroundColor = '';
        document.documentElement.style.background = '';
      }
    };
  }, [itemId, isTrailer, containerRef, setIsPlaying, setTitle, setIsAdult, setMediaType, setUserRating, setPeaksCount, setTvShowId, setTvShowTitle, setTvShowRating, setSeasonNumber, setEpisodeNumber, setTvShowPoster, setSeasonPoster, setLogoUrl, setMediaImage, getBoolean, getNumber, queryClient]);

  const handleRate = async (rating) => {
    if (state.tvShowId) {
      state.setTvShowRating(rating);
      try {
        await updateStatusMutation.mutateAsync({
          itemId: state.tvShowId,
          payload: {
            user_rating: rating,
            media_type: 'tv'
          }
        });
      } catch (e) {
        console.error('Failed to update TV show rating:', e);
      }
    } else {
      state.setUserRating(rating);
      try {
        await updateStatusMutation.mutateAsync({
          itemId: itemId,
          payload: {
            user_rating: rating,
            media_type: state.mediaType
          }
        });
      } catch (e) {
        console.error('Failed to update rating:', e);
      }
    }
  };

  const handleReplay = () => {
    hasTriggeredEndRef.current = false;
    hasDismissedEndRef.current = false;
    state.setShowEndOverlay(false);
    sendCommand(['seek', 0, 'absolute']);
    sendCommand(['set_property', 'pause', false]);
  };

  const prevSubDelayRef = useRef(0);
  const prevAudioDelayRef = useRef(0);
  const prevSpeedRef = useRef(1.0);

  useEffect(() => {
    if (subDelay !== prevSubDelayRef.current) {
      triggerOsd(`Subtitle delay: ${Math.round(subDelay * 1000)} ms`);
      prevSubDelayRef.current = subDelay;
    }
  }, [subDelay, triggerOsd]);

  useEffect(() => {
    if (audioDelay !== prevAudioDelayRef.current) {
      triggerOsd(`Audio delay: ${Math.round(audioDelay * 1000)} ms`);
      prevAudioDelayRef.current = audioDelay;
    }
  }, [audioDelay, triggerOsd]);

  useEffect(() => {
    if (speed !== prevSpeedRef.current) {
      const formattedSpeed = Number.isInteger(speed)
        ? `${speed}x`
        : `${speed.toFixed(2).replace(/\.?0+$/, '')}x`;
      triggerOsd(`Speed: ${formattedSpeed}`);
      prevSpeedRef.current = speed;
    }
  }, [speed, triggerOsd]);

  const handleTogglePip = useCallback(() => {
    sendIpc('mpv-toggle-pip');
  }, []);

  function handleMinimizePip() {
    sendIpc('mpv-minimize');
  }

  const { setShowAudioMenu, setShowSubMenu } = state;

  const handleSelectAudioTrack = useCallback((trackId) => {
    sendCommand(['set_property', 'aid', trackId]);
    setShowAudioMenu(false);
  }, [sendCommand, setShowAudioMenu]);

  const handleSelectSubTrack = useCallback((trackId) => {
    sendCommand(['set_property', 'sid', trackId]);
    setShowSubMenu(false);
  }, [sendCommand, setShowSubMenu]);

  const handleDisableSubtitles = useCallback(() => {
    sendCommand(['set_property', 'sid', 'no']);
    setShowSubMenu(false);
  }, [sendCommand, setShowSubMenu]);

  const handleNextChapter = useCallback(() => {
    sendCommand(['add', 'chapter', 1]);
  }, [sendCommand]);

  const handlePrevChapter = useCallback(() => {
    sendCommand(['add', 'chapter', -1]);
  }, [sendCommand]);

  const audioTracks = useMemo(() => {
    const rawAudio = (state.trackList || []).filter((track) => track.type === 'audio');
    return deduplicateTracks(rawAudio);
  }, [state.trackList]);

  const embeddedAudioTracks = useMemo(() => audioTracks.filter((t) => !isExternalTrack(t)), [audioTracks]);
  const externalAudioTracks = useMemo(() => audioTracks.filter((t) => isExternalTrack(t)), [audioTracks]);

  const subTracks = useMemo(() => {
    const rawSub = (state.trackList || []).filter((track) => track.type === 'sub');
    return deduplicateTracks(rawSub);
  }, [state.trackList]);

  const embeddedSubTracks = useMemo(() => subTracks.filter((t) => !isExternalTrack(t)), [subTracks]);
  const externalSubTracks = useMemo(() => subTracks.filter((t) => isExternalTrack(t)), [subTracks]);
  const isSubOff = useMemo(() => !(state.trackList || []).some((track) => track.type === 'sub' && track.selected), [state.trackList]);

  const currentChapter = useMemo(() => {
    const chapters = state.chapters;
    if (!chapters || chapters.length === 0) return null;
    let active = null;
    for (const chap of chapters) {
      if (state.currentTime >= chap.time) {
        active = chap;
      } else {
        break;
      }
    }
    return active;
  }, [state.chapters, state.currentTime]);

  return {
    isPlaying: state.isPlaying,
    isPaused: state.isPaused,
    currentTime: state.currentTime,
    duration: state.duration,
    volume: state.volume,
    isMuted: state.isMuted,
    title: state.title,
    logoUrl: state.logoUrl,
    showControls: state.showControls,
    isPip: state.isPip,
    showEndOverlay: state.showEndOverlay,
    userRating: state.userRating,
    hoverRating: state.hoverRating,
    episodeNumber: state.episodeNumber,
    speed: state.speed,
    isAdult: state.isAdult,
    mediaType: state.mediaType,
    mediaImage: state.mediaImage,
    justAddedPeak: state.justAddedPeak,
    logoError: state.logoError,
    chapters: state.chapters,
    currentChapter,
    clockTime: state.clockTime,
    endTime: state.endTime,
    trackList: state.trackList,
    audioTracks,
    embeddedAudioTracks,
    externalAudioTracks,
    subTracks,
    embeddedSubTracks,
    externalSubTracks,
    isSubOff,
    showAudioMenu: state.showAudioMenu,
    showSubMenu: state.showSubMenu,
    bottomOffset: state.bottomOffset,
    osdMessage: state.osdMessage,
    peaksCount: state.peaksCount,
    tvShowId: state.tvShowId,
    tvShowTitle: state.tvShowTitle,
    tvShowPoster: state.tvShowPoster,
    tvShowRating: state.tvShowRating,
    seasonNumber: state.seasonNumber,
    seasonPoster: state.seasonPoster,
    setShowAudioMenu: state.setShowAudioMenu,
    setShowSubMenu: state.setShowSubMenu,
    setLogoError: state.setLogoError,
    setHoverRating: state.setHoverRating,
    handleDismissOverlay,
    handleMouseMove,
    handleWheel,
    handleDoubleClick,
    handleClose,
    handlePlayPause,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    handleSpeedUp,
    handleSpeedDown,
    handleAddPeak,
    handleRate,
    handleReplay,
    handleTogglePip,
    handleMinimizePip,
    handleSelectAudioTrack,
    handleSelectSubTrack,
    handleDisableSubtitles,
    handleNextChapter,
    handlePrevChapter,
    sendCommand,
  };
}
