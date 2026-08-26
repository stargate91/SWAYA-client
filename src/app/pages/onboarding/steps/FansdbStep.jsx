import { Key, Database } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import { PROVIDER_ENDPOINTS } from '@/lib/providerAvailability';
import ProviderApiKeyStep from '../components/ProviderApiKeyStep';

export default function FansdbStep({
  fansdbApiKey,
  setFansdbApiKey,
  fansdbEndpoint,
  setFansdbEndpoint,
  fansdbValidation,
  validateFansdb,
  isValidatingApi,
  onOpenDocs,
}) {
  const { t } = useTranslation();

  return (
    <ProviderApiKeyStep
      hero={{
        icon: Database,
        chips: [
          { label: 'Creator Finder' },
          { label: 'Indie Vibes' },
          { label: 'Uncut Archive' },
        ],
        kicker: t('onboarding.fansdb.kicker', { defaultValue: 'Adult Metadata' }),
        title: t('onboarding.fansdb.heroTitle', { defaultValue: 'Configure FansDB' }),
        description: t('onboarding.fansdb.heroDesc', { defaultValue: 'FansDB specializes in matching metadata for content creators, models, and custom productions.' }),
        footerLabel: t('onboarding.fansdb.helpNeeded', { defaultValue: 'Need help?' }),
        footerDocsText: t('onboarding.fansdb.readDocs', { defaultValue: 'Read the documentation' }),
        items: [
          {
            icon: Key,
            title: t('onboarding.fansdb.itemTitle', { defaultValue: 'API Key integration' }),
            description: t('onboarding.fansdb.itemDesc', { defaultValue: 'Retrieve your API key from your profile page on FansDB.' }),
          }
        ],
      }}
      panel={{
        eyebrow: t('onboarding.fansdb.eyebrow', { defaultValue: 'FansDB' }),
        title: t('onboarding.fansdb.title', { defaultValue: 'Set up FansDB scraper' }),
        badgeText: t('onboarding.fansdb.optional', { defaultValue: 'Optional' }),
        description: t('onboarding.fansdb.description', { defaultValue: 'You can skip this step by continuing, or paste your API key to validate.' }),
        footerLabel: t('onboarding.fansdb.endpoint', { defaultValue: 'Endpoint' }),
        footerValue: fansdbEndpoint || PROVIDER_ENDPOINTS.FANSDB,
      }}
      fields={[
        {
          label: t('onboarding.fansdb.apiKeyLabel', { defaultValue: 'FansDB API Key' }),
          type: 'password',
          value: fansdbApiKey,
          onChange: (e) => setFansdbApiKey(e.target.value),
          placeholder: t('onboarding.fansdb.apiKeyPlaceholder', { defaultValue: 'Enter FansDB API Key' }),
        },
        {
          label: t('onboarding.fansdb.endpointLabel', { defaultValue: 'GraphQL Endpoint' }),
          type: 'text',
          value: fansdbEndpoint,
          onChange: (e) => setFansdbEndpoint(e.target.value),
          placeholder: PROVIDER_ENDPOINTS.FANSDB,
        },
      ]}
      validation={{
        isValidating: isValidatingApi,
        onValidate: validateFansdb,
        validationState: fansdbValidation,
        validateButtonLabel: t('onboarding.fansdb.validateBtn', { defaultValue: 'Validate Connection' }),
        validatingButtonLabel: t('onboarding.fansdb.validating', { defaultValue: 'Validating...' }),
        disabled: !fansdbApiKey,
        defaultSuccessMessage: 'Successfully connected to FansDB!',
        defaultErrorMessage: 'Validation failed. Please check your endpoint or API key.',
      }}
      helpDocs={{
        needHelpText: t('onboarding.fansdb.needHelpText', { defaultValue: 'Need help finding or generating your FansDB API credentials? Detailed instructions are available in the app settings help section.' }),
        readDocsText: t('onboarding.fansdb.readDocs', { defaultValue: 'Read the documentation →' }),
        onOpenDocs,
      }}
    />
  );
}
