import { Key } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import ProviderApiKeyStep from '../components/ProviderApiKeyStep';

export default function OmdbStep({
  omdbApiKey,
  setOmdbApiKey,
  omdbValidation,
  validateOmdb,
  isValidatingApi,
  onOpenDocs,
}) {
  const { t } = useTranslation();

  return (
    <ProviderApiKeyStep
      hero={{
        icon: Key,
        chips: [
          { label: 'Score Card' },
          { label: 'Review Radar' },
          { label: 'Tomato Meter' },
        ],
        kicker: t('onboarding.omdbGuide.eyebrow', { defaultValue: 'Ratings Integration' }),
        title: t('onboarding.omdbGuide.ratingsPurpose', { defaultValue: 'Activate OMDb ratings' }),
        description: t('onboarding.omdbGuide.ratingsPurposeDesc', { defaultValue: 'SWAYA uses OMDb for IMDb, Metascore, and Rotten Tomatoes ratings during enrichment.' }),
        footerLabel: t('onboarding.omdbGuide.helpNeeded', { defaultValue: 'Need help?' }),
        footerDocsText: t('onboarding.omdbGuide.readDocs', { defaultValue: 'Read the documentation' }),
        items: [
          {
            icon: Key,
            title: t('onboarding.omdbGuide.ratingsPurpose', { defaultValue: 'Ratings & Scores' }),
            description: t('onboarding.omdbGuide.ratingsMetricsDesc', { defaultValue: 'These ratings are displayed on detail pages for movies and shows.' }),
          }
        ],
      }}
      panel={{
        eyebrow: t('onboarding.omdb.eyebrow') || 'OMDb key',
        title: t('onboarding.omdb.title') || 'Paste your OMDb key to unlock ratings',
        badgeText: t('onboarding.omdb.optionalField', { defaultValue: 'Optional field' }),
        description: t('onboarding.omdb.description') || 'This key is used before SWAYA can enrich items with ratings data.',
        footerLabel: t('onboarding.omdb.offlineScan', { defaultValue: 'Offline Mode' }),
        footerValue: t('onboarding.omdb.offlineScanActive', { defaultValue: 'Leave empty for local file scanning only' }),
      }}
      fields={[
        {
          label: t('onboarding.omdb.apiKeyLabel'),
          type: 'text',
          value: omdbApiKey,
          onChange: (e) => setOmdbApiKey(e.target.value),
          placeholder: t('onboarding.omdb.apiKeyPlaceholder') || 'Enter OMDb API Key',
        },
      ]}
      validation={{
        isValidating: isValidatingApi,
        onValidate: validateOmdb,
        validationState: omdbValidation,
        validateButtonLabel: t('onboarding.omdb.validateBtn') || 'Validate Key',
        validatingButtonLabel: t('onboarding.omdb.validating') || 'Validating...',
        disabled: !omdbApiKey,
      }}
      helpDocs={{
        needHelpText: t('onboarding.omdbGuide.needHelpText', { defaultValue: 'Need a free OMDb API key to fetch movie ratings? You can request a free key on the OMDb website.' }),
        readDocsText: t('onboarding.omdbGuide.readDocs', { defaultValue: 'Read the documentation →' }),
        onOpenDocs,
      }}
    />
  );
}
