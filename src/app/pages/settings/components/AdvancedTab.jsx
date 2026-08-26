import Stack from '@/ui/Stack';
import { useSettingsField, useSettingsViewContext } from '../SettingsFormContext.jsx';
import SettingsSectionRenderer from './SettingsSectionRenderer.jsx';
import {
  createAdvancedMovieThresholdSection,
  createAdvancedTvThresholdSection,
  createAdvancedLanguageSection,
  createAdvancedAdultSceneDetectionSection,
} from '../config';

export default function AdvancedTab() {
  const {
    t,
    metadataLanguageOptions,
    targetLanguageOptions,
    isBackgroundActive,
    handleSyncLanguage,
    isSyncingLanguage,
  } = useSettingsViewContext();

  const metadataFollowUiField = useSettingsField('follow_app_language_for_media_library');
  const targetFollowUiField = useSettingsField('follow_app_language_for_naming');
  const includeAdultField = useSettingsField('include_adult');

  return (
    <Stack gap="xl">
      <SettingsSectionRenderer
        section={createAdvancedMovieThresholdSection(t)}
        context={{ disabled: isBackgroundActive }}
      />
      <SettingsSectionRenderer
        section={createAdvancedTvThresholdSection(t)}
        context={{ disabled: isBackgroundActive }}
      />
      {includeAdultField.checked && (
        <SettingsSectionRenderer
          section={createAdvancedAdultSceneDetectionSection(t)}
          context={{ disabled: isBackgroundActive }}
        />
      )}
      <SettingsSectionRenderer
        section={createAdvancedLanguageSection(
          t,
          metadataLanguageOptions,
          targetLanguageOptions,
          handleSyncLanguage,
          isSyncingLanguage || isBackgroundActive
        )}
        context={{
          metadataFollowUi: metadataFollowUiField.checked,
          targetFollowUi: targetFollowUiField.checked,
        }}
      />
    </Stack>
  );
}
