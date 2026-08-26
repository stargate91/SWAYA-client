import { useMemo } from 'react';
import { useSettingsFormContext, useSettingsField } from '../SettingsFormContext.jsx';

/**
 * Hook to manage path picker action resolution, field state merging, and disabled checks.
 *
 * @param {object} [params={}]
 * @param {string} params.field - Form field name
 * @param {'folder' | 'file'} [params.picker='folder'] - Type of path picker
 * @param {boolean} [params.disabled=false] - External disabled flag
 * @param {string} [params.error] - External error override
 * @param {string} [params.buttonLabel] - Custom button label
 * @param {(key: string) => string} [params.t] - Translation function
 * @returns {{
 *   fieldState: object,
 *   handlePick: () => void,
 *   isFieldDisabled: boolean,
 *   isSaving: boolean,
 *   effectiveError: string | undefined,
 *   buttonText: string
 * }}
 */
export function useSettingsPathPicker({
  field,
  picker = 'folder',
  disabled = false,
  error,
  buttonLabel,
  t,
} = {}) {
  const { actions = {}, isSaving = false } = useSettingsFormContext() || {};
  const fieldState = useSettingsField(field);

  const handlePick = useMemo(() => {
    if (picker === 'file') {
      return actions.handlePickFile ? actions.handlePickFile(field) : undefined;
    }
    return actions.handlePickFolder ? actions.handlePickFolder(field) : undefined;
  }, [picker, actions, field]);

  const isFieldDisabled = Boolean(disabled || fieldState?.disabled);
  const effectiveError = error ?? fieldState?.error;
  const buttonText = buttonLabel || (t ? t('settingsPage.sections.folders.browse') : 'Browse');

  return {
    fieldState,
    handlePick,
    isFieldDisabled,
    isSaving,
    effectiveError,
    buttonText,
  };
}

export default useSettingsPathPicker;
