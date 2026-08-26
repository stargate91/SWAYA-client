import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';

const SETTINGS_INVALIDATION_KEYS = [
  QK.settings,
  QK.organizer,
  QK.organizerCount,
  QK.stats,
  QK.lists,
  QK.recommendations,
  QK.adultDiscoveryInfinite,
];

export const useUpdateSettingsMutation = () => useMutation({
  mutationFn: (settings) => api.settings.update(settings),
  meta: {
    invalidates: SETTINGS_INVALIDATION_KEYS,
  },
});

export const useImportSettingsMutation = () => useMutation({
  mutationFn: (payload) => api.settings.import(payload),
  meta: {
    invalidates: SETTINGS_INVALIDATION_KEYS,
  },
});

export const useClearDatabaseMutation = () => useMutation({
  mutationFn: (options) => api.settings.clearDatabase(options),
  meta: {
    resetAllQueries: true,
  },
});

export const useValidateFoldersMutation = () => useMutation({
  mutationFn: (payload) => api.settings.validateFolders(payload),
});

export const useValidateApiKeysMutation = () => useMutation({
  mutationFn: (payload) => api.settings.validateApiKeys(payload),
});

export const useUploadAvatarMutation = () => useMutation({
  mutationFn: (file) => api.settings.uploadAvatar(file),
  meta: {
    invalidates: [QK.settings],
  },
});

