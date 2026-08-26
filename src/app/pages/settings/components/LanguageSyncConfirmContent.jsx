import Checkbox from '@/ui/Checkbox';
import modalStyles from '@/ui/Modal.module.css';

export default function LanguageSyncConfirmContent({ description, dontShowAgainLabel, onToggleDontShowAgain }) {
  return (
    <div className={modalStyles['body-text']}>
      <p className={modalStyles['body-paragraph']}>
        {description}
      </p>
      <Checkbox onChange={(e) => onToggleDontShowAgain(e.target.checked)}>
        {dontShowAgainLabel}
      </Checkbox>
    </div>
  );
}
