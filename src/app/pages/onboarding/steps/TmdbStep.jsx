import { Key } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import ProviderApiKeyStep from '../components/ProviderApiKeyStep';

export default function TmdbStep({
  tmdbApiKey,
  setTmdbApiKey,
  tmdbBearerToken,
  setTmdbBearerToken,
  tmdbValidation,
  validateTmdb,
  isValidatingApi,
  onOpenDocs,
}) {
  const { t } = useTranslation();

  return (
    <ProviderApiKeyStep
      hero={{
        icon: Key,
        chips: [
          { label: 'Movie Catalog' },
          { label: 'Art Finder' },
          { label: 'Cast Info' },
        ],
        kicker: t('onboarding.tmdbGuide.eyebrow', { defaultValue: 'Metadata Access' }),
        title: t('onboarding.tmdbGuide.activateTmdb', { defaultValue: 'Activate TMDB access' }),
        description: t('onboarding.tmdbGuide.scanningLimitedDesc', { defaultValue: 'SWAYA needs TMDB before scanning can do real metadata matching, artwork lookups, and clean organization.' }),
        footerLabel: t('onboarding.tmdbGuide.helpNeeded', { defaultValue: 'Need help?' }),
        footerDocsText: t('onboarding.tmdbGuide.readDocs', { defaultValue: 'Read the documentation' }),
        items: [
          {
            icon: Key,
            title: t('onboarding.tmdbGuide.requiredOneTimeSetup', { defaultValue: 'One-time setup' }),
            description: t('onboarding.tmdbGuide.scanningLimited', { defaultValue: 'Without TMDb, scanning runs in offline-only mode with basic metadata.' }),
          }
        ],
      }}
      panel={{
        eyebrow: t('onboarding.tmdb.eyebrow') || 'TMDB credentials',
        title: t('onboarding.tmdb.title') || 'Paste your TMDB keys to unlock scanning',
        badgeText: t('onboarding.tmdb.optionalFields', { defaultValue: 'Optional fields' }),
        description: t('onboarding.tmdb.description') || 'You can skip this step or paste your keys and validate them below.',
        footerLabel: t('onboarding.tmdb.offlineScan', { defaultValue: 'Offline Mode' }),
        footerValue: t('onboarding.tmdb.offlineScanActive', { defaultValue: 'Leave empty for local file scanning only' }),
      }}
      fields={[
        {
          label: t('onboarding.tmdb.apiKeyLabel'),
          type: 'text',
          value: tmdbApiKey,
          onChange: (e) => setTmdbApiKey(e.target.value),
          placeholder: t('onboarding.tmdb.apiKeyPlaceholder') || 'Enter TMDB API Key',
        },
        {
          label: t('onboarding.tmdb.readAccessTokenLabel'),
          type: 'text',
          value: tmdbBearerToken,
          onChange: (e) => setTmdbBearerToken(e.target.value),
          placeholder: t('onboarding.tmdb.bearerTokenPlaceholder') || 'Enter TMDB bearer token',
        },
      ]}
      validation={{
        isValidating: isValidatingApi,
        onValidate: validateTmdb,
        validationState: tmdbValidation,
        validateButtonLabel: t('onboarding.tmdb.validateBtn') || 'Validate Credentials',
        validatingButtonLabel: t('onboarding.tmdb.validating') || 'Validating...',
        disabled: !tmdbApiKey && !tmdbBearerToken,
      }}
      helpDocs={{
        needHelpText: t('onboarding.tmdbGuide.needHelpText', { defaultValue: 'Need help finding or generating your TMDb API credentials? Detailed instructions are available in the app settings help section.' }),
        readDocsText: t('onboarding.tmdbGuide.readDocs', { defaultValue: 'Read the documentation →' }),
        onOpenDocs,
      }}
    />
  );
}
