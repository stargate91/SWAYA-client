import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const PROMPT_PREFERENCE_KEYS = Object.freeze({
  SETTINGS_LANGUAGE_SYNC_WARNING: 'swaya:skip-settings-language-sync-warning',
  ORGANIZER_CONFIRM_BUCKET: 'swaya_skip_confirm_bucket',
  ORGANIZER_CONFIRM_TV: 'swaya_skip_confirm_tv',
  ORGANIZER_CONFIRM_SEASON: 'swaya_skip_confirm_season',
});

export const usePromptPreferencesStore = create(
  persist(
    (set, get) => ({
      dismissedPrompts: {},

      isPromptDismissed: (key) => {
        if (!key) return false;
        return Boolean(get().dismissedPrompts[key]);
      },

      dismissPrompt: (key) => {
        if (!key) return;
        set((state) => ({
          dismissedPrompts: {
            ...state.dismissedPrompts,
            [key]: true,
          },
        }));
      },

      resetPrompt: (key) => {
        if (!key) return;
        set((state) => {
          const next = { ...state.dismissedPrompts };
          delete next[key];
          return { dismissedPrompts: next };
        });
      },
    }),
    {
      name: 'swaya_prompt_preferences',
      partialize: (state) => ({ dismissedPrompts: state.dismissedPrompts }),
    }
  )
);

export default usePromptPreferencesStore;
