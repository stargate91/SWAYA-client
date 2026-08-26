import Card from '@/ui/Card';
import Button from '@/ui/Button';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';

export default function SettingsErrorState({ t, onRetry, onClose }) {
  return (
    <div className="settings-overlay settings-overlay--centered">
      <Card
        title={t('settingsPage.errorTitle')}
        padding="xl"
      >
        <Stack gap="lg">
          <Text variant="body" color="secondary">
            {t('settingsPage.errorText')}
          </Text>
          <Inline gap="md" align="center">
            <Button variant="primary" onClick={onRetry}>
              {t('settingsPage.retry')}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              {t('common.cancel')}
            </Button>
          </Inline>
        </Stack>
      </Card>
    </div>
  );
}
