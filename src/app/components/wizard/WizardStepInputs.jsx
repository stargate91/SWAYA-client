import Stack from '@/ui/Stack';
import Input from '@/ui/Input';

export default function WizardStepInputs({ fields = [], getInputValue, onInputChange }) {
  if (!fields || fields.length === 0) return null;

  return (
    <Stack gap="lg">
      {fields.map((field) => (
        <Input
          key={field.key}
          label={field.label}
          type={field.type || 'text'}
          multiline={field.multiline}
          value={getInputValue(field.key)}
          onChange={(e) => onInputChange(field.key, e.target.value)}
          placeholder={field.placeholder}
        />
      ))}
    </Stack>
  );
}
