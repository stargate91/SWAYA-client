import Card from '@/ui/Card';
import Button from '@/ui/Button';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Grid from '@/ui/Grid';
import Text from '@/ui/Text';
import LinearProgress from '@/ui/LinearProgress';
import DescriptionList from '@/ui/DescriptionList';
import WizardStepInputs from './WizardStepInputs';
import {
  CAMERA_EMOJI,
  COLON_SEPARATOR,
  CHECKMARK_EMOJI,
  CROSS_EMOJI,
  openExternalLink,
} from './wizardHelpers';
import { useDocsWizard } from './useDocsWizard';
import styles from './DocsWizardPanel.module.css';

export default function DocsWizardPanel({
  activeTab,
  wizardStep,
  setWizardStep,
  settings,
  updateSettingsMutation,
  setActiveLightboxUrl,
  onApplyValues,
  t,
}) {
  const {
    steps,
    currentStepIdx,
    step,
    isFirst,
    isLast,
    headerTitle,
    saveStatus,
    getWizardInputValue,
    handleInputChange,
    handleBack,
    handleNext,
  } = useDocsWizard({
    activeTab,
    wizardStep,
    setWizardStep,
    settings,
    updateSettingsMutation,
    onApplyValues,
    t,
  });

  if (!step) return null;

  const hasQuickFill = Boolean(step.quickFillItems && step.quickFillItems.length > 0);
  const hasFields = Boolean(step.fields && step.fields.length > 0);

  return (
    <Card
      padding="none"
      fullWidth
      title={headerTitle}
      eyebrow={t('about.sidebar.docs')}
      divider
    >
      <Stack gap="xl" padding="xl" flex={1}>
        {steps.length > 1 && (
          <LinearProgress
            steps={steps.length}
            currentStep={currentStepIdx}
            variant="accent"
          />
        )}

        <Stack gap="md" flex={1}>
          <Text variant="title" weight="bold">
            {step.title}
          </Text>

          <Text variant="small" color="secondary" className="u-whitespace-pre-wrap u-leading-relaxed">
            {step.description}
          </Text>

          {step.links && (
            <Inline gap="sm" wrap>
              {step.links.map((link, lidx) => (
                <Button
                  key={lidx}
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    openExternalLink(link.url);
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Inline>
          )}

          {(step.image || step.screenshotPlaceholder) && hasQuickFill ? (
            <Grid variant="split" gap="xl" className="u-items-stretch">
              <div className="u-min-w-0 u-flex u-flex-col">
                {step.image ? (
                  <img
                    src={step.image}
                    alt={step.title}
                    className={styles['preview-img']}
                    onClick={() => setActiveLightboxUrl(step.image)}
                    title={t('about.docs_wizard.click_to_enlarge') || 'Click to view full image'}
                  />
                ) : (
                  <Card variant="soft" padding="xl" align="center">
                    <Text variant="small" color="muted">
                      {CAMERA_EMOJI}{t('about.docs_wizard.screenshot_placeholder') || 'Screenshot'}{COLON_SEPARATOR}{step.screenshotPlaceholder}
                    </Text>
                  </Card>
                )}
              </div>

              <Card variant="soft-accent" padding="md">
                <Stack gap="sm">
                  <Stack gap="2xs">
                    <Text variant="caption" weight="bold" color="accent" uppercase tracking="wider">
                      {t('about.docs_wizard.quick_fill') || 'Quick Copy Reference'}
                    </Text>
                    <Text variant="xsmall" color="muted">
                      {t('about.docs_wizard.quick_fill_desc') || 'Click any item to copy values directly to your clipboard.'}
                    </Text>
                  </Stack>
                  <DescriptionList items={step.quickFillItems} variant="card" copyable />
                </Stack>
              </Card>
            </Grid>
          ) : (
            <>
              {step.image ? (
                <img
                  src={step.image}
                  alt={step.title}
                  className={styles['preview-img']}
                  onClick={() => setActiveLightboxUrl(step.image)}
                  title={t('about.docs_wizard.click_to_enlarge') || 'Click to view full image'}
                />
              ) : step.screenshotPlaceholder && (
                <Card variant="soft" padding="xl" align="center">
                  <Text variant="small" color="muted">
                    {CAMERA_EMOJI}{t('about.docs_wizard.screenshot_placeholder') || 'Screenshot'}{COLON_SEPARATOR}{step.screenshotPlaceholder}
                  </Text>
                </Card>
              )}

              {hasQuickFill && (
                <DescriptionList items={step.quickFillItems} variant="card" copyable />
              )}

              {hasFields && (
                <WizardStepInputs
                  fields={step.fields}
                  getInputValue={getWizardInputValue}
                  onInputChange={handleInputChange}
                />
              )}
            </>
          )}
        </Stack>
      </Stack>

      {(steps.length > 1 || step.onSave) && (
        <Inline justify="between" align="center" padding="md" className="u-border-top-subtle">
          {!isFirst ? (
            <Button
              variant="secondary"
              onClick={handleBack}
            >
              {t('about.docs_wizard.back') || 'Back'}
            </Button>
          ) : <div />}

          {!isLast ? (
            <Button
              variant="secondary"
              onClick={handleNext}
            >
              {isFirst ? (t('about.docs_wizard.start') || "Let's get it!") : (t('about.docs_wizard.next') || 'Next Step')}
            </Button>
          ) : step.onSave ? (
            <Inline gap="md" align="center">
              {saveStatus === 'success' && (
                <Text variant="small" weight="semibold" color="success">
                  {CHECKMARK_EMOJI}{t('about.docs_wizard.saved') || 'Saved successfully!'}
                </Text>
              )}
              {saveStatus === 'error' && (
                <Text variant="small" weight="semibold" color="danger">
                  {CROSS_EMOJI}{t('about.docs_wizard.save_failed') || 'Failed to save'}
                </Text>
              )}
              <Button
                variant="primary"
                onClick={step.onSave}
                disabled={saveStatus === 'saving'}
              >
                {saveStatus === 'saving'
                  ? (t('about.docs_wizard.saving') || 'Saving...')
                  : onApplyValues
                    ? (t('about.docs_wizard.apply_to_onboarding') || 'Apply & Return to Setup')
                    : (t('about.docs_wizard.save') || 'Save')}
              </Button>
            </Inline>
          ) : null}
        </Inline>
      )}
    </Card>
  );
}
