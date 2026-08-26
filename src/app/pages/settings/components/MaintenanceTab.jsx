import PropTypes from 'prop-types';
import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Button from '@/ui/Button';
import Hint from '@/ui/Hint';
import Text from '@/ui/Text';
import { useMaintenanceActions } from '../hooks/useMaintenanceActions';

export default function MaintenanceTab({
  t,
  isSaving,
  isWiping,
  isWipingCache,
  isScanActive,
  handleExportSettings,
  handleImportClick,
  handleImportSettings,
  handleResetToDefaults,
  handleWipeDatabase,
  handleWipeCache,
  formInputs,
}) {
  const {
    isExportDisabled,
    isImportDisabled,
    isResetDisabled,
    isWipeCacheDisabled,
    isWipeDbDisabled,
    wipeCacheButtonLabel,
    wipeDbButtonLabel,
    fileInputRef,
  } = useMaintenanceActions({
    t,
    isSaving,
    isWiping,
    isWipingCache,
    isScanActive,
    handleExportSettings,
    handleImportClick,
    handleImportSettings,
    handleResetToDefaults,
    handleWipeDatabase,
    handleWipeCache,
    formInputs,
  });

  return (
    <Stack gap="xl">
      <Card
        title={t('settingsPage.sections.backup.title')}
        eyebrow={t('settingsPage.sections.backup.eyebrow')}
      >
        <Stack gap="md">
          <Hint>
            {t('settingsPage.sections.backup.description')}
          </Hint>
          <Inline gap="md" justify="end">
            <Button variant="secondary" onClick={handleExportSettings} disabled={isExportDisabled}>
              {t('settingsPage.sections.backup.exportBtn')}
            </Button>
            <Button variant="secondary" onClick={handleImportClick} disabled={isImportDisabled}>
              {t('settingsPage.sections.backup.importBtn')}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportSettings}
              accept=".json"
              hidden
            />
          </Inline>
        </Stack>
      </Card>

      <Card
        title={t('settingsPage.sections.resetDefaults.title')}
        eyebrow={t('settingsPage.sections.resetDefaults.eyebrow')}
      >
        <Stack gap="md">
          <Hint>
            {t('settingsPage.sections.resetDefaults.description')}
          </Hint>
          <Inline justify="end">
            <Button variant="secondary-neutral" onClick={handleResetToDefaults} disabled={isResetDisabled}>
              {t('settingsPage.sections.resetDefaults.button')}
            </Button>
          </Inline>
        </Stack>
      </Card>

      <Card
        title={t('settingsPage.dangerZone.wipeCacheTitle')}
        eyebrow={t('settingsPage.dangerZone.eyebrow')}
        variant="danger"
      >
        <Stack gap="md">
          <Text variant="body" color="danger">
            {t('settingsPage.dangerZone.wipeCacheDesc')}
          </Text>
          <Inline justify="end">
            <Button variant="danger" onClick={handleWipeCache} disabled={isWipeCacheDisabled}>
              {wipeCacheButtonLabel}
            </Button>
          </Inline>
        </Stack>
      </Card>

      <Card
        title={t('settingsPage.dangerZone.title')}
        eyebrow={t('settingsPage.dangerZone.eyebrow')}
        variant="danger"
      >
        <Stack gap="md">
          <Text variant="body" color="danger">
            {t('settingsPage.dangerZone.desc')}
          </Text>
          <Inline justify="end">
            <Button variant="danger" onClick={handleWipeDatabase} disabled={isWipeDbDisabled}>
              {wipeDbButtonLabel}
            </Button>
          </Inline>
        </Stack>
      </Card>
    </Stack>
  );
}

MaintenanceTab.propTypes = {
  t: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  isWiping: PropTypes.bool,
  isWipingCache: PropTypes.bool,
  isScanActive: PropTypes.bool,
  handleExportSettings: PropTypes.func,
  handleImportClick: PropTypes.func,
  handleImportSettings: PropTypes.func,
  handleResetToDefaults: PropTypes.func,
  handleWipeDatabase: PropTypes.func,
  handleWipeCache: PropTypes.func,
  formInputs: PropTypes.object,
};
