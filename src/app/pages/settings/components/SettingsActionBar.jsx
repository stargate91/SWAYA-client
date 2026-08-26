import PropTypes from 'prop-types';
import FloatingActionBar from '@/ui/FloatingActionBar';

export default function SettingsActionBar({
  t,
  visible,
  isSaving,
  onReset,
  onSave,
  shaking = false,
  className = '',
}) {
  return (
    <FloatingActionBar
      visible={visible}
      shaking={shaking}
      className={className}
      title={t('settingsPage.unsavedChanges.title')}
      actions={[
        {
          key: 'reset',
          label: t('settingsPage.unsavedChanges.reset'),
          onClick: onReset,
          disabled: isSaving,
        },
        {
          key: 'save',
          label: isSaving ? t('settingsPage.sections.api.saving') : t('settingsPage.unsavedChanges.save'),
          onClick: onSave,
          disabled: isSaving,
          variant: 'primary',
        },
      ]}
    />
  );
}

SettingsActionBar.propTypes = {
  t: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  isSaving: PropTypes.bool,
  onReset: PropTypes.func,
  onSave: PropTypes.func,
  shaking: PropTypes.bool,
  className: PropTypes.string,
};
