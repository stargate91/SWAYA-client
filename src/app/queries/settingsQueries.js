import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';
export * from './settingsMutations';

export const useSettingsQuery = () => useQuery({
  queryKey: QK.settings,
  queryFn: () => api.settings.get(),
});

export const useChangelogQuery = (options = {}) => useQuery({
  queryKey: QK.changelog,
  queryFn: async () => {
    const data = await api.settings.getChangelog();
    if (data.status === 'success') {
      return data.content || '';
    }
    throw new Error(data.message || 'Failed to load changelog');
  },
  ...options,
});
