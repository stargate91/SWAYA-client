import { useSettingsViewContext, useSettingsField } from '../SettingsFormContext.jsx';
import Card from '@/ui/Card';
import SelectableCard from '@/ui/SelectableCard';
import Stack from '@/ui/Stack';
import Grid from '@/ui/Grid';
import Inline from '@/ui/Inline';
import Text from '@/ui/Text';
import Radio from '@/ui/Radio';

const THEME_LIST = [
  { value: 'dark', translationKey: 'dynamic.themeOptions.dark' },
  { value: 'swaya-legacy', translationKey: 'dynamic.themeOptions.swayaLegacy' },
  { value: 'tokyo-night', translationKey: 'dynamic.themeOptions.tokyoNight' },
  { value: 'dracula', translationKey: 'dynamic.themeOptions.dracula' },
  { value: 'gruvbox-dark', translationKey: 'dynamic.themeOptions.gruvboxDark' },
  { value: 'nord', translationKey: 'dynamic.themeOptions.nord' },
  { value: 'rose-pine', translationKey: 'dynamic.themeOptions.rosePine' },
  { value: 'premium-carbon', translationKey: 'dynamic.themeOptions.premiumCarbon' },
  { value: 'amoled-modern', translationKey: 'dynamic.themeOptions.amoledModern' },
  { value: 'pine-forest', translationKey: 'dynamic.themeOptions.pineForest' },
  { value: 'classic-dark', translationKey: 'dynamic.themeOptions.classicDark' },
  { value: 'bladerunner-la', translationKey: 'dynamic.themeOptions.bladerunnerLA' },
  { value: 'bladerunner-2049', translationKey: 'dynamic.themeOptions.bladerunner2049' },
  { value: 'cyberpunk-dark', translationKey: 'dynamic.themeOptions.cyberpunkDark' },
  { value: 'matrix-code', translationKey: 'dynamic.themeOptions.matrixCode' },
  { value: 'synthwave-outrun', translationKey: 'dynamic.themeOptions.synthwaveOutrun' },
  { value: 'alien-nostromo', translationKey: 'dynamic.themeOptions.alienNostromo' },
  { value: 'cyberdyne-steel', translationKey: 'dynamic.themeOptions.cyberdyneSteel' },
  { value: 'cyber-renaissance', translationKey: 'dynamic.themeOptions.cyberRenaissance' },
  { value: 'eva-unit-01', translationKey: 'dynamic.themeOptions.evaUnit01' },
  { value: 'lcars-console', translationKey: 'dynamic.themeOptions.lcarsConsole' },
  { value: 'cyber-stealth', translationKey: 'dynamic.themeOptions.cyberStealth' },
  { value: 'midnight-tokyo', translationKey: 'dynamic.themeOptions.midnightTokyo' },
  { value: 'vaporwave-dream', translationKey: 'dynamic.themeOptions.vaporwaveDream' },
  { value: 'sakura-neon', translationKey: 'dynamic.themeOptions.sakuraNeon' },
  { value: 'disco-glam', translationKey: 'dynamic.themeOptions.discoGlam' },
  { value: 'midnight-amber', translationKey: 'dynamic.themeOptions.midnightAmber' },
  { value: 'ruby-velvet', translationKey: 'dynamic.themeOptions.rubyVelvet' },
  { value: 'solarized-dark', translationKey: 'dynamic.themeOptions.solarizedDark' },
  { value: 'hot-red', translationKey: 'dynamic.themeOptions.hotRed' }
];

export default function ThemeTab() {
  const { t } = useSettingsViewContext();
  const { value: currentTheme, onChange } = useSettingsField('ui_theme');

  return (
    <Card
      title={t('settingsPage.sections.theme.title')}
      eyebrow={t('settingsPage.sections.theme.eyebrow')}
    >
      <Stack gap="xl">
        <Text variant="small" color="secondary">
          {t('settingsPage.sections.theme.hint') || 'Choose how the app should look.'}
        </Text>

        <Grid variant="auto-card">
          {THEME_LIST.map((theme) => {
            const isActive = currentTheme === theme.value;
            const label = t(theme.translationKey) || theme.value;

            return (
              <SelectableCard
                key={theme.value}
                selected={isActive}
                variant="theme"
                onClick={() => {
                  if (onChange) {
                    onChange({ target: { value: theme.value } });
                  }
                }}
              >
                <Inline align="center" justify="between" wrap={false} fullWidth>
                  <Text variant="body" weight="semibold" color="primary" truncate>
                    {label}
                  </Text>
                  <Radio checked={isActive} tabIndex={-1} readOnly aria-hidden />
                </Inline>
              </SelectableCard>
            );
          })}
        </Grid>
      </Stack>
    </Card>
  );
}
