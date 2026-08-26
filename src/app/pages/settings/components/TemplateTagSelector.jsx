import Button from '@/ui/Button';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import { useTemplateTags } from '../hooks';

export default function TemplateTagSelector({ t, tags, fieldKey, inputRef, insertTag, disabled }) {
  const { commonTags, additionalTags, hasCommonTags, hasAdditionalTags } = useTemplateTags(tags);

  return (
    <Stack gap="sm">
      {hasCommonTags && (
        <Stack gap="xs">
          <Text
            variant="caption"
            weight="bold"
            color="muted"
            uppercase
          >
            {t('settingsPage.templateTags.common')}
          </Text>
          <Inline gap="sm">
            {commonTags.map((tag) => (
              <Button
                key={tag}
                variant="tag"
                disabled={disabled}
                onClick={disabled ? undefined : () => insertTag(fieldKey, inputRef, tag)}
              >
                {tag}
              </Button>
            ))}
          </Inline>
        </Stack>
      )}
      {hasAdditionalTags && (
        <Stack gap="xs">
          <Text
            variant="caption"
            weight="bold"
            color="muted"
            uppercase
          >
            {t('settingsPage.templateTags.more')}
          </Text>
          <Inline gap="sm">
            {additionalTags.map((tag) => (
              <Button
                key={tag}
                variant="tag"
                disabled={disabled}
                onClick={disabled ? undefined : () => insertTag(fieldKey, inputRef, tag)}
              >
                {tag}
              </Button>
            ))}
          </Inline>
        </Stack>
      )}
    </Stack>
  );
}
