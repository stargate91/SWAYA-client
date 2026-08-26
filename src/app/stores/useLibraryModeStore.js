import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const SESSION_MODES = Object.freeze({
  SFW: 'sfw',
  NSFW: 'nsfw',
});

export const PAGINATION_MODES = Object.freeze({
  PAGES: 'pages',
  INFINITE: 'infinite',
});

export const isNsfwMode = (mode) => mode === SESSION_MODES.NSFW;
export const isSfwMode = (mode) => mode === SESSION_MODES.SFW;
export const isPaginationPages = (mode) => mode === PAGINATION_MODES.PAGES;
export const isPaginationInfinite = (mode) => mode === PAGINATION_MODES.INFINITE;

export const useLibraryModeStore = create(
  persist(
    (set) => ({
      sessionMode: SESSION_MODES.SFW,
      setSessionMode: (mode) => set({ sessionMode: mode || SESSION_MODES.SFW }),
      toggleSessionMode: () => set((state) => ({
        sessionMode: state.sessionMode === SESSION_MODES.NSFW ? SESSION_MODES.SFW : SESSION_MODES.NSFW,
      })),
      paginationMode: PAGINATION_MODES.PAGES,
      setPaginationMode: (mode) => set({ paginationMode: mode || PAGINATION_MODES.PAGES }),
    }),
    {
      name: 'library_session_mode',
      partialize: (state) => ({
        sessionMode: state.sessionMode,
        paginationMode: state.paginationMode,
      }),
    }
  )
);

export default useLibraryModeStore;
