import { useCallback, useMemo } from 'react';
import { formatTime, formatDateTime } from '@/lib/formatters';
import { resolvePeakImageUrls } from '../utils/historyHelpers';

/**
 * Custom hook to compute presentation properties and action handlers
 * for a single peak moment history item.
 *
 * @param {object} params
 * @param {object} params.log - Single peak log data
 * @param {object} [params.playMutation] - React query play mutation
 * @param {Function} [params.handlePlayMoment] - Handler to play moment at specific timestamp
 * @param {Function} [params.setLightboxImage] - Handler to open snapshot in lightbox
 * @param {Function} [params.onTitleClick] - Handler when clicking on title
 * @param {Function} [params.t] - Translation function
 */
export function usePeaksHistoryItem({
  log,
  playMutation,
  handlePlayMoment,
  setLightboxImage,
  onTitleClick,
  t = (k) => k,
} = {}) {
  const { snapshotUrl, posterUrl } = useMemo(() => {
    return resolvePeakImageUrls(log);
  }, [log]);

  const peakText = useMemo(() => {
    const prefix = t('historyPage.peakAt', { defaultValue: 'Finish at' });
    const formattedPos = formatTime(log?.video_position || 0);
    return `${prefix} ${formattedPos}`;
  }, [log, t]);

  const formattedCreatedAt = useMemo(() => {
    return log?.created_at ? formatDateTime(log.created_at) : '';
  }, [log]);

  const isMutationPending = Boolean(
    playMutation?.isPending && playMutation?.variables?.itemId === log?.media_item_id
  );

  const handlePlay = useCallback(() => {
    if (log?.media_item_id && handlePlayMoment) {
      handlePlayMoment(log.media_item_id, log.video_position || 0);
    }
  }, [log, handlePlayMoment]);

  const handleImageClick = useCallback(() => {
    if (snapshotUrl && setLightboxImage) {
      setLightboxImage(snapshotUrl);
    }
  }, [snapshotUrl, setLightboxImage]);

  const handleTitleClick = useCallback(() => {
    if (log && onTitleClick) {
      onTitleClick(log);
    }
  }, [log, onTitleClick]);

  return {
    snapshotUrl,
    posterUrl,
    peakText,
    formattedCreatedAt,
    isMutationPending,
    handlePlay,
    handleImageClick,
    handleTitleClick,
  };
}

export default usePeaksHistoryItem;
