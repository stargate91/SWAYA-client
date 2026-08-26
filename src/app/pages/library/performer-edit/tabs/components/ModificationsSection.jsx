import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Input from '@/ui/Input';

export default function ModificationsSection({
  form,
  handleChange,
  t,
}) {
  return (
    <Card
      title={t('library.performerEdit.modifications') || 'Modifications'}
      variant="flat-glass"
      padding="md"
    >
      <Stack gap="md">
        <Input
          label={t('library.details.tattoos') || 'Tattoos'}
          type="text"
          placeholder="e.g. Rose on left shoulder"
          value={form.tattoos}
          onChange={e => handleChange('tattoos', e.target.value)}
        />
        <Input
          label={t('library.details.piercings') || 'Piercings'}
          type="text"
          placeholder="e.g. Nose ring"
          value={form.piercings}
          onChange={e => handleChange('piercings', e.target.value)}
        />
      </Stack>
    </Card>
  );
}

