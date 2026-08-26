import Button from '@/ui/Button';
import SettingsTextField from './SettingsTextField.jsx';
import { useSettingsPathPicker } from '../../hooks';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Field from '@/ui/Field';

export default function SettingsPathField({
  field,
  t,
  picker = 'folder',
  disabled = false,
  buttonLabel,
  className = '',
  label,
  hint,
  required,
  ...props
}) {
  const {
    handlePick,
    isFieldDisabled,
    isSaving,
    effectiveError,
    buttonText,
  } = useSettingsPathPicker({
    field,
    picker,
    disabled,
    error: props.error,
    buttonLabel,
    t,
  });

  return (
    <Field
      label={label}
      hint={hint}
      error={effectiveError}
      required={required}
    >
      <Inline gap="md" align="center" className="settings-input-row">
        <Stack flex={1}>
          <SettingsTextField
            field={field}
            {...props}
            label={null}
            hint={null}
            error={null}
            invalid={!!effectiveError}
          />
        </Stack>
        <Button
          variant="secondary"
          onClick={handlePick}
          disabled={isFieldDisabled || isSaving}
          className={className}
        >
          {buttonText}
        </Button>
      </Inline>
    </Field>
  );
}
