/**
 * normalizeMediaEntity.js
 *
 * Centralizes entity data assembly for card rendering.
 * Every component that renders a media/person card can call
 * normalizeMediaEntity(item, opts) to get a consistent shape.
 */

import {
  resolveMediaImageUrl,
  buildImageProxyUrl,
  getPosterImagePath,
  getTvPosterImagePath,
  getProfileImagePath,
  getBackdropImagePath,
  pickFirstImagePath,
} from './imageUrls';
import {
  isPersonMediaType,
  isSceneMediaType,
  isTvLikeMediaType,
  normalizeMediaType,
} from './mediaTypes';
import { isNsfwMode } from '@/stores/useLibraryModeStore';
import {
  formatReleaseDate,
  formatTvAirYearRange,
  formatYear,
  formatDuration,
  formatFileSize,
} from '@/lib/formatters';
import { stripEntityPrefix, isAdultEntityId } from './entityIds';

// ─── Media Type Detection ────────────────────────────────────────
export const resolveMediaType = (item, fallback = 'movie') => {
  if (!item) return fallback;
  return item.media_type || item.type || (item.title ? 'movie' : fallback);
};

const isPersonEntity = (item) => {
  const mt = resolveMediaType(item);
  return isPersonMediaType(mt) || (!item.title && !!item.profile_path);
};

const isStudioEntity = (item) => {
  const mt = resolveMediaType(item);
  return mt === 'studio' || mt === 'company' || (!item.title && !!item.logo_path);
};

const isSceneEntity = (item) => {
  const mt = resolveMediaType(item);
  return isSceneMediaType(mt);
};

const isTvEntity = (item) => {
  const mt = resolveMediaType(item);
  return isTvLikeMediaType(mt);
};

// ─── Title ───────────────────────────────────────────────────────

export const resolveTitle = (item, fallback = 'Unknown') => {
  if (!item) return fallback;
  return item.title || item.name || item.filename || item.label || fallback;
};

// ─── Date Formatting ─────────────────────────────────────────────
export { formatReleaseDate } from './formatters';

// ─── Image URL ───────────────────────────────────────────────────

const resolveImageUrl = (item, opts = {}) => {
  if (item.card_image_url) {
    return resolveMediaImageUrl(item.card_image_url, 'poster');
  }
  const { context } = opts;
  const isPerson = isPersonEntity(item);
  const isScene = isSceneEntity(item);
  const isTv = isTvEntity(item);
  const isStudio = isStudioEntity(item);

  if (isPerson) {
    const path = getProfileImagePath(item);
    return path ? resolveMediaImageUrl(path, 'poster') : '';
  }

  if (isStudio) {
    return item.logo_path ? resolveMediaImageUrl(item.logo_path, 'logo') : '';
  }

  if (isScene) {
    const path = pickFirstImagePath(
      item.still_path,
      item.local_still_path,
      item.backdrop_path,
      item.local_backdrop_path,
      item.poster_path,
      item.local_poster_path,
    );
    return path ? resolveMediaImageUrl(path, context === 'search' ? 'posterThumb' : 'scene_stills') : '';
  }

  if (context === 'continueWatching') {
    const path = pickFirstImagePath(item.still_path, item.backdrop_path);
    return path ? resolveMediaImageUrl(path, item.still_path ? 'still' : 'backdrop') : '';
  }

  // Movie / TV / Collection — poster preferred
  const path = isTv ? getTvPosterImagePath(item) : getPosterImagePath(item);
  return path ? resolveMediaImageUrl(path, context === 'search' ? 'posterThumb' : 'poster') : '';
};

// ─── Ratings ─────────────────────────────────────────────────────

const resolveRatings = (item) => {
  const isPerson = isPersonEntity(item);
  const isScene = isSceneEntity(item);

  if (isPerson) {
    return { ratingImdb: null, ratingTmdb: null, ratingTheporndb: null };
  }

  const isThePornDb = (typeof item.id === 'string' && (item.id.startsWith('theporndb_') || item.id.startsWith('theporndb:'))) || !!item.rating_theporndb;

  const ratingImdb = (isScene ? null : item.rating_imdb) || null;
  const ratingTmdb = (isScene ? null : (item.rating_tmdb || (isThePornDb ? null : item.rating) || item.vote_average)) || null;
  const ratingTheporndb = item.rating_theporndb || null;

  return { ratingImdb, ratingTmdb, ratingTheporndb };
};

