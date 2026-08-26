import { createElement } from 'react';
import { CheckCircle2, AlertTriangle, RotateCcw, Clock } from '@/ui/icons';
import { formatEpisodeCode } from '@/lib/formatters';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { resolveLibraryItemPath } from '@/lib/routes';

/**
 * Returns icon and accent color corresponding to a batch status.
 *
 * @param {'completed' | 'partial' | 'undone' | string} status
 * @returns {{ icon: React.ReactNode, accentColor: string }}
 */
export function getHistoryCardStatusConfig(status) {
  switch (status) {
    case 'completed':
      return {
        icon: createElement(CheckCircle2, { size: 18 }),
        accentColor: 'var(--color-state-success)',
      };
    case 'partial':
      return {
        icon: createElement(AlertTriangle, { size: 18 }),
        accentColor: 'var(--color-state-warning)',
      };
    case 'undone':
      return {
        icon: createElement(RotateCcw, { size: 18 }),
        accentColor: 'var(--color-text-muted)',
      };
    default:
      return {
        icon: createElement(Clock, { size: 18 }),
        accentColor: 'var(--color-accent)',
      };
  }
}

/**
 * Resolves the route target and state for a media item.
 *
 * @param {object} log
 * @returns {{ pathname: string, state: object } | null}
 */
export function getMediaDetailRoute(log) {
  if (!log) return null;
  const path = resolveLibraryItemPath(log);
  if (!path) return null;
  return { pathname: path, state: { allowAdult: true } };
}

/**
 * Formats a display title for episode log entries.
 *
 * @param {object} log
 * @returns {string}
 */
export function formatEpisodeLogTitle(log) {
  if (!log) return '';
  const code = formatEpisodeCode(log.season_number, log.episode_number);
  const epTitle = log.episode_title || log.title || '';
  return `${log.tv_title || ''} - ${code} - ${epTitle}`;
}

/**
 * Resolves the poster URL for a watched history entry.
 *
 * @param {object} log
 * @returns {string}
 */
export function resolveWatchedPosterUrl(log) {
  if (!log) return '';
  const isSingle = log.type !== 'episode';
  const isScene = log.type === 'scene' || log.type === 'video';
  const poster = isScene
    ? (log.backdrop_path || log.poster_path)
    : (isSingle ? log.poster_path : (log.tv_poster_path || log.poster_path));
  return poster ? resolveMediaImageUrl(poster, isScene ? 'backdrop' : 'poster') : '';
}

/**
 * Resolves the poster/snapshot URL for a peak finish history entry.
 *
 * @param {object} log
 * @returns {{ snapshotUrl: string, posterUrl: string }}
 */
export function resolvePeakImageUrls(log) {
  if (!log) return { snapshotUrl: '', posterUrl: '' };
  const snapshotUrl = log.snapshot_path ? resolveMediaImageUrl(log.snapshot_path, 'backdrop') : '';
  const poster = log.poster_path || log.backdrop_path;
  const posterUrl = snapshotUrl || (poster ? resolveMediaImageUrl(poster, 'backdrop') : '');
  return { snapshotUrl, posterUrl };
}
