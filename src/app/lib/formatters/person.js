import { Venus, Mars, VenusAndMars, User } from '@/ui/icons';

/**
 * Calculates age from a birthday string and formats as a label.
 *
 * @param {string} birthday - Birthday in ISO format (e.g. "1990-05-12")
 * @param {Function} [t] - Optional translation function
 * @returns {string} Formatted age string (e.g. "34 Years Old" or "1990-05-12 (34)")
 */
export const calculateAge = (birthday, t = null) => {
  if (!birthday) return '';
  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime())) return birthday;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (t && typeof t === 'function') {
    return t('library.details.yearsOld', { count: age, defaultValue: `${age} Years Old` });
  }
  return `${birthday} (${age})`;
};

/**
 * Returns a localized gender label from a gender identifier/code.
 *
 * @param {number|string} gender - Gender code (1 = Female, 2 = Male, 3 = Non-binary)
 * @param {Function} [t] - Optional translation function
 * @returns {string|null} Localized gender string
 */
export const getGenderLabel = (gender, t = null) => {
  const g = typeof gender === 'string' ? gender.toLowerCase().trim() : gender;
  if (g === 1 || g === '1' || g === 'female' || g === 'f') {
    return t && typeof t === 'function' ? (t('library.details.female') || 'Female') : 'Female';
  }
  if (g === 2 || g === '2' || g === 'male' || g === 'm') {
    return t && typeof t === 'function' ? (t('library.details.male') || 'Male') : 'Male';
  }
  if (g === 3 || g === '3' || g === 'non-binary' || g === 'nonbinary' || g === 'non_binary') {
    return t && typeof t === 'function' ? (t('library.details.nonBinary') || 'Non-binary') : 'Non-binary';
  }
  return null;
};

/**
 * Returns the icon component for a gender identifier/code.
 *
 * @param {number|string} gender - Gender code (1 = Female, 2 = Male, 3 = Non-binary)
 * @returns {React.ComponentType} Icon component
 */
export const getGenderIcon = (gender) => {
  const g = typeof gender === 'string' ? gender.toLowerCase().trim() : gender;
  if (g === 1 || g === '1' || g === 'female' || g === 'f') {
    return Venus;
  }
  if (g === 2 || g === '2' || g === 'male' || g === 'm') {
    return Mars;
  }
  if (g === 3 || g === '3' || g === 'non-binary' || g === 'nonbinary' || g === 'non_binary') {
    return VenusAndMars;
  }
  return User;
};

/**
 * Formats and translates performer physical traits and attributes.
 *
 * @param {string} val - Trait value (e.g. "blonde", "blue", "caucasian")
 * @param {Function} [t] - Translation function
 * @returns {string} Formatted trait label
 */
export const formatPhysicalAttributeLabel = (val, t = null) => {
  if (!val) return '';
  const raw = String(val).trim();
  if (raw.toUpperCase() === 'NA' || raw.toUpperCase() === 'N/A') return 'N/A';

  const lowerKey = raw.toLowerCase().replace(/[\s-]+/g, '_');
  if (t && typeof t === 'function') {
    const ethKey = `dynamic.performerTraits.ethnicities.${lowerKey}`;
    const ethVal = t(ethKey, { defaultValue: '' });
    if (ethVal) return ethVal;

    const hairKey = `dynamic.performerTraits.hairColors.${lowerKey}`;
    const hairVal = t(hairKey, { defaultValue: '' });
    if (hairVal) return hairVal;

    const eyeKey = `dynamic.performerTraits.eyeColors.${lowerKey}`;
    const eyeVal = t(eyeKey, { defaultValue: '' });
    if (eyeVal) return eyeVal;

    const breastKey = `dynamic.performerTraits.breastTypes.${lowerKey}`;
    const breastVal = t(breastKey, { defaultValue: '' });
    if (breastVal) return breastVal;

    const buttShapeKey = `dynamic.performerTraits.buttShapes.${lowerKey}`;
    const buttShapeVal = t(buttShapeKey, { defaultValue: '' });
    if (buttShapeVal) return buttShapeVal;

    const buttSizeKey = `dynamic.performerTraits.buttSizes.${lowerKey}`;
    const buttSizeVal = t(buttSizeKey, { defaultValue: '' });
    if (buttSizeVal) return buttSizeVal;

    const breastSizeKey = `dynamic.performerTraits.breastSizes.${lowerKey}`;
    const breastSizeVal = t(breastSizeKey, { defaultValue: '' });
    if (breastSizeVal) return breastSizeVal;
  }

  return raw
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word === 'na' || word === 'n/a') return 'N/A';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

/**
 * Maps birthplace / location string to a 2-letter ISO 3166-1 country code.
 *
 * @param {string} placeOfBirth - Birthplace string
 * @returns {string|null} ISO 2-letter country code or null
 */
