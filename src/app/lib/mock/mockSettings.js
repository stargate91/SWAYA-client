import {
  EXTRAS_FOLDER_MODES,
  FOLDER_COLLECTION_MODES,
  SETTINGS_PRESET_IDS,
  PROVIDER_ENDPOINTS
} from '../settingsConstants';

/**
 * Complete, faithful Mock Settings representing the real SWAYA desktop application defaults.
 */
export const MOCK_SETTINGS = {
  // 1. User Profile & Lifecycle
  user_name: 'SWAYA Fan',
  avatar_path: '/avatars/avatar_1.webp',
  onboarding_completed: true,
  close_button_behavior: 'minimize',

  // 2. Library Base Folders
  default_scan_dir: 'C:\\Downloads\\Incoming',
  folder_library_path: 'D:\\Media\\Library',
  folder_adult_library_path: 'D:\\Media\\AdultLibrary',

  // 3. Organization Engine & Rules
  folder_organization_enabled: true,
  folder_move_to_library: true,
  folder_sort_by_type: true,
  folder_remove_empty: true,
  custom_organization_enabled: true,
  organization_preset: SETTINGS_PRESET_IDS.PLEX || 'plex',
  collision_strategy: 'keep_both',
  collision_duration_tolerance_seconds: '10',
  naming_filename_casing: 'default',
  naming_word_separator: 'space',
  naming_custom_tag: 'default',
  naming_video_exts: '.mkv, .mp4, .avi, .m4v, .mov, .wmv, .mpg, .mpeg',

  // 4. Movies Folder & Naming Rules
  folder_movies_name: 'Movies',
  folder_create_movie_subdir: true,
  folder_movie_template: '{title} ({year})',
  naming_movie_template: '{title} ({year}) {resolution}',
  min_video_size_mb: '50',
  min_video_duration_minutes: '12',
  folder_create_collection_dir: true,
  folder_collection_mode: FOLDER_COLLECTION_MODES.THRESHOLD || 'threshold',
  folder_collection_threshold: '3',
  folder_collection_template: '{collection}',

  // 5. TV Shows Folder & Naming Rules
  folder_tv_name: 'TV Shows',
  folder_create_show_dir: true,
  folder_tv_template: '{tv_title} ({year_range})',
  folder_create_season_dir: true,
  folder_season_template: 'Season {season}',
  folder_create_episode_dir: false,
  folder_episode_template: '{tv_title} - {season}{episode}',
  naming_episode_template: '{tv_title} - S{season}E{episode} - {episode_title}',
  tv_min_video_size_mb: '30',
  tv_min_video_duration_minutes: '5',
  folder_create_video_subdir: true,
  folder_videos_name: 'Videos',

  // 6. Adult / NSFW Media Structure & Scraper Rules
  include_adult: true,
  adult_gender_preference: 'female',
  folder_adult_name: 'Adult',
  naming_adult_subfolders_enabled: true,
  folder_adult_movies_name: 'Movies',
  folder_adult_tv_name: 'TV Shows',
  folder_adult_scenes_name: 'Scenes',
  folder_adult_videos_name: 'Videos',
  folder_adult_movie_template: '{studio}/{title} ({year})',
  naming_adult_movie_template: '{studio} - {title} ({year})',
  folder_adult_tv_template: '{studio}/{title}',
  folder_adult_season_template: 'Season {season}',
  naming_adult_episode_template: '{studio} - {title} - S{season}E{episode}',
  scene_grouping_mode: 'parent_studio_studio',
  folder_create_scene_subdir: true,
  folder_scene_template: '{date} - {title}',
  naming_scene_template: '{studio} - {date} - {performers} - {title} [{resolution}]',
  naming_scene_date_format: '%Y-%m-%d',
  naming_scene_prevent_title_performer: true,
  scene_tag_limit: '0',
  scene_tag_separator: ' ',
  scene_tag_blacklist: '',
  naming_squeeze_studio_names: false,
  naming_performer_limit: '3',
  naming_performer_limit_keep: true,
  naming_performer_splitchar: ' & ',
  naming_performer_gender_filter: 'all',
  naming_performer_sort: 'popularity',
  adult_min_video_size_mb: '1',
  adult_min_video_duration_minutes: '1.0',
  fansdb_adult_min_video_duration_minutes: '0.14',
  adult_tag_blacklist: '',
  adult_stashdb_focus_tag: '',
  adult_fansdb_focus_tag: '',
  scenes_scraper_order: 'stashdb,fansdb,theporndb',

  // 7. Extras & Ancillary Assets Handling
  extras_enabled: true,
  extras_folder_mode: EXTRAS_FOLDER_MODES.SUBFOLDER || 'subfolder',
  extras_subfolder_name: 'Extras',
  extras_video_action: 'rename',
  extras_sub_action: 'rename',
  extras_audio_action: 'rename',
  extras_img_action: 'rename',
  extras_meta_action: 'rename',
  extras_sub_exts: '.srt, .sub, .ass, .ssa, .vtt',
  extras_audio_exts: '.mka, .ac3, .dts, .mp3, .flac, .wav, .m4a',
  extras_img_exts: '.jpg, .jpeg, .png, .gif, .bmp, .webp',
  extras_meta_exts: '.nfo, .xml, .txt',
  extras_video_template: '{parent_name}-{sub_category}',
  extras_sub_template: '{parent_name}.{language}',
  extras_audio_template: '{parent_name}.{language}',
  extras_img_template: '{sub_category}',
  extras_meta_template: '{parent_name}',

  // 8. Player Engine & Audio/Subtitle Rules
  preferred_player: 'swaya',
  vlc_path: '',
  mpc_path: '',
  player_preferred_audio_language: 'none',
  player_preferred_subtitle_language: 'none',
  player_subtitle_mode: 'off_with_matching_audio',

  // 9. Language & Localization
  ui_language: 'en',
  follow_app_language_for_media_library: true,
  follow_app_language_for_naming: true,
  primary_metadata_language: 'en-US',
  fallback_metadata_language: 'en-US',
  default_target_language: 'en',

  // 10. Theme
  ui_theme: 'dark',

  // 11. API Metadata Providers
  tmdb_api_key: 'mock_tmdb_key',
  tmdb_bearer_token: 'mock_tmdb_token',
  omdb_api_key: 'mock_omdb_key',
  stashdb_api_key: 'mock_stashdb_key',
  fansdb_api_key: 'mock_fansdb_key',
  theporndb_api_key: 'mock_theporndb_key',
  theporndb_api_token: 'mock_theporndb_token',
  stashdb_endpoint: PROVIDER_ENDPOINTS.STASHDB || 'https://stashdb.org/graphql',
  fansdb_endpoint: PROVIDER_ENDPOINTS.FANSDB || 'https://fansdb.cc/graphql',
  theporndb_endpoint: PROVIDER_ENDPOINTS.THEPORNDB || 'https://theporndb.net/graphql',

  // 12. Hover Video Previews & Storage Cache
  hover_previews_enabled: true,
  hover_previews_delay: 800,
  hover_previews_duration: 16,
  previews_cache_max_size_mb: 2048,
  previews_cache_max_age_days: 30,

  // 13. Torrent & Downloader Integration
  torrent_enabled: true,
  torrent_download_dir: 'D:\\Downloads\\Torrents',
  torrent_qbittorrent_port: '8080',
  torrent_qbittorrent_user: 'admin',
  torrent_qbittorrent_pass: 'adminadmin',
};
