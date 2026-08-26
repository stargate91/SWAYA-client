import { isSceneMediaType, isTvLikeMediaType, isVideoMediaType } from '@/lib/mediaTypes';
import { prefixedId } from '@/lib/entityIds';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SEARCH: (query, source, type) => {
    if (!query && !source && !type) return '/search';
    const params = new URLSearchParams();
    if (query) params.append('q', String(query).trim());
    if (source) params.append('source', String(source));
    if (type) params.append('type', String(type));
    const qs = params.toString();
    return `/search${qs ? `?${qs}` : ''}`;
  },
  LISTS: '/lists',
  TORRENT: '/torrent',
  STATISTICS: '/statistics',
  SETTINGS: '/settings',
  ABOUT: '/about',
  ONBOARDING: '/onboarding',
  ORGANIZER: '/organizer',
  LIBRARY: '/library',
  TAGS: '/tags',
  HISTORY: '/history',
  RATINGS: '/my-ratings',
  PLAYER: (id, startQ = '') => `/player/${id}${startQ}`,
  MOVIE_DETAIL: (id) => `/library/movie/${id}`,
  TV_DETAIL: (id) => `/library/tv/${id}`,
  SCENE_DETAIL: (id) => `/library/scene/${id}`,
  VIDEO_DETAIL: (id) => `/library/video/${id}`,
  PEOPLE_DETAIL: (id) => `/library/people/${id}`,
  PEOPLE_EDIT: (id) => `/library/people/${id}/edit`,
  COLLECTION_DETAIL: (id) => `/library/collection/${id}`,
  STUDIO_DETAIL: (id, params) => {
    const base = `/library/studio/${id}`;
    if (!params) return base;
    const searchParams = new URLSearchParams();
    if (params.view) searchParams.append('view', params.view);
    if (params.source) searchParams.append('source', params.source);
    if (params.media_type) searchParams.append('media_type', params.media_type);
    const qs = searchParams.toString();
    return qs ? `${base}?${qs}` : base;
  },
  MEDIA_DETAIL: (type, id) => {
    const norm = String(type || '').toLowerCase();
    if (norm === 'people' || norm === 'person' || norm === 'performer') return ROUTES.PEOPLE_DETAIL(id);
    if (norm === 'studio' || norm === 'studios') return ROUTES.STUDIO_DETAIL(id);
    if (norm === 'collection' || norm === 'collections') return ROUTES.COLLECTION_DETAIL(id);
    if (norm === 'tv' || norm === 'tvshow' || norm === 'tvshows') return ROUTES.TV_DETAIL(id);
    if (norm === 'video' || norm === 'videos') return ROUTES.VIDEO_DETAIL(id);
    if (norm === 'scene' || norm === 'scenes') return ROUTES.SCENE_DETAIL(id);
    return ROUTES.MOVIE_DETAIL(id);
  },
};

const normalizeSource = (source) => String(source || '').trim().toLowerCase();

const isThePornDbSource = (source) => {
  return normalizeSource(source) === 'theporndb';
};

const firstValue = (...values) => {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    const stringValue = String(value).trim();
    if (stringValue && stringValue !== '0') {
      return stringValue;
    }
  }
  return '';
};

export const getCreditSource = (item, fallbackSource) => {
  const explicitSource = normalizeSource(item?.source || fallbackSource);
  if (explicitSource) return explicitSource;
  if (item?.rating_theporndb || item?.theporndb_id) return 'theporndb';
  if (item?.fansdb_id) return 'fansdb';
  if (item?.stashdb_id) return 'stashdb';
  return 'tmdb';
};

