import { useMemo } from 'react';

/**
 * Custom hook to filter metadata row items, resolve active rating sources,
 * and format performer links for CardMetadata.
 *
 * @param {object} params
 * @param {number|string} [params.ratingImdb]
 * @param {number|string} [params.ratingTmdb]
 * @param {number|string} [params.ratingTheporndb]
 * @param {React.ReactNode} [params.ratingPill]
 * @param {string} [params.sortKey]
 * @param {Array} [params.items]
 */
export function useCardMetadataItems({
  ratingImdb,
  ratingTmdb,
  ratingTheporndb,
  ratingPill,
  sortKey,
  items,
} = {}) {
  const activeRating = useMemo(() => {
    if (ratingPill) return null;

    let sources = [
      { val: ratingImdb, variant: 'imdb' },
      { val: ratingTmdb, variant: 'tmdb' },
      { val: ratingTheporndb, variant: 'theporndb' },
    ];

    if (sortKey === 'rating') {
      sources = [
        { val: ratingTmdb, variant: 'tmdb' },
        { val: ratingImdb, variant: 'imdb' },
        { val: ratingTheporndb, variant: 'theporndb' },
      ];
    } else if (sortKey === 'rating_theporndb') {
      sources = [
        { val: ratingTheporndb, variant: 'theporndb' },
        { val: ratingTmdb, variant: 'tmdb' },
        { val: ratingImdb, variant: 'imdb' },
      ];
    }

    return sources.find(
      (r) => r.val !== undefined && r.val !== null && r.val !== '' && parseFloat(r.val) > 0
    ) || null;
  }, [ratingImdb, ratingTmdb, ratingTheporndb, ratingPill, sortKey]);

  const filteredItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.filter((item) => item !== null && item !== undefined && item !== '');
  }, [items]);

  return {
    activeRating,
    filteredItems,
  };
}

export default useCardMetadataItems;
