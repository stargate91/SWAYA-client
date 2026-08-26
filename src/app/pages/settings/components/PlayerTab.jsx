import { useMemo } from 'react';
import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import { useSettingsViewContext } from '../SettingsFormContext.jsx';
import SettingsPathField from './fields/SettingsPathField.jsx';
import SettingsSelectField from './fields/SettingsSelectField.jsx';
import { PREFERRED_PLAYER_OPTIONS } from '../config';

export default function PlayerTab() {
  const { t, targetLanguageOptions } = useSettingsViewContext();

  const preferredLangOptions = useMemo(() => [
    { value: 'none', label: t('settingsPage.sections.player.noPreference') || 'No preference' },
    ...targetLanguageOptions
  ], [t, targetLanguageOptions]);

  const subtitleModeOptions = useMemo(() => [
    { value: 'always', label: t('settingsPage.sections.player.subtitleMode.always') || 'Always' },
    { value: 'off_with_matching_audio', label: t('settingsPage.sections.player.subtitleMode.offWithMatchingAudio') || 'Off with matching audio language' },
    { value: 'off', label: t('settingsPage.sections.player.subtitleMode.off') || 'Off' },
  ], [t]);

  return (
    <Stack gap="xl">
      {/* Playback Section */}
      <Card
        title={t('settingsPage.sections.playback.title')}
        eyebrow={t('settingsPage.sections.playback.eyebrow')}
      >
        <Stack>
          <SettingsSelectField
            field="preferred_player"
            label={t('settingsPage.sections.playback.preferredPlayer')}
            hint={t('settingsPage.sections.playback.preferredPlayerHint')}
            options={PREFERRED_PLAYER_OPTIONS}
          />
          <SettingsPathField
            field="vlc_path"
            picker="file"
            t={t}
            label={t('settingsPage.sections.playback.vlcPath')}
            placeholder={t('settingsPage.sections.playback.vlcPlaceholder')}
            buttonLabel={t('settingsPage.sections.playback.browse')}
          />
          <SettingsPathField
            field="mpc_path"
            picker="file"
            t={t}
            label={t('settingsPage.sections.playback.mpcPath')}
            placeholder={t('settingsPage.sections.playback.mpcPlaceholder')}
            buttonLabel={t('settingsPage.sections.playback.browse')}
          />
        </Stack>
      </Card>

      {/* Language Rules Section */}
      <Card
        title={t('settingsPage.sections.player.languageRulesTitle') || 'Player Language Rules'}
        eyebrow={t('settingsPage.sections.player.languageRulesEyebrow') || 'Auto-select preferred audio and subtitle tracks'}
      >
        <Stack>
          <SettingsSelectField
            field="player_preferred_audio_language"
            label={t('settingsPage.sections.player.preferredAudioLanguage') || 'Preferred Audio Language'}
            hint={t('settingsPage.sections.player.preferredAudioLanguageHint') || 'Fallback audio track language when playing files'}
            options={preferredLangOptions}
          />
          <SettingsSelectField
            field="player_preferred_subtitle_language"
            label={t('settingsPage.sections.player.preferredSubtitleLanguage') || 'Preferred Subtitle Language'}
            hint={t('settingsPage.sections.player.preferredSubtitleLanguageHint') || 'Fallback subtitle track language when playing files'}
            options={preferredLangOptions}
          />
          <SettingsSelectField
            field="player_subtitle_mode"
            label={t('settingsPage.sections.player.subtitleModeLabel') || 'Subtitle Activation Mode'}
            hint={t('settingsPage.sections.player.subtitleModeHint') || 'Rule for automatically enabling subtitle tracks'}
            options={subtitleModeOptions}
          />
        </Stack>
      </Card>
    </Stack>
  );
}
