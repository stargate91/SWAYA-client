import { fetchJson } from '../http';

export const tags = {
  getAll: (targetType, isAdult) => {
    let tType = targetType;
    let adult = isAdult;
    if (typeof targetType === 'boolean') {
      adult = targetType;
      tType = undefined;
    }
    return fetchJson('/api/tags', { params: { target_type: tType, is_adult: adult } });
  },
  create: (payload) => fetchJson('/api/tags', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  update: (tagId, payload) => fetchJson(`/api/tags/${tagId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  delete: (tagId) => fetchJson(`/api/tags/${tagId}`, {
    method: 'DELETE',
  }),
  searchFeederbox: (query, limit = 15) => fetchJson('/api/tags/feederbox/search', {
    params: { q: query, limit },
  }),
  downloadFeederboxAsset: (tagName, mediaType = 'img') => fetchJson('/api/tags/feederbox/download-asset', {
    method: 'POST',
    body: JSON.stringify({ tag_name: tagName, media_type: mediaType }),
  }),
};

export default tags;
