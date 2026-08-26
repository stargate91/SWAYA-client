import { useSettingsForm, useSettingsOptions, useSettingsRenderContext } from './hooks';
import { SettingsFormProvider } from './SettingsFormContext.jsx';
import {
  SettingsActionBar,
  SettingsErrorState,
  SettingsLoadingState,
  SettingsSidebar,
} from './components';
import Overlay from '@/ui/Overlay';
import Stack from '@/ui/Stack';

export default function SettingsPage() {
  const {
    t,
    settingsQuery,
    form,
    setForm,
    activeTab,
    setActiveTab,
    isSaving,
    isWiping,
    isScanActive,
    isBackgroundActive,
    isSyncActive,
    validationErrors,
    isDirty,
    formInputs,
    insertTag,
    handleClose,
    handleChange,
    handleCheckboxChange,
    handlePickFolder,
    handlePickFile,
    handleExportSettings,
    handleImportClick,
    handleImportSettings,
    handleSave,
    handleSyncLanguage,
    isSyncingLanguage,
    handleResetToDefaults,
    handleWipeDatabase,
    isWipingCache,
    handleWipeCache,
    handleReset,
    isShaking,
  } = useSettingsForm();



  const optionContext = useSettingsOptions(t);
  const {
    renderContext,
    visibleOrganizationTabs,
    visibleAdultTabs,
    activeTabDefinition,
    formContextActions,
  } = useSettingsRenderContext({
    t,
    form,
    setForm,
    isSaving,
    isWiping,
    isWipingCache,
    isScanActive,
    isBackgroundActive,
    isSyncActive,
    validationErrors,
    formInputs,
    insertTag,
    handleChange,
    handleCheckboxChange,
    handlePickFolder,
    handlePickFile,
    handleExportSettings,
    handleImportClick,
    handleImportSettings,
    handleResetToDefaults,
    handleWipeDatabase,
    handleWipeCache,
    handleSyncLanguage,
    isSyncingLanguage,
    activeTab,
    optionContext,
  });
  if (settingsQuery.isLoading) {
    return <SettingsLoadingState t={t} />;
  }

  if (settingsQuery.isError) {
    return (
      <SettingsErrorState
        t={t}
        onRetry={() => settingsQuery.refetch()}
        onClose={handleClose}
      />
    );
  }

  return (
    <Overlay onClose={handleClose} closeLabel={t('settingsPage.closeSettings')}>
      <SettingsSidebar
        t={t}
        visibleOrganizationTabs={visibleOrganizationTabs}
        visibleAdultTabs={visibleAdultTabs}
        activeTab={activeTab}
        onTabSelect={setActiveTab}
        includeAdult={form.include_adult}
      />


      <Overlay.ContentWrapper>

        <Overlay.Content>
          <Stack gap="3xl">
            <SettingsFormProvider
              form={form}
              validationErrors={validationErrors}
              isSaving={isSaving}
              formInputs={formInputs}
              actions={formContextActions}
              renderContext={renderContext}
            >
              {activeTabDefinition && (
                <activeTabDefinition.component {...(activeTabDefinition.getProps ? activeTabDefinition.getProps(renderContext) : {})} />
              )}
            </SettingsFormProvider>
          </Stack>
        </Overlay.Content>
      </Overlay.ContentWrapper>

      <SettingsActionBar
        t={t}
        visible={isDirty}
        isSaving={isSaving}
        onReset={handleReset}
        onSave={handleSave}
        shaking={isShaking}
      />
    </Overlay>
  );
}
