import { useMemo } from 'react';
import { normalizeMediaEntity } from '@/lib/normalizeMediaEntity';
import { useImagePreviewTooltip } from '@/hooks/useImagePreviewTooltip';

/**
 * View-model evaluation for Ratings Title Cell.
 *
 * @param {Object} params
 * @param {Object} params.row - Rating item row data
 * @param {string} [params.mediaType] - Active media type ('movies' | 'tv' | 'scenes' | 'videos' | 'people' | 'studios')
 * @param {Object} [params.settings] - App settings
 * @returns {Object}
 */
export function useRatingsTitleCellModel({
  row = {},
  mediaType = 'movies',
  settings = {},
} = {}) {
  const {
    tooltipRef,
    isVisible: isHovered,
    coords,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  } = useImagePreviewTooltip();

  const normalized = useMemo(() => {
    if (!isHovered) return null;
    const item = {
      ...row,
      media_type: row?.media_type || (
        mediaType === 'people' ? 'person' :
        mediaType === 'studios' ? 'studio' :
        mediaType === 'scenes' ? 'scene' :
        mediaType === 'videos' ? 'video' :
        mediaType === 'tv' ? 'tv' : 'movie'
      ),
    };
    return normalizeMediaEntity(item, { settings });
  }, [isHovered, row, mediaType, settings]);

  const aspect = (mediaType === 'scenes' || mediaType === 'videos') ? 'landscape' : 'poster';
  const displayTitle = row?.name || row?.title || row?.displayTitle || '';
  const showTooltip = isHovered && Boolean(normalized?.imageUrl);

  const tooltipProps = {
    ref: tooltipRef,
    imageUrl: normalized?.imageUrl,
    visible: true,
    x: coords.x,
    y: coords.y,
    aspect,
  };

  const textEventProps = {
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  return {
    displayTitle,
    showTooltip,
    tooltipProps,
    textEventProps,
    normalized,
    aspect,
  };
}

export default useRatingsTitleCellModel;