export const getCountryISO = (placeOfBirth) => {
  if (!placeOfBirth) return null;
  const place = placeOfBirth.trim().toUpperCase();
  const parts = place.split(',').map(p => p.trim());
  const lastPart = parts[parts.length - 1];

  const map = {
    'USA': 'US', 'UNITED STATES': 'US', 'UNITED STATES OF AMERICA': 'US',
    'HUNGARY': 'HU', 'MAGYARORSZÁG': 'HU',
    'GERMANY': 'DE', 'DEUTSCHLAND': 'DE',
    'UNITED KINGDOM': 'GB', 'UK': 'GB', 'GREAT BRITAIN': 'GB', 'ENGLAND': 'GB',
    'CANADA': 'CA', 'FRANCE': 'FR', 'SPAIN': 'ES', 'ITALY': 'IT',
    'RUSSIA': 'RU', 'RUSSIAN FEDERATION': 'RU',
    'AUSTRALIA': 'AU', 'JAPAN': 'JP', 'BRAZIL': 'BR',
    'NETHERLANDS': 'NL', 'POLAND': 'PL', 'UKRAINE': 'UA', 'SWEDEN': 'SE',
    'CZECH REPUBLIC': 'CZ', 'CZECHIA': 'CZ', 'SLOVAKIA': 'SK', 'AUSTRIA': 'AT',
    'CUBA': 'CU', 'COLOMBIA': 'CO', 'MEXICO': 'MX', 'ROMANIA': 'RO',
    'ARGENTINA': 'AR', 'BELGIUM': 'BE', 'SWITZERLAND': 'CH', 'CHINA': 'CN',
    'SOUTH KOREA': 'KR', 'KOREA': 'KR', 'PHILIPPINES': 'PH', 'THAILAND': 'TH',
    'VIETNAM': 'VN', 'NORWAY': 'NO', 'DENMARK': 'DK', 'FINLAND': 'FI',
    'BULGARIA': 'BG', 'GREECE': 'GR', 'TURKEY': 'TR', 'PORTUGAL': 'PT',
    'SOUTH AFRICA': 'ZA', 'NEW ZEALAND': 'NZ', 'VENEZUELA': 'VE',
  };
  return map[lastPart] || (lastPart.length === 2 ? lastPart : null);
};

/**
 * Converts a 2-letter ISO country code into a Unicode flag emoji.
 *
 * @param {string} countryISO - 2-letter ISO country code
 * @returns {string} Flag emoji
 */
export const getFlagEmoji = (countryISO) => {
  if (!countryISO) return '';
  const codePoints = countryISO
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch {
    return '';
  }
};

/**
 * Truncates and categorizes person alternate names into sidebar vs drawer lists.
 *
 * @param {string[]} alternateNames - Array of alias names
 * @returns {{ candidateAliases: string[], sidebarAliases: Array<{original: string, isTruncated: boolean}>, drawerAliases: string[] }}
 */
export const calculateAliases = (alternateNames) => {
  const candidateAliases = alternateNames || [];
  let accumulatedLength = 0;

  const sidebarAliases = candidateAliases.slice(0, 4).map((alias, idx) => {
    accumulatedLength += alias.length + (idx > 0 ? 2 : 0);
    const isTruncated = accumulatedLength > 20 || idx >= 2;
    return {
      original: alias,
      isTruncated
    };
  });

  const drawerAliases = [
    ...sidebarAliases.filter(a => a.isTruncated).map(a => a.original),
    ...candidateAliases.slice(4)
  ];

  return {
    candidateAliases: candidateAliases.slice(0, 4),
    sidebarAliases,
    drawerAliases
  };
};

/**
 * Calculates performer slender score (ratio of waist cm to height cm).
 *
 * @param {object} item - Performer item with waist and height
 * @returns {string} Formatted score (e.g. "0.385" or "")
 */
export function calculateSlenderScore(item) {
  const w = parseFloat(item?.waist) || 0;
  const height = parseFloat(item?.height) || 0;
  if (w > 0) {
    const h_cm = height > 0 ? height : 165.0;
    const w_cm = w * 2.54;
    return (w_cm / h_cm).toFixed(3);
  }
  return '';
}

/**
 * Calculates performer curvy / hourglass score.
 *
 * @param {object} item - Performer item with waist, hip, cup_size, band_size
 * @returns {string} Formatted score (e.g. "32.5" or "")
 */
export function calculateCurvyScore(item) {
  const w = parseFloat(item?.waist) || 0;
  const h = parseFloat(item?.hip) || 0;
  if (w > 0 && h > 0) {
    const cupOrder = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'DD': 5, 'DDD': 6, 'E': 7, 'EE': 8, 'F': 9, 'FF': 10,
      'G': 11, 'GG': 12, 'H': 13, 'HH': 14, 'I': 15, 'J': 16, 'K': 17
    };
    const cupVal = cupOrder[String(item?.cup_size || '').trim().toUpperCase()] || 0;
    const bandVal = parseFloat(item?.band_size) || 34.0;
    const breastScore = cupVal > 0 ? (cupVal + (bandVal - 30.0) / 2.0) : 0.0;
    return ((h - w) * 2.54 + breastScore).toFixed(1);
  }
  return '';
}

