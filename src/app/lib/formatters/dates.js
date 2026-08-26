/**
 * Helper to safely parse Date from string, timestamp, or Date instance.
 * Automatically normalizes un-suffixed space-separated UTC strings ("YYYY-MM-DD HH:mm:ss" -> ISO UTC).
 *
 * @param {Date|string|number} dateInput
 * @returns {Date|null}
 */
const parseDate = (dateInput) => {
  if (!dateInput) return null;
  if (dateInput instanceof Date) return isNaN(dateInput.getTime()) ? null : dateInput;
  if (typeof dateInput === 'string') {
    let normalized = dateInput.trim();
    if (!normalized) return null;
    if (!normalized.endsWith('Z') && !normalized.includes('+') && !/-\d{2}:\d{2}$/.test(normalized) && normalized.includes(' ')) {
      normalized = normalized.replace(' ', 'T') + 'Z';
    }
    const d = new Date(normalized);
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(dateInput);
  return isNaN(d.getTime()) ? null : d;
};

/**
 * Extracts a 4-digit year string from a date string, date object, or year number.
 *
 * @param {object|string|number} dateOrItem - Date string, number, or object with year/release_date
 * @param {string} [fallback=''] - Fallback value
 * @returns {string} 4-digit year or fallback
 */
export const formatYear = (dateOrItem, fallback = '') => {
  if (!dateOrItem) return fallback;
  if (typeof dateOrItem === 'object') {
    if (dateOrItem.year) return String(dateOrItem.year);
    const dateStr = dateOrItem.release_date || dateOrItem.first_air_date || dateOrItem.air_date || dateOrItem.date;
    if (dateStr) return formatYear(dateStr, fallback);
    return fallback;
  }
  const str = String(dateOrItem).trim();
  if (!str) return fallback;
  if (str.includes('-')) {
    const part = str.split('-')[0].trim();
    return part.length === 4 ? part : fallback;
  }
  if (str.includes('/')) {
    const part = str.split('/')[0].trim();
    return part.length === 4 ? part : fallback;
  }
  return str.length >= 4 ? str.slice(0, 4) : str;
};

/**
 * Converts a year into a decade string (e.g. 1994 -> "1990s").
 *
 * @param {number|string} year - Year to convert
 * @returns {string} Decade string (e.g. "1990s")
 */
export const toDecade = (year) => {
  const num = Number(year);
  if (isNaN(num) || num <= 0) return '';
  return `${Math.floor(num / 10) * 10}s`;
};

/**
 * Formats TV air date range (e.g. "2008 - 2013", "2020 - ", "2019").
 *
 * @param {object|string} itemOrFirstDate - Media entity or first air date string
 * @param {string} [lastAirDate] - Last air date string (if first param is string)
 * @param {boolean|string} [statusOrEnded] - Release status or boolean flag
 * @returns {string} Formatted TV year range
 */
export const formatTvAirYearRange = (itemOrFirstDate, lastAirDate, statusOrEnded) => {
  if (!itemOrFirstDate) return '';

  let firstAir;
  let lastAir;
  let isEnded = false;

  if (typeof itemOrFirstDate === 'object') {
    const item = itemOrFirstDate;
    firstAir = item.first_air_date || item.release_date || (item.year ? String(item.year) : '');
    lastAir = item.last_air_date || '';
    const status = String(item.release_status || '').toLowerCase();
    isEnded = ['ended', 'canceled', 'cancelled'].includes(status);
  } else {
    firstAir = String(itemOrFirstDate);
    lastAir = String(lastAirDate || '');
    if (typeof statusOrEnded === 'boolean') {
      isEnded = statusOrEnded;
    } else if (typeof statusOrEnded === 'string') {
      isEnded = ['ended', 'canceled', 'cancelled'].includes(statusOrEnded.toLowerCase());
    }
  }

  const firstYear = formatYear(firstAir);
  const lastYear = formatYear(lastAir);

  if (!firstYear) return '';
  if (isEnded && lastYear) {
    return firstYear === lastYear ? firstYear : `${firstYear} - ${lastYear}`;
  }
  return `${firstYear} - `;
};

/**
 * Extracts and formats release date from a media entity or string.
 *
 * @param {object|string} item - Media item or ISO date string
 * @param {string} [fallback=''] - Fallback value if no date is found
 * @returns {string} Formatted release date (e.g. "2024-05-12" or "2024")
 */
export const formatReleaseDate = (item, fallback = '') => {
  if (!item) return fallback;
  if (typeof item === 'string') {
    return item.substring(0, 10);
  }
  const date = item.release_date || item.first_air_date || item.air_date || item.date;
  if (date) {
    return String(date).substring(0, 10);
  }
  return item.year ? String(item.year) : fallback;
};

/**
 * Formats a Date object, ISO string, or timestamp into YYYY-MM-DD format.
 *
 * @param {Date|string|number} dateInput - Date to format
 * @param {string} [fallback='—'] - Fallback string when date is invalid
 * @returns {string} Formatted ISO date (e.g. "2026-08-11")
 */
export const formatDateIso = (dateInput, fallback = '—') => {
  const date = parseDate(dateInput);
  if (!date) return fallback;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a Date object or ISO date string using Intl.DateTimeFormat options.
 *
 * @param {Date|string|number} dateInput - Date to format
 * @param {Intl.DateTimeFormatOptions} [options={ year: 'numeric', month: 'short', day: 'numeric' }] - Formatting options
 * @param {string} [locale='en-US'] - Formatting locale
 * @param {string} [fallback='—'] - Fallback string when date is invalid
 * @returns {string} Formatted date string
 */
export const formatDate = (
  dateInput,
  options = { year: 'numeric', month: 'short', day: 'numeric' },
  locale = 'en-US',
  fallback = '—'
) => {
  const date = parseDate(dateInput);
  if (!date) return fallback;
  return date.toLocaleDateString(locale, options);
};

/**
 * Formats a Date object or ISO date string into date-time string.
 *
 * @param {Date|string|number} dateInput - Date to format
 * @param {Intl.DateTimeFormatOptions} [options=undefined] - Formatting options
 * @param {string} [locale='en-US'] - Formatting locale
 * @param {string} [fallback='—'] - Fallback string when date is invalid
 * @returns {string} Formatted date-time string
 */
export const formatDateTime = (
  dateInput,
  options = undefined,
  locale = 'en-US',
  fallback = '—'
) => {
  const date = parseDate(dateInput);
  if (!date) return fallback;
  return date.toLocaleString(locale, options);
};

/**
 * Formats a decade integer or string into localized decade label (e.g. 1990 -> "1990s" or "1990-es évek").
 *
 * @param {number|string} decade - Decade year (e.g. 1990)
 * @param {Function} [t] - Translation function
 * @returns {string} Formatted decade string
 */
export const formatDecade = (decade, t = null) => {
  if (!decade) return '';
  const num = parseInt(decade, 10);
  if (isNaN(num)) return String(decade);
  if (t && typeof t === 'function') {
    return t('statistics.stats.decade_label', { decade: num, defaultValue: `${num}s` });
  }
  return `${num}s`;
};

/**
 * Formats a preview date string with day and time.
 *
 * @param {Date|string} dateInput
 * @param {string} [locale='en-US']
 * @returns {string} Formatted date (e.g. "Monday, 14:30")
 */
export const formatPreviewDate = (
  dateInput,
  locale = 'en-US'
) => {
  const date = parseDate(dateInput);
  if (!date) return '—';
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
};
