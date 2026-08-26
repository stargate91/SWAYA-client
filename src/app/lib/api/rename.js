import { fetchJson } from '../http';

export const rename = {
  start: (payload) => fetchJson('/api/rename/start', {
    method: 'POST',
    body: payload ? JSON.stringify(payload) : undefined,
  }),
  undo: (batchId) => fetchJson(`/api/rename/undo/${batchId}`, {
    method: 'POST',
  }),
};

export default rename;
