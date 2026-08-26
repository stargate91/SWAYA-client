import { useSettingsViewContext } from '../SettingsFormContext.jsx';
import SettingsSectionRenderer from './SettingsSectionRenderer.jsx';
import { createGeneralCloseBehaviorSection } from '../config';

export default function GeneralCloseBehaviorSection() {
  const { t, closeBehaviorOptions } = useSettingsViewContext();
  return <SettingsSectionRenderer section={createGeneralCloseBehaviorSection(t, closeBehaviorOptions)} />;
}
