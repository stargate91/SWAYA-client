export const SOURCE_LABELS = {
  bluray: 'Blu-Ray',
  web: 'WEB-DL',
  dvd: 'DVD',
  tv: 'TV HDTV',
  cam: 'CAM'
};

export const EDITION_LABELS = {
  theatrical: 'Theatrical Edition',
  directors_cut: "Director's Cut",
  extended: 'Extended Edition',
  unrated: 'Unrated',
  remastered: 'Remastered',
  special: 'Special Edition',
  ultimate: 'Ultimate',
  collectors_edition: "Collector's Edition",
  fan_edit: 'Fan Edit'
};

export const AUDIO_TYPE_LABELS = {
  mono: 'Mono',
  stereo: 'Stereo',
  surround: 'Surround Sound',
  dual_audio: 'Dual Audio',
  multi_audio: 'Multi Audio'
};

/**
 * Formats an audio codec name and channel count for technical spec displays.
 *
 * @param {string} codec - e.g. "aac", "eac3", "dts"
 * @param {number|string} [channels] - Channel count (e.g. 6, "2")
 * @returns {string} Formatted string (e.g. "AAC (6ch)" or "AAC")
 */
export const formatAudioCodec = (codec, channels) => {
  if (!codec) return '';
  const upperCodec = String(codec).toUpperCase();
  if (channels !== undefined && channels !== null && channels !== '') {
    return `${upperCodec} (${channels}ch)`;
  }
  return upperCodec;
};

/**
 * Formats a color bit depth for technical spec displays.
 *
 * @param {number|string} bitDepth - e.g. 8, 10, "12"
 * @returns {string} Formatted string (e.g. "10-bit")
 */
export const formatBitDepth = (bitDepth) => {
  if (!bitDepth) return '';
  return `${bitDepth}-bit`;
};

/**
 * Formats video framerate to 3 decimal places with fps unit.
 *
 * @param {number|string} framerate - e.g. 23.976, "24.0"
 * @returns {string} Formatted string (e.g. "23.976 fps")
 */
export const formatFramerate = (framerate) => {
  if (!framerate) return '';
  const parsed = parseFloat(framerate);
  if (isNaN(parsed)) return String(framerate);
  return `${parsed.toFixed(3)} fps`;
};

/**
 * Formats waist-to-hip hourglass ratio.
 *
 * @param {number|string} waist - Waist in inches or cm
 * @param {number|string} hip - Hip in inches or cm
 * @returns {string} Formatted ratio (e.g. "0.72" or "—")
 */
export const formatHourglassRatio = (waist, hip) => {
  const w = parseFloat(waist) || 0;
  const h = parseFloat(hip) || 0;
  return w > 0 && h > 0 ? (w / h).toFixed(2) : '—';
};
