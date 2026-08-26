import Inline from '@/ui/Inline';
import Badge from '@/ui/Badge';
import { PROVIDER_ENDPOINTS } from '@/lib/providerAvailability';

export function createAdultGeneralSection(t, adultGenderPreferenceOptions) {
  return {
    title: t('settingsPage.sections.adult.title'),
    eyebrow: t('settingsPage.sections.adult.eyebrow'),
    items: [
      {
        type: 'switch',
        field: 'include_adult',
        id: 'include_adult',
        hint: t('settingsPage.sections.adult.includeAdultHint'),
        children: (
          <Inline gap="sm" align="center" className="settings-inline-switch">
            <span>{t('settingsPage.sections.adult.includeAdult')}</span>
            <Badge family="adult" tone="danger">
              {t('settingsPage.sections.adult.eighteenPlus')}
            </Badge>
          </Inline>
        ),
      },
      {
        type: 'select',
        field: 'adult_gender_preference',
        label: t('settingsPage.sections.adult.adultGenderPreference'),
        hint: t('settingsPage.sections.adult.adultGenderPreferenceHint'),
        options: adultGenderPreferenceOptions,
        visible: (context) => Boolean(context.include_adult),
      },
    ],
  };
}

export function createAdultStashdbSection(t) {
  return {
    title: t('settingsPage.sections.stashdb.title'),
    eyebrow: t('settingsPage.sections.stashdb.eyebrow'),
    gap: 'xl',
    items: [
      {
        type: 'text',
        field: 'stashdb_api_key',
        label: t('settingsPage.sections.stashdb.apiKey'),
        hint: t('settingsPage.sections.stashdb.apiKeyHint'),
        placeholder: "API Key...",
        inputType: 'password',
      },
      {
        type: 'text',
        field: 'stashdb_endpoint',
        label: t('settingsPage.sections.stashdb.endpoint'),
        hint: t('settingsPage.sections.stashdb.endpointHint'),
        placeholder: PROVIDER_ENDPOINTS.STASHDB,
      },
    ],
  };
}

export function createAdultFansdbSection(t) {
  return {
    title: t('settingsPage.sections.fansdb.title'),
    eyebrow: t('settingsPage.sections.fansdb.eyebrow'),
    gap: 'xl',
    items: [
      {
        type: 'text',
        field: 'fansdb_api_key',
        label: t('settingsPage.sections.fansdb.apiKey'),
        hint: t('settingsPage.sections.fansdb.apiKeyHint'),
        placeholder: "API Key...",
        inputType: 'password',
      },
      {
        type: 'text',
        field: 'fansdb_endpoint',
        label: t('settingsPage.sections.fansdb.endpoint'),
        hint: t('settingsPage.sections.fansdb.endpointHint'),
        placeholder: PROVIDER_ENDPOINTS.FANSDB,
      },
    ],
  };
}

export function createAdultTheporndbSection(t) {
  return {
    title: t('settingsPage.sections.theporndb.title'),
    eyebrow: t('settingsPage.sections.theporndb.eyebrow'),
    gap: 'xl',
    items: [
      {
        type: 'text',
        field: 'theporndb_api_key',
        label: t('settingsPage.sections.theporndb.apiKey'),
        hint: t('settingsPage.sections.theporndb.apiKeyHint'),
        placeholder: "API Key...",
        inputType: 'password',
      },
      {
        type: 'text',
        field: 'theporndb_endpoint',
        label: t('settingsPage.sections.theporndb.endpoint'),
        hint: t('settingsPage.sections.theporndb.endpointHint'),
        placeholder: PROVIDER_ENDPOINTS.THEPORNDB,
      },
    ],
  };
}

export function createAdultPreviewsSection(t) {
  return {
    title: t('settingsPage.sections.adultPreviews.title') || 'Hover Previews',
    eyebrow: t('settingsPage.sections.adultPreviews.eyebrow') || 'PREVIEWS',
    items: [
      {
        type: 'switch',
        field: 'hover_previews_enabled',
        id: 'hover_previews_enabled',
        children: (
          <span>{t('settingsPage.sections.adultPreviews.enable') || 'Enable Hover Previews'}</span>
        ),
      },
      {
        type: 'select',
        field: 'hover_previews_delay',
        label: t('settingsPage.sections.adultPreviews.delay') || 'Hover Delay',
        options: [
          { value: 200, label: '200 ms' },
          { value: 300, label: '300 ms' },
          { value: 400, label: '400 ms' },
          { value: 500, label: '500 ms' },
          { value: 600, label: '600 ms' },
          { value: 800, label: '800 ms' },
          { value: 1000, label: '1.0 s' },
          { value: 1200, label: '1.2 s' },
        ],
        visible: (context) => Boolean(context.hover_previews_enabled),
      },
      {
        type: 'select',
        field: 'hover_previews_duration',
        label: t('settingsPage.sections.adultPreviews.duration') || 'Clip Duration',
        options: [
          { value: 8, label: '8 seconds' },
          { value: 12, label: '12 seconds' },
          { value: 16, label: '16 seconds' },
          { value: 20, label: '20 seconds' },
          { value: 24, label: '24 seconds' },
        ],
        visible: (context) => Boolean(context.hover_previews_enabled),
      },
      {
        type: 'select',
        field: 'previews_cache_max_size_mb',
        label: t('settingsPage.sections.adultPreviews.cacheSize') || 'Max Cache Size',
        options: [
          { value: 500, label: '500 MB' },
          { value: 1024, label: '1 GB' },
          { value: 2048, label: '2 GB' },
          { value: 5120, label: '5 GB' },
          { value: 10240, label: '10 GB' },
          { value: -1, label: 'Unlimited' },
        ],
        visible: (context) => Boolean(context.hover_previews_enabled),
      },
      {
        type: 'select',
        field: 'previews_cache_max_age_days',
        label: t('settingsPage.sections.adultPreviews.cacheAge') || 'Max Cache Age',
        options: [
          { value: 7, label: '7 days' },
          { value: 14, label: '14 days' },
          { value: 30, label: '30 days' },
          { value: 90, label: '90 days' },
          { value: -1, label: 'Unlimited' },
        ],
        visible: (context) => Boolean(context.hover_previews_enabled),
      },
    ],
  };
}