// ─── Performers (gender-preference filtered) ─────────────────────

const filterPeopleByGender = (people = [], settings = {}) => {
  if (!Array.isArray(people) || !people.length) return [];
  const pref = settings?.adult_gender_preference;
  if (!pref || pref === 'all') return people;

  const matchGender = (person) => {
    const g = person?.gender;
    if (g === undefined || g === null) return true;
    const gStr = String(g).toLowerCase().trim();
    if (pref === 'female') return gStr === '1' || gStr === 'female' || gStr === 'f';
    if (pref === 'male') return gStr === '2' || gStr === 'male' || gStr === 'm';
    return true;
  };

  const filtered = people.filter(matchGender);
  return filtered.length > 0 ? filtered : people;
};

const resolvePerformers = (item, settings, maxCount = 4, opts = {}) => {
  const allPeople = item.people || item.performers || item.cast || [];
  if (!allPeople.length) return [];

  const mt = resolveMediaType(item);
  const isAdultScene = normalizeMediaType(mt) === 'scene';
  const isAdultContext = isNsfwMode(opts.sessionMode) || opts.isAdultContext || item.is_adult || isAdultScene;
  const filtered = isAdultContext ? filterPeopleByGender(allPeople, settings) : allPeople;

  const sliced = filtered.slice(0, maxCount);
  if (opts.context === 'search' || opts.context === 'credits') {
    const provider = opts.provider || item.provider || item.source || 'tmdb';
    return sliced.map(p => {
      const rawId = p.id || p.name;
      const id = String(rawId).includes(':') ? rawId : `${provider}:${rawId}`;
      return { ...p, id };
    });
  }
  return sliced;
};

// ─── Subtitle ────────────────────────────────────────────────────

const resolveSubtitle = (item, opts = {}) => {
  if (item.card_subtitle) {
    return item.card_subtitle;
  }
  const { context, settings } = opts;
  const isPerson = isPersonEntity(item);
  const isScene = isSceneEntity(item);
  const isTv = isTvEntity(item);
  const isStudio = isStudioEntity(item);

  if (isStudio) {
    const count = item.library_count ?? item.items_count ?? 0;
    if (opts.t) {
      return opts.t('library.sort.libraryCountValue', { count }) || `${count} ${count === 1 ? 'item' : 'items'}`;
    }
    return `${count} ${count === 1 ? 'item' : 'items'}`;
  }

  if (context === 'credits') {
    const itemType = resolveMediaType(item);
    const isSceneOrThePornDb = isSceneMediaType(itemType) || item.source === 'theporndb';
    if (isSceneOrThePornDb) {
      const studioName = item.studio || item.studio_name || item.parent_studio_name;
      if (studioName) return studioName;
      return formatReleaseDate(item);
    }
    return item.character || item.year || '';
  }

  if (context === 'drawer') {
    if (isPerson) {
      const roleStr = item.role || item.people_role || item.known_for_department || 'Actor';
      let knownForStr = '';
      if (Array.isArray(item.known_for) && item.known_for.length > 0) {
        knownForStr = item.known_for
          .map(k => (typeof k === 'string' ? k : (k?.title || k?.name || '')))
          .filter(Boolean)
          .slice(0, 3)
          .join(', ');
      } else if (typeof item.known_for === 'string' && item.known_for.trim()) {
        knownForStr = item.known_for.trim();
      }

      const count = item.item_count ?? item.scenes_count ?? item.media_count ?? item.movies_count;
      const countStr = count != null ? `${count} items` : '';

      const parts = [roleStr, knownForStr, countStr].filter(Boolean);
      return parts.join(' - ');
    }
    return item.year || item.media_type || '';
  }

  if (isPerson) {
    const roleStr = item.people_role || item.known_for_department || item.role || '';
    let knownForStr = '';
    if (Array.isArray(item.known_for) && item.known_for.length > 0) {
      knownForStr = item.known_for
        .map(k => (typeof k === 'string' ? k : (k?.title || k?.name || '')))
        .filter(Boolean)
        .slice(0, 3)
        .join(', ');
    } else if (typeof item.known_for === 'string' && item.known_for.trim()) {
      knownForStr = item.known_for.trim();
    }

    const count = item.item_count ?? item.scenes_count ?? item.media_count ?? item.movies_count;
    const countStr = count != null ? `${count} items` : '';

    const parts = [roleStr, knownForStr, countStr].filter(Boolean);
    return parts.join(' - ');
  }

  if (isScene) {
    const datePart = formatReleaseDate(item);
    const rawPeople = item.people || item.performers || [];
    const isAdultContext = isNsfwMode(opts.sessionMode) || opts.isAdultContext || item.is_adult || true;
    const performersList = isAdultContext ? filterPeopleByGender(rawPeople, settings) : rawPeople;
    const performersStr = performersList.map(p => p.name || p.title).filter(Boolean).slice(0, 3).join(', ');
    const parts = [];
    if (performersStr) parts.push(performersStr);
    if (datePart) parts.push(datePart);
    return parts.join(' • ');
  }

  if (isTv) {
    const tvYear = formatTvAirYearRange(item);
    const parts = [];
    if (tvYear) parts.push(tvYear);
    if (item.info) parts.push(item.info);
    return parts.join(' • ');
  }

  // Movie default
  const parts = [];
  const year = formatYear(item.release_date || item.year);
  if (year) parts.push(year);
  if (item.info) parts.push(item.info);
  return parts.join(' • ');
};

