import { useMemo, useCallback } from 'react';
import { ENTITY_ICONS } from '@/ui/icons';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { MEDIA_TYPES, isTvLikeMediaType, toMetadataMediaType, scanModeToMediaType } from '@/lib/mediaTypes';
import { formatYear, formatTvAirYearRange } from '@/lib/formatters/dates';

/**
 * Calculates display title for a match candidate.
 *
 * @param {Object} candidate - Match candidate item
 * @param {string} mediaType - Normalized media type
 * @param {Function} t - Translation function
 * @returns {string} Formatted title
 */
export function getCandidateDisplayTitle(candidate, mediaType, t) {
  return (
    candidate?.title
    || candidate?.name
    || candidate?.original_title
    || candidate?.original_name
    || (mediaType === MEDIA_TYPES.TV
      ? (t?.('organizer.details.matchModal.unknownTv') || 'Unknown TV Show')
      : mediaType === 'scene'
        ? (t?.('organizer.details.matchModal.unknownScene') || 'Unknown Scene')
        : (t?.('organizer.details.matchModal.unknownMovie') || 'Unknown Movie'))
  );
}

/**
 * Calculates display year or air date range for a match candidate.
 *
 * @param {Object} candidate - Match candidate item
 * @param {string} mediaType - Normalized media type
 * @returns {string|null} Formatted year or date
 */
export function getCandidateDisplayYear(candidate, mediaType) {
  if (!candidate) return null;
  if (mediaType === 'scene') {
    return candidate.release_date ? String(candidate.release_date).slice(0, 10) : null;
  }
  if (mediaType === MEDIA_TYPES.TV) {
    const range = formatTvAirYearRange(candidate);
    return range ? range.replace(/ - $/, '') : null;
  }
  return formatYear(candidate) || null;
}

/**
 * Calculates card view-model properties for a MatchCandidateCard.
 *
 * @param {Object} params
 * @param {Object} params.candidate - Match candidate data object
 * @param {string} [params.mode] - Matching mode ('movie' | 'tv' | 'scene' | etc.)
 * @param {string|number} [params.isResolvingId] - Currently resolving candidate ID
 * @param {boolean} [params.isBrowserLoading] - Whether browser is loading
 * @param {string} [params.rowStatus] - Current organizer row status ('uncertain' | 'matched' | etc.)
 * @param {Function} [params.onSelect] - Selection callback
 * @param {Function} params.t - Translation function
 * @returns {Object} Card view-model properties
 */
export function useMatchCandidateCard({
  candidate = {},
  mode,
  isResolvingId,
  isBrowserLoading,
  rowStatus,
  onSelect,
  t,
}) {
  const candidateId = candidate?.tmdb_id || candidate?.id;
  const rawType = useMemo(
    () => String(candidate?.type || candidate?.media_type || mode || '').toLowerCase(),
    [candidate?.type, candidate?.media_type, mode]
  );

  const { imageType, aspect } = useMemo(() => {
    if (rawType === 'scene') {
      return { imageType: 'scene_stills', aspect: 'landscape' };
    }
    if (rawType === 'episode') {
      return { imageType: 'still', aspect: 'landscape' };
    }
    return { imageType: 'poster', aspect: 'poster' };
  }, [rawType]);

  const mediaType = useMemo(() => {
    return mode === 'scene' ? 'scene' : (toMetadataMediaType(candidate?.type || candidate?.media_type) || scanModeToMediaType(mode) || mode);
  }, [candidate?.type, candidate?.media_type, mode]);

  const displayTitle = useMemo(() => {
    return getCandidateDisplayTitle(candidate, mediaType, t);
  }, [candidate, mediaType, t]);

  const displayYear = useMemo(() => {
    return getCandidateDisplayYear(candidate, mediaType);
  }, [candidate, mediaType]);

  const posterUrl = useMemo(() => {
    const imagePath = (rawType === 'scene' || rawType === 'episode')
      ? (candidate?.still_path || candidate?.poster_path)
      : candidate?.poster_path;
    return resolveMediaImageUrl(imagePath, imageType);
  }, [candidate?.still_path, candidate?.poster_path, rawType, imageType]);

  const typeLabel = useMemo(() => {
    if (rawType === 'scene') {
      return t?.('organizer.details.matchModal.scene') || 'Scene';
    }
    if (rawType === 'episode') {
      return t?.('organizer.typeLabels.episode') || 'Episode';
    }
    if (isTvLikeMediaType(mediaType)) {
      return t?.('organizer.details.matchModal.tv') || 'TV Show';
    }
    return t?.('organizer.details.matchModal.movie') || 'Movie';
  }, [rawType, mediaType, t]);

  const fallbackIcon = useMemo(() => {
    if (rawType === 'tv' || rawType === 'season') {
      return ENTITY_ICONS.tv;
    }
    if (rawType === 'scene' || rawType === 'episode') {
      return ENTITY_ICONS.episode;
    }
    return ENTITY_ICONS.movie;
  }, [rawType]);

  const isResolving = isResolvingId === candidateId;
  const isDisabled = Boolean(isResolving || isBrowserLoading);

  const activeBadge = useMemo(() => {
    if (!candidate?.is_active) return null;
    const isUncertain = rowStatus === 'uncertain';
    return {
      tone: isUncertain ? 'warning' : 'accent',
      label: isUncertain
        ? (t?.('organizer.status.uncertain') || 'Uncertain')
        : (t?.('organizer.details.matchModal.current') || 'Current'),
    };
  }, [candidate?.is_active, rowStatus, t]);

  const handleSelect = useCallback(() => {
    if (isDisabled) return;
    onSelect?.(candidate);
  }, [isDisabled, onSelect, candidate]);

  return {
    candidateId,
    rawType,
    mediaType,
    aspect,
    imageType,
    displayTitle,
    displayYear,
    posterUrl,
    typeLabel,
    fallbackIcon,
    isDisabled,
    isResolving,
    activeBadge,
    handleSelect,
  };
}

export default useMatchCandidateCard;
