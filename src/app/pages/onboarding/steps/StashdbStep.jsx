import { Key, Database } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import { PROVIDER_ENDPOINTS } from '@/lib/providerAvailability';
import ProviderApiKeyStep from '../components/ProviderApiKeyStep';

export default function StashdbStep({
  stashdbApiKey,
  setStashdbApiKey,
  stashdbEndpoint,
  setStashdbEndpoint,
  stashdbValidation,
  validateStashdb,
  isValidatingApi,
  onOpenDocs,
}) {
  const { t } = useTranslation();

  return (
    <ProviderApiKeyStep
      hero={{
        icon: Database,
        chips: [
          { label: 'Scene Hub' },
          { label: 'Star Directory' },
          { label: 'Metadata Magic' },
        ],
        kicker: t('onboarding.stashdb.kicker', { defaultValue: 'Adult Metadata' }),
        title: t('onboarding.stashdb.heroTitle', { defaultValue: 'Configure StashDB' }),
        description: t('onboarding.stashdb.heroDesc', { defaultValue: 'StashDB provides scenes, performers, and studio metadata for your adult content library.' }),
        footerLabel: t('onboarding.stashdb.helpNeeded', { defaultValue: 'Need help?' }),
        footerDocsText: t('onboarding.stashdb.readDocs', { defaultValue: 'Read the documentation' }),
        items: [
          {
            icon: Key,
            title: t('onboarding.stashdb.itemTitle', { defaultValue: 'API Key integration' }),
            description: t('onboarding.stashdb.itemDesc', { defaultValue: 'Generate an API key in your StashDB user settings page.' }),
          }
        ],
      }}
      panel={{
        eyebrow: t('onboarding.stashdb.eyebrow', { defaultValue: 'StashDB' }),
        title: t('onboarding.stashdb.title', { defaultValue: 'Set up StashDB scraper' }),
        badgeText: t('onboarding.stashdb.optional', { defaultValue: 'Optional' }),
        description: t('onboarding.stashdb.description', { defaultValue: 'You can skip this step by continuing, or paste your API key to validate.' }),
        footerLabel: t('onboarding.stashdb.endpoint', { defaultValue: 'Endpoint' }),
        footerValue: stashdbEndpoint || PROVIDER_ENDPOINTS.STASHDB,
      }}
      fields={[
        {
          label: t('onboarding.stashdb.apiKeyLabel', { defaultValue: 'StashDB API Key' }),
          type: 'password',
          value: stashdbApiKey,
          onChange: (e) => setStashdbApiKey(e.target.value),
          placeholder: t('onboarding.stashdb.apiKeyPlaceholder', { defaultValue: 'Enter StashDB API Key' }),
        },
        {
          label: t('onboarding.stashdb.endpointLabel', { defaultValue: 'GraphQL Endpoint' }),
          type: 'text',
          value: stashdbEndpoint,
          onChange: (e) => setStashdbEndpoint(e.target.value),
          placeholder: PROVIDER_ENDPOINTS.STASHDB,
        },
      ]}
      validation={{
        isValidating: isValidatingApi,
        onValidate: validateStashdb,
        validationState: stashdbValidation,
        validateButtonLabel: t('onboarding.stashdb.validateBtn', { defaultValue: 'Validate Connection' }),
        validatingButtonLabel: t('onboarding.stashdb.validating', { defaultValue: 'Validating...' }),
        disabled: !stashdbApiKey,
        defaultSuccessMessage: 'Successfully connected to StashDB!',
        defaultErrorMessage: 'Validation failed. Please check your endpoint or API key.',
      }}
      helpDocs={{
        needHelpText: t('onboarding.stashdb.needHelpText', { defaultValue: 'Need help finding or generating your StashDB API credentials? Detailed instructions are available in the app settings help section.' }),
        readDocsText: t('onboarding.stashdb.readDocs', { defaultValue: 'Read the documentation →' }),
        onOpenDocs,
      }}
    />
  );
}