// ─── Blur Detection ──────────────────────────────────────────────

const resolveShouldBlur = (item, opts = {}) => {
  const { sessionMode, context, provider, isAdultContext } = opts;
  if (isNsfwMode(sessionMode)) return false;
  if (context !== 'search') return false;
  if (item.should_blur_sfw !== undefined) return !!item.should_blur_sfw;

  const mt = resolveMediaType(item);
  const isAdultScene = normalizeMediaType(mt) === 'scene';
  const prov = (item.provider || item.source || provider || '').toLowerCase();
  const isAdultProv = prov === 'theporndb' || prov === 'stashdb' || prov === 'fansdb';
  const isAdultId = isAdultEntityId(item.id);

  return Boolean(
    isAdultContext ||
    isAdultProv ||
    isAdultId ||
    item.is_adult ||
    item.adult ||
    isAdultScene
  );
};

// ─── Main Export ─────────────────────────────────────────────────

/**
 * Normalizes a raw entity into a consistent shape for card rendering.
 *
 * @param {Object} item - Raw entity from any API source
 * @param {Object} opts
 * @param {string} opts.context - 'library' | 'search' | 'recommendations' | 'credits' | 'drawer' | 'continueWatching'
 * @param {Object} opts.settings - User settings (for gender preference)
 * @param {string} opts.sessionMode - 'sfw' | 'nsfw'
 * @param {boolean} opts.isAdultContext - Whether the context is adult-specific
 * @returns {Object} Normalized entity props
 */
export function normalizeMediaEntity(item, opts = {}) {
  if (!item || typeof item !== 'object') return null;

  const { settings } = opts;
  const ratings = resolveRatings(item);
  const isPerson = isPersonEntity(item);
  const isScene = isSceneEntity(item);
  const isTv = isTvEntity(item);
  const isStudio = isStudioEntity(item);

  const shouldBlur = resolveShouldBlur(item, opts);
  let imageUrl = resolveImageUrl(item, opts);
  if (shouldBlur && imageUrl) {
    imageUrl = buildImageProxyUrl(imageUrl, { blur: true });
  }

  let subtitle = resolveSubtitle(item, opts);
  if (opts.context === 'search') {
    if (isScene || isStudio) {
      subtitle = undefined;
    } else if (item.media_type === 'collection') {
      subtitle = 'Movie Collection';
    }
  }

  return {
    id: item.id,
    cleanId: stripEntityPrefix(item.id),
    mediaType: resolveMediaType(item),
    isPerson,
    isScene,
    isTv,
    isStudio,

    title: resolveTitle(item),
    subtitle,
    date: isScene ? formatReleaseDate(item) : undefined,
    imageUrl,
    aspect: isStudio ? 'logo' : (isScene ? 'landscape' : 'poster'),
    cardSize: (isScene || isStudio) ? 'scene' : undefined,

    ...ratings,

    isWatched: item.is_watched || false,
    isFavorite: item.is_favorite || false,
    inLibrary: item.in_library,

    performers: !isStudio ? resolvePerformers(item, settings, 4, opts) : [],
    shouldBlur,
  };
}

