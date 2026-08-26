import { useMemo } from 'react';

export function usePeaksSection({
  item,
  cleanId,
  effectiveId,
  isOwned,
  isMovie,
  isScene,
  mutations,
}) {
  const { deletePeakMutation, playMutation, addPeakMutation } = mutations || {};

  const peaks = useMemo(() => {
    if (!item) return [];

    let basePeaks;
    if (isMovie || isScene) {
      basePeaks = item.peaks_history || [];
    } else {
      const tvPeaks = [];
      if (item.seasons) {
        item.seasons.forEach((season) => {
          if (season.episodes) {
            season.episodes.forEach((episode) => {
              if (episode.peaks_history) {
                episode.peaks_history.forEach((peak) => {
                  tvPeaks.push({
                    ...peak,
                    season_number: season.season_number,
                    episode_number: episode.episode_number,
                    episodeId: episode.id,
                  });
                });
              }
            });
          }
        });
      }
      basePeaks = tvPeaks.sort((a, b) => new Date(b.watched_at) - new Date(a.watched_at));
    }

    if (deletePeakMutation && deletePeakMutation.isPending && deletePeakMutation.variables?.logId) {
      basePeaks = basePeaks.filter((p) => String(p.id) !== String(deletePeakMutation.variables.logId));
    }

    if (addPeakMutation && addPeakMutation.isPending) {
      const hasOptimistic = basePeaks.some((p) => p.isOptimistic || String(p.id).startsWith('temp-'));
      if (!hasOptimistic) {
        const tempPeak = {
          id: 'temp-ui-optimistic',
          video_position: 0,
          watched_at: new Date().toISOString(),
          isOptimistic: true,
        };
        if (isMovie || isScene) {
          return [...basePeaks, tempPeak].sort((a, b) => a.video_position - b.video_position);
        } else {
          return [tempPeak, ...basePeaks];
        }
      }
    }

    return basePeaks;
  }, [item, isMovie, isScene, addPeakMutation, deletePeakMutation]);

  const shouldRender = isOwned || peaks.length > 0;

  const handleDeletePeak = (e, log) => {
    e.stopPropagation();
    if (deletePeakMutation?.isPending || log.isOptimistic) return;
    const targetItemId = log.episodeId || effectiveId;
    deletePeakMutation?.mutate({ itemId: targetItemId, logId: log.id, tvId: cleanId });
  };

  const handlePlayMedia = (log) => {
    if (playMutation?.isPending) return;
    const targetId = log?.episodeId || item?.id;
    if (log?.video_position != null) {
      playMutation?.mutate({ itemId: targetId, start: log.video_position });
    } else {
      playMutation?.mutate(targetId);
    }
  };

  return {
    peaks,
    peaksCount: peaks.length,
    shouldRender,
    handleDeletePeak,
    handlePlayMedia,
    isDeletePending: deletePeakMutation?.isPending,
  };
}

export default usePeaksSection;
