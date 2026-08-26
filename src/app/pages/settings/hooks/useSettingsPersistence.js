import { useState, useEffect, useRef, useCallback, createElement } from 'react';
import { buildSettingsPayload } from '@/lib/api/settings';
import {
  useSettingsQuery,
  useUpdateSettingsMutation,
  useSyncLanguageMutation,
  useValidateApiKeysMutation,
} from '@/queries';
import { getInitialFormValues, isSettingsDirty } from '../config';
import { Info } from '@/ui/icons';
import { usePromptPreferencesStore, PROMPT_PREFERENCE_KEYS } from '@/stores/usePromptPreferencesStore';
import { confirmDialog } from '@/providers/UiProvider';
import LanguageSyncConfirmContent from '../components/LanguageSyncConfirmContent';

export default function useSettingsPersistence({
  t,
  toast,
  validateFormFolders,
  onValidationInvalid,
}) {
  const settingsQuery = useSettingsQuery();
  const settings = settingsQuery.data;
  const updateSettingsMutation = useUpdateSettingsMutation();
  const syncLanguageMutation = useSyncLanguageMutation();
  const validateApiKeysMutation = useValidateApiKeysMutation();
  const [form, setForm] = useState(() => getInitialFormValues(null, t));
  const [isSaving, setIsSaving] = useState(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (settings && !isInitializedRef.current) {
      setForm(getInitialFormValues(settings, t));
      isInitializedRef.current = true;
    }
  }, [settings, t]);

  const executeSave = useCallback(async (payload) => {
    isInitializedRef.current = false;
    await updateSettingsMutation.mutateAsync(payload);
    toast(t('settingsPage.saved'), 'success');
  }, [t, toast, updateSettingsMutation]);

  const validateChangedApiKeys = useCallback(async (payload) => {
    const providers = [
      {
        key: 'tmdb',
        shouldValidate: (Boolean(payload.tmdb_api_key) || Boolean(payload.tmdb_bearer_token)) && (
          payload.tmdb_api_key !== (settings?.tmdb_api_key || '') ||
          payload.tmdb_bearer_token !== (settings?.tmdb_bearer_token || '')
        ),
      },
      {
        key: 'omdb',
        shouldValidate: Boolean(payload.omdb_api_key) && (
          payload.omdb_api_key !== (settings?.omdb_api_key || '')
        ),
      },
      {
        key: 'stashdb',
        shouldValidate: Boolean(payload.stashdb_api_key) && (
          payload.stashdb_api_key !== (settings?.stashdb_api_key || '') ||
          payload.stashdb_endpoint !== (settings?.stashdb_endpoint || '')
        ),
      },
      {
        key: 'fansdb',
        shouldValidate: Boolean(payload.fansdb_api_key) && (
          payload.fansdb_api_key !== (settings?.fansdb_api_key || '') ||
          payload.fansdb_endpoint !== (settings?.fansdb_endpoint || '')
        ),
      },
      {
        key: 'theporndb',
        shouldValidate: Boolean(payload.theporndb_api_key) && (
          payload.theporndb_api_key !== (settings?.theporndb_api_key || '') ||
          payload.theporndb_endpoint !== (settings?.theporndb_endpoint || '')
        ),
      },
    ];

    if (!providers.some((provider) => provider.shouldValidate)) {
      return true;
    }

    const validationResponse = await validateApiKeysMutation.mutateAsync(payload);
    const firstInvalidProvider = providers.find(
      (provider) => provider.shouldValidate && validationResponse?.[provider.key]?.valid === false
    );

    if (firstInvalidProvider) {
      const validationMessage = validationResponse?.[firstInvalidProvider.key]?.message;
      const validationCode = validationResponse?.[firstInvalidProvider.key]?.code;
      const validationProvider = validationResponse?.[firstInvalidProvider.key]?.provider || firstInvalidProvider.key;
      const providerLabel = t(`dynamic.validation.adultProviderNames.${validationProvider}`) ||
                            t(`dynamic.docsItems.${validationProvider}`) ||
                            validationProvider.toUpperCase();
      const localizedMessage = validationCode
        ? (t(`dynamic.validation.${validationCode}`, { provider: providerLabel }) || validationMessage)
        : validationMessage;
      toast(localizedMessage || t('settingsPage.saveFailed'), 'danger');
      return false;
    }

    return true;
  }, [settings, t, toast, validateApiKeysMutation]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);

    try {
      const validationResult = await validateFormFolders(form);
      if (!validationResult.valid) {
        onValidationInvalid?.();
        setIsSaving(false);
        let localizedMessage = '';

        if (validationResult.errors) {
          const firstKey = Object.keys(validationResult.errors)[0];
          const errorValue = validationResult.errors[firstKey];
          localizedMessage = t(`dynamic.validation.${errorValue}`) || errorValue;
        } else {
          localizedMessage = t(`dynamic.validation.${validationResult.code}`) || validationResult.code;
        }

        toast(localizedMessage || t('settingsPage.saveFailed'), 'danger');
        return;
      }

      const payload = buildSettingsPayload(form);

      const apiKeysValid = await validateChangedApiKeys(payload);
      if (!apiKeysValid) {
        setIsSaving(false);
        return;
      }
      
      const savedPrimary = settings?.primary_metadata_language || 'en-US';
      const savedFallback = settings?.fallback_metadata_language || 'en-US';
      const savedTarget = settings?.default_target_language || 'en';

      const isLanguageChanging = 
        (payload.primary_metadata_language !== savedPrimary) ||
        (payload.fallback_metadata_language !== savedFallback) ||
        (payload.default_target_language !== savedTarget);

      // Execute save first
      await executeSave(payload);

      // Trigger the info modal popup after saving if languages were modified
      const skipWarningKey = PROMPT_PREFERENCE_KEYS.SETTINGS_LANGUAGE_SYNC_WARNING;
      const isWarningDismissed = usePromptPreferencesStore.getState().isPromptDismissed(skipWarningKey);

      if (isLanguageChanging && !isWarningDismissed) {
        let dontShowAgain = false;

        confirmDialog({
          title: t('settingsPage.languageChangeInfo.title'),
          icon: Info,
          variant: 'primary',
          content: createElement(LanguageSyncConfirmContent, {
            description: t('settingsPage.languageChangeInfo.description'),
            dontShowAgainLabel: t('settingsPage.languageChangeInfo.dontShowAgain'),
            onToggleDontShowAgain: (checked) => { dontShowAgain = checked; },
          }),
          cancelText: t('common.cancel'),
          confirmText: t('settingsPage.languageChangeInfo.syncButton'),
          onCancel: () => {
            if (dontShowAgain) {
              usePromptPreferencesStore.getState().dismissPrompt(skipWarningKey);
            }
          },
          onConfirm: async () => {
            if (dontShowAgain) {
              usePromptPreferencesStore.getState().dismissPrompt(skipWarningKey);
            }
            try {
              await syncLanguageMutation.mutateAsync();
              toast(t('settingsPage.languageChangeInfo.syncStarted'), 'success');
            } catch (syncError) {
              toast(t('settingsPage.languageChangeInfo.syncFailed') || syncError.message, 'danger');
            }
          },
        });
      }
    } catch (error) {
      const localizedErrorMessage = t(`dynamic.validation.${error.message}`) || error.message;
      toast(localizedErrorMessage || t('settingsPage.saveFailed'), 'danger');
    } finally {
      setIsSaving(false);
    }
  }, [form, settings, onValidationInvalid, t, toast, validateFormFolders, executeSave, syncLanguageMutation, validateChangedApiKeys]);

  const handleReset = useCallback(() => {
    if (settings) {
      setForm(getInitialFormValues(settings, t));
    }
  }, [settings, t]);

  const handleSyncLanguage = useCallback(async () => {
    try {
      await syncLanguageMutation.mutateAsync();
      toast(t('settingsPage.languageChangeInfo.syncStarted'), 'success');
    } catch (err) {
      toast(err.message || t('settingsPage.languageChangeInfo.syncFailed'), 'danger');
    }
  }, [syncLanguageMutation, t, toast]);

  return {
    settingsQuery,
    settings,
    form,
    setForm,
    isSaving,
    isSyncingLanguage: syncLanguageMutation.isPending,
    isDirty: isSettingsDirty(form, settings, t),
    handleSave,
    handleReset,
    handleSyncLanguage,
    resetInitialization: () => {
      isInitializedRef.current = false;
    },
  };
}
