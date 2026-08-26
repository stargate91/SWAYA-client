import Checkbox from '@/ui/Checkbox';
import Inline from '@/ui/Inline';
import styles from './BulkOverrideFieldRow.module.css';

export default function BulkOverrideFieldRow({ label, checked, onChange, children }) {
  return (
    <Inline align="center" justify="between" fullWidth gap="md" wrap={false}>
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      >
        {label}
      </Checkbox>
      <div className={styles['field-wrapper']}>
        {children}
      </div>
    </Inline>
  );
}

