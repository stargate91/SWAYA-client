import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePlayerAudioStore = create(
  persist(
    (set) => ({
      volume: 50,
      isMuted: false,

      setVolume: (volume) => {
        const num = Number(volume);
        if (!isNaN(num)) {
          set({ volume: Math.max(0, Math.min(100, num)) });
        }
      },

      setMuted: (isMuted) => set({ isMuted: Boolean(isMuted) }),

      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    }),
    {
      name: 'swaya_player_audio',
      partialize: (state) => ({ volume: state.volume, isMuted: state.isMuted }),
    }
  )
);

export default usePlayerAudioStore;
