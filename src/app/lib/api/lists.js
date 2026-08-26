import { fetchJson, uploadFile, fetchAsset } from '../http';

export const lists = {
  getLists: (includeAdult = false) => fetchJson('/api/lists', { params: { include_adult: includeAdult } }),
  createList: (payload) => fetchJson('/api/lists', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateList: (listId, payload) => fetchJson(`/api/lists/${listId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  deleteList: (listId) => fetchJson(`/api/lists/${listId}`, {
    method: 'DELETE',
  }),
  getListDetails: (listId, params = {}) => fetchJson(`/api/lists/${listId}`, { params }),
  exportList: async (listId) => {
    const response = await fetchAsset(`/api/lists/${listId}/export`);
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(errorText || 'Failed to export list');
    }
    const blob = await response.blob();
    const disposition = response.headers.get('Content-Disposition');
    let filename = 'list.swayapack';
    if (disposition && disposition.includes('filename=')) {
      const match = disposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) filename = match[1];
    }
    return { blob, filename };
  },
  importList: (file) => uploadFile('/api/lists/import', file),
  addToList: (listId, payload) => fetchJson(`/api/lists/${listId}/items`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  removeFromList: (listId, itemId) => fetchJson(`/api/lists/${listId}/items/${itemId}`, {
    method: 'DELETE',
  }),
  uploadListImage: (listId, file) => uploadFile(`/api/lists/${listId}/upload-image`, file),
  overrideListImage: (listId, path) => fetchJson(`/api/lists/${listId}/image`, {
    method: 'POST',
    body: JSON.stringify({ path }),
  }),
  getItemMembership: (itemId) => {
    if (typeof itemId === 'string' && itemId.includes('_')) {
      const parts = itemId.split('_');
      let provider = parts[0];
      const externalId = parts.slice(1).join('_');
      return fetchJson('/api/lists/item-membership', {
        params: { provider, external_id: externalId }
      });
    }
    const num = Number(itemId);
    if (itemId && !isNaN(num)) {
      return fetchJson('/api/lists/item-membership', {
        params: { item_id: num }
      });
    }
    return fetchJson(`/api/lists/item-membership/${itemId}`);
  },
};

