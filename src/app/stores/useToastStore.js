import { create } from 'zustand';

export const useToastStore = create((set) => ({
  toasts: [],
  toast: (title, tone = 'default', options = {}) => {
    const rawTone = tone || 'default';
    const normalizedTone = rawTone === 'error' ? 'danger' : rawTone;
    const id = options.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const wordCount = String(title || '').split(/\s+/).filter(Boolean).length;
    const duration = options.duration ?? Math.max(3000, 2000 + wordCount * 300);

    const newToast = {
      id,
      title,
      tone: normalizedTone,
      duration,
      ...options,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  clearToasts: () => {
    set({ toasts: [] });
  },
}));

/**
 * Standalone toast utility callable outside React components (e.g. mutations, query callbacks, IPC listeners).
 */
export const toast = (title, tone = 'default', options = {}) =>
  useToastStore.getState().toast(title, tone, options);
