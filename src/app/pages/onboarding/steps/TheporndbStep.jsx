import { Key, Database } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import { PROVIDER_ENDPOINTS } from '@/lib/providerAvailability';
import ProviderApiKeyStep from '../components/ProviderApiKeyStep';

export default function TheporndbStep({
  theporndbApiKey,
  setTheporndbApiKey,
  theporndbEndpoint,
  setTheporndbEndpoint,
  theporndbValidation,
  validateTheporndb,
  isValidatingApi,
  onOpenDocs,
}) {
  const { t } = useTranslation();

  return (
    <ProviderApiKeyStep
      hero={{
        icon: Database,
        chips: [
          { label: 'Studio Catalog' },
          { label: 'Scene Indexer' },
          { label: 'Collector Dream' },
        ],
        kicker: t('onboarding.theporndb.kicker', { defaultValue: 'Adult Metadata' }),
        title: t('onboarding.theporndb.heroTitle', { defaultValue: 'Configure ThePornDB' }),
        description: t('onboarding.theporndb.heroDesc', { defaultValue: 'ThePornDB helps scan, match, and organize files with scene metadata, cast databases, and studio entries.' }),
        footerLabel: t('onboarding.theporndb.helpNeeded', { defaultValue: 'Need help?' }),
        footerDocsText: t('onboarding.theporndb.readDocs', { defaultValue: 'Read the documentation' }),
        items: [
          {
            icon: Key,
            title: t('onboarding.theporndb.itemTitle', { defaultValue: 'API Key integration' }),
            description: t('onboarding.theporndb.itemDesc', { defaultValue: 'Retrieve your API Read Access Token from your developer profile.' }),
          }
        ],
      }}
      panel={{
        eyebrow: t('onboarding.theporndb.eyebrow', { defaultValue: 'ThePornDB' }),
        title: t('onboarding.theporndb.title', { defaultValue: 'Set up ThePornDB scraper' }),
        badgeText: t('onboarding.theporndb.optional', { defaultValue: 'Optional' }),
        description: t('onboarding.theporndb.description', { defaultValue: 'You can skip this step by continuing, or paste your API key to validate.' }),
        footerLabel: t('onboarding.theporndb.endpoint', { defaultValue: 'Endpoint' }),
        footerValue: theporndbEndpoint || PROVIDER_ENDPOINTS.THEPORNDB,
      }}
      fields={[
        {
          label: t('onboarding.theporndb.apiKeyLabel', { defaultValue: 'ThePornDB API Key' }),
          type: 'password',
          value: theporndbApiKey,
          onChange: (e) => setTheporndbApiKey(e.target.value),
          placeholder: t('onboarding.theporndb.apiKeyPlaceholder', { defaultValue: 'Enter ThePornDB API Key' }),
        },
        {
          label: t('onboarding.theporndb.endpointLabel', { defaultValue: 'GraphQL Endpoint' }),
          type: 'text',
          value: theporndbEndpoint,
          onChange: (e) => setTheporndbEndpoint(e.target.value),
          placeholder: PROVIDER_ENDPOINTS.THEPORNDB,
        },
      ]}
      validation={{
        isValidating: isValidatingApi,
        onValidate: validateTheporndb,
        validationState: theporndbValidation,
        validateButtonLabel: t('onboarding.theporndb.validateBtn', { defaultValue: 'Validate Connection' }),
        validatingButtonLabel: t('onboarding.theporndb.validating', { defaultValue: 'Validating...' }),
        disabled: !theporndbApiKey,
        defaultSuccessMessage: 'Successfully connected to ThePornDB!',
        defaultErrorMessage: 'Validation failed. Please check your endpoint or API key.',
      }}
      helpDocs={{
        needHelpText: t('onboarding.theporndb.needHelpText', { defaultValue: 'Need help finding or generating your ThePornDB API credentials? Detailed instructions are available in the app settings help section.' }),
        readDocsText: t('onboarding.theporndb.readDocs', { defaultValue: 'Read the documentation →' }),
        onOpenDocs,
      }}
    />
  );
}
