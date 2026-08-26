import Stack from '@/ui/Stack';
import { useSettingsViewContext } from '../SettingsFormContext.jsx';
import GeneralProfileSection from './GeneralProfileSection.jsx';
import GeneralLanguageSection from './GeneralLanguageSection.jsx';
import GeneralCloseBehaviorSection from './GeneralCloseBehaviorSection.jsx';

export default function GeneralTab() {
  const { t } = useSettingsViewContext();

  return (
    <Stack gap="xl">
      <GeneralProfileSection t={t} />
      <GeneralLanguageSection />
      <GeneralCloseBehaviorSection />
    </Stack>
  );
}
