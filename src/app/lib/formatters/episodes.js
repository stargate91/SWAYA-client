/**
 * Normalizes an episode number input (string, array, number) into
 * a sorted array of integers.
 *
 * Handles: arrays, JSON strings like "[1,2]", comma-separated "1,2,3",
 * dash ranges, and plain numbers.
 *
 * @param {string|number|Array} episodeNumber
 * @returns {number[]}
 */
export const normalizeEpisodeNumbers = (episodeNumber) => {
  if (Array.isArray(episodeNumber)) {
    return episodeNumber.map((n) => Number(n)).filter(Number.isInteger);
  }

  if (typeof episodeNumber === 'string') {
    const trimmed = episodeNumber.trim();
    if (!trimmed) return [];

    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed)
          ? parsed.map((n) => Number(n)).filter(Number.isInteger)
          : [Number(parsed)].filter(Number.isInteger);
      } catch {
        return [];
      }
    }

    if (trimmed.includes(',')) {
      return trimmed.split(',').map((s) => Number(s.trim())).filter(Number.isInteger);
    }

    // Dash-separated range (e.g. "1-3") — return as-is endpoints
    if (trimmed.includes('-')) {
      const parts = trimmed.split('-').map((s) => Number(s.trim())).filter(Number.isInteger);
      return parts;
    }

    const parsed = Number(trimmed);
    return Number.isInteger(parsed) ? [parsed] : [];
  }

  return Number.isInteger(episodeNumber) ? [episodeNumber] : [];
};

/**
 * Counts how many individual episodes are represented in an episode number string or range.
 *
 * @param {string|number|Array} epNum
 * @returns {number}
 */
export const countEpisodesInNumber = (epNum) => {
  if (epNum === undefined || epNum === null) return 1;
  const str = String(epNum).trim();
  if (!str) return 1;

  if (str.includes(',')) {
    const parts = str.split(',').map(s => s.trim()).filter(Boolean);
    return parts.length > 0 ? parts.length : 1;
  }

  if (str.includes('-')) {
    const parts = str.split('-').map(s => s.trim()).filter(Boolean);
    if (parts.length === 2) {
      const start = parseInt(parts[0], 10);
      const end = parseInt(parts[1], 10);
      if (!isNaN(start) && !isNaN(end) && end >= start) {
        return end - start + 1;
      }
    }
  }

  return 1;
};

/**
 * Formats an episode number for display.
 * Input can be number, string, array, etc.
 *
 * Examples:
 *   5         → "5"
 *   "1,2,3"   → "1-3"
 *   [1,2,3]   → "1-3"
 *   "1-3"     → "1-3"
 *   null      → ""
 *
 * @param {string|number|Array} epNum
 * @returns {string}
 */
export const formatEpisodeNumber = (epNum) => {
  if (epNum === undefined || epNum === null) return '';
  const nums = normalizeEpisodeNumbers(epNum);
  if (nums.length === 0) return '';
  if (nums.length === 1) return String(nums[0]);
  return `${nums[0]}-${nums[nums.length - 1]}`;
};

/**
 * Formats a full episode code like "S01E05" or "S02E01-03".
 *
 * @param {number|string} seasonNumber
 * @param {number|string|Array} episodeNumber
 * @returns {string|null} null if no season number provided
 */
export const formatEpisodeCode = (seasonNumber, episodeNumber) => {
  if (seasonNumber === undefined || seasonNumber === null || seasonNumber === '') return null;
  const sStr = String(seasonNumber).padStart(2, '0');
  const normalized = normalizeEpisodeNumbers(episodeNumber);
  if (normalized.length === 0) return `S${sStr}`;
  if (normalized.length === 1) return `S${sStr}E${String(normalized[0]).padStart(2, '0')}`;
  const first = String(normalized[0]).padStart(2, '0');
  const last = String(normalized[normalized.length - 1]).padStart(2, '0');
  return `S${sStr}E${first}-${last}`;
};
