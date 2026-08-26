import { useMemo } from 'react';

/**
 * Rating sources configuration.
 */
export const RATING_CONFIG = {
  imdb: { type: 'imdb', logo: 'rating/imdb.png', label: 'IMDb' },
  tmdb: { type: 'tmdb', logo: 'rating/tmdb.png', label: 'TMDb' },
  theporndb: { type: 'theporndb', logo: 'rating/theporndb.png', label: 'ThePornDB' },
};

/**
 * Hook to evaluate the active media rating according to source priority (IMDb > TMDb > ThePornDB).
 *
 * @param {object} [state={}] - Media detail state object
 * @returns {{ type: string, logo: string, val: number | string, label: string } | null}
 */
export function useActiveMediaRating(state = {}) {
  const {
    showImdb,
    ratingImdb,
    showTmdb,
    ratingTmdb,
    showTheporndb,
    ratingTheporndb,
  } = state;

  return useMemo(() => {
    if (showImdb && ratingImdb) {
      return { ...RATING_CONFIG.imdb, val: ratingImdb };
    }
    if (showTmdb && ratingTmdb) {
      return { ...RATING_CONFIG.tmdb, val: ratingTmdb };
    }
    if (showTheporndb && ratingTheporndb) {
      return { ...RATING_CONFIG.theporndb, val: ratingTheporndb };
    }
    return null;
  }, [showImdb, ratingImdb, showTmdb, ratingTmdb, showTheporndb, ratingTheporndb]);
}

export default useActiveMediaRating;
