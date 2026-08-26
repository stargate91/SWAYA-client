import { ROUTES } from './routes';
import { isVideoMediaType } from './mediaTypes';
import { ensurePrefixedId } from './entityIds';

export { ensurePrefixedId };

/**
 * Resolves the target route path for a search result item.
 */
export const resolveSearchResultPath = (item, fallbackSource) => {
  if (!item) return null;
  if (item.target_path) {
    return item.target_path;
  }

  const provider = item.provider || fallbackSource;

  if (item.media_type === 'movie') {
    const prefix = provider === 'theporndb' ? 'theporndb_' : 'tmdb_';
    const id = ensurePrefixedId(item.id, prefix);
    return ROUTES.MOVIE_DETAIL(id);
  }

  if (item.media_type === 'tv') {
    return ROUTES.TV_DETAIL(item.id);
  }

  if (item.media_type === 'person') {
    const pStr = String(item.id);
    if (pStr.includes(':')) {
      return ROUTES.PEOPLE_DETAIL(pStr);
    }
    const prov = provider?.toLowerCase();
    if (prov && prov !== 'local') {
      return ROUTES.PEOPLE_DETAIL(`${prov}:${pStr}`);
    }
    return ROUTES.PEOPLE_DETAIL(pStr);
  }

  if (item.media_type === 'scene' || item.media_type === 'video' || isVideoMediaType(item.media_type)) {
    if (item.media_type === 'video' || isVideoMediaType(item.media_type)) {
      return ROUTES.VIDEO_DETAIL(item.id);
    }
    const prefix = provider === 'theporndb' ? 'theporndb_' : provider === 'fansdb' ? 'fansdb_' : 'stashdb_';
    const id = ensurePrefixedId(item.id, prefix);
    return ROUTES.SCENE_DETAIL(id);
  }

  if (item.media_type === 'collection') {
    const id = ensurePrefixedId(item.id, 'tmdb_');
    return ROUTES.COLLECTION_DETAIL(id);
  }

  if (item.media_type === 'studio' || item.media_type === 'company' || item.media_type === 'network') {
    const sStr = String(item.id);
    if (sStr.includes(':')) {
      return ROUTES.STUDIO_DETAIL(sStr);
    }
    const prov = (item.provider || fallbackSource || 'tmdb').toLowerCase();
    if (prov && prov !== 'local') {
      return ROUTES.STUDIO_DETAIL(`${prov}:${sStr}`);
    }
    return ROUTES.STUDIO_DETAIL(sStr);
  }

  return null;
};
