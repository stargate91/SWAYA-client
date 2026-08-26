import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Dropdown from '@/ui/Dropdown';
import { isNsfwMode } from '@/stores/useLibraryModeStore';

export default function OrganizerScanSettingsPanel({
  scanMode,
  setScanMode,
  scanModeOptions = [],
  provider,
  setProvider,
  providerOptions = [],
  sessionMode,
  t,
}) {
  return (
    <Card
      variant="solid"
      title={t('organizer.scanSettings.title')}
      headerVariant="shaded"
      padding="md"
      fullWidth
    >
      <Stack gap="md">
        <Text size="xs" color="text-secondary" as="div">
          {t('organizer.scanSettings.subtitle')}
        </Text>

        <Stack gap="sm">
          <Dropdown
            label={t('organizer.scanSettings.scanMode')}
            options={scanModeOptions}
            value={scanMode}
            onChange={(e) => setScanMode(e.target.value)}
            menuClassName="scan-settings-dropdown-menu"
          />

          {isNsfwMode(sessionMode) && scanMode !== 'offline' && providerOptions.length > 1 && (
            <Dropdown
              label={t('organizer.scanSettings.provider')}
              options={providerOptions}
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              menuClassName="scan-settings-dropdown-menu"
            />
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
