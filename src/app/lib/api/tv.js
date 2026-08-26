import { fetchJson } from '../http';

export const tv = {
  getSeasons: (tvId, { language = 'en-US' } = {}) => fetchJson(`/api/metadata/tv/${tvId}/seasons`, { params: { language } }),
  getEpisodes: (tvId, seasonNumber, { language = 'en-US' } = {}) => fetchJson(`/api/metadata/tv/${tvId}/season/${seasonNumber}/episodes`, { params: { language } }),
};

export default tv;
