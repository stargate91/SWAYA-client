import Stack from '@/ui/Stack';
import InfoBox from '@/ui/InfoBox';
import { Link } from 'react-router-dom';
import { useSettingsField, useSettingsViewContext } from '../SettingsFormContext.jsx';
import SettingsSectionRenderer from './SettingsSectionRenderer.jsx';
import {
  createApiTmdbSection,
  createApiOmdbSection,
  createAdultStashdbSection,
  createAdultFansdbSection,
  createAdultTheporndbSection,
} from '../config';

export default function ApiKeysTab() {
  const { t } = useSettingsViewContext();
  const includeAdultField = useSettingsField('include_adult');
  const context = {
    include_adult: includeAdultField.checked,
    t
  };

  return (
    <Stack gap="xl">
      <InfoBox>
        {t('settingsPage.sections.api.aboutGuideTextBefore', { defaultValue: 'Need help obtaining API keys? Check out the ' })}
        <Link to="/about" state={{ activeTab: 'docs_tmdb' }} className="settings-link">
          {t('settingsPage.sections.api.aboutGuideLink', { defaultValue: 'API Keys Guide' })}
        </Link>
        {t('settingsPage.sections.api.aboutGuideTextAfter', { defaultValue: ' on the About page.' })}
      </InfoBox>
      <SettingsSectionRenderer section={createApiTmdbSection(t)} />
      <SettingsSectionRenderer section={createApiOmdbSection(t)} />
      {includeAdultField.checked && (
        <>
          <SettingsSectionRenderer section={createAdultStashdbSection(t)} context={context} />
          <SettingsSectionRenderer section={createAdultFansdbSection(t)} context={context} />
          <SettingsSectionRenderer section={createAdultTheporndbSection(t)} context={context} />
        </>
      )}
    </Stack>
  );
}
