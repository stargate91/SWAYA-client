/**
 * Normalization pipeline for merging canonical changelog releases with localized translation overrides.
 */

/**
 * Merges a single release definition with its localized title, description, highlights, and section titles.
 * @param {object} baseRelease - Canonical English release object
 * @param {object} [releaseOverride] - Localized override containing title, description, highlights
 * @param {Record<string, string>} [sectionTitles] - Localized section headers (added, changed, fixed, performance)
 * @returns {object} Localized release object
 */
export function mergeReleaseWithLocale(baseRelease, releaseOverride, sectionTitles = {}) {
  if (!baseRelease) return null;

  const localizedSections = (baseRelease.sections || []).map((sec) => ({
    ...sec,
    title: sectionTitles[sec.type] || sec.title,
  }));

  if (!releaseOverride) {
    return {
      ...baseRelease,
      sections: localizedSections,
    };
  }

  return {
    ...baseRelease,
    title: releaseOverride.title || baseRelease.title,
    description: releaseOverride.description || baseRelease.description,
    highlights: releaseOverride.highlights || baseRelease.highlights,
    sections: localizedSections,
  };
}

/**
 * Normalizes an entire list of canonical releases against a given translation mapping.
 * @param {Array<object>} baseReleases - Array of canonical release objects
 * @param {object} [overrides] - Translation dictionary containing releases and sectionTitles
 * @returns {Array<object>}
 */
export function normalizeChangelogList(baseReleases = [], overrides = null) {
  if (!Array.isArray(baseReleases) || !baseReleases.length) return [];
  if (!overrides) return baseReleases;

  const sectionOverrides = overrides.sectionTitles || {};

  return baseReleases.map((release) => {
    const releaseOverride = overrides.releases?.[release.version];
    return mergeReleaseWithLocale(release, releaseOverride, sectionOverrides);
  });
}
