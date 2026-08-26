import { useState, useCallback, useMemo } from 'react';
import {
  getTmdbWizardStepsConfig,
  getOmdbWizardStepsConfig,
  getStashdbWizardStepsConfig,
  getFansdbWizardStepsConfig,
  getTheporndbWizardStepsConfig,
  getOfflineWizardStepsConfig,
} from './wizardConfig';
import { PROVIDER_ENDPOINTS } from '@/lib/providerAvailability';

export function useDocsWizard({
  activeTab,
  wizardStep,
  setWizardStep,
  settings = {},
  updateSettingsMutation,
  onApplyValues,
  t,
}) {
  const [wizardInputs, setWizardInputs] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null); // null | 'saving' | 'success' | 'error'

  const getWizardInputValue = useCallback((key) => {
    if (wizardInputs && key in wizardInputs) {
      return wizardInputs[key];
    }
    if (key === 'stashdb_endpoint') return settings.stashdb_endpoint || PROVIDER_ENDPOINTS.STASHDB;
    if (key === 'theporndb_endpoint') return settings.theporndb_endpoint || PROVIDER_ENDPOINTS.THEPORNDB;
    if (key === 'fansdb_endpoint') return settings.fansdb_endpoint || PROVIDER_ENDPOINTS.FANSDB;
    return settings[key] || '';
  }, [wizardInputs, settings]);

  const handleInputChange = useCallback((key, value) => {
    setWizardInputs((prev) => ({
      ...(prev || {
        tmdb_api_key: settings.tmdb_api_key || '',
        tmdb_bearer_token: settings.tmdb_bearer_token || '',
        omdb_api_key: settings.omdb_api_key || '',
        stashdb_api_key: settings.stashdb_api_key || '',
        stashdb_endpoint: settings.stashdb_endpoint || PROVIDER_ENDPOINTS.STASHDB,
        theporndb_api_key: settings.theporndb_api_key || '',
        theporndb_endpoint: settings.theporndb_endpoint || PROVIDER_ENDPOINTS.THEPORNDB,
        fansdb_api_key: settings.fansdb_api_key || '',
        fansdb_endpoint: settings.fansdb_endpoint || PROVIDER_ENDPOINTS.FANSDB,
      }),
      [key]: value,
    }));
  }, [settings]);

  const handleSaveSetting = useCallback(async (fieldMap) => {
    const payload = {};
    Object.keys(fieldMap).forEach((key) => {
      payload[key] = getWizardInputValue(fieldMap[key]);
    });

    if (onApplyValues) {
      onApplyValues(payload);
      return;
    }

    setSaveStatus('saving');
    try {
      if (updateSettingsMutation) {
        await updateSettingsMutation.mutateAsync(payload);
      }
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
      setSaveStatus('error');
    }
  }, [getWizardInputValue, onApplyValues, updateSettingsMutation]);

  const steps = useMemo(() => {
    let rawSteps = [];
    if (activeTab === 'docs_tmdb') {
      rawSteps = getTmdbWizardStepsConfig(t);
    } else if (activeTab === 'docs_omdb') {
      rawSteps = getOmdbWizardStepsConfig(t);
    } else if (activeTab === 'docs_stashdb') {
      rawSteps = getStashdbWizardStepsConfig(t);
    } else if (activeTab === 'docs_fansdb') {
      rawSteps = getFansdbWizardStepsConfig(t);
    } else if (activeTab === 'docs_theporndb') {
      rawSteps = getTheporndbWizardStepsConfig(t);
    } else if (activeTab === 'docs_offline') {
      rawSteps = getOfflineWizardStepsConfig(t);
    }

    return rawSteps.map((s) => ({
      ...s,
      onSave: s.saveFieldMap ? () => handleSaveSetting(s.saveFieldMap) : undefined,
    }));
  }, [activeTab, t, handleSaveSetting]);

  const currentStepIdx = wizardStep >= steps.length ? 0 : wizardStep;
  const step = steps[currentStepIdx];
  const isFirst = currentStepIdx === 0;
  const isLast = currentStepIdx === steps.length - 1;

  const headerTitle = t(`dynamic.docsItems.${activeTab?.replace('docs_', '')}`) || step?.title || '';

  const handleBack = useCallback(() => {
    setWizardStep(currentStepIdx - 1);
    setSaveStatus(null);
  }, [currentStepIdx, setWizardStep]);

  const handleNext = useCallback(() => {
    setWizardStep(currentStepIdx + 1);
    setSaveStatus(null);
  }, [currentStepIdx, setWizardStep]);

  return {
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
  };
}

export default useDocsWizard;
