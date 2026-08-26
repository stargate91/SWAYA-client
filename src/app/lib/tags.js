import stashdbTags from '@/data/tags/stashdb_tags.json';
import fansdbTags from '@/data/tags/fansdb_tags.json';
import theporndbTags from '@/data/tags/theporndb_tags.json';

export const tmdbGenres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama',
  'Family', 'Fantasy', 'History', 'Horror', 'Kids', 'Music', 'Mystery', 'News',
  'Politics', 'Reality', 'Romance', 'Sci-Fi', 'Science Fiction', 'TV Movie',
  'Talk', 'Thriller', 'War', 'Western'
];

export { stashdbTags, fansdbTags, theporndbTags };

/**
 * Returns tag list array for specified provider
 * @param {string} provider - 'stashdb', 'fansdb', 'theporndb', 'tmdb'
 * @returns {string[]}
 */
export function getProviderTags(provider) {
  const p = provider?.toLowerCase();
  if (p === 'fansdb') return fansdbTags;
  if (p === 'theporndb') return theporndbTags;
  if (p === 'stashdb') return stashdbTags;
  if (p === 'tmdb') return tmdbGenres;
  return [];
}
