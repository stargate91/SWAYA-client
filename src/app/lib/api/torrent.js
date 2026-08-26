import { fetchJson } from '../http';

export const torrent = {
  getActive: () => fetchJson('/api/torrent/active'),
  search: ({ query, categories } = {}) => fetchJson('/api/torrent/search', {
    params: {
      query,
      categories,
    },
  }),
  download: (payload) => fetchJson('/api/torrent/download', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  pause: (hash) => fetchJson(`/api/torrent/active/${hash}/pause`, { method: 'POST' }),
  resume: (hash) => fetchJson(`/api/torrent/active/${hash}/resume`, { method: 'POST' }),
  delete: (hash, deleteFiles = false) => fetchJson(`/api/torrent/active/${hash}?delete_files=${deleteFiles}`, { method: 'DELETE' }),
};

export default torrent;
