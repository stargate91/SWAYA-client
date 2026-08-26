import { usePlayerAudioStore } from '@/stores/usePlayerAudioStore';

export const getSavedPlayerVolume = (fallback = 50) => {
  const vol = usePlayerAudioStore.getState().volume;
  return vol !== undefined && vol !== null ? vol : fallback;
};

export const getSavedPlayerMute = () => {
  return usePlayerAudioStore.getState().isMuted;
};

export const setSavedPlayerVolume = (volume) => {
  usePlayerAudioStore.getState().setVolume(volume);
};

export const setSavedPlayerMute = (isMuted) => {
  usePlayerAudioStore.getState().setMuted(isMuted);
};

export const getSavedPlayerAudioState = () => {
  const state = usePlayerAudioStore.getState();
  return {
    volume: state.volume,
    mute: state.isMuted,
  };
};
