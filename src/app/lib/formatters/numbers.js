/**
 * Formats a monetary value into a currency string (e.g. "$120,000,000").
 *
 * @param {number} val - Amount to format
 * @param {string} [currency='USD'] - ISO currency code
 * @param {string} [locale='en-US'] - Formatting locale
 * @param {string} [fallback='-'] - Fallback for invalid or zero values
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (val, currency = 'USD', locale = 'en-US', fallback = '-') => {
  if (val === undefined || val === null || isNaN(val) || val <= 0) {
    return fallback;
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(val);
};

/**
 * Formats a number with locale-aware thousand separators.
 *
 * @param {number} val - Number to format
 * @param {object} [options={}] - Intl.NumberFormat options
 * @param {string} [locale='en-US'] - Formatting locale
 * @param {string} [fallback='0'] - Fallback string
 * @returns {string} Formatted number
 */
export const formatNumber = (val, options = {}, locale = 'en-US', fallback = '0') => {
  if (val === undefined || val === null || isNaN(val)) {
    return fallback;
  }
  return new Intl.NumberFormat(locale, options).format(val);
};

/**
 * Formats a rating value to fixed decimal places (e.g. "8.5").
 *
 * @param {number|string} val - Rating value
 * @param {number} [decimals=1] - Decimal places
 * @param {string} [fallback='-.-'] - Fallback string when invalid
 * @returns {string} Formatted rating string
 */
export const formatRating = (val, decimals = 1, fallback = '-.-') => {
  if (val === undefined || val === null || val === '') {
    return fallback;
  }
  const num = Number(val);
  if (isNaN(num)) {
    return String(val);
  }
  return num.toFixed(decimals);
};

/**
 * Formats a progress count (e.g. "120/500").
 *
 * @param {number|string} completed - Completed items
 * @param {number|string} total - Total items
 * @param {string} [fallback='--:--'] - Fallback when count is invalid
 * @returns {string} Formatted count (e.g. "120/500")
 */
export const formatProgressCount = (completed, total, fallback = '--:--') => {
  const compNum = Number(completed) || 0;
  const totNum = Number(total) || 0;
  if (totNum <= 0) return fallback;
  return `${compNum}/${totNum}`;
};

/**
 * Formats a percentage value (e.g. "45%").
 *
 * @param {number|string} val - Percentage value
 * @param {number} [decimals=0] - Decimal places
 * @param {string} [fallback='0%'] - Fallback string
 * @returns {string} Formatted percentage
 */
export const formatPercent = (val, decimals = 0, fallback = '0%') => {
  if (val === undefined || val === null || isNaN(val)) {
    return fallback;
  }
  return `${Number(val).toFixed(decimals)}%`;
};

/**
 * Calculates a bounded integer progress percentage from current and total counts.
 *
 * @param {number|string} current - Current progress
 * @param {number|string} total - Total target
 * @returns {number} Integer percentage between 0 and 100
 */
export const calculateProgressPercent = (current, total) => {
  const c = Number(current) || 0;
  const t = Number(total) || 0;
  if (t <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((c / t) * 100)));
};
