/**
 * Single Source of Truth for all site locales, supported languages, OpenGraph mappings, and route patterns.
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', shortLabel: 'English (EN)', ogLocale: 'en_US', path: '/' },
  { code: 'de', label: 'Deutsch', shortLabel: 'Deutsch (DE)', ogLocale: 'de_DE', path: '/de' },
  { code: 'ja', label: '日本語', shortLabel: '日本語 (JA)', ogLocale: 'ja_JP', path: '/ja' },
  { code: 'hu', label: 'Magyar', shortLabel: 'Magyar (HU)', ogLocale: 'hu_HU', path: '/hu' },
  { code: 'fr', label: 'Français', shortLabel: 'Français (FR)', ogLocale: 'fr_FR', path: '/fr' },
  { code: 'es', label: 'Español', shortLabel: 'Español (ES)', ogLocale: 'es_ES', path: '/es' },
  { code: 'zh', label: '简体中文', shortLabel: '简体中文 (ZH)', ogLocale: 'zh_CN', path: '/zh' },
  { code: 'it', label: 'Italiano', shortLabel: 'Italiano (IT)', ogLocale: 'it_IT', path: '/it' },
  { code: 'ru', label: 'Русский', shortLabel: 'Русский (RU)', ogLocale: 'ru_RU', path: '/ru' },
  { code: 'pt', label: 'Português', shortLabel: 'Português (PT)', ogLocale: 'pt_BR', path: '/pt' },
  { code: 'ko', label: '한국어', shortLabel: '한국어 (KO)', ogLocale: 'ko_KR', path: '/ko' },
  { code: 'nl', label: 'Nederlands', shortLabel: 'Nederlands (NL)', ogLocale: 'nl_NL', path: '/nl' },
  { code: 'pl', label: 'Polski', shortLabel: 'Polski (PL)', ogLocale: 'pl_PL', path: '/pl' },
  { code: 'zh-tw', label: '繁體中文', shortLabel: '繁體中文 (ZH-TW)', ogLocale: 'zh_TW', path: '/zh-tw' },
  { code: 'sv', label: 'Svenska', shortLabel: 'Svenska (SV)', ogLocale: 'sv_SE', path: '/sv' },
  { code: 'tr', label: 'Türkçe', shortLabel: 'Türkçe (TR)', ogLocale: 'tr_TR', path: '/tr' },
  { code: 'cs', label: 'Čeština', shortLabel: 'Čeština (CS)', ogLocale: 'cs_CZ', path: '/cs' },
];

export const VALID_LOCALES = SUPPORTED_LANGUAGES.map((lang) => lang.code);

export const SUPPORTED_LOCALES = VALID_LOCALES.filter((code) => code !== 'en');

export const LANGUAGE_OPTIONS = SUPPORTED_LANGUAGES.map((lang) => ({
  value: lang.code,
  label: lang.shortLabel,
}));

export const OG_LOCALE_MAP = SUPPORTED_LANGUAGES.reduce((acc, lang) => {
  acc[lang.code] = lang.ogLocale;
  return acc;
}, {});

export const LOCALE_PATH_REGEX = new RegExp(`^\\/(${SUPPORTED_LOCALES.join('|')})(?:\\/|$)`, 'i');

export const LOCALE_STRIP_REGEX = new RegExp(
  `^\\/(${SUPPORTED_LOCALES.join('|')}|%5Bobject%20Object%5D|\\[object%20Object\\]|\\[object Object\\])(?=\\/|$)`,
  'gi'
);

export function isValidLocale(locale) {
  return typeof locale === 'string' && VALID_LOCALES.includes(locale.toLowerCase().trim());
}

export function normalizeLocale(locale) {
  if (!isValidLocale(locale)) return 'en';
  return locale.toLowerCase().trim();
}

export function stripLocalePrefix(pathname = '/') {
  return pathname.replace(LOCALE_STRIP_REGEX, '') || '/';
}

export function getLocalizedPath(pathname = '/', locale = 'en') {
  const cleanPath = stripLocalePrefix(pathname);
  if (locale === 'en') return cleanPath;
  return cleanPath === '/' ? `/${locale}` : `/${locale}${cleanPath}`;
}
