/**
 * Supported Languages and Flag CDN mappings.
 */

export const SUPPORTED_LANGUAGES = Object.freeze([
  { code: 'en', iso: 'en-US', label: 'English (English)', country: 'gb' },
  { code: 'hu', iso: 'hu-HU', label: 'Hungarian (Magyar)', country: 'hu' },
  { code: 'de', iso: 'de-DE', label: 'German (Deutsch)', country: 'de' },
  { code: 'fr', iso: 'fr-FR', label: 'French (Français)', country: 'fr' },
  { code: 'es', iso: 'es-ES', label: 'Spanish (Español)', country: 'es' },
  { code: 'it', iso: 'it-IT', label: 'Italian (Italiano)', country: 'it' },
  { code: 'zh', iso: 'zh-CN', label: 'Chinese (中文)', country: 'cn' },
  { code: 'ko', iso: 'ko-KR', label: 'Korean (한국어)', country: 'kr' },
  { code: 'ru', iso: 'ru-RU', label: 'Russian (Русский)', country: 'ru' },
  { code: 'ja', iso: 'ja-JP', label: 'Japanese (日本語)', country: 'jp' },
  { code: 'pt', iso: 'pt-PT', label: 'Portuguese (Português)', country: 'pt' },
  { code: 'pl', iso: 'pl-PL', label: 'Polish (Polski)', country: 'pl' },
  { code: 'nl', iso: 'nl-NL', label: 'Dutch (Nederlands)', country: 'nl' },
  { code: 'zh-tw', iso: 'zh-TW', label: 'Traditional Chinese (繁體中文)', country: 'tw' },
  { code: 'sv', iso: 'sv-SE', label: 'Swedish (Svenska)', country: 'se' },
  { code: 'tr', iso: 'tr-TR', label: 'Turkish (Türkçe)', country: 'tr' },
  { code: 'cs', iso: 'cs-CZ', label: 'Czech (Čeština)', country: 'cz' },
]);

export const METADATA_LANGUAGE_OPTIONS = Object.freeze(
  SUPPORTED_LANGUAGES.map((lang) => ({
    value: lang.iso,
    label: lang.label,
  }))
);

export const TARGET_LANGUAGE_OPTIONS = Object.freeze(
  SUPPORTED_LANGUAGES.map((lang) => ({
    value: lang.code,
    label: lang.label,
  }))
);

const LANGUAGE_TO_COUNTRY_MAP = Object.freeze(
  SUPPORTED_LANGUAGES.reduce((acc, lang) => {
    acc[lang.code] = lang.country;
    acc[lang.iso] = lang.country;
    return acc;
  }, {})
);

export const getFlagUrl = (code, format = 'png') => {
  const normalized = String(code || '').trim().toLowerCase();
  const baseCode = normalized.includes('-') ? normalized.split('-')[0] : normalized;
  const country = LANGUAGE_TO_COUNTRY_MAP[normalized] || LANGUAGE_TO_COUNTRY_MAP[baseCode] || (normalized.length === 2 ? normalized : 'un');
  if (format === 'svg') {
    return `https://flagcdn.com/${country}.svg`;
  }
  return `https://flagcdn.com/w40/${country}.png`;
};

export const getLanguageLabel = (code, fallback = '') => {
  const lang = SUPPORTED_LANGUAGES.find(
    (l) => l.code === code || l.iso === code
  );
  return lang?.label || fallback || code;
};