/**
 * Calculates standard butt size category ('SMALL', 'MEDIUM', 'BIG', 'EXTRA_BIG') from body measurements.
 *
 * @param {number|string} height - Height in cm
 * @param {number|string} waist - Waist in inches
 * @param {number|string} hip - Hip in inches
 * @returns {string|null} Size category or null
 */
export function calculateButtSize(height, waist, hip) {
  if (height === undefined || height === null || waist === undefined || waist === null || hip === undefined || hip === null) {
    return null;
  }
  try {
    let w_in = parseFloat(waist);
    if (w_in >= 50) w_in /= 2.54;
    let h_in = parseFloat(hip);
    if (h_in >= 50) h_in /= 2.54;

    const heightIn = parseFloat(height) / 2.54;
    if (isNaN(heightIn) || isNaN(w_in) || isNaN(h_in) || heightIn <= 0 || h_in <= 0 || w_in <= 0) return null;

    const fah = h_in / (heightIn * 0.53);
    const whr = w_in / h_in;
    if (whr === 0) return null;
    const ccf = 0.72 / whr;
    const bcs = h_in * fah * ccf;

    if (bcs < 33) return 'SMALL';
    if (bcs < 40) return 'MEDIUM';
    if (bcs < 50) return 'BIG';
    return 'EXTRA_BIG';
  } catch {
    return null;
  }
}

/**
 * Formats a height measurement into "X cm".
 *
 * @param {number|string} height - Height in cm
 * @returns {string|null} Formatted height (e.g. "175 cm" or null)
 */
export const formatHeight = (height) => {
  if (height === undefined || height === null || height === '') return null;
  return `${height} cm`;
};

/**
 * Formats a weight measurement into "X kg".
 *
 * @param {number|string} weight - Weight in kg
 * @returns {string|null} Formatted weight (e.g. "65 kg" or null)
 */
export const formatWeight = (weight) => {
  if (weight === undefined || weight === null || weight === '') return null;
  return `${weight} kg`;
};

/**
 * Formats career active years range (e.g. "2010 - Present" or "2010 - 2020").
 *
 * @param {number|string} startYear - Career start year
 * @param {number|string} [endYear] - Career end year
 * @param {string} [presentLabel='Present'] - Label for ongoing careers
 * @returns {string|null} Formatted active years string or null
 */
export const formatCareerYears = (startYear, endYear, presentLabel = 'Present') => {
  if (!startYear) return null;
  return `${startYear} - ${endYear || presentLabel}`;
};

/**
 * Extracts a readable text string from raw text values that may be formatted
 * as localized dictionaries (e.g. { en: "..." }) or array lists.
 *
 * @param {any} val - Raw value
 * @returns {string} Clean string representation or empty string
 */
export const extractTextValue = (val) => {
  if (val === undefined || val === null) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) {
    for (const item of val) {
      const extracted = extractTextValue(item);
      if (extracted) return extracted;
    }
    return '';
  }
  if (typeof val === 'object') {
    if (val.en && typeof val.en === 'string') return val.en;
    if (val.text && typeof val.text === 'string') return val.text;
    if (val.body && typeof val.body === 'string') return val.body;
    if (val.biography && typeof val.biography === 'string') return val.biography;
    for (const v of Object.values(val)) {
      const extracted = extractTextValue(v);
      if (extracted) return extracted;
    }
  }
  return '';
};

/**
 * Formats table grid and detail values for performer mixer attributes.
 *
 * @param {any} val - Raw attribute value
 * @param {string} type - Attribute type ('butt_size', 'same_sex_only', 'gender', 'height', 'weight', 'text')
 * @param {string} [fieldKey] - Attribute field key
 * @param {Function} [t] - Optional translation function
 * @returns {string} Formatted display value
 */
export const formatMixerValue = (val, type, fieldKey, t) => {
  if (val === undefined || val === null || val === '') return '-';
  if (fieldKey === 'butt_size') {
    const trait = formatPhysicalAttributeLabel(val, t);
    if (trait) return trait;
  }
  if (type === 'same_sex_only') {
    if (val === 'Same-Sex Only') return 'Yes';
    if (val === 'All') return 'No';
    return val;
  }
  if (type === 'gender') {
    return getGenderLabel(val, t) || 'Other';
  }
  if (type === 'height') {
    return formatHeight(val) || '-';
  }
  if (type === 'weight') {
    return formatWeight(val) || '-';
  }
  if (type === 'text') {
    const textStr = extractTextValue(val).trim();
    if (!textStr) return '-';
    return textStr.length > 60 ? `${textStr.slice(0, 60)}…` : textStr;
  }
  const extracted = typeof val === 'object' ? extractTextValue(val) : String(val);
  const strVal = String(extracted).trim();
  if (!strVal) return '-';
  const lower = strVal.toLowerCase();
  if (lower === 'no piercings' || lower === 'no tattoos') {
    return 'No';
  }
  return strVal;
};

