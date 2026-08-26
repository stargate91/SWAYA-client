import { useTranslation } from '@/providers/LanguageContext';
import { useUi } from '@/providers/UiProvider';
import FloatingActionBar from '@/ui/FloatingActionBar';
import Button from '@/ui/Button';
import Card from '@/ui/Card';
import Grid from '@/ui/Grid';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Text from '@/ui/Text';
import PageHeader from '@/ui/PageHeader';
import Input from '@/ui/Input';
import BioSection from './components/BioSection';
import PhysicalAttributesSection from './components/PhysicalAttributesSection';
import MeasurementsSection from './components/MeasurementsSection';
import ModificationsSection from './components/ModificationsSection';
import { usePerformerCustomValuesForm } from './usePerformerCustomValuesForm';

export default function PerformerCustomValuesTab({ personId, person: initialPerson, onDirtyChange, isShaking }) {
  const { t } = useTranslation();
  const { toast } = useUi();

  const {
    person,
    settings,
    form,
    setForm,
    handleChange,
    errors,
    isMale,
    isUnderage,
    computedMeasurements,
    isDirty,
    handleSave,
    handleReset,
    saveMutation,
    // HealthyCeleb
    healthyCelebUrl,
    setHealthyCelebUrl,
    isFetchingHealthyCeleb,
    handleFetchHealthyCeleb,
    // Language & Bio
    selectedBioLang,
    setSelectedBioLang,
    bioLanguageOptions,
    // Options
    genderOptions,
    sameSexOnlyOptions,
    breastTypeOptions,
    cupSizeOptions,
    hairColorOptions,
    eyeColorOptions,
    ethnicityOptions,
    buttShapeOptions,
    buttSizeOptions,
    getDropdownOptions,
  } = usePerformerCustomValuesForm({
    personId,
    person: initialPerson,
    onDirtyChange,
    t,
    toast,
  });

  return (
    <form onSubmit={handleSave} className="settings-tab-content">
      <Stack gap="xl">
        <PageHeader
          title={t('library.performerEdit.manualOverrides') || 'Your Custom Details'}
          description={t('library.performerEdit.manualOverridesSubtitle') || 'Write your own details for this star. Anything you write here will be used instead of the online databases.'}
        />

        <Card variant="flat-glass" padding="md">
          <Stack gap="sm">
            <Text as="h4" variant="small" weight="semibold">
              {t('library.performerEdit.custom.import_healthyceleb_title') || 'Import physical statistics from HealthyCeleb'}
            </Text>
            <Inline gap="sm" align="center">
              <Input
                type="text"
                placeholder={t('library.performerEdit.custom.import_healthyceleb_placeholder') || 'HealthyCeleb URL (optional, e.g. https://healthyceleb.com/james-cameron/)'}
                value={healthyCelebUrl}
                onChange={(e) => setHealthyCelebUrl(e.target.value)}
                flex={1}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleFetchHealthyCeleb}
                disabled={isFetchingHealthyCeleb}
              >
                {isFetchingHealthyCeleb ? (t('library.performerEdit.custom.import_healthyceleb_btn_fetching') || 'Fetching...') : (t('library.performerEdit.custom.import_healthyceleb_btn') || 'Import Data')}
              </Button>
            </Inline>
            <Text variant="small" color="muted">
              {t('library.performerEdit.custom.import_healthyceleb_desc') || 'This will fetch stats like height, weight, cup size, measurements, and eye/hair color, then populate the fields below. You can review them before saving.'}
            </Text>
          </Stack>
        </Card>

        <Grid variant="split">
          <BioSection
            form={form}
            setForm={setForm}
            person={person}
            errors={errors}
            handleChange={handleChange}
            bioLanguageOptions={bioLanguageOptions}
            selectedBioLang={selectedBioLang}
            setSelectedBioLang={setSelectedBioLang}
            genderOptions={genderOptions}
            sameSexOnlyOptions={sameSexOnlyOptions}
            t={t}
          />

          <PhysicalAttributesSection
            form={form}
            errors={errors}
            handleChange={handleChange}
            isUnderage={isUnderage}
            hairColorOptions={hairColorOptions}
            eyeColorOptions={eyeColorOptions}
            ethnicityOptions={ethnicityOptions}
            getDropdownOptions={getDropdownOptions}
            t={t}
            includeAdult={settings?.include_adult}
          />

          {settings?.include_adult && !isMale && !isUnderage && (
            <MeasurementsSection
              form={form}
              errors={errors}
              handleChange={handleChange}
              computedMeasurements={computedMeasurements}
              breastTypeOptions={breastTypeOptions}
              cupSizeOptions={cupSizeOptions}
              buttShapeOptions={buttShapeOptions}
              buttSizeOptions={buttSizeOptions}
              getDropdownOptions={getDropdownOptions}
              t={t}
            />
          )}

          <ModificationsSection
            form={form}
            handleChange={handleChange}
            t={t}
          />
        </Grid>
      </Stack>

      <FloatingActionBar
        visible={Boolean(isDirty)}
        shaking={isShaking}
        title={t('settingsPage.unsavedChanges.title')}
        actions={[
          {
            key: 'reset',
            label: t('common.back') || 'Reset',
            onClick: handleReset,
            disabled: saveMutation.isPending,
          },
          {
            key: 'save',
            label: saveMutation.isPending ? (t('library.performerEdit.saving') || 'Saving...') : (t('library.performerEdit.saveChanges') || 'Save Changes'),
            onClick: handleSave,
            disabled: saveMutation.isPending || Object.keys(errors).length > 0,
            variant: 'primary',
          },
        ]}
      />
    </form>
  );
}
