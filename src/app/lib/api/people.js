import { fetchJson, uploadFile } from '../http';

export const people = {
  getDetail: (personId) => fetchJson(`/api/people/${personId}`),
  getCredits: (personId, mediaType, { page, pageSize, excludeKnownFor, source, tag, studio, local_only, sort_by } = {}) => fetchJson(
    `/api/people/${personId}/${mediaType}`,
    {
      params: {
        page,
        page_size: pageSize,
        exclude_known_for: excludeKnownFor,
        source,
        tag,
        studio,
        local_only,
        sort_by,
      },
    }
  ),
  getCreditBackdrops: (personId, tmdbId, mediaType) => fetchJson(
    `/api/people/${personId}/credit-backdrops`,
    {
      params: {
        tmdb_id: tmdbId,
        media_type: mediaType || 'movie',
      },
    }
  ),
  getAll: ({ search, role, sortBy, sort_by, gender, include_inactive, is_active, adult_only, filter_rating, offset, limit } = {}) => fetchJson(
    '/api/people',
    {
      params: {
        search,
        role,
        sort_by: sort_by || sortBy,
        gender,
        include_inactive,
        is_active,
        adult_only,
        filter_rating,
        offset,
        limit,
      },
    }
  ),
  getList: ({ search, role, sortBy, sort_by, gender, include_inactive, is_active, adult_only, filter_rating, page = 1, pageSize = 20 } = {}) => {
    const limit = pageSize;
    const offset = (page - 1) * limit;

    return people.getAll({ search, role, sortBy, sort_by, gender, include_inactive, is_active, adult_only, filter_rating, offset, limit }).then((data) => {
      const totalPages = Math.ceil((data.total || 0) / limit);
      return {
        ...data,
        page,
        total_pages: totalPages,
      };
    });
  },
  updateStatus: (personId, payload) => fetchJson(`/api/people/${personId}/status`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  overrideProfile: (personId, profilePath) => fetchJson(`/api/people/${personId}/profile`, {
    method: 'POST',
    body: JSON.stringify({ profile_path: profilePath }),
  }),
  overrideBackdrop: (personId, backdropPath) => fetchJson(`/api/people/${personId}/backdrop`, {
    method: 'POST',
    body: JSON.stringify({ backdrop_path: backdropPath }),
  }),
  uploadProfile: (personId, file) => uploadFile(`/api/people/${personId}/upload-profile`, file),
  uploadBackdrop: (personId, file) => uploadFile(`/api/people/${personId}/upload-backdrop`, file),
  linkSource: (personId, source, externalId, overrides, profileUrl) => fetchJson(`/api/people/${personId}/link`, {
    method: 'POST',
    body: JSON.stringify({
      source,
      external_id: externalId,
      overrides,
      profile_url: profileUrl
    }),
  }),
  linkSourcePreview: (personId, source, externalId) => fetchJson(`/api/people/${personId}/link/preview?source=${source}&external_id=${externalId}`),
  unlinkSource: (personId, source, action) => fetchJson(`/api/people/${personId}/unlink`, {
    method: 'POST',
    body: JSON.stringify({ source, action }),
  }),
  setPrimarySource: (personId, source) => fetchJson(`/api/people/${personId}/primary`, {
    method: 'POST',
    body: JSON.stringify({ source }),
  }),
  setFieldRouting: (personId, routing) => fetchJson(`/api/people/${personId}/field-routing`, {
    method: 'POST',
    body: JSON.stringify({ routing }),
  }),
  saveCustomFields: (personId, fields) => fetchJson(`/api/people/${personId}/custom-fields`, {
    method: 'POST',
    body: JSON.stringify({ fields }),
  }),
  scrapeHealthyCeleb: (personId, url) => {
    const params = new URLSearchParams();
    if (url) params.append('url', url);
    return fetchJson(`/api/people/${personId}/scrape-healthyceleb?${params.toString()}`, {
      method: 'POST',
    });
  },
  delete: (personId) => fetchJson(`/api/people/${personId}`, {
    method: 'DELETE',
  }),
  searchTmdb: (query, { language, adultOnly, page, source } = {}) => {
    const params = new URLSearchParams({ query });
    if (language) params.append('language', language);
    if (adultOnly !== undefined) params.append('adult_only', String(adultOnly));
    if (page) params.append('page', String(page));
    if (source) params.append('source', source);
    return fetchJson(`/api/people/search-tmdb?${params.toString()}`);
  },
  addFromTmdb: (payload) => {
    const body = typeof payload === 'object' ? payload : { tmdb_id: payload };
    return fetchJson('/api/people/add-tmdb', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  getEnrichmentStatus: () => fetchJson('/api/people/enrichment-status'),
};
