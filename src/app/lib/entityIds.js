/**
 * entityIds.js
 *
 * Centralized utility for entity ID parsing, prefix stripping,
 * canonical matching, and React Query cache key variant generation.
 */

export const KNOWN_ENTITY_PREFIXES = Object.freeze([
  'tv_', 'tv:',
  'collection_', 'collection:',
  'stash_', 'stash:', 'stashdb_', 'stashdb:',
  'tmdb_', 'tmdb:',
  'theporndb_', 'theporndb:',
  'fansdb_', 'fansdb:',
  'local_', 'local:',
  'person_', 'person:',
  'studio_', 'studio:',
  'video_', 'video:',
  'movie_', 'movie:',
  'scene_', 'scene:',
  'extra_', 'extra:',
  'item_', 'item:',
]);

const PREFIX_REGEX = /^(tv|collection|stashdb|stash|theporndb|fansdb|tmdb|local|person|studio|video|movie|scene|extra|item)[_:]/i;

/**
 * Strips known entity prefixes (e.g. 'tv_123', 'tmdb:456', 'stashdb_abc') returning the clean ID.
 *
 * @param {string|number|null|undefined} rawId
 * @returns {string}
 */
export function stripEntityPrefix(rawId) {
  if (rawId === null || rawId === undefined) return '';
  return String(rawId).replace(PREFIX_REGEX, '');
}

/**
 * Parses an entity ID into its structural parts.
 *
 * @param {string|number|null|undefined} rawId
 * @returns {{ rawId: string|number|null, prefix: string|null, cleanId: string, numericId: number|null }}
 */
export function parseEntityId(rawId) {
  if (rawId === null || rawId === undefined) {
    return { rawId: null, prefix: null, cleanId: '', numericId: null };
  }
  const str = String(rawId);
  const match = str.match(PREFIX_REGEX);
  const prefix = match ? match[1].toLowerCase() : null;
  const cleanId = str.replace(PREFIX_REGEX, '');
  const num = Number(cleanId);
  const numericId = !isNaN(num) && cleanId.trim() !== '' ? num : null;

  return { rawId, prefix, cleanId, numericId };
}

/**
 * Canonical check if two entity IDs represent the same entity regardless of prefixes or type (string/number).
 *
 * @param {string|number|null|undefined} idA
 * @param {string|number|null|undefined} idB
 * @returns {boolean}
 */
export function matchesEntityId(idA, idB) {
  if (idA === idB) return true;
  if (idA === null || idA === undefined || idB === null || idB === undefined) return false;
  if (String(idA) === String(idB)) return true;

  const cleanA = stripEntityPrefix(idA);
  const cleanB = stripEntityPrefix(idB);
  if (!cleanA || !cleanB) return false;

  return cleanA === cleanB;
}

/**
 * Given a raw entity ID (possibly prefixed), returns all cache-key ID variants
 * that might exist across different query caches.
 *
 * @param {string|number|null|undefined} rawId
 * @returns {Array<string|number>}
 */
export function getEntityIdVariants(rawId) {
  if (rawId === null || rawId === undefined) return [];
  const str = String(rawId);
  const cleanId = stripEntityPrefix(rawId);
  const ids = new Set([
    str,
    cleanId,
    `tv_${cleanId}`,
    `tmdb_${cleanId}`,
    `movie_${cleanId}`,
    `scene_${cleanId}`,
    `video_${cleanId}`,
    `local_${cleanId}`,
  ]);
  const num = Number(cleanId);
  if (!isNaN(num) && cleanId.trim() !== '') {
    ids.add(num);
  }
  return [...ids];
}

/**
 * Checks if an entity ID has a TV prefix.
 * @param {string|number|null|undefined} id
 * @returns {boolean}
 */
export function isTvEntityId(id) {
  if (!id) return false;
  const str = String(id);
  return str.startsWith('tv_') || str.startsWith('tv:');
}

/**
 * Checks if an entity ID has a collection prefix.
 * @param {string|number|null|undefined} id
 * @returns {boolean}
 */
export function isCollectionEntityId(id) {
  if (!id) return false;
  const str = String(id);
  return str.startsWith('collection_') || str.startsWith('collection:');
}

/**
 * Checks if an entity ID has a TMDb prefix.
 * @param {string|number|null|undefined} id
 * @returns {boolean}
 */
