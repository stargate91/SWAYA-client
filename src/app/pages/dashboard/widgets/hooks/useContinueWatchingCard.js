import { useCallback, useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { formatEpisodeCode, getRemainingMinutes } from '@/lib/formatters';

/**
 * Custom hook to compute progress, metadata, poster URLs,
 * and playback action handlers for a single continue watching card.
 *
 * @param {object} params
 * @param {object} params.item - The continue watching media item
 * @param {object} [params.activePlayback] - Current global active playback state
 * @param {(item: object) => void} [params.handlePlay] - Play callback handler
 * @param {(id: string | number) => void} [params.handleResetProgress] - Reset progress callback handler
 * @param {Function} [params.t] - Translation function
 */
export function useContinueWatchingCard({
  item,
  activePlayback,
  handlePlay,
  handleResetProgress,
  t: propT,
} = {}) {
  const { t: ctxT } = useTranslation();
  const t = propT || ctxT;

  const isCurrentlyPlaying = Boolean(
    activePlayback && String(activePlayback.itemId) === String(item?.id)
  );

  const currentResumePos = isCurrentlyPlaying
    ? (activePlayback?.currentTime ?? item?.resume_position ?? 0)
    : (item?.resume_position ?? 0);

  const currentDuration = isCurrentlyPlaying
    ? (activePlayback?.duration || item?.duration || 1)
    : (item?.duration || 1);

  const progressPercent = useMemo(
    () => Math.min(100, (currentResumePos / currentDuration) * 100),
    [currentResumePos, currentDuration]
  );

  const isEpisode = item?.type === 'episode';
  const episodeCode = useMemo(() => {
    if (!isEpisode) return null;
    return item?.display_episode_code || formatEpisodeCode(item?.season_number, item?.episode_number);
  }, [isEpisode, item]);

  const minutesLeft = useMemo(
    () => getRemainingMinutes(currentDuration, currentResumePos),
    [currentDuration, currentResumePos]
  );

  const episodeMeta = useMemo(() => {
    if (!episodeCode) return null;
    return `${episodeCode} - ${item?.tv_title || ''}`;
  }, [episodeCode, item?.tv_title]);

  const resolvedImageUrl = useMemo(() => {
    const imagePath = item?.still_path || item?.backdrop_path;
    return imagePath ? resolveMediaImageUrl(imagePath, 'poster') : '';
  }, [item?.still_path, item?.backdrop_path]);

  const subtitle = useMemo(() => {
    return t('dashboard.continue_watching.minutes_left', { minutes: minutesLeft }) || `${minutesLeft}m left`;
  }, [t, minutesLeft]);

  const isActive = Boolean(item?.is_active && activePlayback);

  const onCardClick = useCallback(() => {
    if (item && handlePlay) {
      handlePlay(item);
    }
  }, [item, handlePlay]);

  const onResetClick = useCallback(
    (e) => {
      e?.stopPropagation?.();
      if (item?.id && handleResetProgress) {
        handleResetProgress(item.id);
      }
    },
    [item, handleResetProgress]
  );

  return {
    progressPercent,
    minutesLeft,
    subtitle,
    episodeMeta,
    resolvedImageUrl,
    isActive,
    onCardClick,
    onResetClick,
    t,
  };
}
