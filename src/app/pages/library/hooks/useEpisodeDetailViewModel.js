import { useMemo } from 'react';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { formatEpisodeNumber, formatRuntimeMinutes } from '@/lib/formatters';
import { normalizeEpisodeItem } from '@/lib/normalizeMediaEntity';

export function useEpisodeDetailViewModel({
  activeEpisode,
  item,
  cleanId,
  mutations,
}) {
  const { updateStatusMutation, playMutation, addPeakMutation } = mutations || {};

  const normalizedEp = useMemo(() => {
    return activeEpisode ? normalizeEpisodeItem(activeEpisode) : null;
  }, [activeEpisode]);

  const stillUrl = useMemo(() => {
    if (!activeEpisode) return '';
    if (normalizedEp?.stillUrl) return normalizedEp.stillUrl;
    return activeEpisode.still_path ? resolveMediaImageUrl(activeEpisode.still_path, 'still') : '';
  }, [activeEpisode, normalizedEp]);

  const originalStillUrl = useMemo(() => {
    if (!activeEpisode?.still_path) return '';
    return resolveMediaImageUrl(activeEpisode.still_path, 'originalStill');
  }, [activeEpisode]);

  const metaItems = useMemo(() => {
    if (!activeEpisode) return [];
    return [
      activeEpisode.air_date && {
        key: 'air_date',
        text: String(activeEpisode.air_date).slice(0, 10),
        icon: 'calendar',
      },
      (activeEpisode.runtime || activeEpisode.technical?.duration) && {
        key: 'runtime',
        text: formatRuntimeMinutes(activeEpisode.runtime || activeEpisode.technical?.duration, 'm'),
        icon: 'clock',
      },
      activeEpisode.technical?.resolution && {
        key: 'resolution',
        text: activeEpisode.technical.resolution,
        icon: 'tv',
      },
      activeEpisode.technical?.video_codec && {
        key: 'codec',
        text: activeEpisode.technical.video_codec,
        icon: 'film',
      },
      activeEpisode.technical?.hdr_type && {
        key: 'hdr',
        text: activeEpisode.technical.hdr_type,
        icon: 'sparkles',
      },
    ].filter(Boolean);
  }, [activeEpisode]);

  const displayTitle = useMemo(() => {
    if (!activeEpisode) return '';
    const episodeCode = activeEpisode.display_episode_code
      ? activeEpisode.display_episode_code.split('E').pop()
      : formatEpisodeNumber(activeEpisode.episode_number);
    const episodeName = activeEpisode.title || `Episode ${activeEpisode.episode_number}`;
    return `${episodeCode}. ${episodeName}`;
  }, [activeEpisode]);

  const canPlay = Boolean(activeEpisode?.path && !activeEpisode?.is_missing);
  const canAddPeak = Boolean(item?.is_adult && canPlay);

  const handlePlayEpisode = (e) => {
    e?.stopPropagation?.();
    if (!activeEpisode?.id || !playMutation) return;
    playMutation.mutate(activeEpisode.id);
  };

  const handleAddPeak = (e) => {
    e?.stopPropagation?.();
    if (!activeEpisode?.id || !addPeakMutation) return;
    addPeakMutation.mutate({ itemId: activeEpisode.id, tvId: cleanId });
  };

  const handleToggleWatched = () => {
    if (!activeEpisode?.id || !updateStatusMutation) return;
    updateStatusMutation.mutate({
      itemId: activeEpisode.id,
      tvId: cleanId,
      payload: {
        is_watched: !activeEpisode.is_watched,
        media_type: 'episode',
      },
    });
  };

  return {
    normalizedEp,
    stillUrl,
    originalStillUrl,
    metaItems,
    displayTitle,
    canPlay,
    canAddPeak,
    handlePlayEpisode,
    handleAddPeak,
    handleToggleWatched,
    isWatched: Boolean(activeEpisode?.is_watched),
  };
}

export default useEpisodeDetailViewModel;