/**
 * Normalizes full media detail payloads (movie, TV show, scene) for detail pages.
 *
 * @param {Object} item - Raw backend detail JSON
 * @param {Object} opts
 * @returns {Object|null} Normalized media detail model
 */
export function normalizeMediaDetail(item, opts = {}) {
  if (!item || typeof item !== 'object') return null;

  const { t } = opts;
  const mediaType = normalizeMediaType(resolveMediaType(item));
  const isScene = mediaType === 'scene' || isSceneMediaType(item.media_type || item.type);
  const isTv = isTvLikeMediaType(mediaType);
  const isMovie = !isScene && !isTv;

  const cleanId = stripEntityPrefix(item.id);
  const title = resolveTitle(item, isMovie ? 'Movie' : isScene ? 'Scene' : 'TV Show');
  const originalTitle = item.original_title || item.original_name || null;
  const showOriginalTitle = Boolean(originalTitle && title && originalTitle.toLowerCase() !== title.toLowerCase());
  const tagline = item.tagline || '';
  const taglineText = tagline ? `"${tagline}"` : '';

  const ratings = resolveRatings(item);
  const ratingImdb = item.rating_imdb || null;
  const ratingTmdb = item.rating_tmdb || null;
  const ratingTheporndb = item.rating_theporndb || null;

  const showImdb = !isScene && !!ratingImdb && Number(ratingImdb) > 0;
  const showTmdb = !isScene && !showImdb && !!ratingTmdb && Number(ratingTmdb) > 0;
  const showTheporndb = isScene
    ? (!!ratingTheporndb && Number(ratingTheporndb) > 0)
    : (!showImdb && !showTmdb && !!ratingTheporndb && Number(ratingTheporndb) > 0);

  const backdropPath = getBackdropImagePath(item);
  const posterPath = isTv ? getTvPosterImagePath(item) : getPosterImagePath(item);

  const backdropUrl = backdropPath ? resolveMediaImageUrl(backdropPath, 'backdrop') : '';
  const posterUrl = posterPath ? resolveMediaImageUrl(posterPath, 'poster') : '';

  let logoPath = item.logo_path || item.local_logo_path || '';
  if (!logoPath && isScene) {
    const c = item.companies?.[0];
    const n = item.networks?.[0];
    const studioLogo = c?.logo_path || c?.logo || c?.image || c?.logo_url;
    const networkLogo = n?.logo_path || n?.logo || n?.image || n?.logo_url;
    logoPath = studioLogo || networkLogo || '';
  }
  const logoUrl = logoPath ? resolveMediaImageUrl(logoPath, 'logo') : '';

  const durationSec = Number(item.technical?.duration || (item.runtime ? item.runtime * 60 : item.duration)) || 0;
  const formattedDuration = (isMovie || isScene)
    ? (item.formatted_duration || (durationSec > 0 ? formatDuration(durationSec, t) : ''))
    : '';

  const releaseDateFormatted = isMovie || isScene ? formatReleaseDate(item) : formatTvAirYearRange(item);

  // TV Seasons / Episodes counts
  let seasonsCount = 0;
  let episodesCount = 0;
  if (isTv && item.seasons) {
    const regularSeasons = item.seasons.filter(s => s.season_number > 0);
    seasonsCount = regularSeasons.length;
    episodesCount = regularSeasons.reduce((acc, s) => {
      if (s.episodes && s.episodes.length > 0) {
        return acc + s.episodes.length;
      }
      return acc + (s.episode_count || 0);
    }, 0);
  }

  const seasonsText = isTv && seasonsCount > 0
    ? (t ? (seasonsCount === 1 ? t('library.details.seasonSingular') : t('library.details.seasonPlural', { count: seasonsCount })) : `${seasonsCount} Seasons`)
    : '';

  const episodesText = isTv && episodesCount > 0
    ? (t ? (episodesCount === 1 ? t('library.details.episodeSingular') : t('library.details.episodePlural', { count: episodesCount })) : `${episodesCount} Episodes`)
    : '';

  const langText = item.original_language ? String(item.original_language).toUpperCase() : '';

  // Overview parsing
  const rawOverview = item.overview || item.details || item.synopsis || '';
  const overview = item.is_adult || isScene
    ? rawOverview
      .split('\n')
      .filter(line => !line.trim().startsWith('Studio:'))
      .join('\n')
      .trim()
    : rawOverview;

  const hasTechnicalPanel = Boolean(item.technical && (
    item.technical.resolution
    || item.technical.video_codec
    || item.technical.audio_codec
    || item.technical.duration
    || item.technical.size_bytes
    || item.technical.hdr_type
    || item.technical.bit_depth
    || item.technical.framerate
    || (isMovie && item.technical.edition && item.technical.edition !== 'none')
    || (isMovie && item.technical.source && item.technical.source !== 'none')
    || (isMovie && item.technical.audio_type && item.technical.audio_type !== 'none')
  ));

  const isOwned = item.in_library !== false;
  const isTracked = Boolean(item.is_tracked);

  const company = item.companies?.[0];
  const network = item.networks?.[0];
  const studioName = company?.name || item.studio || '';
  const networkName = network?.name || '';

  return {
    id: item.id,
    cleanId,
    title,
    originalTitle,
    showOriginalTitle,
    tagline,
    taglineText,
    overview,
    mediaType,
    isMovie,
    isTv,
    isScene,
    isAdult: Boolean(item.is_adult || isAdultEntityId(item.id) || isScene),

    // Images
    backdropUrl,
    posterUrl,
    logoUrl,
    backdropPath,
    posterPath,
    logoPath: logoPath || null,

    // Ratings & Status
    ...ratings,
    ratingImdb,
    ratingTmdb,
    ratingTheporndb,
    showImdb,
    showTmdb,
    showTheporndb,
    userRating: Number(item.user_rating) || 0,
    isFavorite: Boolean(item.is_favorite),
    isWatched: Boolean(item.is_watched),
    isOwned,
    isTracked,
    inLibrary: isOwned,
    libraryItemId: item.library_item_id || item.id,
    finishCount: Number(item.peaks_count || item.finish_count || 0),

    // Dates & Duration
    releaseDate: item.release_date || item.first_air_date || item.date || null,
    releaseDateFormatted,
    metaDate: releaseDateFormatted,
    runtime: Number(item.runtime) || 0,
    duration: durationSec,
    formattedDuration,
    seasonsCount,
    episodesCount,
    seasonsText,
    episodesText,
    langText,

    // Collections & Taxonomy
    genres: Array.isArray(item.genres) ? item.genres : [],
    normalizedGenres: Array.isArray(item.genres) ? item.genres : [],
    tags: Array.isArray(item.tags) ? item.tags : [],
    studios: Array.isArray(item.studios) ? item.studios : (item.studio ? [item.studio] : []),
    directors: Array.isArray(item.directors) ? item.directors : [],
    writers: Array.isArray(item.writers) ? item.writers : [],
    cast: Array.isArray(item.cast) ? item.cast : [],
    performers: Array.isArray(item.performers) ? item.performers : (Array.isArray(item.people) ? item.people : []),
    studioName,
    networkName,

    // Media File & Streams
    filePath: item.file_path || item.path || '',
    fileSize: Number(item.file_size) || 0,
    fileSizeFormatted: item.file_size ? formatFileSize(item.file_size) : '',
    videoStreams: Array.isArray(item.video_streams) ? item.video_streams : [],
    audioStreams: Array.isArray(item.audio_streams) ? item.audio_streams : [],
    subtitleStreams: Array.isArray(item.subtitle_streams) ? item.subtitle_streams : [],
    hasTechnicalPanel,

    // TV specific
    numberOfSeasons: Number(item.number_of_seasons) || seasonsCount,
    numberOfEpisodes: Number(item.number_of_episodes) || episodesCount,
    seasons: Array.isArray(item.seasons) ? item.seasons : [],

    // Raw payload reference
    raw: item,
  };
}

