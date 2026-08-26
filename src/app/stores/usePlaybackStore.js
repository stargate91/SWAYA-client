import { create } from 'zustand';
import { sendIpc } from '@/lib/ipc';
import { QK, invalidateEntity } from '@/lib/queryKeys';

const INITIAL_STATE = {
  active: false,
  itemId: null,
  title: '',
  duration: 0,
  currentTime: 0,
  isPaused: false,
  isPip: false,
  isMinimized: false,
};

export const usePlaybackStore = create((set, get) => ({
  ...INITIAL_STATE,

  handlePlayerStateUpdate: (data, queryClient) => {
    if (!data || !data.event) return;

    if (data.event === 'start') {
      set({
        active: true,
        itemId: data.itemId,
        title: data.title || '',
        duration: data.duration || 0,
        currentTime: data.currentTime || 0,
        isPaused: Boolean(data.isPaused),
        isPip: Boolean(data.isPip),
        isMinimized: Boolean(data.isMinimized),
      });
      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: QK.activeSessions });
        queryClient.invalidateQueries({ queryKey: QK.continueWatching });
        queryClient.invalidateQueries({ queryKey: QK.watchedHistory });
        if (data.itemId) {
          invalidateEntity(queryClient, data.itemId, { continueWatching: true, watchedHistory: true });
        }
      }
      return;
    }

    if (data.event === 'progress-saved') {
      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: QK.continueWatching });
        queryClient.invalidateQueries({ queryKey: QK.watchedHistory });
        const targetId = data.itemId || get().itemId;
        if (targetId) {
          invalidateEntity(queryClient, targetId, { continueWatching: true, watchedHistory: true });
        }
      }
      return;
    }

    if (data.event === 'close') {
      const prevItemId = get().itemId || data.itemId;
      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: QK.activeSessions });
        queryClient.invalidateQueries({ queryKey: QK.library });
        queryClient.invalidateQueries({ queryKey: QK.stats });
        queryClient.invalidateQueries({ queryKey: QK.watchedHistory });
        queryClient.invalidateQueries({ queryKey: QK.continueWatching });
        if (prevItemId) {
          invalidateEntity(queryClient, prevItemId, { continueWatching: true, watchedHistory: true });
        }
      }
      set({ active: false, itemId: null });
      return;
    }

    if (data.event === 'time-pos') {
      set({ currentTime: data.currentTime });
      return;
    }

    if (data.event === 'duration') {
      set({ duration: data.duration });
      return;
    }

    if (data.event === 'pause') {
      set({ isPaused: Boolean(data.isPaused) });
      return;
    }

    if (data.event === 'pip-change') {
      set({ isPip: Boolean(data.isPip) });
      return;
    }

    if (data.event === 'minimize-change') {
      set({ isMinimized: Boolean(data.isMinimized) });
    }
  },

  togglePlay: () => {
    sendIpc('mpv-command', ['cycle', 'pause']);
  },

  restore: () => {
    sendIpc('mpv-restore');
  },

  closePlayer: () => {
    sendIpc('mpv-close');
  },
}));

export default usePlaybackStore;
