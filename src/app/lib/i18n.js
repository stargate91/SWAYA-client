import { useState, useCallback, useMemo, useEffect } from 'react';
import enCommon from '../locales/en/common.json';
import enDashboard from '../locales/en/dashboard.json';
import enSettings from '../locales/en/settings.json';
import enOrganizer from '../locales/en/organizer.json';
import enLibrary from '../locales/en/library.json';
import enHistory from '../locales/en/history.json';
import enOnboarding from '../locales/en/onboarding.json';
import enRatings from '../locales/en/ratings.json';
import enLists from '../locales/en/lists.json';
import enSearch from '../locales/en/search.json';
import enAbout from '../locales/en/about.json';
import enStatistics from '../locales/en/statistics.json';
import enDynamic from '../locales/en/dynamic.json';
import enTorrent from '../locales/en/torrent.json';
import enLanding from '@site/locales/en/landing.json';
import enDocs from '@site/locales/en/docs.json';

/**
 * Builds the default English dictionary hierarchy.
 * @returns {Object}
 */
export function buildDefaultEnglishDictionary() {
  return {
    ...enCommon,
    ...enDynamic,
    dynamic: enDynamic,
    landing: enLanding,
    docs: enDocs,
    common: {
      ...(enCommon.common || {}),
    },
    sidebar: {
      ...(enCommon.sidebar || {}),
    },
    dashboard: enDashboard,
    settings: enSettings,
    settingsPage: enSettings,
    organizer: enOrganizer,
    library: enLibrary,
    tags: enLibrary.tags,
    performer: enLibrary.performerEdit,
    performerEdit: enLibrary.performerEdit,
    history: enHistory,
    historyPage: enHistory,
    onboarding: enOnboarding,
    ratings: enRatings,
    lists: enLists,
    search: enSearch,
    about: enAbout,
    statistics: enStatistics,
    torrent: enTorrent,
  };
}

