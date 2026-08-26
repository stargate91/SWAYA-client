import { create } from 'zustand';

export const useNavigationStore = create((set, get) => ({
  // --- 1. History Stack & Routing State ---
  historyStack: [],
  currentIndex: -1,

  syncPath: (path, navType) => {
    const { historyStack, currentIndex } = get();
    
    if (navType === 'POP') {
      const idx = historyStack.lastIndexOf(path);
      if (idx !== -1) {
        set({ currentIndex: idx });
        return;
      }
    }
    
    if (historyStack[currentIndex] === path) return;
    
    const cleanStack = historyStack.slice(0, currentIndex + 1);
    const newStack = [...cleanStack, path];
    
    set({
      historyStack: newStack,
      currentIndex: newStack.length - 1,
    });
  },

  goBack: (navigate) => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
      navigate(-1);
    }
  },

  goForward: (navigate) => {
    const { historyStack, currentIndex } = get();
    if (currentIndex < historyStack.length - 1) {
      set({ currentIndex: currentIndex + 1 });
      navigate(1);
    }
  },

  resetHistory: (initialPath) => {
    set({
      historyStack: initialPath ? [initialPath] : [],
      currentIndex: initialPath ? 0 : -1,
    });
  },

  // --- 2. Ephemeral Page States & Scroll Preservation ---
  pageStates: {},

  setPageState: (path, state) => set((prev) => ({
    pageStates: {
      ...prev.pageStates,
      [path]: {
        ...prev.pageStates[path],
        ...state,
      },
    },
  })),

  getPageState: (path) => get().pageStates[path] || {},

  clearPageState: (path) => set((prev) => {
    const nextStates = { ...prev.pageStates };
    delete nextStates[path];
    return { pageStates: nextStates };
  }),
}));

export default useNavigationStore;
