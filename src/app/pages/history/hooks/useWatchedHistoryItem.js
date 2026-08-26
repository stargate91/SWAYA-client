import { useCallback, useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { formatTime, formatDateTime, calculateProgressPercent } from '@/lib/formatters';
import { resolveWatchedPosterUrl, formatEpisodeLogTitle } from '../utils/historyHelpers';

/**
 * Custom hook to calculate progress, time formatting, poster URL,
 * and playback interaction state for a single watched history row item.
 *
 * @param {object} params
 * @param {object} params.log - History log record
 * @param {object} [params.playMutation] - Play mutation query object
 * @param {Function} [params.handlePlay] - Play trigger handler
 * @param {Function} [params.onTitleClick] - Title/poster click callback
 * @param {Function} [params.t] - Translation function
 */
export function useWatchedHistoryItem({
  log,
  playMutation,
  handlePlay,
  onTitleClick,
  t: propT,
} = {}) {
  const { t: ctxT } = useTranslation();
  const t = propT || ctxT;

  const isSingle = log?.type !== 'episode';
  const isScene = log?.type === 'scene' || log?.type === 'video';
  const posterUrl = useMemo(() => resolveWatchedPosterUrl(log), [log]);
  const percent = useMemo(
    () => calculateProgressPercent(log?.resume_position, log?.duration),
    [log?.resume_position, log?.duration]
  );
  const displayTitle = useMemo(
    () => (isSingle ? log?.title : formatEpisodeLogTitle(log)),
    [isSingle, log]
  );

  const formattedWatchedAt = useMemo(
    () => (log?.watched_at ? formatDateTime(log.watched_at) : ''),
    [log]
  );

  const formattedResumeTime = useMemo(
    () => formatTime(log?.resume_position || 0),
    [log]
  );

  const formattedDuration = useMemo(
    () => formatTime(log?.duration || 0),
    [log]
  );

  const isMutationPending = Boolean(
    playMutation?.isPending && playMutation?.variables === log?.media_item_id
  );

  const isPlayDisabled = Boolean(log?.is_active || isMutationPending);

  const playButtonLabel = useMemo(() => {
    if (log?.is_active) {
      return 'Playing';
    }
    if (log?.is_watched) {
      return t('historyPage.watchedRewatch') || 'Rewatch';
    }
    return t('historyPage.watchedContinue') || 'Continue';
  }, [log, t]);

  const handlePlayItem = useCallback(() => {
    if (log?.media_item_id && handlePlay) {
      handlePlay(log.media_item_id);
    }
  }, [log, handlePlay]);

  const handleTitleClick = useCallback(() => {
    if (log && onTitleClick) {
      onTitleClick(log);
    }
  }, [log, onTitleClick]);

  const showProgress = Boolean(!log?.is_watched && (log?.is_active || percent > 0));
  const progressVariant = log?.is_active ? 'accent' : 'blue';

  return {
    isSingle,
    isScene,
    posterUrl,
    percent,
    displayTitle,
    formattedWatchedAt,
    formattedResumeTime,
    formattedDuration,
    isMutationPending,
    isPlayDisabled,
    playButtonLabel,
    handlePlayItem,
    handleTitleClick,
    showProgress,
    progressVariant,
    t,
  };
}
