import { useState, useMemo, useRef, useEffect } from 'react';
import {
  getFirstEnabledProvider,
  getOrganizerProviderOptions,
  getOrganizerScanModes,
} from '@/lib/providerAvailability';
import { isSfwMode } from '@/stores/useLibraryModeStore';

export function useOrganizerRuleSync({
  settings,
  sessionMode,
  t,
}) {
  const scanModeOptions = useMemo(
    () => getOrganizerScanModes(settings, sessionMode, t),
    [settings, sessionMode, t]
  );

  const [scanMode, setScanMode] = useState(() => {
    const defaultMode = 'movies';
    const moviesOption = scanModeOptions.find((o) => o.value === defaultMode);
    if (moviesOption && !moviesOption.disabled) {
      return defaultMode;
    }
    const firstEnabled = scanModeOptions.find((o) => !o.disabled);
    return firstEnabled ? firstEnabled.value : defaultMode;
  });

  // Adjust scanMode if the current option becomes disabled or invalid due to settings changes
  const [prevScanModeOptions, setPrevScanModeOptions] = useState(scanModeOptions);
  if (scanModeOptions !== prevScanModeOptions) {
    setPrevScanModeOptions(scanModeOptions);
    const currentOption = scanModeOptions.find((option) => option.value === scanMode);
    if (!currentOption || currentOption.disabled) {
      const firstEnabled = scanModeOptions.find((option) => !option.disabled);
      if (firstEnabled) {
        setScanMode(firstEnabled.value);
      }
    }
  }

  const [provider, setProvider] = useState('tmdb');
  const providerOptions = useMemo(
    () => getOrganizerProviderOptions(scanMode, settings, sessionMode),
    [scanMode, settings, sessionMode]
  );

  const [prevScanMode, setPrevScanMode] = useState(scanMode);
  const [prevProviderOptions, setPrevProviderOptions] = useState(providerOptions);
  const [prevSessionMode, setPrevSessionMode] = useState(sessionMode);

  if (prevScanMode !== scanMode || prevProviderOptions !== providerOptions || prevSessionMode !== sessionMode) {
    setPrevScanMode(scanMode);
    setPrevProviderOptions(providerOptions);
    setPrevSessionMode(sessionMode);
    const fallbackProvider = scanMode === 'scenes' ? 'stashdb' : 'tmdb';
    if (isSfwMode(sessionMode) && scanMode !== 'scenes') {
      setProvider('tmdb');
    } else {
      setProvider((current) => getFirstEnabledProvider(providerOptions, current || fallbackProvider));
    }
  }

  const organizerRuleSignature = useMemo(() => {
    if (!settings) return '';
    return JSON.stringify({
      collision_strategy: settings.collision_strategy || 'keep_both',
      collision_duration_tolerance_seconds: settings.collision_duration_tolerance_seconds || '10',
      naming_filename_casing: settings.naming_filename_casing || 'default',
      naming_word_separator: settings.naming_word_separator || 'space',
      naming_movie_template: settings.naming_movie_template || '',
      naming_episode_template: settings.naming_episode_template || '',
      naming_custom_tag: settings.naming_custom_tag || '',
      naming_video_exts: settings.naming_video_exts || '',
      folder_organization_enabled: settings.folder_organization_enabled !== false,
      folder_move_to_library: settings.folder_move_to_library !== false,
      folder_sort_by_type: settings.folder_sort_by_type !== false,
      folder_movies_name: settings.folder_movies_name || '',
      folder_tv_name: settings.folder_tv_name || '',
      folder_videos_name: settings.folder_videos_name || '',
      folder_adult_name: settings.folder_adult_name || '',
      naming_adult_subfolders_enabled: settings.naming_adult_subfolders_enabled !== false,
      folder_adult_movies_name: settings.folder_adult_movies_name || '',
      folder_adult_tv_name: settings.folder_adult_tv_name || '',
      folder_adult_scenes_name: settings.folder_adult_scenes_name || '',
      folder_adult_videos_name: settings.folder_adult_videos_name || '',
      naming_scene_template: settings.naming_scene_template || '',
      naming_scene_date_format: settings.naming_scene_date_format || '',
      naming_scene_prevent_title_performer: settings.naming_scene_prevent_title_performer !== false,
      scene_tag_limit: settings.scene_tag_limit ?? 0,
      scene_tag_separator: settings.scene_tag_separator ?? ' ',
      scene_tag_blacklist: settings.scene_tag_blacklist || '',
      naming_squeeze_studio_names: Boolean(settings.naming_squeeze_studio_names),
      naming_performer_limit: settings.naming_performer_limit || '3',
      naming_performer_limit_keep: Boolean(settings.naming_performer_limit_keep),
      naming_performer_splitchar: settings.naming_performer_splitchar || '',
      naming_performer_gender_filter: settings.naming_performer_gender_filter || 'all',
      naming_performer_sort: settings.naming_performer_sort || 'order',
      scene_grouping_mode: settings.scene_grouping_mode || 'none',
      folder_scene_template: settings.folder_scene_template || '',
      folder_create_movie_subdir: settings.folder_create_movie_subdir !== false,
      folder_movie_template: settings.folder_movie_template || '',
      folder_create_show_dir: settings.folder_create_show_dir !== false,
      folder_tv_template: settings.folder_tv_template || '',
      folder_create_video_subdir: settings.folder_create_video_subdir !== false,
      folder_create_season_dir: settings.folder_create_season_dir !== false,
      folder_season_template: settings.folder_season_template || '',
      folder_create_episode_dir: Boolean(settings.folder_create_episode_dir),
      folder_episode_template: settings.folder_episode_template || '',
      folder_remove_empty: settings.folder_remove_empty !== false,
      folder_create_collection_dir: settings.folder_create_collection_dir !== false,
      folder_collection_mode: settings.folder_collection_mode || '',
      folder_collection_threshold: settings.folder_collection_threshold || '',
      folder_collection_template: settings.folder_collection_template || '',
      extras_enabled: settings.extras_enabled !== false,
      extras_folder_mode: settings.extras_folder_mode || '',
      extras_subfolder_name: settings.extras_subfolder_name || '',
      extras_video_action: settings.extras_video_action || 'rename',
      extras_sub_action: settings.extras_sub_action || 'rename',
      extras_audio_action: settings.extras_audio_action || 'rename',
      extras_img_action: settings.extras_img_action || 'rename',
      extras_meta_action: settings.extras_meta_action || 'rename',
      extras_video_template: settings.extras_video_template || '',
      extras_sub_template: settings.extras_sub_template || '',
      extras_audio_template: settings.extras_audio_template || '',
      extras_img_template: settings.extras_img_template || '',
      extras_meta_template: settings.extras_meta_template || '',
      include_adult: Boolean(settings.include_adult),
    });
  }, [settings]);

  return {
    scanMode,
    setScanMode,
    scanModeOptions,
    provider,
    setProvider,
    providerOptions,
    organizerRuleSignature,
  };
}

export function useOrganizerSettingsRefresh({
  organizerRuleSignature,
  organizerQueryData,
  isScanActive,
  refreshOrganizer,
}) {
  const previousRuleSignatureRef = useRef(null);

  useEffect(() => {
    if (previousRuleSignatureRef.current === organizerRuleSignature) {
      return;
    }

    previousRuleSignatureRef.current = organizerRuleSignature;

    if (!organizerQueryData || isScanActive) {
      return;
    }

    if (typeof refreshOrganizer === 'function') {
      refreshOrganizer();
    }
  }, [organizerQueryData, isScanActive, organizerRuleSignature, refreshOrganizer]);
}
