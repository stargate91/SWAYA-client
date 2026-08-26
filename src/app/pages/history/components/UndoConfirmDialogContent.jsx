import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Text from '@/ui/Text';

export default function UndoConfirmDialogContent({ batch, t }) {
  return (
    <Stack gap="md">
      <Text variant="body" color="primary">
        {t('historyPage.confirmWarning') || 'Are you sure you want to revert this batch?'}
      </Text>
      <Card variant="soft" padding="md">
        <Stack gap="sm">
          <Inline align="center" justify="between">
            <Text variant="small" color="secondary">{t('historyPage.batchLabel') || 'Batch:'}</Text>
            <Text variant="small" color="primary" weight="semibold">{batch.name}</Text>
          </Inline>
          <Inline align="center" justify="between">
            <Text variant="small" color="secondary">{t('historyPage.filesLabel') || 'Files:'}</Text>
            <Text variant="small" weight="bold" color="success">
              {t('historyPage.succeededCount', { defaultValue: '{{count}} succeeded', count: batch.success_count })}
            </Text>
          </Inline>
        </Stack>
      </Card>
    </Stack>
  );
}
