export function createApiTmdbSection(t) {
  return {
    title: t('settingsPage.sections.api.tmdbHeader'),
    eyebrow: t('settingsPage.sections.api.eyebrow'),
    gap: 'xl',
    items: [
      {
        type: 'text',
        field: 'tmdb_api_key',
        label: t('settingsPage.sections.api.tmdbKey'),
        placeholder: t('settingsPage.sections.api.tmdbKeyPlaceholder'),
        inputType: 'password',
      },
      {
        type: 'text',
        field: 'tmdb_bearer_token',
        label: t('settingsPage.sections.api.tmdbToken'),
        placeholder: t('settingsPage.sections.api.tmdbTokenPlaceholder'),
        inputType: 'password',
      },
    ],
  };
}

export function createApiOmdbSection(t) {
  return {
    title: t('settingsPage.sections.api.omdbHeader'),
    eyebrow: t('settingsPage.sections.api.eyebrow'),
    gap: 'xl',
    items: [
      {
        type: 'text',
        field: 'omdb_api_key',
        label: t('settingsPage.sections.api.omdbKey'),
        placeholder: t('settingsPage.sections.api.omdbKeyPlaceholder'),
        inputType: 'password',
      },
    ],
  };
}
