import { fetchJson, uploadFile, fetchAsset } from '../http';
import { normalizeMediaType } from '../mediaTypes';
import { API_BASE } from '../backend';

const resolveMediaItemParams = (itemId, mediaType) => {
  let strId = String(itemId);
  if (strId.includes('_')) {
    const parts = strId.split('_');
    let provider = parts[0];
    const externalId = parts.slice(1).join('_');
    return { provider, external_id: externalId };
  }
  const num = Number(strId);
  if (!isNaN(num)) {
    return { item_id: num };
  }
  const prefix = mediaType === 'scene' ? 'stashdb' : 'tmdb';
  return { provider: prefix, external_id: strId };
};

export const media = {
  preview: (filePath) => fetchJson('/api/media/preview', {
    method: 'POST',
    body: JSON.stringify({ file_path: filePath }),
  }),
  getPreviewUrl: (itemId, options = {}) => {
    const params = new URLSearchParams();
    if (options.resolution) params.append('resolution', String(options.resolution));
    const qs = params.toString();
    return `${API_BASE}/api/v1/media/${itemId}/preview${qs ? `?${qs}` : ''}`;
  },
  checkPreviewAvailable: async (itemId, options = {}) => {
    const url = `${API_BASE}/api/v1/media/${itemId}/preview`;
    try {
      const response = await fetchAsset(url, options);
      if (response.ok) {
        return url;
      }
    } catch (err) {
      if (err.name === 'AbortError') throw err;
    }
    return null;
  },
  getPlaybackInfo: (itemId) => fetchJson(`/api/media/playback-info/${itemId}`),
  updateProgress: (payload) => fetchJson('/api/media/progress', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  update: (payload) => fetchJson('/api/media/update', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  bulkUpdate: (payload) => fetchJson('/api/media/bulk-update', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateStatus: (itemId, payload) => {
    const normalizedPayload = { ...payload };
    if (normalizedPayload.media_type) {
      normalizedPayload.media_type = normalizeMediaType(
        normalizedPayload.media_type,
        normalizedPayload.media_type,
      );
    }
    return fetchJson(`/api/item/${itemId}/status`, {
      method: 'POST',
      body: JSON.stringify(normalizedPayload),
    });
  },
  play: (itemId) => fetchJson('/api/media/play', {
    method: 'POST',
    body: JSON.stringify({ item_id: String(itemId) }),
  }),
  activeSessions: () => fetchJson('/api/media/active-sessions'),
  resetProgress: (itemId) => fetchJson(`/api/library/item/${itemId}/reset-progress`, {
    method: 'POST',
  }),
  bulkWatched: (itemIds, isWatched, mediaType) => fetchJson('/api/media/bulk-watched', {
    method: 'POST',
    body: JSON.stringify({ item_ids: itemIds, is_watched: isWatched, media_type: mediaType }),
  }),
  addPeak: (itemId, payload) => fetchJson(`/api/library/item/${itemId}/peaks`, {
    method: 'POST',
    body: payload ? JSON.stringify(payload) : undefined,
  }),
  deletePeak: (itemId, logId) => fetchJson(`/api/library/item/${itemId}/peaks/${logId}`, {
    method: 'DELETE',
  }),
  overrideBackdrop: (itemId, backdropPath, mediaType) => fetchJson('/api/item/backdrop', {
    method: 'POST',
    params: resolveMediaItemParams(itemId, mediaType),
    body: JSON.stringify({ backdrop_path: backdropPath, media_type: mediaType }),
  }),
  overridePoster: (itemId, posterPath, mediaType) => fetchJson('/api/item/poster', {
    method: 'POST',
    params: resolveMediaItemParams(itemId, mediaType),
    body: JSON.stringify({ poster_path: posterPath, media_type: mediaType }),
  }),
  uploadPoster: (itemId, file, mediaType) => {
    const cleanParams = resolveMediaItemParams(itemId, mediaType);
    return uploadFile('/api/item/upload-poster', file, {
      params: cleanParams,
      extraFields: mediaType ? { media_type: mediaType } : {},
    });
  },
  uploadBackdrop: (itemId, file, mediaType) => {
    const cleanParams = resolveMediaItemParams(itemId, mediaType);
    return uploadFile('/api/item/upload-backdrop', file, {
      params: cleanParams,
      extraFields: mediaType ? { media_type: mediaType } : {},
    });
  },
  overrideLogo: (itemId, logoPath, mediaType) => fetchJson('/api/item/logo', {
    method: 'POST',
    params: resolveMediaItemParams(itemId, mediaType),
    body: JSON.stringify({ logo_path: logoPath, media_type: mediaType }),
  }),
  uploadLogo: (itemId, file, mediaType) => {
    const cleanParams = resolveMediaItemParams(itemId, mediaType);
    return uploadFile('/api/item/upload-logo', file, {
      params: cleanParams,
      extraFields: mediaType ? { media_type: mediaType } : {},
    });
  },
  trackItem: (tmdbId, mediaType, isAdult) => {
    const cleanParams = resolveMediaItemParams(tmdbId, mediaType);
    const params = {
      ...cleanParams,
      media_type: mediaType,
      is_adult: isAdult !== undefined ? String(isAdult) : undefined,
    };
    return fetchJson('/api/library/item/track', {
      method: 'POST',
      params,
    });
  },
  untrackItem: (tmdbId, mediaType) => {
    const cleanParams = resolveMediaItemParams(tmdbId, mediaType);
    const params = {
      ...cleanParams,
      media_type: mediaType,
    };
    return fetchJson('/api/library/item/untrack', {
      method: 'POST',
      params,
    });
  },
};
