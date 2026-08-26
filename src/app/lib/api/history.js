import { fetchJson } from '../http';

export const history = {
  get: (params = {}) => fetchJson('/api/history', { params }),
  getBatchLogs: (batchId, params = {}) => fetchJson(`/api/history/batches/${batchId}/logs`, { params }),
  getWatched: (params = {}) => fetchJson('/api/library/watched-history', { params }),
  getPeaks: (params = {}) => fetchJson('/api/history/peaks-decorated', { params }),
};

export default history;
