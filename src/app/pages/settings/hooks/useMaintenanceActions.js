import { useMemo } from 'react';

/**
 * Custom hook to encapsulate disabled states, dynamic wiping labels,
 * and input ref bindings for MaintenanceTab.
 *
 * @param {object} params
 * @param {Function} [params.t] - Translation function
 * @param {boolean} [params.isSaving] - Whether settings are currently saving
 * @param {boolean} [params.isWiping] - Whether database is currently wiping
 * @param {boolean} [params.isWipingCache] - Whether cache is currently wiping
 * @param {boolean} [params.isScanActive] - Whether library scan is active
 * @param {Function} [params.handleExportSettings] - Export settings handler
 * @param {Function} [params.handleImportClick] - Trigger file dialog handler
 * @param {Function} [params.handleImportSettings] - File change import handler
 * @param {Function} [params.handleResetToDefaults] - Reset settings handler
 * @param {Function} [params.handleWipeDatabase] - Wipe database handler
 * @param {Function} [params.handleWipeCache] - Wipe cache handler
 * @param {object} [params.formInputs] - Form refs container
 */
export function useMaintenanceActions({
  t = (k) => k,
  isSaving = false,
  isWiping = false,
  isWipingCache = false,
  isScanActive = false,
  handleExportSettings,
  handleImportClick,
  handleImportSettings,
  handleResetToDefaults,
  handleWipeDatabase,
  handleWipeCache,
  formInputs = {},
} = {}) {
  const isExportDisabled = Boolean(isSaving);
  const isImportDisabled = Boolean(isSaving);
  const isResetDisabled = Boolean(isSaving || isScanActive);
  const isWipeCacheDisabled = Boolean(isWipingCache || isSaving || isScanActive);
  const isWipeDbDisabled = Boolean(isWiping || isSaving || isScanActive);

  const wipeCacheButtonLabel = useMemo(() => {
    return isWipingCache
      ? t('settingsPage.dangerZone.wipeCacheWiping') || 'Clearing...'
      : t('settingsPage.dangerZone.wipeCacheBtn') || 'Clear Cache';
  }, [isWipingCache, t]);

  const wipeDbButtonLabel = useMemo(() => {
    return isWiping
      ? t('settingsPage.dangerZone.buttonWiping') || 'Wiping...'
      : t('settingsPage.dangerZone.button') || 'Wipe Database';
  }, [isWiping, t]);

  const fileInputRef = formInputs?.backupFile;

  return {
    isExportDisabled,
    isImportDisabled,
    isResetDisabled,
    isWipeCacheDisabled,
    isWipeDbDisabled,
    wipeCacheButtonLabel,
    wipeDbButtonLabel,
    fileInputRef,
    handleExportSettings,
    handleImportClick,
    handleImportSettings,
    handleResetToDefaults,
    handleWipeDatabase,
    handleWipeCache,
  };
}

export default useMaintenanceActions;
