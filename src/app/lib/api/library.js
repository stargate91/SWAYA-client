import { fetchJson } from '../http';

export const library = {
  getStats: (params = {}) => fetchJson('/api/library/stats', { params }),
  getRatingsStats: (params = {}) => fetchJson('/api/library/ratings/stats', { params }),
  getContinueWatching: (params = {}) => fetchJson('/api/library/continue-watching', { params }),
  getItems: (filterParams = {}, options = {}) => {
    const { pageSize, sortBy, ...rest } = filterParams;
    const params = {
      ...rest,
      page_size: pageSize,
      sort_by: sortBy,
    };
    return fetchJson('/api/library', { params, ...options });
  },
  getFilters: (filterParams, options = {}) => fetchJson('/api/library/filters', { params: filterParams, ...options }),
  getCollections: (filterParams = {}, options = {}) => {
    const { pageSize, status, sort_by, sort_direction, ...rest } = filterParams;
    const params = {
      ...rest,
      page_size: pageSize,
      collection_status: status,
      sort_by,
      sort_direction,
    };
    return fetchJson('/api/library/collections', { params, ...options });
  },
  getTags: (isAdult, page = 1, pageSize = 40, searchQuery = '') => fetchJson('/api/library/tags', {
    params: { is_adult: isAdult, page, page_size: pageSize, q: searchQuery },
  }),
  getTagItems: (tagName, isAdult) => fetchJson(`/api/library/tags/${encodeURIComponent(tagName)}/items`, {
    params: { is_adult: isAdult },
  }),
  getItemDetail: (itemId, { fullPeople = false, mediaType = null, provider = null, externalId = null } = {}) => {
    let finalProvider = provider;
    let finalExternalId = externalId;
    if (!finalProvider && !finalExternalId && typeof itemId === 'string' && itemId.includes('_')) {
      const parts = itemId.split('_');
      finalProvider = parts[0];
      finalExternalId = parts.slice(1).join('_');
    }

    if (finalProvider && finalExternalId) {
      return fetchJson('/api/library/item/detail', {
        params: {
          provider: finalProvider,
          external_id: finalExternalId,
          media_type: mediaType,
          full_people: fullPeople ? 'true' : undefined,
        },
      });
    }
    const cleanItemNum = Number(itemId);
    if (itemId && !isNaN(cleanItemNum)) {
      return fetchJson('/api/library/item/detail', {
        params: {
          item_id: cleanItemNum,
          full_people: fullPeople ? 'true' : undefined,
        },
      });
    }
    return fetchJson(`/api/library/item/${itemId}`, {
      params: { full_people: fullPeople ? 'true' : undefined, media_type: mediaType },
    });
  },
  getTvDetail: (tvId, { seasonsLimit = 5, initialEpisodesLimit = 4, language } = {}) => {
    const cleanTvId = String(tvId || '').replace(/^tv_/, '');
    return fetchJson(`/api/library/tv/${cleanTvId}`, {
      params: { seasons_limit: seasonsLimit, initial_episodes_limit: initialEpisodesLimit, language },
    });
  },
  getTvSeasonDetail: (tvId, seasonNumber) => fetchJson(`/api/library/tv/${tvId}/season/${seasonNumber}`),
  getTvNextEpisode: (tvId) => fetchJson(`/api/library/tv/${tvId}/next-episode`),
  getCollectionDetail: (collectionId, { language } = {}) => fetchJson(`/api/library/collection/${collectionId}`, {
    params: { language },
  }),
  deleteItem: (itemId, mediaType, mode) => fetchJson(`/api/library/item/${itemId}/delete`, {
    method: 'POST',
    params: { media_type: mediaType, mode },
  }),
};
