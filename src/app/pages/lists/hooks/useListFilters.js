import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from '@/providers/LanguageContext';

/**
 * Custom hook to manage list filtering, search, sorting, and options derivation.
 *
 * @param {object} params
 * @param {object} [params.activeList] - The currently active list object
 * @param {object} [params.activeListDetails] - The currently active list details
 * @param {Function} [params.t] - Optional translation function
 */
export function useListFilters({ activeList, activeListDetails, t: propT } = {}) {
  const { t: ctxT } = useTranslation();
  const t = propT || ctxT;

  const [listSearchQuery, setListSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('added_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [watchedFilter, setWatchedFilter] = useState('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [libraryFilter, setLibraryFilter] = useState('all');

  const activeListId = activeList?.id || null;
  const [prevActiveListId, setPrevActiveListId] = useState(activeListId);

  if (activeListId !== prevActiveListId) {
    setPrevActiveListId(activeListId);
    setListSearchQuery('');
    setSortKey('added_at');
    setSortDirection('desc');
    setWatchedFilter('all');
    setMediaTypeFilter('all');
    setGenreFilter('all');
    setGenderFilter('all');
    setJobFilter('all');
    setLibraryFilter('all');
  }

  const toggleSortDirection = useCallback(() => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const resetFilters = useCallback(() => {
    setListSearchQuery('');
    setSortKey('added_at');
    setSortDirection('desc');
    setWatchedFilter('all');
    setMediaTypeFilter('all');
    setGenreFilter('all');
    setGenderFilter('all');
    setJobFilter('all');
    setLibraryFilter('all');
  }, []);

  const isPersonList = activeList?.list_type === 'person';
  const isVideoSceneList = activeList?.list_type === 'video_scene';
  const isAdultList = Boolean(activeList?.is_adult) || activeList?.name === 'Adult Scenes' || activeList?.name === 'NSFW Watchlist';
  const isSfwVideoList = isVideoSceneList && !isAdultList;

  const mediaTypeOptions = useMemo(() => {
    if (!activeList || isPersonList || isSfwVideoList) return null;
    if (isVideoSceneList) {
      return [
        { value: 'all', label: t('lists.filter_media_type_all') || 'All' },
        { value: 'scene', label: t('lists.filter_media_type_scenes') || 'Scenes' },
        { value: 'videos', label: t('library.tabs.videos') || 'Videos' },
      ];
    }
    return [
      { value: 'all', label: t('lists.filter_media_type_all') || 'All' },
      { value: 'movie', label: t('lists.filter_media_type_movies') || 'Movies' },
      { value: 'show', label: t('lists.filter_media_type_shows') || 'TV Shows' },
    ];
  }, [activeList, isPersonList, isSfwVideoList, isVideoSceneList, t]);

  const availableGenres = useMemo(() => {
    return ['all', ...(activeListDetails?.genres || [])];
  }, [activeListDetails]);

  const genreOptions = useMemo(() => {
    return availableGenres.map((genre) => ({
      value: genre,
      label: genre === 'all' ? (t('library.filter.all') || 'All') : genre,
    }));
  }, [availableGenres, t]);

  const sortOptions = useMemo(() => {
    if (!activeList) return [];
    const isPerson = activeList.list_type === 'person';

    const options = [
      { value: 'added_at', label: t('lists.sort_date_added') || 'Date Added' },
      { value: 'name', label: isPerson ? (t('lists.sort_name') || 'Name') : (t('lists.sort_title') || 'Title') },
      { value: 'user_rating', label: t('lists.sort_user_rating') || 'User Rating' },
    ];

    if (!isPerson) {
      options.push({ value: 'release_date', label: t('lists.sort_release_date') || 'Release Date' });
    }
    return options;
  }, [activeList, t]);

  const libraryOptions = useMemo(() => [
    { value: 'all', label: t('lists.filter_library_all') || 'All' },
    { value: 'have', label: t('lists.filter_library_have') || 'Have' },
    { value: 'not_have', label: t('lists.filter_library_not_have') || 'Not Have' },
  ], [t]);

  const watchedOptions = useMemo(() => [
    { value: 'all', label: t('library.filter.all') || 'All' },
    { value: 'watched', label: t('library.filter.watched') || 'Watched' },
    { value: 'unwatched', label: t('library.filter.unwatched') || 'Unwatched' },
  ], [t]);

  const genderOptions = useMemo(() => [
    { value: 'all', label: t('library.filter.all') || 'All' },
    { value: 'female', label: t('library.filter.female') || 'Female' },
    { value: 'male', label: t('library.filter.male') || 'Male' },
  ], [t]);

  const jobOptions = useMemo(() => [
    { value: 'all', label: t('lists.filter_job_all') || 'All' },
    { value: 'actor', label: t('lists.filter_job_actor') || 'Actor' },
    { value: 'director', label: t('lists.filter_job_director') || 'Director' },
    { value: 'writer', label: t('lists.filter_job_writer') || 'Writer' },
    { value: 'sound', label: t('dynamic.roles.sound') || 'Composer' },
  ], [t]);

  const queryParams = useMemo(() => ({
    watched_filter: watchedFilter,
    media_type_filter: mediaTypeFilter,
    genre_filter: genreFilter,
    gender_filter: genderFilter,
    job_filter: jobFilter,
    library_filter: libraryFilter,
    search: listSearchQuery,
    sort_by: sortKey,
    sort_direction: sortDirection,
  }), [
    watchedFilter,
    mediaTypeFilter,
    genreFilter,
    genderFilter,
    jobFilter,
    libraryFilter,
    listSearchQuery,
    sortKey,
    sortDirection,
  ]);

  return {
    listSearchQuery,
    setListSearchQuery,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    toggleSortDirection,
    watchedFilter,
    setWatchedFilter,
    mediaTypeFilter,
    setMediaTypeFilter,
    genreFilter,
    setGenreFilter,
    genderFilter,
    setGenderFilter,
    jobFilter,
    setJobFilter,
    libraryFilter,
    setLibraryFilter,
    resetFilters,
    isPersonList,
    mediaTypeOptions,
    availableGenres,
    genreOptions,
    sortOptions,
    libraryOptions,
    watchedOptions,
    genderOptions,
    jobOptions,
    queryParams,
  };
}
