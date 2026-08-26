import { formatProgressCount } from './numbers';

/**
 * Parses duration from numbers or time strings ("HH:MM:SS" or "MM:SS") into seconds.
 *
 * @param {number|string} dur - Duration input
 * @returns {number} Duration in seconds
 */
export const parseDurationToSeconds = (dur) => {
  if (dur === undefined || dur === null || dur === '') return 0;
  if (typeof dur === 'number') return isNaN(dur) ? 0 : dur;
  if (typeof dur === 'string') {
    const trimmed = dur.trim();
    if (trimmed.includes(':')) {
      const parts = trimmed.split(':').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return parts[0] * 60 + parts[1];
      }
      if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
      }
    }
    const num = Number(trimmed);
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

/**
 * Formats seconds into a playback time string (m:ss or h:mm:ss).
 *
 * @param {number} secs - Time in seconds
 * @returns {string} Formatted timestamp (e.g. "4:15", "1:23:45", "0:00")
 */
export const formatTime = (secs) => {
  if (secs === undefined || secs === null || isNaN(secs) || secs < 0) {
    return '0:00';
  }
  const totalSecs = Math.floor(secs);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  const mStr = String(m).padStart(2, '0');
  const sStr = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mStr}:${sStr}` : `${m}:${sStr}`;
};

/**
 * Formats estimated time remaining (ETA) in seconds.
 *
 * @param {number} seconds - ETA in seconds
 * @param {string} fallback - Fallback string when ETA is not available
 * @returns {string} Formatted ETA (e.g. "45s", "3m 12s", "2h 15m")
 */
export const formatEta = (seconds, fallback = '') => {
  if (seconds === undefined || seconds === null || isNaN(seconds) || seconds <= 0 || seconds >= 8640000) {
    return fallback;
  }
  const total = Math.floor(seconds);
  if (total < 60) {
    return `${total}s`;
  }
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  if (mins < 60) {
    return `${mins}m ${secs}s`;
  }
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hours}h ${remMins}m`;
};

/**
 * Formats a media item duration into human-readable text.
 * Accepts numeric seconds or "HH:MM:SS" / "MM:SS" time strings.
 *
 * @param {number|string} durationInput - Duration in seconds or formatted string
 * @param {Function} [t] - Optional translation function
 * @returns {string} Formatted duration (e.g. "1h 45m", "45m")
 */
export const formatDuration = (durationInput, t) => {
  const seconds = parseDurationToSeconds(durationInput);
  if (!seconds || isNaN(seconds) || seconds <= 0) return '';
  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (t && typeof t === 'function') {
    if (hours > 0) {
      if (minutes > 0) {
        return t('library.details.durationHoursMinutes', { hours, minutes, defaultValue: '{{hours}}h {{minutes}}m' });
      }
      return t('library.details.durationHours', { hours, count: hours, defaultValue: '{{hours}}h' });
    }
    return t('library.details.durationMinutes', { minutes, count: minutes, defaultValue: '{{minutes}}m' });
  }

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return `${minutes}m`;
};

/**
 * Calculates remaining minutes between total duration and current playback position.
 *
 * @param {number} totalDuration - Total duration in seconds
 * @param {number} currentPosition - Current position in seconds
 * @returns {number} Remaining minutes (non-negative integer)
 */
export const getRemainingMinutes = (totalDuration, currentPosition) => {
  const durSec = parseDurationToSeconds(totalDuration);
  const posSec = parseDurationToSeconds(currentPosition);
  return Math.max(0, Math.floor(durSec / 60) - Math.floor(posSec / 60));
};

/**
 * Formats a Date object or timestamp into localized clock time.
 *
 * @param {Date|number|string} dateInput - Date or timestamp
 * @param {string} [locale='en-US'] - Formatting locale
 * @param {Intl.DateTimeFormatOptions} [options] - Formatting options
 * @returns {string} Formatted time string (e.g. "10:45 PM")
 */
export const formatClockTime = (dateInput, locale = 'en-US', options = { hour: 'numeric', minute: '2-digit', hour12: true }) => {
  if (!dateInput) return '';
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleTimeString(locale, options);
};

/**
 * Formats estimated scan remaining time into MM:SS.
 *
 * @param {object} status - Scan status object with active, start_time
 * @param {number} progress - Progress percentage (0-100)
 * @param {number} [now=Date.now()] - Current timestamp in ms
 * @returns {string} Formatted string (e.g. "02:15" or "--:--")
 */
export const formatScanRemaining = (status, progress, now = Date.now()) => {
  if (!status?.active) {
    return '--:--';
  }

  const startTime = Number(status.start_time) || 0;
  if (!startTime || progress <= 0 || progress >= 100) {
    return '--:--';
  }

  const elapsedSeconds = Math.max(0, now / 1000 - startTime);
  if (!elapsedSeconds || elapsedSeconds < 2 || progress < 2) {
    return '--:--';
  }

  const estimatedRemaining = Math.max(0, Math.round((elapsedSeconds / progress) * (100 - progress)));
  const minutes = String(Math.floor(estimatedRemaining / 60)).padStart(2, '0');
  const seconds = String(estimatedRemaining % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};

/**
 * Formats image batch processing remaining count into "current / total".
 *
 * @param {object} status - Status object with active, completed, total, progress
 * @returns {string} Formatted count (e.g. "12/45" or "--:--")
 */
export const formatImageRemaining = (status) => {
  if (!status?.active) {
    return '--:--';
  }

  const total = Number(status.total) || 0;
  const completed = Number(status.completed) || 0;
  const progress = Number.isFinite(Number(status.progress))
    ? Number(status.progress)
    : (total > 0 ? (completed / total) * 100 : 0);

  if (progress <= 0 || progress >= 100) {
    return '--:--';
  }

  return formatProgressCount(completed, total);
};

/**
 * Formats a runtime value (in seconds or minutes) to rounded minutes label (e.g. "45 mins" or "45m").
 *
 * @param {number|string} runTime - Runtime in seconds or minutes
 * @param {string} [unit='mins'] - Unit label
 * @returns {string} Formatted runtime minutes
 */
export const formatRuntimeMinutes = (runTime, unit = 'mins') => {
  const parsed = parseDurationToSeconds(runTime);
  if (!parsed || isNaN(parsed) || parsed <= 0) return '';
  const mins = parsed > 500 ? Math.round(parsed / 60) : Math.round(parsed);
  return `${mins} ${unit}`.trim();
};
