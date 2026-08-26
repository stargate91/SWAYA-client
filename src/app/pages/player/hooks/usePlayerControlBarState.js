import { useCallback, useMemo } from 'react';
import { formatAudioTrackLabel, formatSubTrackLabel } from '../utils/playerFormatting';

/**
 * Custom hook to prepare track lists, speed labels, and menu toggle actions
 * for PlayerControlBar.
 */
export function usePlayerControlBarState({
  t,
  speed = 1.0,
  audioTracks = [],
  embeddedAudioTracks = [],
  externalAudioTracks = [],
  subTracks = [],
  embeddedSubTracks = [],
  externalSubTracks = [],
  showAudioMenu = false,
  showSubMenu = false,
  setShowAudioMenu,
  setShowSubMenu,
  handleSelectAudioTrack,
  handleSelectSubTrack,
} = {}) {
  const speedText = useMemo(() => `${speed}x`, [speed]);

  const toggleAudioMenu = useCallback(() => {
    if (setShowAudioMenu) {
      setShowAudioMenu(!showAudioMenu);
    }
    if (setShowSubMenu) {
      setShowSubMenu(false);
    }
  }, [showAudioMenu, setShowAudioMenu, setShowSubMenu]);

  const toggleSubMenu = useCallback(() => {
    if (setShowSubMenu) {
      setShowSubMenu(!showSubMenu);
    }
    if (setShowAudioMenu) {
      setShowAudioMenu(false);
    }
  }, [showSubMenu, setShowAudioMenu, setShowSubMenu]);

  const formattedEmbeddedAudioTracks = useMemo(() => {
    return embeddedAudioTracks.map((track) => ({
      ...track,
      label: formatAudioTrackLabel(track, t, false),
      onSelect: () => handleSelectAudioTrack?.(track.id),
    }));
  }, [embeddedAudioTracks, t, handleSelectAudioTrack]);

  const formattedExternalAudioTracks = useMemo(() => {
    return externalAudioTracks.map((track) => ({
      ...track,
      label: formatAudioTrackLabel(track, t, true),
      onSelect: () => handleSelectAudioTrack?.(track.id),
    }));
  }, [externalAudioTracks, t, handleSelectAudioTrack]);

  const formattedEmbeddedSubTracks = useMemo(() => {
    return embeddedSubTracks.map((track) => ({
      ...track,
      label: formatSubTrackLabel(track, t, false),
      onSelect: () => handleSelectSubTrack?.(track.id),
    }));
  }, [embeddedSubTracks, t, handleSelectSubTrack]);

  const formattedExternalSubTracks = useMemo(() => {
    return externalSubTracks.map((track) => ({
      ...track,
      label: formatSubTrackLabel(track, t, true),
      onSelect: () => handleSelectSubTrack?.(track.id),
    }));
  }, [externalSubTracks, t, handleSelectSubTrack]);

  const hasAudioTracks = audioTracks.length > 0;
  const hasSubTracks = subTracks.length > 0;

  return {
    speedText,
    toggleAudioMenu,
    toggleSubMenu,
    formattedEmbeddedAudioTracks,
    formattedExternalAudioTracks,
    formattedEmbeddedSubTracks,
    formattedExternalSubTracks,
    hasAudioTracks,
    hasSubTracks,
  };
}
