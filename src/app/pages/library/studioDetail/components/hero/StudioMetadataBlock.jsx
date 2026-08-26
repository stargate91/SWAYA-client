import Text from '@/ui/Text';
import Card from '@/ui/Card';
import Stack from '@/ui/Stack';

export default function StudioMetadataBlock({ studio, t }) {
  return (
    <>
      {/* Description */}
      {studio.description && (
        <Card variant="flat-glass" padding="sm">
          <Stack gap="xs">
            <Text variant="small" weight="bold" color="secondary" uppercase tracking="wider">
              {t('library.details.description') || 'Description'}
            </Text>
            <Text variant="small" color="secondary">
              {studio.description}
            </Text>
          </Stack>
        </Card>
      )}

      {/* Aliases */}
      {studio.aliases && studio.aliases.length > 0 && (
        <Card variant="flat-glass" padding="sm">
          <Stack gap="xs">
            <Text variant="small" weight="bold" color="secondary" uppercase tracking="wider">
              {t('library.details.aliases') || 'Aliases'}
            </Text>
            <Stack gap="xs">
              {studio.aliases.map((alias) => (
                <Text key={alias.id} variant="small" color="secondary">
                  {alias.alias_name}
                </Text>
              ))}
            </Stack>
          </Stack>
        </Card>
      )}
    </>
  );
}