/**
 * Normalizes a single TV episode object.
 *
 * @param {Object} ep - Raw episode object
 * @returns {Object|null} Normalized episode model
 */
export function normalizeEpisodeItem(ep) {
  if (!ep || typeof ep !== 'object') return null;

  const stillPath = ep.still_path || ep.local_still_path || ep.backdrop_path;
  const stillUrl = stillPath ? resolveMediaImageUrl(stillPath, 'still') : '';
  const durationSec = Number(ep.duration) || 0;

  return {
    id: ep.id,
    cleanId: stripEntityPrefix(ep.id),
    tvId: ep.tv_id || ep.tv_show_id || ep.tv_tmdb_id,
    seasonNumber: Number(ep.season_number) || 1,
    episodeNumber: Number(ep.episode_number) || 0,
    title: ep.title || ep.name || `Episode ${ep.episode_number || ''}`,
    overview: ep.overview || '',
    airDate: ep.air_date || ep.release_date || null,
    airDateFormatted: formatReleaseDate(ep),
    stillUrl,
    duration: durationSec,
    durationFormatted: durationSec > 0 ? formatDuration(durationSec) : '',
    isWatched: Boolean(ep.is_watched),
    progressPercent: Number(ep.progress_percent) || 0,
    userRating: Number(ep.user_rating) || 0,
    filePath: ep.file_path || '',
    raw: ep,
  };
}

