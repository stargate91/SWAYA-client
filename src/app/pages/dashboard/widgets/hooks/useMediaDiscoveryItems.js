import { useMemo } from 'react';

/**
 * Hook to filter recommendation media items by poster validity and resolve i18n title metadata.
 *
 * @param {object} params
 * @param {object} [params.recommendations] - Raw recommendations response object
 * @param {string} [params.mediaType='movies'] - Media type ('movies' | 'tv')
 * @param {(key: string) => string} [params.t] - Translation function
 * @returns {{
 *   items: Array<object>,
 *   title: string,
 *   isTv: boolean,
 *   hasItems: boolean
 * }}
 */
export function useMediaDiscoveryItems({ recommendations, mediaType = 'movies', t } = {}) {
  const isTv = mediaType === 'tv';

  const items = useMemo(() => {
    const raw = isTv ? recommendations?.discover_tv || [] : recommendations?.discover_movies || [];
    return raw.filter((item) => Boolean(item?.poster_path || item?.poster || item?.image_url));
  }, [isTv, recommendations?.discover_tv, recommendations?.discover_movies]);

  const titleKey = isTv
    ? 'dashboard.recommendations.discover_series'
    : 'dashboard.recommendations.discover_movies';
  const defaultTitle = isTv ? 'Discover TV Shows' : 'Discover Movies';

  const title = (t ? t(titleKey) : '') || defaultTitle;

  return {
    items,
    title,
    isTv,
    hasItems: items.length > 0,
  };
}

export default useMediaDiscoveryItems;