export const getCreditDetailPath = (item, fallbackType, fallbackSource) => {
  const resolvedType = item?.media_type || item?.type || fallbackType;
  const resolvedTypeKey = String(resolvedType || '').toLowerCase();
  const source = getCreditSource(item, fallbackSource);

  if (resolvedTypeKey === 'person' || resolvedTypeKey === 'performer') {
    const personId = firstValue(item?.person_id, item?.id);
    return personId ? ROUTES.PEOPLE_DETAIL(personId) : '';
  }

  if (resolvedTypeKey === 'studio') {
    const studioId = firstValue(item?.studio_id, item?.id);
    return studioId ? ROUTES.STUDIO_DETAIL(studioId) : '';
  }

  if (isSceneMediaType(resolvedType)) {
    const isVid = resolvedTypeKey === 'video' || resolvedTypeKey === 'videos';
    const detailFn = isVid ? ROUTES.VIDEO_DETAIL : ROUTES.SCENE_DETAIL;
    if (item?.in_library) {
      return detailFn(item.library_item_id || item.id);
    }
    const prefix = isThePornDbSource(source) ? 'theporndb' : (source === 'fansdb' ? 'fansdb' : 'stashdb');
    const externalId = firstValue(
      item?.stashdb_id,
      item?.fansdb_id,
      item?.theporndb_id,
      item?.external_id,
      item?.uuid,
      item?.id
    );
    return externalId ? detailFn(prefixedId(prefix, externalId)) : '';
  }

  if (isTvLikeMediaType(resolvedType) || resolvedTypeKey === 'tvshows' || resolvedTypeKey === 'tvshow') {
    const tvId = firstValue(item?.library_tv_tmdb_id, item?.tv_tmdb_id, item?.tmdb_id, item?.id);
    return tvId ? ROUTES.TV_DETAIL(tvId) : '';
  }

  if (item?.in_library) {
    return ROUTES.MOVIE_DETAIL(item.library_item_id || item.id);
  }

  if (isThePornDbSource(source)) {
    const externalId = firstValue(
      item?.theporndb_id,
      item?.external_id,
      item?.uuid,
      item?.id,
      item?.tmdb_id
    );
    return externalId ? ROUTES.MOVIE_DETAIL(prefixedId('theporndb', externalId)) : '';
  }

  const tmdbId = firstValue(item?.tmdb_id, item?.id);
  return tmdbId ? ROUTES.MOVIE_DETAIL(`tmdb_${tmdbId}`) : '';
};

export const navigateToCreditDetail = (navigate, item, fallbackType, fallbackSource) => {
  const path = getCreditDetailPath(item, fallbackType, fallbackSource);
  if (path) {
    navigate(path, { state: { allowAdult: true } });
  }
};

/**
 * Resolves standard library entity path (movies, tv, scenes, videos, people, studios).
 */
export const resolveLibraryItemPath = (item, fallbackType) => {
  if (!item) return '';
  const type = String(fallbackType || item.type || item.media_type || '').toLowerCase();

  if (type === 'people' || type === 'person' || type === 'performer') {
    const id = item.person_id || item.library_item_id || item.media_item_id || item.id;
    return id ? ROUTES.PEOPLE_DETAIL(id) : '';
  }
  if (type === 'studios' || type === 'studio' || type === 'company' || type === 'network') {
    const id = item.studio_id || item.library_item_id || item.media_item_id || item.id;
    return id ? ROUTES.STUDIO_DETAIL(id) : '';
  }
  if (type === 'tv' || type === 'tvshows' || type === 'tvshow' || type === 'show' || type === 'episode' || type === 'season') {
    const tvId = item.tv_tmdb_id || item.library_tv_tmdb_id || item.tv_id || item.tmdb_id || item.library_item_id || item.media_item_id || item.id;
    return tvId ? ROUTES.TV_DETAIL(tvId) : '';
  }
  if (type === 'scenes' || type === 'scene' || type === 'videos' || type === 'video' || isVideoMediaType(type)) {
    const isVid = type === 'video' || type === 'videos' || item.type === 'video' || isVideoMediaType(item.type);
    const id = item.library_item_id || item.media_item_id || item.id || item.external_id || item.match_id;
    return id ? (isVid ? ROUTES.VIDEO_DETAIL(id) : ROUTES.SCENE_DETAIL(id)) : '';
  }
  if (type === 'collection' || type === 'collections') {
    const id = item.tmdb_id || item.library_item_id || item.id;
    return id ? ROUTES.COLLECTION_DETAIL(id) : '';
  }
  const id = item.library_item_id || item.media_item_id || item.id || item.tmdb_id || item.external_id || item.match_id;
  return id ? ROUTES.MOVIE_DETAIL(id) : '';
};

/**
 * Navigates directly to a library entity detail view.
 */
export const navigateToLibraryItem = (navigate, item, fallbackType, options = { state: { allowAdult: true } }) => {
  const path = resolveLibraryItemPath(item, fallbackType);
  if (path) {
    navigate(path, options);
  }
};
