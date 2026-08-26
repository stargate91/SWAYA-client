import { useMemo } from 'react';

/**
 * Custom hook to format bucketed episodes, chip labels,
 * and remove callbacks for MatchModalBucket.
 *
 * @param {object} params
 * @param {string} [params.view] - Current match modal browser view ('results' | 'seasons' | 'episodes')
 * @param {Array<number|string>} [params.bucketEpisodeNumbers=[]] - Currently selected episode numbers
 * @param {Function} [params.onToggle] - Callback to toggle/remove an episode from the bucket
 * @param {Function} [params.t] - Translation function
 */
export function useMatchModalBucketSelection({
  view,
  bucketEpisodeNumbers = [],
  onToggle,
  t = (k) => k,
} = {}) {
  const isVisible = view === 'episodes' && Array.isArray(bucketEpisodeNumbers) && bucketEpisodeNumbers.length > 0;
  const bucketCount = Array.isArray(bucketEpisodeNumbers) ? bucketEpisodeNumbers.length : 0;
  const title = t('organizer.details.matchModal.bucketTitle') || 'Selected Episodes';

  const chips = useMemo(() => {
    if (!isVisible) return [];
    return bucketEpisodeNumbers.map((episodeNumber) => ({
      episodeNumber,
      label: `E${episodeNumber}`,
      onRemove: () => onToggle?.(episodeNumber),
    }));
  }, [isVisible, bucketEpisodeNumbers, onToggle]);

  return {
    isVisible,
    chips,
    bucketCount,
    title,
  };
}

export default useMatchModalBucketSelection;
