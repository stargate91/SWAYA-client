import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSidebarStore = create(
  persist(
    (set) => ({
      isCollapsed: false,
      setCollapsed: (isCollapsed) => set({ isCollapsed: Boolean(isCollapsed) }),
      toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    }),
    {
      name: 'sidebar_collapsed',
      partialize: (state) => ({ isCollapsed: state.isCollapsed }),
    }
  )
);

export default useSidebarStore;