export function isTmdbEntityId(id) {
  if (!id) return false;
  const str = String(id);
  return str.startsWith('tmdb_') || str.startsWith('tmdb:');
}

/**
 * Checks if an entity ID has any adult provider prefix (StashDB, ThePornDB, FansDB).
 * @param {string|number|null|undefined} id
 * @returns {boolean}
 */
export function isAdultEntityId(id) {
  if (!id) return false;
  const str = String(id);
  return (
    str.startsWith('stash_') ||
    str.startsWith('stash:') ||
    str.startsWith('stashdb_') ||
    str.startsWith('stashdb:') ||
    str.startsWith('theporndb_') ||
    str.startsWith('theporndb:') ||
    str.startsWith('fansdb_') ||
    str.startsWith('fansdb:')
  );
}

/**
 * Checks if an entity ID has a Stash/StashDB prefix.
 * @param {string|number|null|undefined} id
 * @returns {boolean}
 */
export function isStashEntityId(id) {
  if (!id) return false;
  const str = String(id);
  return str.startsWith('stash_') || str.startsWith('stash:') || str.startsWith('stashdb_') || str.startsWith('stashdb:');
}

/**
 * Checks if an entity ID has a ThePornDB prefix.
 * @param {string|number|null|undefined} id
 * @returns {boolean}
 */
export function isThePornDbEntityId(id) {
  if (!id) return false;
  const str = String(id);
  return str.startsWith('theporndb_') || str.startsWith('theporndb:');
}

/**
 * Checks if an entity ID has a FansDB prefix.
 * @param {string|number|null|undefined} id
 * @returns {boolean}
 */
export function isFansDbEntityId(id) {
  if (!id) return false;
  const str = String(id);
  return str.startsWith('fansdb_') || str.startsWith('fansdb:');
}

/**
 * Checks if an entity ID has any recognized entity prefix.
 * @param {string|number|null|undefined} id
 * @returns {boolean}
 */
export function hasEntityPrefix(id) {
  if (id === null || id === undefined) return false;
  return PREFIX_REGEX.test(String(id));
}

/**
 * Checks if an entity ID has any external provider prefix.
 * @param {string|number|null|undefined} id
 * @returns {boolean}
 */
export function hasProviderPrefix(id) {
  if (id === null || id === undefined) return false;
  return /^(theporndb|fansdb|stashdb|stash|tmdb)[_:]/i.test(String(id));
}

/**
 * Ensures an ID string starts with the given prefix (e.g., 'theporndb_', 'tmdb_', 'stashdb_').
 *
 * @param {string|number|null|undefined} id
 * @param {string} prefix
 * @returns {string}
 */
export function ensurePrefixedId(id, prefix) {
  if (!id) return '';
  const strId = String(id).trim();
  const normalizedPrefix = prefix.endsWith('_') || prefix.endsWith(':') ? prefix : `${prefix}_`;
  return strId.toLowerCase().startsWith(normalizedPrefix.toLowerCase())
    ? strId
    : `${normalizedPrefix}${strId}`;
}

/**
 * Prefixes an entity ID with prefix unless it already has a provider/entity prefix.
 *
 * @param {string} prefix
 * @param {string|number|null|undefined} value
 * @returns {string}
 */
export function prefixedId(prefix, value) {
  if (!value) return '';
  const str = String(value).trim();
  return hasProviderPrefix(str) ? str : ensurePrefixedId(str, prefix);
}

/**
 * Parses a media ID into its provider prefix and external ID components.
 * Defaults provider to 'tmdb' if no prefix is present.
 *
 * @param {string|number|null|undefined} rawId
 * @returns {{ provider: string|null, externalId: string|null }}
 */
export function parseMediaProviderAndExternalId(rawId) {
  if (rawId === null || rawId === undefined || rawId === '') {
    return { provider: null, externalId: null };
  }
  const strId = String(rawId);
  if (strId.includes('_')) {
    const parts = strId.split('_');
    return { provider: parts[0], externalId: parts.slice(1).join('_') };
  }
  if (strId.includes(':')) {
    const parts = strId.split(':');
    return { provider: parts[0], externalId: parts.slice(1).join(':') };
  }
  return { provider: 'tmdb', externalId: strId };
}

