import SelectableCard from '@/ui/SelectableCard';
import Radio from '@/ui/Radio';
import Inline from '@/ui/Inline';
import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Grid from '@/ui/Grid';

export default function BulkOverrideMatchActionSelector({
  t,
  matchAction = 'keep',
  setMatchAction,
}) {
  return (
    <Card variant="soft" padding="md">
      <Stack gap="md">
        <Stack gap="2xs">
          <Text variant="small" weight="bold">
            {t('organizer.overrideModal.matchAction.title') || 'Match Action'}
          </Text>
          <Text variant="small" color="muted">
            {t('organizer.overrideModal.matchAction.description') ||
              'Choose what to do with the current tv match since season or episode changed:'}
          </Text>
        </Stack>

        <Grid variant="two-cols" gap="md">
          <SelectableCard
            selected={matchAction === 'keep'}
            onClick={() => setMatchAction?.('keep')}
          >
            <Inline align="start" gap="md" fullWidth>
              <Radio
                name="bulkMatchAction"
                checked={matchAction === 'keep'}
                onChange={() => setMatchAction?.('keep')}
              />
              <Stack gap="2xs">
                <Text variant="small" weight="semibold">
                  {t('organizer.overrideModal.matchAction.keep') ||
                    'Keep current tv match'}
                </Text>
                <Text variant="xsmall" color="muted">
                  {t('organizer.overrideModal.matchAction.keepDesc') ||
                    'Update season/episode under the tv.'}
                </Text>
              </Stack>
            </Inline>
          </SelectableCard>

          <SelectableCard
            selected={matchAction === 'reset'}
            onClick={() => setMatchAction?.('reset')}
          >
            <Inline align="start" gap="md" fullWidth>
              <Radio
                name="bulkMatchAction"
                checked={matchAction === 'reset'}
                onChange={() => setMatchAction?.('reset')}
              />
              <Stack gap="2xs">
                <Text variant="small" weight="semibold">
                  {t('organizer.overrideModal.matchAction.reset') ||
                    'Reset match (Pending)'}
                </Text>
                <Text variant="xsmall" color="muted">
                  {t('organizer.overrideModal.matchAction.resetDesc') ||
                    'Remove match and return to Review Needed.'}
                </Text>
              </Stack>
            </Inline>
          </SelectableCard>
        </Grid>
      </Stack>
    </Card>
  );
}
