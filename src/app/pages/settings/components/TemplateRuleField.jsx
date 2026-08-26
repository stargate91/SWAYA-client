import SettingsSelectField from './fields/SettingsSelectField.jsx';
import TemplateFieldSection from './TemplateFieldSection.jsx';
import Stack from '@/ui/Stack';

export default function TemplateRuleField({
  t,
  actionFieldName,
  actionLabel,
  actionField,
  actionOptions,
  templateLabel,
  templateField,
  templatePlaceholder,
  templateTags,
  templateFieldKey,
  inputRef,
  insertTag,
  previewText,
  disabled,
}) {
  return (
    <Stack gap="md">
      <SettingsSelectField
        field={actionFieldName}
        label={actionLabel}
        options={actionOptions}
        disabled={disabled}
      />
      {actionField.value === 'rename' && (
        <Stack indent="2xl">
          <TemplateFieldSection
            t={t}
            inputRef={inputRef}
            label={templateLabel}
            value={templateField.value}
            onChange={templateField.onChange}
            disabled={disabled || templateField.disabled}
            placeholder={templatePlaceholder}
            tags={templateTags}
            fieldKey={templateFieldKey}
            insertTag={insertTag}
            previewText={previewText}
          />
        </Stack>
      )}
    </Stack>
  );
}
