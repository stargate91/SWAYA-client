import { settingsApi } from './settings/index';
import { fetchJson, uploadFile } from '../http';

export const settings = {
  ...settingsApi,
  getChangelog: () => fetchJson('/api/settings/changelog'),
  uploadAvatar: (file, userId = 1) => uploadFile(`/api/settings/user/${userId}/avatar`, file),
};

export * from './settings/index';
