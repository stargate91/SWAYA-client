import { useMemo } from 'react';
import {
  isLibraryCollectionTab,
  isLibraryPeopleTab,
  isLibraryTvTab,
  isLibraryTagsTab,
  isLibraryScenesTab,
  isLibraryStudiosTab,
} from '@/lib/libraryTabs';

export function useLibrarySortOptions({
  resolvedTab,
  activeSessionMode,
  settings,
  ownershipFilter,
  t,
}) {
  const isCollectionTab = isLibraryCollectionTab(resolvedTab);
  const isPeopleTab = isLibraryPeopleTab(resolvedTab);
  const isTagsTab = isLibraryTagsTab(resolvedTab);
  const isTvTab = isLibraryTvTab(resolvedTab);
  const isScenesTab = isLibraryScenesTab(resolvedTab);
  const isStudiosTab = isLibraryStudiosTab(resolvedTab);

  const sortOptions = useMemo(() => {
    if (isCollectionTab) {
      return [
        { value: 'owned_count', label: t('library.sort.ownedCount') || 'Item Count' },
        { value: 'title', label: t('library.sort.title') || 'Title' },
      ];
    }

    if (isTagsTab) {
      return [
        { value: 'total_count', label: t('library.sort.itemCount') || 'Item Count' },
        { value: 'name', label: t('library.sort.name') || 'Name' },
      ];
    }

    if (isStudiosTab) {
      return [
        { value: 'name', label: t('library.sort.name') || 'Name' },
        { value: 'library_count', label: t('library.sort.libraryCount') || 'Library Count' },
        { value: 'user_rating', label: t('library.sort.userRating') || 'User Rating' },
      ];
    }

    if (isPeopleTab) {
      return [
        { value: 'name', label: t('library.sort.name') || 'Name' },
        {
          value: 'rating',
          label: activeSessionMode === 'nsfw'
            ? (t('library.sort.theporndbPerformerRating') || 'ThePornDB performer rating')
            : (t('library.sort.popularity') || 'Popularity'),
        },
        ...(activeSessionMode === 'nsfw'
          ? [{ value: 'popularity', label: t('library.sort.popularity') || 'Popularity' }]
          : []),
        { value: 'user_rating', label: t('library.sort.userRating') || 'User Rating' },
        { value: 'library_count', label: t('library.sort.libraryCount') || 'Library Count' },
        { value: 'birthday', label: t('library.sort.birthday') || 'Birthdate' },
        { value: 'last_watched', label: t('library.sort.lastWatched') || 'Last Watched' },
        { value: 'watch_count', label: t('library.sort.watchCount') || 'Watch Count' },
        ...(activeSessionMode === 'nsfw'
          ? [
            { value: 'finish_count', label: t('library.sort.finishCount') || 'Finish Count' },
            { value: 'last_finish', label: t('library.sort.lastFinish') || 'Last Finish' },
          ]
          : []),
        { value: 'tag_count', label: t('library.sort.tagCount') || 'Tag Count' },
        { value: 'height', label: t('library.sort.height') || 'Height' },
        { value: 'weight', label: t('library.sort.weight') || 'Weight' },
        ...(settings?.include_adult
          ? [
            { value: 'cup_size', label: t('library.sort.cupSize') || 'Breast Size' },
            { value: 'waist', label: t('library.sort.waist') || 'Waist Size' },
            { value: 'hip', label: t('library.sort.hip') || 'Hip Size' },
            { value: 'hourglass_ratio', label: t('library.sort.hourglassRatio') || 'Hourglass Ratio' },
            { value: 'body_slender', label: t('library.sort.bodySlender') || 'Slender / Athletic' },
            { value: 'body_curvy', label: t('library.sort.bodyCurvy') || 'Hourglass / Curvy' },
          ]
          : []),
        { value: 'random', label: t('library.sort.random') || 'Random' },
      ];
    }

    // Default media/video/scenes/movies/tv tabs
    return [
      { value: 'title', label: t('library.sort.title') || 'Title' },
      {
        value: 'release_date',
        label: isTvTab
          ? (t('library.sort.firstAirDate') || 'First Air Date')
          : (t('library.sort.releaseDate') || 'Release Date'),
      },
      ...(isTvTab
        ? [
          { value: 'last_air_date', label: t('library.sort.lastAirDate') || 'Last Air Date' },
          { value: 'number_of_seasons', label: t('library.sort.numberOfSeasons') || 'Seasons Count' },
          { value: 'number_of_episodes', label: t('library.sort.numberOfEpisodes') || 'Episodes Count' },
        ]
        : []),
      ...(!isScenesTab
        ? [
          { value: 'rating_imdb', label: t('library.sort.imdbRating') || 'IMDb Rating' },
          { value: 'rating', label: t('library.sort.tmdbRating') || 'TMDb Rating' },
        ]
        : []),
      { value: 'user_rating', label: t('library.sort.userRating') || 'User Rating' },
      { value: 'duration', label: t('library.sort.duration') || 'Duration' },
      { value: 'tag_count', label: t('library.sort.tagCount') || 'Tag Count' },
      ...(ownershipFilter !== 'unowned'
        ? [
          { value: 'file_size', label: t('library.sort.fileSize') || 'File Size' },
          { value: 'last_watched', label: t('library.sort.lastWatched') || 'Last Watched' },
          { value: 'watch_count', label: t('library.sort.watchCount') || 'Watch Count' },
          ...(activeSessionMode === 'nsfw'
            ? [
              { value: 'finish_count', label: t('library.sort.finishCount') || 'Finish Count' },
              { value: 'last_finish', label: t('library.sort.lastFinish') || 'Last Finish' },
            ]
            : []),
        ]
        : []),
      { value: 'random', label: t('library.sort.random') || 'Random' },
    ];
  }, [
    activeSessionMode,
    isCollectionTab,
    isPeopleTab,
    isScenesTab,
    isStudiosTab,
    isTagsTab,
    isTvTab,
    ownershipFilter,
    settings?.include_adult,
    t,
  ]);

  return { sortOptions };
}

export default useLibrarySortOptions;
