import { CHANGELOG_RELEASES } from './changelog/releases/index.js';
import { getChangelogReleases as getLocalizedReleases } from './changelogTranslations.js';

export { CHANGELOG_RELEASES };

export function getChangelogReleases(locale = 'en') {
  return getLocalizedReleases(CHANGELOG_RELEASES, locale);
}

