import { fetchJson } from '../http';

export const recommendations = {
  get: (language, includeAdult) => fetchJson('/api/recommendations', {
    params: { language, include_adult: includeAdult },
  }),
  getRecentlyAdded: (page, limit, includeAdult, language, mediaType) => fetchJson('/api/recommendations/recently-added', {
    params: { page, limit, include_adult: includeAdult, language, media_type: mediaType },
  }),
  getRecentlyActivatedPeople: (page, limit, includeAdult, gender) => fetchJson('/api/recommendations/recently-activated-people', {
    params: { page, limit, include_adult: includeAdult, gender },
  }),
  getRecentlyFollowedStudios: (page, limit, includeAdult) => fetchJson('/api/recommendations/recently-followed-studios', {
    params: { page, limit, include_adult: includeAdult },
  }),
  addToWatchlist: ({ tmdbId, mediaItemId, type, isAdult, title, posterPath, year }) => fetchJson('/api/watchlist', {
    method: 'POST',
    body: JSON.stringify({
      tmdb_id: tmdbId,
      media_item_id: mediaItemId,
      type,
      is_adult: isAdult,
      title,
      poster_path: posterPath,
      year,
    }),
  }),
  removeFromWatchlist: (tmdbId) => fetchJson(`/api/watchlist/${tmdbId}`, {
    method: 'DELETE',
  }),
  discover: (genreId, year) => fetchJson('/api/recommendations/discover', {
    params: { genre_id: genreId, year },
  }),
  getAdultDiscoveryPaginated: (provider, focusTag, sortMode, page, limit = 20) => fetchJson('/api/recommendations/discover/adult', {
    params: { provider, focus_tag: focusTag, sort_mode: sortMode, page, limit },
  }),
};

export default recommendations;
