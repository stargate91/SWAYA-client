import { useLibraryModeStore } from '@/stores/useLibraryModeStore';
import { useSettingsQuery } from '@/queries/settingsQueries';

/**
 * Hook providing session mode and application settings for drawer results normalization.
 *
 * @returns {{
 *   sessionMode: string,
 *   settings: object,
 *   isSettingsLoading: boolean
 * }}
 */
export function useDrawerResultsState() {
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const { data: settings = {}, isLoading: isSettingsLoading } = useSettingsQuery();

  return {
    sessionMode,
    settings,
    isSettingsLoading,
  };
}

export default useDrawerResultsState;