/**
 * Normalizes a person detail object.
 *
 * @param {Object} person - Raw person object
 * @returns {Object|null} Normalized person model
 */
export function normalizePersonDetail(person) {
  if (!person || typeof person !== 'object') return null;

  const profilePath = getProfileImagePath(person);
  const profileUrl = profilePath ? resolveMediaImageUrl(profilePath, 'poster') : '';
  const backdropPath = person.backdrop_path || person.local_backdrop_path;
  const backdropUrl = backdropPath ? resolveMediaImageUrl(backdropPath, 'backdrop') : '';

  return {
    id: person.id,
    cleanId: stripEntityPrefix(person.id),
    name: person.name || 'Unknown Person',
    biography: person.biography || person.bio || '',
    birthday: person.birthday || person.birth_date || null,
    deathday: person.deathday || person.death_date || null,
    placeOfBirth: person.place_of_birth || person.birth_place || '',
    gender: person.gender,
    profileUrl,
    backdropUrl,
    userRating: Number(person.user_rating) || 0,
    isFavorite: Boolean(person.is_favorite),
    isActive: person.is_active !== false,
    knownForDepartment: person.known_for_department || person.department || '',
    externalIds: person.external_ids || {},
    roles: Array.isArray(person.roles) ? person.roles : [],
    credits: Array.isArray(person.credits) ? person.credits : [],
    raw: person,
  };
}

/**
 * Normalizes an organizer row/candidate item.
 *
 * @param {Object} row - Raw organizer row JSON
 * @returns {Object|null} Normalized organizer row model
 */
export function normalizeOrganizerRow(row) {
  if (!row || typeof row !== 'object') return null;

  const rawId = row.id || row.file_path || row.path;
  const isExtra = Boolean(row.is_extra || String(rawId).startsWith('extra-'));

  return {
    id: rawId,
    cleanId: stripEntityPrefix(rawId),
    filePath: row.file_path || row.path || '',
    fileName: row.file_name || row.filename || '',
    fileSize: Number(row.file_size) || 0,
    fileSizeFormatted: row.file_size ? formatFileSize(row.file_size) : '',
    title: row.title || row.parsed_title || row.file_name || '',
    year: row.year || row.parsed_year || null,
    mediaType: normalizeMediaType(row.media_type || row.type || 'movie'),
    isExtra,
    isIgnored: Boolean(row.is_ignored || row.ignored),
    status: row.status || 'unmatched',
    matchedCandidate: row.matched_candidate || row.candidate || null,
    candidates: Array.isArray(row.candidates) ? row.candidates : [],
    raw: row,
  };
}

