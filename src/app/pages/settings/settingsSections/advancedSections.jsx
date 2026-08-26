import SettingsSelectField from '../components/fields/SettingsSelectField.jsx';
import Button from '@/ui/Button';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';

export function createAdvancedMovieThresholdSection(t) {
  return {
    title: t('settingsPage.sections.advanced.movieTitle'),
    eyebrow: t('settingsPage.sections.advanced.movieEyebrow'),
    items: [
      {
        type: 'text',
        field: 'min_video_size_mb',
        label: t('settingsPage.sections.advanced.minVideoSizeMb'),
        hint: t('settingsPage.sections.advanced.minVideoSizeMbHint'),
        inputType: 'number',
        min: '0',
      },
      {
        type: 'text',
        field: 'min_video_duration_minutes',
        label: t('settingsPage.sections.advanced.minVideoDurationMinutes'),
        hint: t('settingsPage.sections.advanced.minVideoDurationMinutesHint'),
        inputType: 'number',
        min: '0',
      },
    ],
  };
}

export function createAdvancedTvThresholdSection(t) {
  return {
    title: t('settingsPage.sections.advanced.tvTitle'),
    eyebrow: t('settingsPage.sections.advanced.tvEyebrow'),
    items: [
      {
        type: 'text',
        field: 'tv_min_video_size_mb',
        label: t('settingsPage.sections.advanced.tvMinVideoSizeMb'),
        hint: t('settingsPage.sections.advanced.tvMinVideoSizeMbHint'),
        inputType: 'number',
        min: '0',
      },
      {
        type: 'text',
        field: 'tv_min_video_duration_minutes',
        label: t('settingsPage.sections.advanced.tvMinVideoDurationMinutes'),
        hint: t('settingsPage.sections.advanced.tvMinVideoDurationMinutesHint'),
        inputType: 'number',
        min: '0',
      },
    ],
  };
}

export function createAdvancedLanguageSection(t, metadataLanguageOptions, targetLanguageOptions, onSyncLanguage, isSyncing) {
  return {
    title: t('settingsPage.sections.advancedLanguage.title'),
    eyebrow: t('settingsPage.sections.advancedLanguage.eyebrow'),
    items: [
      {
        type: 'switch',
        field: 'follow_app_language_for_media_library',
        id: 'follow_app_language_for_media_library',
        hint: t('settingsPage.sections.advancedLanguage.metadataFollowsUiHint'),
        children: t('settingsPage.sections.advancedLanguage.metadataFollowsUi'),
      },
      {
        type: 'custom',
        key: 'primary_metadata_language',
        visible: (context) => !context.metadataFollowUi,
        render: () => (
          <Stack indent="2xl">
            <SettingsSelectField
              field="primary_metadata_language"
              label={t('settingsPage.sections.advancedLanguage.metadataLanguage')}
              hint={t('settingsPage.sections.advancedLanguage.metadataLanguageHint')}
              options={metadataLanguageOptions}
            />
          </Stack>
        ),
      },
      {
        type: 'custom',
        key: 'fallback_metadata_language',
        visible: (context) => !context.metadataFollowUi,
        render: () => (
          <Stack indent="2xl">
            <SettingsSelectField
              field="fallback_metadata_language"
              label={t('settingsPage.sections.advancedLanguage.fallbackMetadataLanguage')}
              hint={t('settingsPage.sections.advancedLanguage.fallbackMetadataLanguageHint')}
              options={metadataLanguageOptions}
            />
          </Stack>
        ),
      },
      {
        type: 'switch',
        field: 'follow_app_language_for_naming',
        id: 'follow_app_language_for_naming',
        hint: t('settingsPage.sections.advancedLanguage.targetFollowsUiHint'),
        children: t('settingsPage.sections.advancedLanguage.targetFollowsUi'),
      },
      {
        type: 'custom',
        key: 'default_target_language',
        visible: (context) => !context.targetFollowUi,
        render: () => (
          <Stack indent="2xl">
            <SettingsSelectField
              field="default_target_language"
              label={t('settingsPage.sections.advancedLanguage.targetLanguage')}
              hint={t('settingsPage.sections.advancedLanguage.targetLanguageHint')}
              options={targetLanguageOptions}
            />
          </Stack>
        ),
      },
      {
        type: 'custom',
        key: 'sync_language_button_container',
        render: () => (
          <Inline align="center" justify="end">
            <Button
              variant="secondary"
              type="button"
              onClick={onSyncLanguage}
              disabled={isSyncing}
            >
              {t('settingsPage.languageChangeInfo.syncButton')}
            </Button>
          </Inline>
        ),
      },
    ],
  };
}

export function createAdvancedAdultSceneDetectionSection(t) {
  return {
    title: t('settingsPage.sections.scenes.scanTitle'),
    eyebrow: t('settingsPage.sections.scenes.scanEyebrow'),
    items: [
      {
        type: 'text',
        field: 'adult_min_video_size_mb',
        label: t('settingsPage.sections.scenes.minVideoSizeMb'),
        hint: t('settingsPage.sections.scenes.minVideoSizeMbHint'),
        inputType: 'number',
        min: '0',
        step: '0.1',
      },
      {
        type: 'text',
        field: 'adult_min_video_duration_minutes',
        label: t('settingsPage.sections.scenes.minVideoDurationMinutes'),
        hint: t('settingsPage.sections.scenes.minVideoDurationMinutesHint'),
        inputType: 'number',
        min: '0',
        step: '0.05',
      },
      {
        type: 'text',
        field: 'fansdb_adult_min_video_duration_minutes',
        label: t('settingsPage.sections.scenes.fansdbMinVideoDurationMinutes'),
        hint: t('settingsPage.sections.scenes.fansdbMinVideoDurationMinutesHint'),
        inputType: 'number',
        min: '0',
        step: '0.05',
      },
    ],
  };
}
