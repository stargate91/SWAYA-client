import { isNsfwMode, SESSION_MODES } from '@/stores/useLibraryModeStore';

export const PROVIDER_ENDPOINTS = Object.freeze({
  STASHDB: 'https://stashdb.org/graphql',
  FANSDB: 'https://fansdb.cc/graphql',
  THEPORNDB: 'https://theporndb.net/graphql',
});

export const PROVIDER_URLS = Object.freeze({
  TMDB: 'https://www.themoviedb.org',
  STASHDB: 'https://stashdb.org',
  FANSDB: 'https://fansdb.cc',
  THEPORNDB: 'https://theporndb.net',
});

export const hasProviderCredential = (settings, provider) => {
  if (!settings || typeof settings !== 'object') return false;

  if (provider === 'tmdb') {
    return Boolean(String(settings.tmdb_api_key || settings.tmdb_bearer_token || '').trim());
  }

  if (provider === 'theporndb') {
    return Boolean(String(settings.theporndb_api_key || settings.theporndb_api_token || '').trim());
  }

  if (provider === 'stashdb') {
    return Boolean(String(settings.stashdb_api_key || '').trim());
  }

  if (provider === 'fansdb') {
    return Boolean(String(settings.fansdb_api_key || '').trim());
  }

  return false;
};

export const getOrganizerScanModes = (settings, sessionMode = SESSION_MODES.SFW, t = null) => {
  const translate = (key, fallback) => (typeof t === 'function' ? (t(key) || fallback) : fallback);

  const hasTmdb = hasProviderCredential(settings, 'tmdb');
  const hasThePornDb = hasProviderCredential(settings, 'theporndb');
  const hasStashDb = hasProviderCredential(settings, 'stashdb');
  const hasFansDb = hasProviderCredential(settings, 'fansdb');

  const moviesDisabled = isNsfwMode(sessionMode)
    ? (!hasTmdb && !hasThePornDb)
    : !hasTmdb;
  const tvDisabled = !hasTmdb;
  const scenesDisabled = !hasStashDb && !hasThePornDb && !hasFansDb;

  const modes = [
    { value: 'movies', label: translate('organizer.scanModes.movies', 'Movies'), disabled: moviesDisabled },
    { value: 'tv', label: translate('organizer.scanModes.tv', 'TV Shows'), disabled: tvDisabled },
  ];

  if (settings?.include_adult && isNsfwMode(sessionMode)) {
    modes.push({
      value: 'scenes',
      label: translate('organizer.scanModes.scenes', 'Scenes'),
      disabled: scenesDisabled,
    });
  }

  modes.push({
    value: 'offline',
    label: translate('organizer.scanModes.offline', 'Offline'),
    disabled: false,
  });

  return modes;
};

export const getOrganizerProviderOptions = (scanMode, settings, sessionMode = SESSION_MODES.SFW) => {
  if (scanMode === 'offline') {
    return [];
  }

  if (scanMode === 'scenes') {
    return [
      { value: 'stashdb', label: 'StashDB', disabled: !hasProviderCredential(settings, 'stashdb') },
      { value: 'theporndb', label: 'ThePornDB', disabled: !hasProviderCredential(settings, 'theporndb') },
      { value: 'fansdb', label: 'FansDB', disabled: !hasProviderCredential(settings, 'fansdb') },
    ];
  }

  if (scanMode === 'movies' && isNsfwMode(sessionMode)) {
    return [
      { value: 'tmdb', label: 'TMDb', disabled: !hasProviderCredential(settings, 'tmdb') },
      { value: 'theporndb', label: 'ThePornDB', disabled: !hasProviderCredential(settings, 'theporndb') },
    ];
  }

  // movies and tv scan modes in SFW or tv scan mode in NSFW should only use tmdb (mainstream metadata), not theporndb
  return [
    { value: 'tmdb', label: 'TMDb', disabled: !hasProviderCredential(settings, 'tmdb') },
  ];
};

export const getFirstEnabledProvider = (options, fallback = null) => {
  const fallbackOption = options.find((option) => option.value === fallback && !option.disabled);
  if (fallbackOption) return fallbackOption.value;
  return options.find((option) => !option.disabled)?.value || fallback || options[0]?.value || null;
};
