/**
 * Resolves episode number from prop or parses it from the title as fallback.
 */
export function resolveEpisodeNumber(title = '', episodeNumber = null) {
  if (episodeNumber !== null && episodeNumber !== undefined) {
    return episodeNumber;
  }
  const parsedEpMatch = title.match(/E(\d{2})/i);
  return parsedEpMatch ? parseInt(parsedEpMatch[1], 10) : null;
}

/**
 * Cleans the title for TV episodes to prevent redundancy with TV show name.
 * e.g. "Relic Hunter - E06 - Diamond in the Rough" -> "Diamond in the Rough"
 */
export function formatTvEpisodeDisplayTitle(title = '', tvShowTitle = '') {
  if (!tvShowTitle) {
    return title;
  }
  let clean = title;
  if (clean.startsWith(tvShowTitle)) {
    clean = clean.substring(tvShowTitle.length).trim();
  }
  clean = clean.replace(/^[\s-&_—]+/, '').trim();
  clean = clean.replace(/S?\d{2}E\d{2}/i, '').trim();
  clean = clean.replace(/E\d{2}/i, '').trim();
  clean = clean.replace(/^[\s-&_—]+/, '').trim();
  return clean || title;
}

/**
 * Formats display label for an audio track (including codec and external track indicator).
 */
export function formatAudioTrackLabel(track = {}, t = (k) => k, isExternal = false) {
  const defaultLabel = isExternal
    ? (t('player.external_track') || 'External Track')
    : (t('player.track') || 'Track');
  const base = track.title || track.lang?.toUpperCase() || `${defaultLabel} ${track.id}`;
  return track.codec ? `${base} (${track.codec.toUpperCase()})` : base;
}

/**
 * Formats display label for a subtitle track.
 */
export function formatSubTrackLabel(track = {}, t = (k) => k, isExternal = false) {
  const defaultLabel = isExternal
    ? (t('player.external_subtitle') || 'External Subtitle')
    : (t('common.subtitle') || 'Subtitle');
  return track.title || track.lang?.toUpperCase() || `${defaultLabel} ${track.id}`;
}
