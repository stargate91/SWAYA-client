import { useMemo } from 'react';
import { formatRating } from '@/lib/formatters';

export const BESPOKE_RATING_SOURCES = {
  imdb: { id: 'imdb', logo: 'rating/imdb.png', alt: 'IMDb' },
  tmdb: { id: 'tmdb', logo: 'rating/tmdb.png', alt: 'TMDb' },
  rotten: { id: 'rotten', logo: 'rating/rottan_tomatoes.png', alt: 'Rotten Tomatoes' },
  meta: { id: 'meta', logo: 'rating/metacritic.png', alt: 'Metacritic' },
  theporndb: { id: 'theporndb', logo: 'rating/theporndb.png', alt: 'ThePornDB' },
};

/**
 * Custom hook to normalize and aggregate external ratings for media items,
 * filtering out whichever primary rating is already highlighted in the header.
 *
 * @param {object} params
 * @param {object} [params.item] - Media item
 * @param {string} [params.activeHeaderRatingType] - Optional explicit primary rating type
 * @param {Function} [params.t] - Translation function
 */
export function useMediaRatingsData({
  item,
  activeHeaderRatingType: propActiveHeaderType,
  t = (k) => k,
} = {}) {
  const isSceneType = item?.type === 'scene';

  const hasImdb = !isSceneType && item?.rating_imdb != null && Number(item.rating_imdb) > 0;
  const hasTmdb = !isSceneType && item?.rating_tmdb != null && Number(item.rating_tmdb) > 0;
  const hasRotten = !isSceneType && item?.rating_rotten != null && item?.rating_rotten !== '';
  const hasMeta = !isSceneType && item?.rating_meta != null && Number(item.rating_meta) > 0;
  const hasTheporndb = item?.rating_theporndb != null && Number(item.rating_theporndb) > 0;

  const activeHeaderRatingType = useMemo(() => {
    if (propActiveHeaderType !== undefined) {
      return propActiveHeaderType;
    }
    if (hasImdb) return 'imdb';
    if (hasTmdb) return 'tmdb';
    if (hasRotten) return 'rotten';
    if (hasMeta) return 'meta';
    if (hasTheporndb) return 'theporndb';
    return null;
  }, [propActiveHeaderType, hasImdb, hasTmdb, hasRotten, hasMeta, hasTheporndb]);

  const ratings = useMemo(() => {
    if (!item) return [];
    const list = [];

    if (hasImdb && activeHeaderRatingType !== 'imdb') {
      list.push({
        id: 'imdb',
        logo: BESPOKE_RATING_SOURCES.imdb.logo,
        alt: BESPOKE_RATING_SOURCES.imdb.alt,
        value: `${formatRating(item.rating_imdb)}/10`,
      });
    }

    if (hasTmdb && activeHeaderRatingType !== 'tmdb') {
      list.push({
        id: 'tmdb',
        logo: BESPOKE_RATING_SOURCES.tmdb.logo,
        alt: BESPOKE_RATING_SOURCES.tmdb.alt,
        value: `${formatRating(item.rating_tmdb)}/10`,
      });
    }

    if (hasRotten && activeHeaderRatingType !== 'rotten') {
      list.push({
        id: 'rotten',
        logo: BESPOKE_RATING_SOURCES.rotten.logo,
        alt: BESPOKE_RATING_SOURCES.rotten.alt,
        value: String(item.rating_rotten),
      });
    }

    if (hasMeta && activeHeaderRatingType !== 'meta') {
      list.push({
        id: 'meta',
        logo: BESPOKE_RATING_SOURCES.meta.logo,
        alt: BESPOKE_RATING_SOURCES.meta.alt,
        value: `${item.rating_meta}/100`,
      });
    }

    if (hasTheporndb && activeHeaderRatingType !== 'theporndb') {
      list.push({
        id: 'theporndb',
        logo: BESPOKE_RATING_SOURCES.theporndb.logo,
        alt: BESPOKE_RATING_SOURCES.theporndb.alt,
        value: `${formatRating(item.rating_theporndb)}/10`,
      });
    }

    return list;
  }, [item, hasImdb, hasTmdb, hasRotten, hasMeta, hasTheporndb, activeHeaderRatingType]);

  const hasRatings = ratings.length > 0;
  const sectionTitle = t('library.details.ratingsSection') || 'Ratings';

  return {
    ratings,
    hasRatings,
    sectionTitle,
    activeHeaderRatingType,
  };
}
