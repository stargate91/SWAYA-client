/**
 * Localized changelog overrides for SWAYA Releases.
 * Implements Top-Tier Hybrid Smart Localization:
 * - Full localization for Release Titles, Subtitles/Descriptions, Key Highlights, and Section Headers.
 * - Automatic fallback to base English notes for deep technical lines if unprovided.
 */

import { en } from './changelog/en.js';
import { hu } from './changelog/hu.js';
import { de } from './changelog/de.js';
import { it } from './changelog/it.js';
import { ru } from './changelog/ru.js';
import { pt } from './changelog/pt.js';
import { fr } from './changelog/fr.js';
import { es } from './changelog/es.js';
import { ja } from './changelog/ja.js';
import { zh } from './changelog/zh.js';
import { ko } from './changelog/ko.js';
import { nl } from './changelog/nl.js';
import { pl } from './changelog/pl.js';
import { zhTw } from './changelog/zh-tw.js';
import { sv } from './changelog/sv.js';
import { tr } from './changelog/tr.js';
import { cs } from './changelog/cs.js';
import { normalizeChangelogList } from './changelog/changelogNormalizer.js';

export const CHANGELOG_TRANSLATIONS = {
  en,
  hu,
  de,
  it,
  ru,
  pt,
  fr,
  es,
  ja,
  zh,
  ko,
  nl,
  pl,
  'zh-tw': zhTw,
  sv,
  tr,
  cs,
};

/**
 * Returns localized changelog releases overlaid on canonical base release structures.
 * @param {Array<object>} baseReleases - Canonical release models
 * @param {string} [locale='en'] - Target locale code
 * @returns {Array<object>}
 */
export function getChangelogReleases(baseReleases = [], locale = 'en') {
  if (!baseReleases || !baseReleases.length) return [];
  const overrides = CHANGELOG_TRANSLATIONS[locale] || CHANGELOG_TRANSLATIONS.en;
  return normalizeChangelogList(baseReleases, overrides);
}

