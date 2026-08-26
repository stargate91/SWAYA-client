/**
 * Converts a string (snake_case, kebab-case, or lower-case) to Title Case.
 *
 * @param {string} str - Raw string to title case
 * @returns {string} Formatted string
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Parses directory path and filename from a full file path.
 *
 * @param {string} fullPath - Full file path (Windows or POSIX)
 * @returns {{ dir: string, filename: string }} Directory and filename components
 */
export const parsePathAndFilename = (fullPath) => {
  if (!fullPath || typeof fullPath !== 'string') {
    return { dir: '', filename: '' };
  }
  const filename = fullPath.split(/[/\\]/).pop() || '';
  const dir = fullPath.substring(0, fullPath.length - filename.length);
  return { dir, filename };
};

/**
 * Extracts and returns the filename from a file path.
 *
 * @param {string} path - File path
 * @param {string} [fallback='-'] - Fallback value
 * @returns {string} Filename
 */
export const formatFilename = (path, fallback = '-') => {
  if (!path) return fallback;
  return String(path).split(/[/\\]/).pop() || fallback;
};

/**
 * Truncates a string or localized biography object to a maximum length.
 *
 * @param {string|object} textInput - Text string or object with language keys
 * @param {number} [maxLength=60] - Maximum length before truncating
 * @param {string} [suffix='...'] - Truncation suffix
 * @returns {string} Truncated string
 */
export const truncateText = (textInput, maxLength = 60, suffix = '...') => {
  if (!textInput) return '';
  const text = typeof textInput === 'object'
    ? (textInput.en || textInput.hu || Object.values(textInput)[0] || '')
    : String(textInput);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + suffix;
};

/**
 * Formats an array or string of performer list attributes (e.g. tattoos, piercings).
 *
 * @param {Array|string} val - Tattoos or piercings data
 * @returns {string|null} Formatted representation or null if empty
 */
export const formatListAttr = (val) => {
  if (!val) return null;
  if (Array.isArray(val)) {
    if (val.length === 0) return null;
    const locations = val
      .map((i) => (typeof i === 'object' && i !== null ? (i.location || i.description) : i))
      .filter(Boolean);
    if (locations.length === 0) return 'Yes';
    return toTitleCase(locations.join(', '));
  }
  if (typeof val === 'string') {
    const formatted = toTitleCase(val);
    if (formatted === 'No Piercings' || formatted === 'No Tattoos') return 'No';
    return formatted;
  }
  return null;
};

/**
 * Formats body dimensions (waist, hip) with inch/cm units automatically.
 *
 * @param {number|string} val - Dimension measurement
 * @returns {string|null} Formatted string with unit or null
 */
export const formatBodyDimension = (val) => {
  if (!val) return null;
  const num = Number(val);
  if (isNaN(num)) return String(val);
  return num < 50 ? `${num}"` : `${num} cm`;
};
