import Inline from '@/ui/Inline';
import Badge from '@/ui/Badge';
import Text from '@/ui/Text';
import styles from './PreviewBadge.module.css';

export default function PreviewBadge({ previewText, t }) {
  if (!previewText) return null;
  return (
    <Inline
      gap="sm"
      align="center"
      className={styles.container}
    >
      <Badge tone="accent" size="xs">
        {t('settingsPage.sections.organization.previewBadge', { defaultValue: 'Preview' })}
      </Badge>
      <Text
        variant="caption"
        color="accent"
        weight="medium"
        breakAll
        mono
      >
        {previewText}
      </Text>
    </Inline>
  );
}
