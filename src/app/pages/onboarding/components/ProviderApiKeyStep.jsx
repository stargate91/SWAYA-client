import Button from '@/ui/Button';
import Text from '@/ui/Text';
import Badge from '@/ui/Badge';
import OnboardingInfoCard from './OnboardingInfoCard';
import OnboardingOrbitHero from './OnboardingOrbitHero';
import OnboardingPanelCard from './OnboardingPanelCard';
import styles from '../steps/FormStep.module.css';

/**
 * Reusable split-layout step component for API key/endpoint configuration providers.
 */
export default function ProviderApiKeyStep({
  hero,
  panel,
  fields = [],
  validation = {},
  helpDocs = {},
}) {
  const {
    icon: heroIcon,
    chips: heroChips = [],
    kicker: heroKicker,
    title: heroTitle,
    description: heroDescription,
    footerLabel: heroFooterLabel = 'Need help?',
    footerDocsText: heroFooterDocsText = 'Read the documentation',
    items: heroItems = [],
  } = hero || {};

  const {
    eyebrow: panelEyebrow,
    title: panelTitle,
    badgeText = 'Optional',
    description: panelDescription,
    footerLabel: panelFooterLabel,
    footerValue: panelFooterValue,
  } = panel || {};

  const {
    isValidating = false,
    onValidate,
    validationState = { valid: null, message: '' },
    validateButtonLabel = 'Validate Credentials',
    validatingButtonLabel = 'Validating...',
    disabled = false,
    defaultSuccessMessage = 'Connection successful!',
    defaultErrorMessage = 'Validation failed. Please check your credentials.',
  } = validation;

  const {
    needHelpText,
    readDocsText = 'Read the documentation →',
    onOpenDocs,
  } = helpDocs;

  return (
    <div className={styles['onboarding-split-layout']}>
      <OnboardingInfoCard
        visual={(
          <OnboardingOrbitHero
            icon={heroIcon}
            chips={heroChips}
          />
        )}
        kicker={heroKicker}
        title={heroTitle}
        description={heroDescription}
        footerLabel={heroFooterLabel}
        footerValue={(
          <Text
            interactive
            color="accent"
            onClick={onOpenDocs}
          >
            {heroFooterDocsText}
          </Text>
        )}
        items={heroItems}
      />

      <div className={styles['form-column']}>
        <OnboardingPanelCard
          eyebrow={panelEyebrow}
          title={panelTitle}
          meta={badgeText ? <Badge size="sm" tone="neutral" roundness="full">{badgeText}</Badge> : null}
          description={panelDescription}
          footerLabel={panelFooterLabel}
          footerValue={panelFooterValue}
        >
          {fields.map((field, idx) => (
            <div key={field.name || field.label || idx} className={styles['onboarding-form-group']}>
              {field.label && <label>{field.label}</label>}
              <div className={styles['onboarding-input-wrapper']}>
                <input
                  type={field.type || 'text'}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  placeholder={field.placeholder}
                />
              </div>
            </div>
          ))}

          {onValidate && (
            <Button
              variant="secondary"
              onClick={onValidate}
              disabled={isValidating || disabled}
            >
              {isValidating ? validatingButtonLabel : validateButtonLabel}
            </Button>
          )}

          {validationState?.valid !== null && validationState?.valid !== undefined && (
            <div className={`${styles['onboarding-validation-status']} ${validationState.valid ? styles['success'] : styles['error']}`}>
              {validationState.message || (validationState.valid ? defaultSuccessMessage : defaultErrorMessage)}
            </div>
          )}

          {needHelpText && (
            <div className={styles['documentation-link-box']}>
              <p>{needHelpText}</p>
              <Text interactive color="accent" weight="bold" onClick={onOpenDocs}>
                {readDocsText}
              </Text>
            </div>
          )}
        </OnboardingPanelCard>
      </div>
    </div>
  );
}
