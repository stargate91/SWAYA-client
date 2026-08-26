import { useMemo } from 'react';
import {
  COLLISION_OPTIONS,
  EXTRA_ACTION_OPTIONS,
  COLLECTION_MODE_OPTIONS,
  EXTRAS_FOLDER_MODE_OPTIONS,
  CASING_OPTIONS,
  SEPARATOR_OPTIONS,
  METADATA_LANGUAGE_OPTIONS,
  TARGET_LANGUAGE_OPTIONS,
} from '../config';

export default function useSettingsOptions(t) {
  const appLanguageOptions = useMemo(() => [
    { value: 'en', label: t('dynamic.languages.en') },
  ], [t]);

  const metadataLanguageOptions = useMemo(() =>
    METADATA_LANGUAGE_OPTIONS.map((o) => ({
      value: o.value,
      label: t(`dynamic.languages.${o.value}`) || o.label,
    })),
    [t]
  );

  const targetLanguageOptions = useMemo(() =>
    TARGET_LANGUAGE_OPTIONS.map((o) => ({
      value: o.value,
      label: t(`dynamic.languages.${o.value}`) || o.label,
    })),
    [t]
  );

  const closeBehaviorOptions = useMemo(() => [
    { value: 'ask', label: t('settingsPage.sections.closeBehavior.options.ask') },
    { value: 'tray', label: t('settingsPage.sections.closeBehavior.options.tray') },
    { value: 'quit', label: t('settingsPage.sections.closeBehavior.options.quit') },
  ], [t]);

  const collisionOptions = useMemo(() =>
    COLLISION_OPTIONS.map((o) => ({
      value: o.value,
      label: t(`dynamic.settingsOptions.collisionOptions.${o.value}`) || o.label,
    })),
    [t]
  );

  const extraActionOptions = useMemo(() =>
    EXTRA_ACTION_OPTIONS.map((o) => ({
      value: o.value,
      label: t(`dynamic.settingsOptions.actionOptions.${o.value}`) || o.label,
    })),
    [t]
  );

  const themeOptions = useMemo(() => [
    { value: 'dark', label: t('dynamic.themeOptions.dark') },
    { value: 'swaya-legacy', label: t('dynamic.themeOptions.swayaLegacy') || 'SWAYA Legacy' },
    { value: 'matrix-code', label: t('dynamic.themeOptions.matrixCode') || 'Matrix Code' },
    { value: 'synthwave-outrun', label: t('dynamic.themeOptions.synthwaveOutrun') || 'Synthwave Outrun' },
    { value: 'alien-nostromo', label: t('dynamic.themeOptions.alienNostromo') || 'Alien Nostromo' },
    { value: 'cyberdyne-steel', label: t('dynamic.themeOptions.cyberdyneSteel') || 'Cyberdyne Steel' },
    { value: 'cyber-renaissance', label: t('dynamic.themeOptions.cyberRenaissance') || 'Cyber Renaissance' },
    { value: 'eva-unit-01', label: t('dynamic.themeOptions.evaUnit01') || 'Eva Unit-01' },
    { value: 'lcars-console', label: t('dynamic.themeOptions.lcarsConsole') || 'LCARS Console' },
    { value: 'cyber-stealth', label: t('dynamic.themeOptions.cyberStealth') || 'Cyber Stealth' },
    { value: 'midnight-tokyo', label: t('dynamic.themeOptions.midnightTokyo') || 'Midnight Tokyo' },
    { value: 'vaporwave-dream', label: t('dynamic.themeOptions.vaporwaveDream') || 'Vaporwave Dream' },
    { value: 'sakura-neon', label: t('dynamic.themeOptions.sakuraNeon') || 'Sakura Neon' },
    { value: 'disco-glam', label: t('dynamic.themeOptions.discoGlam') || 'Disco Glam' },
    { value: 'midnight-amber', label: t('dynamic.themeOptions.midnightAmber') || 'Midnight Amber' },
    { value: 'ruby-velvet', label: t('dynamic.themeOptions.rubyVelvet') || 'Ruby Velvet' },
    { value: 'solarized-dark', label: t('dynamic.themeOptions.solarizedDark') || 'Solarized Dark' },
    { value: 'tokyo-night', label: t('dynamic.themeOptions.tokyoNight') || 'Tokyo Night' },
    { value: 'cyberpunk-dark', label: t('dynamic.themeOptions.cyberpunkDark') || 'Cyberpunk Dark' },
    { value: 'bladerunner-2049', label: t('dynamic.themeOptions.bladerunner2049') || 'Blade Runner 2049 Las Vegas' },
    { value: 'bladerunner-la', label: t('dynamic.themeOptions.bladerunnerLA') || 'Blade Runner 2049 Los Angeles' },
    { value: 'nord', label: t('dynamic.themeOptions.nord') || 'Nord Frost' },
    { value: 'dracula', label: t('dynamic.themeOptions.dracula') || 'Dracula' },
    { value: 'gruvbox-dark', label: t('dynamic.themeOptions.gruvboxDark') || 'Gruvbox Dark' },
    { value: 'pine-forest', label: t('dynamic.themeOptions.pineForest') || 'Pine Forest' },
    { value: 'rose-pine', label: t('dynamic.themeOptions.rosePine') || 'Rosé Pine' },
    { value: 'classic-dark', label: t('dynamic.themeOptions.classicDark') || 'Classic Dark' },
    { value: 'premium-carbon', label: t('dynamic.themeOptions.premiumCarbon') || 'Premium Carbon' },
    { value: 'amoled-modern', label: t('dynamic.themeOptions.amoledModern') || 'Amoled Modern' },
    { value: 'hot-red', label: t('dynamic.themeOptions.hotRed') || 'Hot Red' },
  ], [t]);

  const collectionModeOptions = useMemo(() =>
    COLLECTION_MODE_OPTIONS.map((o) => ({
      value: o.value,
      label: t(`dynamic.settingsOptions.collectionModeOptions.${o.value}`) || o.label,
    })),
    [t]
  );

  const extrasFolderModeOptions = useMemo(() =>
    EXTRAS_FOLDER_MODE_OPTIONS.map((o) => ({
      value: o.value,
      label: t(`dynamic.settingsOptions.folderModeOptions.${o.value}`) || o.label,
    })),
    [t]
  );

  const casingOptions = useMemo(() =>
    CASING_OPTIONS.map((o) => ({
      value: o.value,
      label: t(`dynamic.settingsOptions.casingOptions.${o.value}`) || o.label,
    })),
    [t]
  );

  const separatorOptions = useMemo(() =>
    SEPARATOR_OPTIONS.map((o) => ({
      value: o.value,
      label: t(`dynamic.settingsOptions.separatorOptions.${o.value}`) || o.label,
    })),
    [t]
  );

  const adultGenderPreferenceOptions = useMemo(() => [
    { value: 'all', label: t('settingsPage.sections.adult.adultGenderPreferenceOptions.all') },
    { value: 'female', label: t('settingsPage.sections.adult.adultGenderPreferenceOptions.female') },
    { value: 'male', label: t('settingsPage.sections.adult.adultGenderPreferenceOptions.male') },
  ], [t]);

  const sceneDateFormatOptions = useMemo(() => [
    { value: '%Y-%m-%d', label: t('settingsPage.sections.scenes.dateFormatOptions.yearMonthDayDash') },
    { value: '%Y.%m.%d', label: t('settingsPage.sections.scenes.dateFormatOptions.yearMonthDayDot') },
    { value: '%d-%m-%Y', label: t('settingsPage.sections.scenes.dateFormatOptions.dayMonthYearDash') },
    { value: '%d.%m.%Y', label: t('settingsPage.sections.scenes.dateFormatOptions.dayMonthYearDot') },
    { value: '%Y', label: t('settingsPage.sections.scenes.dateFormatOptions.yearOnly') },
  ], [t]);

  const sceneTagSeparatorOptions = useMemo(() => [
    { value: ' ', label: t('settingsPage.sections.scenes.tagSeparatorOptions.space') },
    { value: ', ', label: t('settingsPage.sections.scenes.tagSeparatorOptions.comma') },
    { value: ' - ', label: t('settingsPage.sections.scenes.tagSeparatorOptions.dash') },
    { value: ' · ', label: t('settingsPage.sections.scenes.tagSeparatorOptions.middleDot') },
    { value: '_', label: t('settingsPage.sections.scenes.tagSeparatorOptions.underscore') },
  ], [t]);

  const sceneGroupingOptions = useMemo(() => [
    { value: 'none', label: t('settingsPage.sections.scenes.groupingOptions.none') },
    { value: 'studio', label: t('settingsPage.sections.scenes.groupingOptions.studio') },
    { value: 'parent_studio', label: t('settingsPage.sections.scenes.groupingOptions.parentStudio') },
    { value: 'parent_studio_studio', label: t('settingsPage.sections.scenes.groupingOptions.parentStudioStudio') },
  ], [t]);

  const scenePerformerSortOptions = useMemo(() => [
    { value: 'order', label: t('settingsPage.sections.scenes.performerSortOptions.order') },
    { value: 'name', label: t('settingsPage.sections.scenes.performerSortOptions.name') },
    { value: 'popularity', label: t('settingsPage.sections.scenes.performerSortOptions.popularity') },
  ], [t]);

  const scenePerformerGenderOptions = useMemo(() => [
    { value: 'all', label: t('settingsPage.sections.scenes.performerGenderOptions.all') },
    { value: 'female', label: t('settingsPage.sections.scenes.performerGenderOptions.female') },
    { value: 'male', label: t('settingsPage.sections.scenes.performerGenderOptions.male') },
  ], [t]);

  return {
    appLanguageOptions,
    metadataLanguageOptions,
    targetLanguageOptions,
    closeBehaviorOptions,
    collisionOptions,
    extraActionOptions,
    themeOptions,
    collectionModeOptions,
    extrasFolderModeOptions,
    casingOptions,
    separatorOptions,
    adultGenderPreferenceOptions,
    sceneDateFormatOptions,
    sceneTagSeparatorOptions,
    sceneGroupingOptions,
    scenePerformerSortOptions,
    scenePerformerGenderOptions,
  };
}
