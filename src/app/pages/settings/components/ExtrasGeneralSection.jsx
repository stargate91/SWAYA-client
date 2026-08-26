import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import InfoBox from '@/ui/InfoBox';
import Hint from '@/ui/Hint';
import { useSettingsField, useSettingsViewContext } from '../SettingsFormContext.jsx';
import { EXTRAS_FOLDER_MODES } from '../config';
import SettingsSwitchField from './fields/SettingsSwitchField.jsx';
import SettingsSelectField from './fields/SettingsSelectField.jsx';
import SettingsTextField from './fields/SettingsTextField.jsx';

export default function ExtrasGeneralSection({ t }) {
  const { extrasFolderModeOptions } = useSettingsViewContext();
  const extrasEnabledField = useSettingsField('extras_enabled');
  const moveToLibraryField = useSettingsField('folder_move_to_library');
  const orgEnabledField = useSettingsField('folder_organization_enabled');
  const folderModeField = useSettingsField('extras_folder_mode');

  return (
    <Card
      title={t('settingsPage.sections.extras.title')}
      eyebrow={t('settingsPage.sections.extras.eyebrow')}
    >
      <Stack gap="lg">
        <Stack gap="2xs">
          <SettingsSwitchField
            field="extras_enabled"
            id="extras_enabled"
          >
            {t('settingsPage.sections.extras.extrasEnabled')}
          </SettingsSwitchField>
          <Hint>
            {t('settingsPage.sections.extras.extrasEnabledHint')}
          </Hint>
        </Stack>

        {extrasEnabledField.checked && (
          <>
            {!orgEnabledField.checked ? (
              <InfoBox>
                {t('settingsPage.sections.extras.registerInfo')}
              </InfoBox>
            ) : moveToLibraryField.checked ? (
              <>
                <SettingsSelectField
                  field="extras_folder_mode"
                  label={t('settingsPage.sections.extras.folderModeLabel')}
                  hint={t('settingsPage.sections.extras.folderModeHint')}
                  options={extrasFolderModeOptions}
                />

                {folderModeField.value === EXTRAS_FOLDER_MODES.SUBFOLDER && (
                  <SettingsTextField
                    field="extras_subfolder_name"
                    label={t('settingsPage.sections.extras.subfolderName')}
                    placeholder={t('settingsPage.sections.extras.defaultSubfolderName')}
                  />
                )}

                <InfoBox>
                  {t('settingsPage.sections.extras.libraryInfo')}
                </InfoBox>
              </>
            ) : (
              <InfoBox>
                {t('settingsPage.sections.extras.inPlaceInfo')}
              </InfoBox>
            )}
          </>
        )}
      </Stack>
    </Card>
  );
}
