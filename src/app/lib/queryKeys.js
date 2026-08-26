/**
 * Centralized query key constants and cache invalidation helpers.
 *
 * Instead of scattering 100+ invalidateQueries calls across mutation files,
 * use invalidateEntity(qc, rawId, opts) to invalidate all detail caches
 * for a given entity in one call.
 */

// ─── Query Key Constants ─────────────────────────────────────────
export const QK = Object.freeze({
  library: ['library'],
  libraryInfinite: ['libraryInfinite'],
  libraryCounts: ['libraryCounts'],
  libraryCollections: ['libraryCollections'],
  libraryTags: ['libraryTags'],
  libraryFilters: ['libraryFilters'],
  allTags: ['allTags'],
  tagItems: ['tagItems'],
  stats: ['stats'],
  ratingsStats: ['ratingsStats'],
  continueWatching: ['continue-watching'],
  watchedHistory: ['watched-history'],
  recommendations: ['recommendations'],
  recentlyAdded: ['recently-added'],
  recentlyActivated: ['recently-activated-people'],
  recentlyActivatedPeople: ['recently-activated-people'],
  recentlyFollowedStudios: ['recently-followed-studios'],
  discover: ['discover'],
  adultDiscoveryInfinite: ['adult-discovery-infinite'],
  lists: ['lists'],
  organizer: ['organizer'],
  organizerCount: ['organizer-count'],
  people: ['people'],
  peopleInfinite: ['people-infinite'],
  libraryItemDetail: ['library-item-detail'],
  libraryTvDetail: ['library-tv-detail'],
  fullMetadata: ['full-metadata'],
  libraryCollectionDetail: ['library-collection-detail'],
  personDetail: ['person-detail'],
  personCredits: ['person-credits'],
  listDetails: ['lists', 'details'],
  listMembership: ['lists', 'membership'],
  peaksHistory: ['peaks-history'],
  history: ['history'],
  historyBatchLogs: ['history', 'batch-logs'],
  scanStatus: ['scan-status'],
  hydrateStatus: ['hydrate-status'],
  collectionStatus: ['collection-status'],
  imageStatus: ['image-status'],
  studios: ['studios'],
  studiosInfinite: ['studios-infinite'],
  studioDetail: ['studio-detail'],
  studioDiscoverInfinite: ['studio-discover-infinite'],
  settings: ['settings'],
  activeTorrents: ['activeTorrents'],
  torrentSettings: ['torrentSettings'],
  torrentSearch: ['torrent-search'],
  activeSessions: ['activeSessions'],
  tvSeasons: ['tv-seasons'],
  tvEpisodes: ['tv-episodes'],
  metadataSearch: ['metadata-search'],
  personCreditBackdrops: ['person-credit-backdrops'],
  organizerParentCandidatesMatched: ['organizer-parent-candidates-matched'],
  organizerParentCandidatesManual: ['organizer-parent-candidates-manual'],
  globalSearch: ['global-search'],
  peopleSearchTmdb: ['people-search-tmdb'],
  mediaPreviewUrl: ['media-preview-url'],
  tvNextEpisode: ['tv-next-episode'],
  playbackInfo: ['playback-info'],
  organizerRenamePreview: ['organizer-rename-preview'],
  changelog: ['changelog'],
});

// ─── ID Variant Generator ────────────────────────────────────────
import { getEntityIdVariants } from './entityIds';
export { getEntityIdVariants };

// ─── Detail Key Groups ───────────────────────────────────────────
const DETAIL_GROUPS = [
  QK.libraryItemDetail[0],
  QK.libraryTvDetail[0],
  QK.fullMetadata[0],
  QK.libraryCollectionDetail[0],
  QK.personDetail[0],
  QK.studioDetail[0],
];

// ─── Core Invalidation Helper ────────────────────────────────────
/**
 * Invalidates all detail caches for a single entity, plus optional list-level caches.
 *
 * @param {import('@tanstack/react-query').QueryClient} qc
 * @param {string|number} rawId - The entity ID (may include prefixes like tv_, collection_, etc.)
 * @param {Object} [opts]
 * @param {boolean} [opts.lists]            - Invalidate library list + collections
 * @param {boolean} [opts.stats]            - Invalidate stats
 * @param {boolean} [opts.tags]             - Invalidate tags + filters
 * @param {boolean} [opts.recommendations]  - Invalidate recommendations
 * @param {boolean} [opts.continueWatching] - Invalidate continue watching
 * @param {boolean} [opts.watchedHistory]   - Invalidate watched history
 * @param {boolean} [opts.organizer]        - Invalidate organizer + count
 * @param {boolean} [opts.listsList]        - Invalidate user lists
 */
export const invalidateEntity = (qc, rawId, opts = {}) => {
  const variants = getEntityIdVariants(rawId);

  if (opts.detail !== false) {
    for (const group of DETAIL_GROUPS) {
      for (const id of variants) {
        qc.invalidateQueries({ queryKey: [group, id] });
      }
    }
  }

  if (opts.lists) {
    qc.invalidateQueries({ queryKey: QK.library });
    qc.invalidateQueries({ queryKey: QK.libraryCollections });
  }
  if (opts.stats) qc.invalidateQueries({ queryKey: QK.stats });
  if (opts.tags) {
    qc.invalidateQueries({ queryKey: QK.libraryTags });
    qc.invalidateQueries({ queryKey: QK.allTags });
    qc.invalidateQueries({ queryKey: QK.libraryFilters });
  }
  if (opts.recommendations) {
    qc.invalidateQueries({ queryKey: QK.recommendations });
    qc.invalidateQueries({ queryKey: QK.recentlyAdded });
    qc.invalidateQueries({ queryKey: QK.recentlyActivated });
    qc.invalidateQueries({ queryKey: QK.discover });
  }
  if (opts.continueWatching) qc.invalidateQueries({ queryKey: QK.continueWatching });
  if (opts.watchedHistory) qc.invalidateQueries({ queryKey: QK.watchedHistory });
  if (opts.organizer) {
    qc.invalidateQueries({ queryKey: QK.organizer });
    qc.invalidateQueries({ queryKey: QK.organizerCount });
  }
  if (opts.listsList) qc.invalidateQueries({ queryKey: QK.lists });
};