export const LOCALE_LOADERS = {
  de: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/de/landing.json'),
      import('@site/locales/de/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  ja: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/ja/landing.json'),
      import('@site/locales/ja/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  hu: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/hu/landing.json'),
      import('@site/locales/hu/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  fr: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/fr/landing.json'),
      import('@site/locales/fr/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  es: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/es/landing.json'),
      import('@site/locales/es/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  zh: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/zh/landing.json'),
      import('@site/locales/zh/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  it: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/it/landing.json'),
      import('@site/locales/it/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  ru: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/ru/landing.json'),
      import('@site/locales/ru/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  pt: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/pt/landing.json'),
      import('@site/locales/pt/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  ko: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/ko/landing.json'),
      import('@site/locales/ko/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  nl: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/nl/landing.json'),
      import('@site/locales/nl/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  pl: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/pl/landing.json'),
      import('@site/locales/pl/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  'zh-tw': async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/zh-tw/landing.json'),
      import('@site/locales/zh-tw/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  sv: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/sv/landing.json'),
      import('@site/locales/sv/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  tr: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/tr/landing.json'),
      import('@site/locales/tr/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
  cs: async () => {
    const [landing, docs] = await Promise.all([
      import('@site/locales/cs/landing.json'),
      import('@site/locales/cs/docs.json'),
    ]);
    return { landing: landing.default || landing, docs: docs.default || docs };
  },
};

export const defaultTranslations = {
  en: buildDefaultEnglishDictionary(),
};

/**
 * Recursively resolves a dot-separated key path in a dictionary with case-insensitive fallback.
 *
 * @param {Object} dict - Dictionary object
 * @param {string} keyPath - Dot-separated key path (e.g. 'common.actions.save')
 * @returns {any} Resolved value or undefined
 */
export function lookupKey(dict, keyPath) {
  if (!dict || !keyPath) return undefined;
  const keys = keyPath.split('.');
  let cur = dict;
  for (const k of keys) {
    if (cur && typeof cur === 'object') {
      if (cur[k] !== undefined) {
        cur = cur[k];
      } else if (typeof k === 'string') {
        // Case-insensitive fallback
        const lowerK = k.toLowerCase();
        const foundKey = Object.keys(cur).find((itemKey) => itemKey.toLowerCase() === lowerK);
        if (foundKey && cur[foundKey] !== undefined) {
          cur = cur[foundKey];
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
  return cur;
}

/**
 * Interpolates template variables in string (supports {{var}} and {var}).
 *
 * @param {string} text - Template text
 * @param {Object} [options] - Values to substitute
 * @returns {string} Interpolated text
 */
export function interpolate(text, options) {
  if (typeof text !== 'string' || !options) return text;
  let result = text;
  Object.keys(options).forEach((optKey) => {
    result = result.replace(new RegExp(`{{\\s*${optKey}\\s*}}`, 'g'), options[optKey]);
    result = result.replace(new RegExp(`{\\s*${optKey}\\s*}`, 'g'), options[optKey]);
  });
  return result;
}

/**
 * Translates a key according to pluralization, fallbacks, and template substitution.
 *
 * @param {string} key - Translation key
 * @param {Object} [options] - Options (count, defaultValue, and template params)
 * @param {string} [locale='en'] - Current locale
 * @param {Object} [translations=defaultTranslations] - Loaded dictionaries
 * @returns {string} Translated string
 */
export function translate(key, options, locale = 'en', translations = defaultTranslations) {
  if (!key) return '';
  let finalKey = key;
  if (options && typeof options.count === 'number') {
    const suffix = options.count === 1 ? '_one' : '_other';
    finalKey = `${key}${suffix}`;
  }

  const currentDict = translations[locale] || translations.en;
  const fallbackDict = translations.en;

  let value = lookupKey(currentDict, finalKey);

  // Fallback to English dictionary if not found in current locale
  if (value === undefined && currentDict !== fallbackDict) {
    value = lookupKey(fallbackDict, finalKey);
  }

  // Fallback for count suffix miss
  if (value === undefined && finalKey !== key) {
    value = lookupKey(currentDict, key) ?? lookupKey(fallbackDict, key);
  }

  // Fallback to dynamic sub-dictionary if called without 'dynamic.' prefix
  if (value === undefined && !finalKey.startsWith('dynamic.')) {
    value = lookupKey(currentDict, `dynamic.${finalKey}`) ?? lookupKey(fallbackDict, `dynamic.${finalKey}`);
  }

  // Fallback if called with 'dynamic.' prefix but only present at root
  if (value === undefined && finalKey.startsWith('dynamic.')) {
    const strippedKey = finalKey.replace(/^dynamic\./, '');
    value = lookupKey(currentDict, strippedKey) ?? lookupKey(fallbackDict, strippedKey);
  }

  let result = value;
  if (result === undefined) {
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
      console.warn(`[i18n] Missing translation key: "${key}" for locale: "${locale}"`);
    }
    result = (options && options.defaultValue !== undefined) ? options.defaultValue : key;
  }

  return interpolate(result, options);
}

/**
 * Creates a bound translate function for a specific locale and dictionary set.
 *
 * @param {string} [locale='en'] - Current locale
 * @param {Object} [translations=defaultTranslations] - Translations dictionary
 * @returns {Function} (key, options) => string
 */
export function createTranslator(locale = 'en', translations = defaultTranslations) {
  return (key, options) => translate(key, options, locale, translations);
}

/**
 * React hook that manages translation engine state and memoized t function.
 *
 * @param {Object} [options]
 * @param {string} [options.defaultLocale='en'] - Initial locale
 * @param {Object} [options.customTranslations] - Optional custom dictionary overrides
 * @returns {Object} { locale, setLocale, t }
 */
export function useTranslationEngine({ defaultLocale = 'en', customTranslations } = {}) {
  const [locale, setLocale] = useState(defaultLocale);
  const [loadedTranslations, setLoadedTranslations] = useState(defaultTranslations);

  useEffect(() => {
    if (locale && locale !== 'en' && !loadedTranslations[locale]) {
      const loader = LOCALE_LOADERS[locale];
      if (loader) {
        loader()
          .then((dict) => {
            setLoadedTranslations((prev) => ({
              ...prev,
              [locale]: {
                ...buildDefaultEnglishDictionary(),
                ...dict,
              },
            }));
          })
          .catch((err) => {
            if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
              console.warn(`[i18n] Failed to load locale dictionary for "${locale}":`, err);
            }
          });
      }
    }
  }, [locale, loadedTranslations]);

  const mergedTranslations = useMemo(() => {
    if (!customTranslations) return loadedTranslations;
    return {
      ...loadedTranslations,
      ...customTranslations,
    };
  }, [loadedTranslations, customTranslations]);

  const t = useCallback(
    (key, options) => {
      return translate(key, options, locale, mergedTranslations);
    },
    [locale, mergedTranslations]
  );

  return {
    locale,
    setLocale,
    t,
  };
}

export default useTranslationEngine;
