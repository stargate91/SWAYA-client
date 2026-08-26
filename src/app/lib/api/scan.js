import { fetchJson } from '../http';

export const scan = {
  getStatus: () => fetchJson('/api/scan-status'),
  start: (payload) => fetchJson('/api/scan', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  retry: (payload) => fetchJson('/api/scan/retry', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
};

export default scan;
