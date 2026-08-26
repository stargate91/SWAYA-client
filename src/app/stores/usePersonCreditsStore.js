import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePersonCreditsStore = create(
  persist(
    (set) => ({
      activeDiscoverTab: '',
      setActiveDiscoverTab: (tab) => set({ activeDiscoverTab: tab || '' }),
      viewModeState: 'discover',
      setViewModeState: (mode) => set({ viewModeState: mode || 'discover' }),
      activeTagFilter: '',
      setActiveTagFilter: (tag) => set({ activeTagFilter: tag || '' }),
      tagInputValue: '',
      setTagInputValue: (val) => set({ tagInputValue: val || '' }),
      activeStudioFilter: '',
      setActiveStudioFilter: (studio) => set({ activeStudioFilter: studio || '' }),
      studioInputValue: '',
      setStudioInputValue: (val) => set({ studioInputValue: val || '' }),
    }),
    {
      name: 'person_credits_discover_tab',
      partialize: (state) => ({
        activeDiscoverTab: state.activeDiscoverTab,
        viewModeState: state.viewModeState,
        activeTagFilter: state.activeTagFilter,
        tagInputValue: state.tagInputValue,
        activeStudioFilter: state.activeStudioFilter,
        studioInputValue: state.studioInputValue,
      }),
    }
  )
);
