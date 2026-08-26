import { fetchJson, uploadFile } from '../http';

export const metadata = {
  globalSearch: ({ query, source, searchType, type, includeAdult, include_adult, page }) => {
    const effectiveType = searchType || type || 'all';
    const effectiveAdult = includeAdult !== undefined ? includeAdult : include_adult;
    const params = new URLSearchParams({
      query: String(query || '').trim(),
      source: source || 'tmdb',
      search_type: effectiveType,
    });
    if (effectiveAdult !== undefined && effectiveAdult !== null) {
      params.set('include_adult', effectiveAdult ? 'true' : 'false');
    }
    if (page !== undefined && page !== null) {
      params.set('page', String(page));
    }
    return fetchJson(`/api/metadata/search/global?${params.toString()}`);
  },
  search: ({ query, itemType, year, season, episode, includeAdult, provider }) => {
    const params = new URLSearchParams({
      query: String(query || '').trim(),
      item_type: itemType,
    });
    if (year?.trim()) {
      params.set('year', year.trim());
    }
    if (season?.trim()) {
      params.set('season', season.trim());
    }
    if (episode?.trim()) {
      params.set('episode', episode.trim());
    }
    if (includeAdult !== undefined && includeAdult !== null) {
      params.set('include_adult', includeAdult ? 'true' : 'false');
    }
    if (provider) {
      params.set('provider', provider);
    }
    return fetchJson(`/api/metadata/search?${params.toString()}`);
  },
  resolve: (payload) => fetchJson('/api/metadata/resolve', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  bulkResolve: (payload) => fetchJson('/api/metadata/bulk-resolve', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getItemFullMetadata: (itemId, mediaType, { language } = {}) => {
    const params = new URLSearchParams();
    if (mediaType) params.append('media_type', mediaType);
    if (language) params.append('language', language);
    const query = params.toString();
    return fetchJson(`/api/metadata/item/${itemId}/full-metadata${query ? `?${query}` : ''}`);
  },
  syncLanguage: () => fetchJson('/api/metadata/sync-language', {
    method: 'POST',
  }),
  refresh: (payload) => fetchJson('/api/metadata/refresh', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getRefreshStatus: ({ targetType, targetId, language } = {}) => {
    const params = new URLSearchParams();
    if (targetType) params.append('target_type', targetType);
    if (targetId !== undefined && targetId !== null) params.append('target_id', String(targetId));
    if (language) params.append('language', language);
    return fetchJson(`/api/metadata/refresh-status?${params.toString()}`);
  },
  getStudios: ({ search, isActive, adultOnly, relationType, sortBy, page = 1, pageSize = 50 } = {}) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (isActive !== undefined && isActive !== null) params.append('is_active', String(isActive));
    if (adultOnly !== undefined && adultOnly !== null) params.append('adult_only', String(adultOnly));
    if (relationType) params.append('relation_type', relationType);
    if (sortBy) params.append('sort_by', sortBy);
    params.append('page', String(page));
    params.append('page_size', String(pageSize));
    return fetchJson(`/api/metadata/studios?${params.toString()}`);
  },
  updateStudioStatus: (studioId, payload) => fetchJson(`/api/metadata/studios/${studioId}/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(typeof payload === 'boolean' ? { is_active: payload } : payload),
  }),
  getStudioDetail: (studioId) => fetchJson(`/api/metadata/studios/${studioId}`),
  discoverStudioItems: (studioId, { mediaType = 'movies', source, page = 1, pageSize = 24, sort_by } = {}) => {
    const params = new URLSearchParams();
    if (mediaType) params.append('media_type', mediaType);
    if (source) params.append('source', source);
    params.append('page', String(page));
    params.append('page_size', String(pageSize));
    if (sort_by) params.append('sort_by', sort_by);
    return fetchJson(`/api/metadata/studios/${studioId}/discover?${params.toString()}`);
  },
  overrideStudioLogo: (studioId, logoPath) => fetchJson(`/api/metadata/studios/${studioId}/logo`, {
    method: 'POST',
    body: JSON.stringify({ logo_path: logoPath }),
  }),
  uploadStudioLogo: (studioId, file) => uploadFile(`/api/metadata/studios/${studioId}/upload-logo`, file),
};

