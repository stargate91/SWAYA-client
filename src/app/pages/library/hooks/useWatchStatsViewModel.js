import { useState, useCallback, useMemo } from 'react';
import {
  countEpisodesInNumber,
  formatTime,
  formatDateTime,
  formatEpisodeCode,
  calculateProgressPercent,
} from '@/lib/formatters';

/**
 * Computes watch statistics, playback history logs, and progress metrics for media items.
 */
export function useWatchStatsViewModel({ item, isMovie, isScene, t }) {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  const toggleHistoryExpanded = useCallback(() => {
    setIsHistoryExpanded((prev) => !prev);
  }, []);

  const stats = useMemo(() => {
    if (!item) {
      return {
        logs: [],
        formattedLogs: [],
        hasLogs: false,
        isScrollableHistory: false,
        watchStatus: '',
        watchCount: 0,
        progressPercent: 0,
        progressText: '',
        lastWatchedText: '',
        statusClass: 'unwatched',
        watchCountText: '',
        progressPercentText: '0%',
        watchActivityText: '',
      };
    }

    const watchedLabel = t('library.details.statusWatched', { defaultValue: 'Watched' });
    const inProgressLabel = t('library.details.statusInProgress', { defaultValue: 'In Progress' });
    const unwatchedLabel = t('library.details.statusUnwatched', { defaultValue: 'Unwatched' });
    const neverLabel = t('library.details.never', { defaultValue: 'Never' });
    const playSessionLabel = t('library.details.playSession', { defaultValue: 'Session' });
    const watchActivityLabel = t('library.details.watchActivity', { defaultValue: 'Watch History' });

    let watchStatus;
    let watchCount;
    let progressPercent;
    let progressText;
    let lastWatchedText;

    const logs = isMovie || isScene
      ? (item.playback_logs || [])
      : (() => {
        const list = [];
        (item.seasons || []).forEach((s) => {
          (s.episodes || []).forEach((ep) => {
            if (ep.playback_logs && ep.playback_logs.length > 0) {
              ep.playback_logs.forEach((log) => {
                list.push({
                  ...log,
                  season_number: s.season_number,
                  episode_number: ep.episode_number,
                  episode_title: ep.title,
                  seasonNumber: s.season_number,
                  episodeNumber: ep.episode_number,
                });
              });
            }
          });
        });
        list.sort((a, b) => new Date(b.watched_at) - new Date(a.watched_at));
        return list;
      })();

    if (isMovie || isScene) {
      const duration = item.technical?.duration || (item.runtime ? item.runtime * 60 : 0);
      progressPercent = duration > 0 && item.resume_position
        ? calculateProgressPercent(item.resume_position, duration)
        : 0;

      watchStatus = item.is_watched
        ? watchedLabel
        : (item.resume_position > 0
          ? inProgressLabel
          : unwatchedLabel);

      progressText = item.is_watched
        ? watchedLabel
        : (item.resume_position > 0
          ? `${formatTime(item.resume_position)} / ${formatTime(duration)}`
          : '0:00');

      watchCount = item.watch_count || 0;
      lastWatchedText = item.last_watched_at
        ? formatDateTime(item.last_watched_at, undefined, undefined, item.last_watched_at)
        : neverLabel;
    } else {
      // TV show
      const regularSeasons = (item.seasons || []).filter((s) => s.season_number > 0);
      const allEpisodes = regularSeasons.flatMap((s) => s.episodes || []);
      const watchStats = item.watch_stats;
      const isProgressive = Boolean(item.progressive_seasons);

      const totalEpisodesCount = (isProgressive && watchStats?.total_episodes_count)
        ? watchStats.total_episodes_count
        : (allEpisodes.length > 0
          ? allEpisodes.reduce((sum, ep) => sum + countEpisodesInNumber(ep.episode_number), 0)
          : (watchStats ? watchStats.total_episodes_count : 0));

      const allSeasonsLoaded = regularSeasons.length > 0 && regularSeasons.every((s) => s.episodes_complete !== false && (s.episodes || []).length > 0);

      const watchedEpisodesCount = (isProgressive && !allSeasonsLoaded && watchStats?.watched_episodes_count !== undefined)
        ? watchStats.watched_episodes_count
        : (allEpisodes.length > 0
          ? allEpisodes.reduce((sum, ep) => sum + (ep.is_watched ? countEpisodesInNumber(ep.episode_number) : 0), 0)
          : (watchStats ? watchStats.watched_episodes_count : 0));

      progressPercent = totalEpisodesCount > 0
        ? calculateProgressPercent(watchedEpisodesCount, totalEpisodesCount)
        : 0;

      const inProgressEpisodes = allEpisodes.length > 0
        ? allEpisodes.filter((e) => e.resume_position > 0)
        : (watchStats ? watchStats.in_progress_episodes || [] : []);

      const isInProgress = inProgressEpisodes.length > 0;

      watchStatus = watchedEpisodesCount === totalEpisodesCount && totalEpisodesCount > 0
        ? watchedLabel
        : (isInProgress || watchedEpisodesCount > 0
          ? inProgressLabel
          : unwatchedLabel);

      progressText = `${watchedEpisodesCount} / ${totalEpisodesCount} ep`;

      let tvLastWatched = null;
      if (watchStats?.playback_logs && watchStats.playback_logs.length > 0) {
        tvLastWatched = watchStats.playback_logs[0].watched_at;
      } else if (logs.length > 0) {
        tvLastWatched = logs[0].watched_at;
      }

      watchCount = logs.length;
      lastWatchedText = tvLastWatched
        ? formatDateTime(tvLastWatched, undefined, undefined, tvLastWatched)
        : neverLabel;
    }

    const watchCountText = `(${watchCount}x)`;
    const statusClass = watchStatus === watchedLabel
      ? 'watched'
      : watchStatus === inProgressLabel
        ? 'in-progress'
        : 'unwatched';

    const progressPercentText = `${progressPercent}%`;
    const watchActivityText = `${watchActivityLabel} (${logs.length})`;

    const formattedLogs = logs.map((log, idx) => {
      const dateStr = formatDateTime(log.watched_at, undefined, undefined, log.watched_at);
      const seasonNum = log.seasonNumber ?? log.season_number;
      const episodeNum = log.episodeNumber ?? log.episode_number;
      const epText = seasonNum != null && episodeNum != null
        ? formatEpisodeCode(seasonNum, episodeNum)
        : '';
      return {
        id: log.id || `log-${idx}`,
        title: epText || playSessionLabel,
        dateText: dateStr,
      };
    });

    return {
      logs,
      formattedLogs,
      hasLogs: logs.length > 0,
      isScrollableHistory: logs.length > 3,
      watchStatus,
      watchCount,
      progressPercent,
      progressText,
      lastWatchedText,
      statusClass,
      watchCountText,
      progressPercentText,
      watchActivityText,
    };
  }, [item, isMovie, isScene, t]);

  return {
    ...stats,
    isHistoryExpanded,
    setIsHistoryExpanded,
    toggleHistoryExpanded,
  };
}

export default useWatchStatsViewModel;
