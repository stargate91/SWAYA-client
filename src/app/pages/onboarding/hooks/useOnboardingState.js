import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@/providers/LanguageContext';
import { useUi } from '@/providers/UiProvider';
import { selectFolder } from '@/lib/ipc';
import { buildSettingsPayload } from '@/lib/api/settings';
import { validateImportedSettings } from '@/lib/validation';
import { QK } from '@/lib/queryKeys';
import {
  useImportSettingsMutation,
  useUpdateSettingsMutation,
  useValidateApiKeysMutation,
  useValidateFoldersMutation
} from '@/queries/settingsMutations';
import { useSettingsQuery } from '@/queries/settingsQueries';
import { getInitialFormValues } from '@/pages/settings/config';
import { getFlagUrl, TARGET_LANGUAGE_OPTIONS } from '@/lib/languages';
import { PROVIDER_ENDPOINTS } from '@/lib/providerAvailability';
import { getDicebearAvatarUrl } from '@/lib/imageUrls';
import { ROUTES } from '@/lib/routes';

export default function useOnboardingState() {
  const { locale, setLocale, t } = useTranslation();
  const { toast } = useUi();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: rawSettings = {} } = useSettingsQuery();
  const importSettingsMutation = useImportSettingsMutation();
  const updateSettingsMutation = useUpdateSettingsMutation();
  const validateApiKeysMutation = useValidateApiKeysMutation();
  const validateFoldersMutation = useValidateFoldersMutation();

  const [step, setStep] = useState(1);
  const [stepDirection, setStepDirection] = useState('forward');
  const [configChoice, setConfigChoice] = useState('new'); // 'new' or 'import'
  const [isImporting, setIsImporting] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const [docsModal, setDocsModal] = useState(null); // null | 'docs_tmdb' | 'docs_omdb' | 'docs_stashdb' | 'docs_fansdb' | 'docs_theporndb'

  // Content selection & adult scraper states
  const [contentTypeChoice, setContentTypeChoice] = useState('sfw'); // 'sfw', 'nsfw', 'hybrid'
  const [stashdbApiKey, setStashdbApiKey] = useState('');
  const [stashdbEndpoint, setStashdbEndpoint] = useState(PROVIDER_ENDPOINTS.STASHDB);
  const [fansdbApiKey, setFansdbApiKey] = useState('');
  const [fansdbEndpoint, setFansdbEndpoint] = useState(PROVIDER_ENDPOINTS.FANSDB);
  const [theporndbApiKey, setTheporndbApiKey] = useState('');
  const [theporndbEndpoint, setTheporndbEndpoint] = useState(PROVIDER_ENDPOINTS.THEPORNDB);

  const AVAILABLE_LANGUAGES = TARGET_LANGUAGE_OPTIONS.map(lang => {
    const nativeMatch = lang.label.match(/\(([^)]+)\)/);
    return {
      code: lang.value,
      name: nativeMatch ? nativeMatch[1] : lang.label,
      flagUrl: getFlagUrl(lang.value),
      active: lang.value === 'en'
    };
  });

  const filteredLanguages = AVAILABLE_LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(langSearch.toLowerCase())
  );

  // Profile builder state
  const [userName, setUserName] = useState('');
  const [avatarPath, setAvatarPath] = useState(getDicebearAvatarUrl('bottts', 'Bender'));

  // API credentials state
  const [tmdbApiKey, setTmdbApiKey] = useState('');
  const [tmdbBearerToken, setTmdbBearerToken] = useState('');
  const [omdbApiKey, setOmdbApiKey] = useState('');

  // Validation states
  const [providerValidations, setProviderValidations] = useState({
    tmdb: { valid: null, message: '' },
    omdb: { valid: null, message: '' },
    stashdb: { valid: null, message: '' },
    fansdb: { valid: null, message: '' },
    theporndb: { valid: null, message: '' },
  });
  const tmdbValidation = providerValidations.tmdb;
  const omdbValidation = providerValidations.omdb;
  const stashdbValidation = providerValidations.stashdb;
  const fansdbValidation = providerValidations.fansdb;
  const theporndbValidation = providerValidations.theporndb;
  const [isValidatingApi, setIsValidatingApi] = useState(false);

  // Folder paths state
  const [orgMode, setOrgMode] = useState('move_organize'); // 'register' | 'rename_inplace' | 'move_organize'
  const [scanDir, setScanDir] = useState('');
  const [libraryPath, setLibraryPath] = useState('');
  const [folderValidation, setFolderValidation] = useState({ valid: null, message: '' });
  const [isValidatingFolders, setIsValidatingFolders] = useState(false);

  // Final completion state
  const [isFinishing, setIsFinishing] = useState(false);

  const docsModalSettings = useMemo(() => ({
    ...rawSettings,
    tmdb_api_key: tmdbApiKey || rawSettings.tmdb_api_key || '',
    tmdb_bearer_token: tmdbBearerToken || rawSettings.tmdb_bearer_token || '',
    omdb_api_key: omdbApiKey || rawSettings.omdb_api_key || '',
    stashdb_api_key: stashdbApiKey || rawSettings.stashdb_api_key || '',
    stashdb_endpoint: stashdbEndpoint || rawSettings.stashdb_endpoint || PROVIDER_ENDPOINTS.STASHDB,
    fansdb_api_key: fansdbApiKey || rawSettings.fansdb_api_key || '',
    fansdb_endpoint: fansdbEndpoint || rawSettings.fansdb_endpoint || PROVIDER_ENDPOINTS.FANSDB,
    theporndb_api_key: theporndbApiKey || rawSettings.theporndb_api_key || '',
    theporndb_endpoint: theporndbEndpoint || rawSettings.theporndb_endpoint || PROVIDER_ENDPOINTS.THEPORNDB,
  }), [
    rawSettings,
    tmdbApiKey,
    tmdbBearerToken,
    omdbApiKey,
    stashdbApiKey,
    stashdbEndpoint,
    fansdbApiKey,
    fansdbEndpoint,
    theporndbApiKey,
    theporndbEndpoint,
  ]);

  const hasConfiguredApiKeys = useMemo(() => {
    return Boolean(
      (tmdbApiKey || tmdbBearerToken || rawSettings.tmdb_api_key || rawSettings.tmdb_bearer_token || '').trim() ||
      (omdbApiKey || rawSettings.omdb_api_key || '').trim() ||
      (stashdbApiKey || rawSettings.stashdb_api_key || '').trim() ||
      (fansdbApiKey || rawSettings.fansdb_api_key || '').trim() ||
      (theporndbApiKey || rawSettings.theporndb_api_key || rawSettings.theporndb_api_token || '').trim()
    );
  }, [
    tmdbApiKey,
    tmdbBearerToken,
    omdbApiKey,
    stashdbApiKey,
    fansdbApiKey,
    theporndbApiKey,
    rawSettings,
  ]);

  const handleApplyDocsValues = (values) => {
    if (docsModal === 'docs_tmdb') {
      if (values.tmdb_api_key !== undefined) setTmdbApiKey(values.tmdb_api_key);
      if (values.tmdb_bearer_token !== undefined) setTmdbBearerToken(values.tmdb_bearer_token);
    } else if (docsModal === 'docs_omdb') {
      if (values.omdb_api_key !== undefined) setOmdbApiKey(values.omdb_api_key);
    } else if (docsModal === 'docs_stashdb') {
      if (values.stashdb_api_key !== undefined) setStashdbApiKey(values.stashdb_api_key);
      if (values.stashdb_endpoint !== undefined) setStashdbEndpoint(values.stashdb_endpoint);
    } else if (docsModal === 'docs_fansdb') {
      if (values.fansdb_api_key !== undefined) setFansdbApiKey(values.fansdb_api_key);
      if (values.fansdb_endpoint !== undefined) setFansdbEndpoint(values.fansdb_endpoint);
    } else if (docsModal === 'docs_theporndb') {
      if (values.theporndb_api_key !== undefined) setTheporndbApiKey(values.theporndb_api_key);
      if (values.theporndb_endpoint !== undefined) setTheporndbEndpoint(values.theporndb_endpoint);
    }
    setDocsModal(null);
  };

  const handleCloseDocsModal = () => {
    setDocsModal(null);
  };

  // Dynamic steps calculation
  const getStepsList = () => {
    if (configChoice === 'import') {
      return ['welcome', 'choice', 'completion'];
    }
    const base = ['welcome', 'choice', 'profile', 'content-type'];
    let scrapers = [];
    if (contentTypeChoice === 'sfw') {
      scrapers = ['tmdb', 'omdb'];
    } else if (contentTypeChoice === 'nsfw') {
      scrapers = ['stashdb', 'fansdb', 'theporndb'];
    } else if (contentTypeChoice === 'hybrid') {
      scrapers = ['tmdb', 'omdb', 'stashdb', 'fansdb', 'theporndb'];
    }
    return [...base, ...scrapers, 'folders', 'completion'];
  };

  const stepsList = getStepsList();

  const goToStep = (nextStep, direction = 'forward') => {
    setStepDirection(direction);
    setStep(Math.max(1, Math.min(nextStep, stepsList.length)));
  };

  const handleNext = () => goToStep(step + 1, 'forward');
  const handlePrev = () => goToStep(step - 1, 'backward');

  // Step 2: Handle config JSON import
  const handleFileImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        const reference = getInitialFormValues({});
        const { valid, settings } = validateImportedSettings(imported, reference);

        if (!valid || !settings) {
          throw new Error('Invalid structure or value types');
        }

        const normalizedSettings = buildSettingsPayload(getInitialFormValues(settings, t));

        const importPayload = {
          ...normalizedSettings,
          onboarding_completed: true,
        };
        await importSettingsMutation.mutateAsync(importPayload);
        queryClient.setQueryData(QK.settings, importPayload);
        
        toast(t('settingsPage.sections.backup.importSuccess') || 'Settings imported successfully!', 'success');
        
        // Skip straight to completion/finish step
        goToStep(stepsList.indexOf('completion') + 1, 'forward');
      } catch (err) {
        console.error(err);
        toast(t('settingsPage.sections.backup.importError') || 'Failed to import settings file.', 'danger');
      } finally {
        setIsImporting(false);
      }
    };

    reader.readAsText(file);
  };

  // Central Generic Provider Validator
  const validateProvider = async (provider, payload, options = {}) => {
    const { requiredFields = [], missingMessage, successToast, failToast } = options;

    for (const field of requiredFields) {
      if (!payload[field] || !String(payload[field]).trim()) {
        setProviderValidations(prev => ({
          ...prev,
          [provider]: { valid: false, message: missingMessage || `${provider.toUpperCase()} API Key is required.` }
        }));
        return;
      }
    }

    setIsValidatingApi(true);
    try {
      const response = await validateApiKeysMutation.mutateAsync(payload);
      const res = response?.[provider];

      if (res?.valid) {
        setProviderValidations(prev => ({
          ...prev,
          [provider]: { valid: true, message: res.message || '' }
        }));
        toast(successToast || `${provider.toUpperCase()} credentials successfully verified.`, 'success');
        setTimeout(() => {
          handleNext();
        }, 800);
      } else {
        const errorMsg = res?.message || t('onboarding.toasts.verificationFailed') || 'Verification failed.';
        setProviderValidations(prev => ({
          ...prev,
          [provider]: { valid: false, message: errorMsg }
        }));
        toast(failToast || errorMsg, 'danger');
      }
    } catch (err) {
      console.error(err);
      setProviderValidations(prev => ({
        ...prev,
        [provider]: { valid: false, message: t('onboarding.toasts.connectionError') || 'Connection error during validation.' }
      }));
      toast(t('onboarding.toasts.validationServerFailed') || 'Failed to connect to validation server.', 'danger');
    } finally {
      setIsValidatingApi(false);
    }
  };

  // Validate TMDB Credentials
  const validateTmdb = () => validateProvider('tmdb', {
    tmdb_api_key: tmdbApiKey,
    tmdb_bearer_token: tmdbBearerToken,
  }, {
    requiredFields: ['tmdb_api_key', 'tmdb_bearer_token'],
    missingMessage: 'Both TMDB API Key (v3) and Read Access Token (v4) are required.',
    successToast: t('onboarding.toasts.tmdbVerified') || 'TMDB credentials successfully verified.',
    failToast: t('onboarding.toasts.tmdbVerificationFailed') || 'TMDB credentials verification failed.',
  });

  // Validate OMDB Credentials
  const validateOmdb = () => validateProvider('omdb', {
    omdb_api_key: omdbApiKey,
  }, {
    requiredFields: ['omdb_api_key'],
    missingMessage: t('onboarding.toasts.omdbKeyRequired') || 'OMDB API Key is required.',
    successToast: t('onboarding.toasts.omdbVerified') || 'OMDB API Key successfully verified.',
    failToast: t('onboarding.toasts.omdbVerificationFailed') || 'OMDB verification failed.',
  });

  // Validate StashDB Credentials
  const validateStashdb = () => validateProvider('stashdb', {
    stashdb_api_key: stashdbApiKey,
    stashdb_endpoint: stashdbEndpoint,
  }, {
    requiredFields: ['stashdb_api_key'],
    missingMessage: t('onboarding.toasts.stashdbKeyRequired') || 'StashDB API Key is required.',
    successToast: t('onboarding.toasts.stashdbVerified') || 'StashDB credentials successfully verified.',
    failToast: t('onboarding.toasts.stashdbVerificationFailed') || 'StashDB credentials verification failed.',
  });

  // Validate FansDB Credentials
  const validateFansdb = () => validateProvider('fansdb', {
    fansdb_api_key: fansdbApiKey,
    fansdb_endpoint: fansdbEndpoint,
  }, {
    requiredFields: ['fansdb_api_key'],
    missingMessage: t('onboarding.toasts.fansdbKeyRequired') || 'FansDB API Key is required.',
    successToast: t('onboarding.toasts.fansdbVerified') || 'FansDB credentials successfully verified.',
    failToast: t('onboarding.toasts.fansdbVerificationFailed') || 'FansDB credentials verification failed.',
  });

  // Validate PornDB Credentials
  const validateTheporndb = () => validateProvider('theporndb', {
    theporndb_api_key: theporndbApiKey,
    theporndb_endpoint: theporndbEndpoint,
  }, {
    requiredFields: ['theporndb_api_key'],
    missingMessage: t('onboarding.toasts.theporndbKeyRequired') || 'ThePornDB API Key is required.',
    successToast: t('onboarding.toasts.theporndbVerified') || 'ThePornDB credentials successfully verified.',
    failToast: t('onboarding.toasts.theporndbVerificationFailed') || 'ThePornDB credentials verification failed.',
  });

  // Pick Folders
  const pickScanDir = async () => {
    const path = await selectFolder(scanDir);
    if (path) setScanDir(path);
  };

  const pickLibraryPath = async () => {
    const path = await selectFolder(libraryPath);
    if (path) setLibraryPath(path);
  };

  // Validate Folders
  const validateDirs = async () => {
    if (orgMode !== 'move_organize') {
      // In register or rename in-place, target library is not validated or required
      setFolderValidation({ valid: true, message: t('onboarding.toasts.foldersReady') || 'Folders validated and ready.' });
      toast(t('onboarding.toasts.folderValid') || 'Folder configuration is valid.', 'success');
      setTimeout(() => {
        handleNext();
      }, 800);
      return;
    }

    if (!libraryPath.trim()) {
      setFolderValidation({ valid: false, message: t('onboarding.toasts.targetFolderRequired') || 'Target library folder is required.' });
      return;
    }

    setIsValidatingFolders(true);
    try {
      const response = await validateFoldersMutation.mutateAsync({
        default_scan_dir: scanDir,
        folder_library_path: libraryPath,
        folder_move_to_library: true,
      });

      if (response.valid) {
        setFolderValidation({ valid: true, message: t('onboarding.toasts.foldersReady') || 'Folders validated and ready.' });
        toast(t('onboarding.toasts.folderValid') || 'Folder configuration is valid.', 'success');
        setTimeout(() => {
          handleNext();
        }, 800);
      } else {
        const firstErr = response.errors 
          ? (response.errors.scanFolder || response.errors.targetFolder)
          : response.code;
        setFolderValidation({ valid: false, message: firstErr || t('onboarding.toasts.validationFailed') || 'Validation failed.' });
        toast(firstErr || t('onboarding.toasts.folderValidationFailed') || 'Folder validation failed.', 'danger');
      }
    } catch (err) {
      console.error(err);
      setFolderValidation({ valid: false, message: t('onboarding.toasts.folderValidationFailed') || 'Folder validation failed.' });
    } finally {
      setIsValidatingFolders(false);
    }
  };

  // Final Save Settings & Onboard Complete
  const handleFinish = async () => {
    setIsFinishing(true);

    try {
      if (configChoice === 'import') {
        toast(t('onboarding.toasts.onboardingCompleted') || 'Onboarding completed! Welcome to SWAYA.', 'success');
        navigate(ROUTES.DASHBOARD);
        return;
      }

      const defaultValues = getInitialFormValues(rawSettings, t);
      const normalizedSettings = buildSettingsPayload({
        ...defaultValues,
        ui_language: locale,
        user_name: userName.trim() || defaultValues.user_name || 'Admin',
        avatar_path: avatarPath || defaultValues.avatar_path,
        // adult config
        include_adult: contentTypeChoice === 'nsfw' || contentTypeChoice === 'hybrid',
        // api keys
        tmdb_api_key: tmdbApiKey,
        tmdb_bearer_token: tmdbBearerToken,
        omdb_api_key: omdbApiKey,
        stashdb_api_key: stashdbApiKey,
        stashdb_endpoint: stashdbEndpoint,
        fansdb_api_key: fansdbApiKey,
        fansdb_endpoint: fansdbEndpoint,
        theporndb_api_key: theporndbApiKey,
        theporndb_endpoint: theporndbEndpoint,
        // folders
        default_scan_dir: scanDir,
        folder_library_path: orgMode === 'move_organize' ? libraryPath : '',
        folder_organization_enabled: orgMode !== 'register',
        folder_move_to_library: orgMode === 'move_organize',
      });

      const payload = {
        ...normalizedSettings,
        onboarding_completed: true,
      };

      await updateSettingsMutation.mutateAsync(payload);
      queryClient.setQueryData(QK.settings, payload);
      toast(t('onboarding.toasts.onboardingCompleted') || 'Onboarding completed! Welcome to SWAYA.', 'success');
      
      // Navigate to dashboard
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      console.error(err);
      toast(t('onboarding.toasts.saveConfigFailed') || 'Failed to save configuration settings.', 'danger');
    } finally {
      setIsFinishing(false);
    }
  };

  return {
    locale,
    setLocale,
    t,
    step,
    stepsList,
    goToStep,
    stepDirection,
    configChoice,
    setConfigChoice,
    isImporting,
    handleFileImport,
    langSearch,
    setLangSearch,
    AVAILABLE_LANGUAGES,
    filteredLanguages,
    userName,
    setUserName,
    avatarPath,
    setAvatarPath,
    contentTypeChoice,
    setContentTypeChoice,
    tmdbApiKey,
    setTmdbApiKey,
    tmdbBearerToken,
    setTmdbBearerToken,
    tmdbValidation,
    validateTmdb,
    omdbApiKey,
    setOmdbApiKey,
    omdbValidation,
    validateOmdb,
    stashdbApiKey,
    setStashdbApiKey,
    stashdbEndpoint,
    setStashdbEndpoint,
    stashdbValidation,
    validateStashdb,
    fansdbApiKey,
    setFansdbApiKey,
    fansdbEndpoint,
    setFansdbEndpoint,
    fansdbValidation,
    validateFansdb,
    theporndbApiKey,
    setTheporndbApiKey,
    theporndbEndpoint,
    setTheporndbEndpoint,
    theporndbValidation,
    validateTheporndb,
    validateProvider,
    providerValidations,
    setProviderValidations,
    isValidatingApi,
    scanDir,
    setScanDir,
    pickScanDir,
    libraryPath,
    setLibraryPath,
    pickLibraryPath,
    validateDirs,
    isValidatingFolders,
    folderValidation,
    isFinishing,
    handleFinish,
    handlePrev,
    handleNext,
    docsModal,
    setDocsModal,
    docsModalSettings,
    updateSettingsMutation,
    handleApplyDocsValues,
    handleCloseDocsModal,
    orgMode,
    setOrgMode,
    hasConfiguredApiKeys,
  };
}
