import { useMemo } from 'react';
import { formatSpeed, formatEta } from '@/lib/formatters';
import { getSimplifiedTorrentState } from '@/components/torrent/torrentMatching';

/**
 * Custom hook to format progress cell indicators, ETA, and transfer speed.
 *
 * @param {object} params
 * @param {number} [params.progress=0]
 * @param {object} [params.row]
 */
export function useTorrentProgressFormatter({ progress = 0, row } = {}) {
  return useMemo(() => {
    const state = getSimplifiedTorrentState(row);
    const isDownloading = state === 'downloading';
    const isSeeding = state === 'seeding';
    const variant = isSeeding ? 'success' : isDownloading ? 'blue' : 'accent';
    const eta = isDownloading && row?.eta ? formatEta(row.eta) : '';
    const speed = isDownloading && row?.speed ? formatSpeed(row.speed) : '';
    const progressPercent = `${progress}%`;
    const speedAndEtaText = isDownloading ? [speed, eta].filter(Boolean).join(' • ') : '';

    return {
      state,
      isDownloading,
      isSeeding,
      variant,
      eta,
      speed,
      progressPercent,
      speedAndEtaText,
    };
  }, [progress, row]);
}

/**
 * Custom hook to resolve tone and localized status badge labels.
 *
 * @param {object} params
 * @param {string} params.state
 * @param {Function} [params.t]
 */
export function useTorrentStatusBadgeFormatter({ state, t = (k) => k } = {}) {
  return useMemo(() => {
    let tone = 'neutral';
    let label = state;

    if (state === 'downloading') {
      tone = 'accent';
      label = t('torrent.states.downloading') || 'Downloading';
    } else if (state === 'paused') {
      tone = 'warning';
      label = t('torrent.states.paused') || 'Paused';
    } else if (state === 'seeding') {
      tone = 'success';
      label = t('torrent.states.seeding') || 'Seeding';
    } else if (state === 'completed') {
      tone = 'success';
      label = t('torrent.states.completed') || 'Completed';
    } else if (state === 'checking') {
      tone = 'neutral';
      label = t('torrent.states.checking') || 'Checking';
    }

    return { tone, label };
  }, [state, t]);
}
