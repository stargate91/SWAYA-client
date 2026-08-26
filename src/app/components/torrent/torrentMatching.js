/**
 * Extracts the 40-character hex or 32-character base32 infoHash from a magnet URI if present.
 * @param {string} magnetUri
 * @returns {string|null}
 */
export function extractInfoHash(magnetUri) {
  if (!magnetUri) return null;
  const match =
    magnetUri.match(/btih:([a-f0-9]{40})/i) ||
    magnetUri.match(/btih:([2-7a-z]{32})/i);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Extracts alphanumeric words of length >= 4 from a string for fuzzy matching.
 * @param {string} str
 * @returns {Set<string>}
 */
export function getSignificantWords(str) {
  if (!str) return new Set();
  return new Set(
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 4)
  );
}

/**
 * Checks if a search result item matches an active download via hash or fuzzy name match.
 * @param {object} item
 * @param {object} activeDownload
 * @returns {boolean}
 */
export function isTorrentMatch(item, activeDownload) {
  if (!item || !activeDownload) return false;

  const itemHash = extractInfoHash(item.magnetUri);
  if (itemHash && activeDownload.hash && itemHash === activeDownload.hash.toLowerCase()) {
    return true;
  }

  const wordsA = getSignificantWords(item.name);
  if (wordsA.size === 0) return false;

  const wordsB = getSignificantWords(activeDownload.name);
  if (wordsB.size === 0) return false;

  let intersectionCount = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) intersectionCount++;
  }

  const minSize = Math.min(wordsA.size, wordsB.size);
  return minSize > 0 && intersectionCount / minSize >= 0.75;
}

/**
 * Finds the matching active download for a search result item.
 * @param {object} item
 * @param {Array<object>} activeDownloads
 * @returns {object|null}
 */
export function getActiveDownloadMatch(item, activeDownloads = []) {
  if (!activeDownloads || activeDownloads.length === 0) return null;
  return activeDownloads.find((active) => isTorrentMatch(item, active)) || null;
}

/**
 * Evaluates whether an active download item is completed/seeding or still actively downloading.
 * @param {object|null} dlMatch
 * @returns {{ isMatched: boolean, isCompleted: boolean, isDownloading: boolean, progress: number, state: string }}
 */
export function getTorrentDownloadStatus(dlMatch) {
  if (!dlMatch) {
    return {
      isMatched: false,
      isCompleted: false,
      isDownloading: false,
      progress: 0,
      state: '',
    };
  }

  const isCompleted =
    dlMatch.progress >= 100 ||
    ['uploading', 'pausedUP', 'stalledUP', 'checkingUP', 'seeding', 'stoppedUP', 'forcedUP', 'queuedUP'].includes(dlMatch.state);

  return {
    isMatched: true,
    isCompleted,
    isDownloading: !isCompleted,
    progress: dlMatch.progress || 0,
    state: dlMatch.state || '',
  };
}

/**
 * Maps raw client torrent states (qBittorrent/Transmission) to simplified categories.
 * @param {object} torrent
 * @returns {'paused' | 'checking' | 'seeding' | 'completed' | 'downloading' | 'error' | string}
 */
export function getSimplifiedTorrentState(torrent) {
  if (!torrent) return 'completed';
  const state = (torrent.state || '').toLowerCase();
  const rawState = (torrent.raw_state || '').toLowerCase();
  const progress = torrent.progress || 0;

  if (
    state === 'paused' ||
    state.includes('pause') ||
    state.includes('stop') ||
    rawState.includes('pause') ||
    rawState.includes('stop')
  ) {
    return 'paused';
  }
  if (
    state === 'checking' ||
    state.includes('check') ||
    state.includes('moving') ||
    state.includes('allocat') ||
    rawState.includes('check')
  ) {
    return 'checking';
  }
  if (state === 'error' || state.includes('error') || rawState.includes('error') || rawState.includes('missing')) {
    return 'error';
  }
  if (
    state === 'seeding' ||
    state.includes('seed') ||
    state.includes('upload') ||
    state === 'stalledup' ||
    state === 'forcedup' ||
    state === 'queuedup' ||
    rawState.includes('up') ||
    rawState.includes('seed')
  ) {
    return 'seeding';
  }
  if (progress >= 100) {
    if (state.includes('up') || state.includes('seed') || rawState.includes('up') || rawState.includes('seed')) {
      return 'seeding';
    }
    if (state === 'completed' || state === 'finished') {
      return 'completed';
    }
    return 'seeding';
  }
  if (
    state === 'downloading' ||
    state.includes('dl') ||
    state.includes('down') ||
    rawState.includes('dl') ||
    rawState.includes('meta')
  ) {
    return 'downloading';
  }
  return state || 'downloading';
}

/**
 * Calculates aggregate stats from an array of torrents.
 * @param {Array<object>} torrents
 * @returns {{ totalDlSpeed: number, totalUpSpeed: number, downloadingCount: number, seedingCount: number, pausedCount: number, totalCount: number }}
 */
export function calculateTorrentStats(torrents = []) {
  let totalDlSpeed = 0;
  let totalUpSpeed = 0;
  let downloadingCount = 0;
  let seedingCount = 0;
  let pausedCount = 0;

  torrents.forEach((t) => {
    const state = getSimplifiedTorrentState(t);
    if (state === 'downloading') {
      totalDlSpeed += (t.dlspeed !== undefined ? t.dlspeed : t.speed) || 0;
      downloadingCount++;
    } else if (state === 'seeding') {
      totalUpSpeed += (t.upspeed !== undefined ? t.upspeed : t.speed) || 0;
      seedingCount++;
    } else if (state === 'paused') {
      pausedCount++;
    }
  });

  return {
    totalDlSpeed,
    totalUpSpeed,
    downloadingCount,
    seedingCount,
    pausedCount,
    totalCount: torrents.length,
  };
}
