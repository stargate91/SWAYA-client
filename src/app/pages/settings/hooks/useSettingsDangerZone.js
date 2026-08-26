import { useCallback, useState } from 'react';
import { AlertTriangle, RotateCcw } from '@/ui/icons';
import { useClearDatabaseMutation } from '@/queries';
import { confirmDialog } from '@/providers/UiProvider';
import { getInitialFormValues } from '../config';

export default function useSettingsDangerZone({
  t,
  toast,
  setForm,
  onBeforeWipe,
}) {
  const clearDbMutation = useClearDatabaseMutation();
  const [isWiping, setIsWiping] = useState(false);
  const [isWipingCache, setIsWipingCache] = useState(false);

  const handleResetToDefaults = useCallback(() => {
    confirmDialog({
      title: t('settingsPage.sections.resetDefaults.confirmTitle') || 'Reset Settings to Factory Defaults',
      icon: RotateCcw,
      variant: 'default',
      description: t('settingsPage.sections.resetDefaults.confirmDescription') || 'Are you sure you want to reset all configuration and naming templates to system defaults? Your media library database and files will not be affected.',
      cancelText: t('common.cancel'),
      confirmText: t('settingsPage.sections.resetDefaults.button') || 'Reset to Defaults',
      onConfirm: () => {
        setForm(getInitialFormValues(null, t));
        toast(t('settingsPage.sections.resetDefaults.success') || 'Settings reset to factory defaults. Click Save Changes to apply.', 'success');
      },
    });
  }, [setForm, t, toast]);

  const handleWipeDatabase = useCallback(() => {
    confirmDialog({
      title: t('settingsPage.dangerZone.confirmTitle'),
      icon: AlertTriangle,
      variant: 'danger',
      description: t('settingsPage.dangerZone.confirm'),
      cancelText: t('common.cancel'),
      confirmText: t('settingsPage.dangerZone.button'),
      onConfirm: async () => {
        setIsWiping(true);
        try {
          onBeforeWipe?.();
          await clearDbMutation.mutateAsync({ wipe: true });
          toast(t('settingsPage.dangerZone.success'), 'success');
        } catch (error) {
          toast(error.message || t('settingsPage.dangerZone.failed'), 'danger');
        } finally {
          setIsWiping(false);
        }
      },
    });
  }, [clearDbMutation, onBeforeWipe, t, toast]);

  const handleWipeCache = useCallback(() => {
    confirmDialog({
      title: t('settingsPage.dangerZone.confirmWipeCacheTitle') || 'Clear Scraped Metadata Cache',
      icon: AlertTriangle,
      variant: 'danger',
      description: t('settingsPage.dangerZone.confirmWipeCache') || 'Are you sure you want to clear the entire scraped metadata cache? This will reset all match results but will keep your libraries, physical file records, manually saved overrides, and downloaded images.',
      cancelText: t('common.cancel'),
      confirmText: t('settingsPage.dangerZone.buttonWipeCache') || 'Wipe Cache',
      onConfirm: async () => {
        setIsWipingCache(true);
        try {
          await clearDbMutation.mutateAsync({ wipe_cache: true });
          toast(t('settingsPage.dangerZone.wipeCacheSuccess') || 'Metadata cache cleared successfully.', 'success');
        } catch (error) {
          toast(error.message || t('settingsPage.dangerZone.wipeCacheFailed') || 'Failed to clear metadata cache.', 'danger');
        } finally {
          setIsWipingCache(false);
        }
      },
    });
  }, [clearDbMutation, t, toast]);

  return {
    isWiping,
    isWipingCache,
    handleResetToDefaults,
    handleWipeDatabase,
    handleWipeCache,
  };
}
