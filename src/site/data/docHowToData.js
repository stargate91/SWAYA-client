/**
 * Multi-language Step-by-step workflow metadata for documentation guides (Schema.org HowTo rich snippets)
 * Supports: EN, DE, JA, HU, FR, ES, ZH, IT, RU, PT
 */
import { en } from './howto/en.js';
import { hu } from './howto/hu.js';
import { de } from './howto/de.js';
import { ja } from './howto/ja.js';
import { fr } from './howto/fr.js';
import { es } from './howto/es.js';
import { zh } from './howto/zh.js';
import { it } from './howto/it.js';
import { ru } from './howto/ru.js';
import { pt } from './howto/pt.js';
import { ko } from './howto/ko.js';
import { nl } from './howto/nl.js';
import { pl } from './howto/pl.js';
import { zhTw } from './howto/zh-tw.js';
import { sv } from './howto/sv.js';
import { tr } from './howto/tr.js';
import { cs } from './howto/cs.js';

export const DOC_HOWTO_TRANSLATIONS = {
  en,
  hu,
  de,
  ja,
  fr,
  es,
  zh,
  it,
  ru,
  pt,
  ko,
  nl,
  pl,
  'zh-tw': zhTw,
  sv,
  tr,
  cs,
};

/**
 * Returns localized HowTo workflow data for a given documentation slug.
 * @param {string} slug - Document slug (e.g. 'organizer', 'player')
 * @param {string} [locale='en'] - Target locale code
 * @returns {object|null}
 */
export function getDocHowTo(slug, locale = 'en') {
  if (!slug) return null;
  const targetLocale = locale && DOC_HOWTO_TRANSLATIONS[locale] ? locale : 'en';
  return (
    DOC_HOWTO_TRANSLATIONS[targetLocale]?.[slug] ||
    DOC_HOWTO_TRANSLATIONS.en?.[slug] ||
    null
  );
}