/**
 * Invalidates all media-related caches (organizer, stats, library lists, and detail queries).
 */
export const invalidateAllMediaCaches = (qc) => {
  qc.invalidateQueries({ queryKey: QK.organizer });
  qc.invalidateQueries({ queryKey: QK.organizerCount });
  qc.invalidateQueries({ queryKey: QK.stats });
  qc.invalidateQueries({ queryKey: QK.library });
  qc.invalidateQueries({ queryKey: QK.libraryCollections });
  qc.invalidateQueries({ queryKey: QK.libraryTags });
  qc.invalidateQueries({ queryKey: QK.allTags });
  qc.invalidateQueries({ queryKey: QK.libraryFilters });
  qc.invalidateQueries({ queryKey: QK.libraryItemDetail });
  qc.invalidateQueries({ queryKey: QK.libraryTvDetail });
  qc.invalidateQueries({ queryKey: QK.fullMetadata });
  qc.invalidateQueries({ queryKey: QK.continueWatching });
  qc.invalidateQueries({ queryKey: QK.watchedHistory });
  qc.invalidateQueries({ queryKey: QK.recommendations });
  qc.invalidateQueries({ queryKey: QK.recentlyAdded });
  qc.invalidateQueries({ queryKey: QK.recentlyActivated });
  qc.invalidateQueries({ queryKey: QK.discover });
  qc.invalidateQueries({ queryKey: QK.lists });
  qc.invalidateQueries({ queryKey: QK.tagItems });
};

/**
 * Invalidates only tv-detail keys for a given TV show ID.
 * Covers both raw and tv_-prefixed variants.
 */
export const invalidateTvDetail = (qc, tvId) => {
  const variants = getEntityIdVariants(tvId);
  for (const id of variants) {
    qc.invalidateQueries({ queryKey: [...QK.libraryTvDetail, id] });
    qc.invalidateQueries({ queryKey: [...QK.libraryTvDetail, `tv_${id}`] });
  }
};

/**
 * Invalidates all person-related caches for a given person ID.
 * Covers person-detail (all ID variants), person-credits, people lists.
 */
export const invalidatePerson = (qc, personId, opts = {}) => {
  const variants = getEntityIdVariants(personId);
  if (opts.detail !== false) {
    for (const id of variants) {
      qc.invalidateQueries({ queryKey: [...QK.personDetail, id] });
    }
    // Broad person-detail invalidation (catches queries with extra params)
    qc.invalidateQueries({ queryKey: QK.personDetail });
  }
  for (const id of variants) {
    qc.invalidateQueries({ queryKey: [...QK.personCredits, id] });
  }
  qc.invalidateQueries({ queryKey: QK.people, refetchType: 'all' });
  qc.invalidateQueries({ queryKey: QK.peopleInfinite, refetchType: 'all' });
  qc.invalidateQueries({ queryKey: QK.libraryItemDetail });
  qc.invalidateQueries({ queryKey: QK.libraryTvDetail });
  qc.invalidateQueries({ queryKey: QK.libraryFilters });
  qc.invalidateQueries({ queryKey: QK.ratingsStats });

  if (opts.lists) {
    qc.invalidateQueries({ queryKey: QK.library, refetchType: 'all' });
    qc.invalidateQueries({ queryKey: QK.libraryInfinite, refetchType: 'all' });
    qc.invalidateQueries({ queryKey: QK.libraryCounts, refetchType: 'all' });
  }
  if (opts.stats) qc.invalidateQueries({ queryKey: QK.stats });
  if (opts.recommendations) {
    qc.invalidateQueries({ queryKey: QK.recommendations });
    qc.invalidateQueries({ queryKey: QK.recentlyAdded });
    qc.invalidateQueries({ queryKey: QK.recentlyActivated });
    qc.invalidateQueries({ queryKey: QK.discover });
  }
  if (opts.listsList) qc.invalidateQueries({ queryKey: QK.lists });
};

/**
 * Invalidates all tag-related caches (tags list, filters, tag items, library, people, collections, detail queries).
 */
export const invalidateTag = (qc, tag) => {
  qc.invalidateQueries({ queryKey: QK.libraryTags });
  qc.invalidateQueries({ queryKey: QK.allTags });
  qc.invalidateQueries({ queryKey: QK.libraryFilters });
  qc.invalidateQueries({ queryKey: QK.library });
  qc.invalidateQueries({ queryKey: QK.libraryCollections });
  qc.invalidateQueries({ queryKey: QK.people });
  qc.invalidateQueries({ queryKey: QK.peopleInfinite });
  qc.invalidateQueries({ queryKey: QK.libraryItemDetail });
  qc.invalidateQueries({ queryKey: QK.libraryTvDetail });
  qc.invalidateQueries({ queryKey: QK.personDetail });
  qc.invalidateQueries({ queryKey: QK.fullMetadata });
  qc.invalidateQueries({ queryKey: QK.tagItems });
  if (tag) {
    const tagName = typeof tag === 'object' ? tag.name : tag;
    if (tagName) {
      qc.invalidateQueries({ queryKey: [...QK.tagItems, tagName] });
    }
  }
};
