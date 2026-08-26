import { useMemo } from 'react';

/**
 * Hook to derive organization mode selection states from configuration form state.
 *
 * @param {object} [form={}] - Configuration form state object
 * @returns {{
 *   isRegisterSelected: boolean,
 *   isInplaceSelected: boolean,
 *   isLibrarySelected: boolean
 * }}
 */
export function usePresetModeSelection(form = {}) {
  return useMemo(() => {
    const isRegisterSelected = !form?.folder_organization_enabled;
    const isInplaceSelected = Boolean(form?.folder_organization_enabled && !form?.folder_move_to_library);
    const isLibrarySelected = Boolean(form?.folder_organization_enabled && form?.folder_move_to_library);

    return {
      isRegisterSelected,
      isInplaceSelected,
      isLibrarySelected,
    };
  }, [form?.folder_organization_enabled, form?.folder_move_to_library]);
}

export default usePresetModeSelection;
