/**
 * Multi-language translation registry and loader for competitor comparison landing pages.
 * Supports: en, hu, de, it, ru, pt, fr, es, ja, zh
 */

import { en } from './comparisons/en.js';
import { hu } from './comparisons/hu.js';
import { de } from './comparisons/de.js';
import { ru } from './comparisons/ru.js';
import { it } from './comparisons/it.js';
import { pt } from './comparisons/pt.js';
import { fr } from './comparisons/fr.js';
import { es } from './comparisons/es.js';
import { ja } from './comparisons/ja.js';
import { zh } from './comparisons/zh.js';
import { ko } from './comparisons/ko.js';
import { nl } from './comparisons/nl.js';
import { pl } from './comparisons/pl.js';
import { zhTw } from './comparisons/zh-tw.js';
import { sv } from './comparisons/sv.js';
import { tr } from './comparisons/tr.js';
import { cs } from './comparisons/cs.js';
import { mergeComparisonWithLocale } from './comparisons/comparisonNormalizer.js';

export const COMPARISONS_TRANSLATIONS = {
  en,
  hu,
  de,
  ru,
  it,
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
 * Returns a localized comparison object, falling back to canonical English for missing fields.
 * @param {object} baseComparison - Canonical comparison model
 * @param {string} [locale='en'] - Target locale code
 * @returns {object}
 */
export function getLocalizedComparison(baseComparison, locale = 'en') {
  if (!baseComparison) return null;

  const targetLocale = locale && COMPARISONS_TRANSLATIONS[locale] ? locale : 'en';
  const locMap = COMPARISONS_TRANSLATIONS[targetLocale]?.[baseComparison.slug];
  return mergeComparisonWithLocale(baseComparison, locMap);
}

