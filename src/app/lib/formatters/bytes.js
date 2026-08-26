/**
 * Formats a byte count into a human-readable size string.
 *
 * @param {number} bytes - Number of bytes
 * @param {number} decimals - Number of decimal digits (default 1)
 * @returns {string} Formatted size (e.g. "1.5 GB", "0 B")
 */
export const formatBytes = (bytes, decimals = 1) => {
  if (bytes === undefined || bytes === null || isNaN(bytes) || bytes <= 0) {
    return '0 B';
  }
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const safeIndex = Math.min(i, sizes.length - 1);
  return parseFloat((bytes / Math.pow(k, safeIndex)).toFixed(decimals)) + ' ' + sizes[safeIndex];
};

/**
 * Formats a transfer rate in bytes per second.
 *
 * @param {number} bytesPerSec - Rate in bytes per second
 * @param {number} decimals - Number of decimal digits (default 1)
 * @returns {string} Formatted speed (e.g. "5.2 MB/s", "0 B/s")
 */
export const formatSpeed = (bytesPerSec, decimals = 1) => {
  if (!bytesPerSec || bytesPerSec <= 0 || isNaN(bytesPerSec)) {
    return '0 B/s';
  }
  const k = 1024;
  const sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s'];
  const i = Math.floor(Math.log(bytesPerSec) / Math.log(k));
  const safeIndex = Math.min(i, sizes.length - 1);
  return parseFloat((bytesPerSec / Math.pow(k, safeIndex)).toFixed(decimals)) + ' ' + sizes[safeIndex];
};

/**
 * Formats a generic file size value (which may be in bytes or megabytes) into MB or GB.
 *
 * @param {number|string} sizeVal - Size value in bytes or MB
 * @param {boolean} [isBytes=null] - Whether the size is explicitly bytes (null for auto-detect)
 * @param {Function} [t=null] - Optional translation function
 * @returns {string} Formatted size string (e.g. "1.25 GB", "450 MB")
 */
export const formatFileSize = (sizeVal, isBytes = null, t = null) => {
  const num = Number(sizeVal);
  if (!num || isNaN(num) || num <= 0) return '';
  const shouldTreatAsBytes = isBytes !== null ? isBytes : num > 50000;
  const sizeMb = shouldTreatAsBytes ? (num / (1024 * 1024)) : num;
  const formatted = sizeMb > 1024
    ? `${(sizeMb / 1024).toFixed(2)} GB`
    : `${sizeMb.toFixed(0)} MB`;

  if (t && typeof t === 'function') {
    return `${t('library.sort.fileSize') || 'Size'}: ${formatted}`;
  }
  return formatted;
};

/**
 * Formats torrent progress percent and transfer rate into a status string.
 *
 * @param {number|string} progress - Progress percentage
 * @param {string} speedText - Formatted speed string
 * @returns {string} Formatted torrent status (e.g. "75% (5.2 MB/s)")
 */
export const formatTorrentStats = (progress, speedText) => `${progress}% (${speedText})`;
