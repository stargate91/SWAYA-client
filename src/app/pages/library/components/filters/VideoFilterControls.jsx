import Dropdown from '@/ui/Dropdown';

export default function VideoFilterControls({
  state,
  layout,
}) {
  const {
    t,
    activeSessionMode,
    watchedFilter,
    setWatchedFilter,
    genreFilter,
    setGenreFilter,
    performerFilter,
    setPerformerFilter,
    studioFilter,
    setStudioFilter,
    networkFilter,
    setNetworkFilter,
    decadeFilter,
    setDecadeFilter,
    yearFilter,
    setYearFilter,
    timeFilterMode,
    filterData,
    setCurrentPage,
  } = state;

  const {
    isVideoTab,
    isScenesTab,
    isMovieTab,
    isTvTab,
    isPeopleTab,
    actualSelectedTags,
    actualSetSelectedTags,
    watchedOptions,
    genreOptions,
    performerOptions,
    studioOptions,
    networkOptions,
    tagOptions,
    decadeOptions,
    yearOptions,
  } = layout;

  return (
    <>
      {isVideoTab && (
        <Dropdown
          layout="inline"
          label={t('library.filter.statusLabel') || 'Status:'}
          value={watchedFilter}
          onChange={(e) => {
            setWatchedFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={watchedOptions}
        />
      )}

      {isVideoTab && !isScenesTab && activeSessionMode !== 'nsfw' && (
        <Dropdown
          layout="inline"
          label={t('library.filter.genreLabel') || 'Genre:'}
          value={genreFilter}
          onChange={(e) => {
            setGenreFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={genreOptions}
        />
      )}

      {isScenesTab && activeSessionMode === 'nsfw' && filterData?.performers && filterData.performers.length > 0 && (
        <Dropdown
          layout="inline"
          label={t('library.filter.performerLabel') || 'Performer:'}
          value={performerFilter}
          searchable={true}
          onChange={(e) => {
            setPerformerFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={performerOptions}
        />
      )}

      {((isMovieTab && filterData?.studios && filterData.studios.length > 0) ||
        (isScenesTab && activeSessionMode === 'nsfw' && filterData?.studios && filterData.studios.length > 0)) && (
        <Dropdown
          layout="inline"
          label={
            activeSessionMode === 'nsfw'
              ? (t('library.filter.studioLabel') || 'Studio:')
              : (t('library.filter.companyLabel') || 'Company:')
          }
          value={studioFilter}
          searchable={true}
          onChange={(e) => {
            setStudioFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={studioOptions}
        />
      )}

      {isTvTab && filterData?.networks && filterData.networks.length > 0 && (
        <Dropdown
          layout="inline"
          label={t('library.filter.networkLabel') || 'Network:'}
          value={networkFilter}
          searchable={true}
          onChange={(e) => {
            setNetworkFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={networkOptions}
        />
      )}

      {(isVideoTab || isPeopleTab) && filterData?.tags && filterData.tags.length > 0 && (
        <Dropdown
          layout="inline"
          label={t('library.filter.tagsLabel') || 'Tags:'}
          searchable={true}
          multiple={true}
          value={actualSelectedTags}
          onChange={(e) => {
            actualSetSelectedTags(e.target.value);
            setCurrentPage(1);
          }}
          options={tagOptions}
          placeholder={t('library.filter.allTags') || 'All Tags'}
        />
      )}

      {isVideoTab && timeFilterMode === 'decade' && (
        <Dropdown
          layout="inline"
          label={t('library.filter.decadeLabel') || 'Decade:'}
          value={decadeFilter}
          onChange={(e) => {
            setDecadeFilter(e.target.value);
            setYearFilter('');
            setCurrentPage(1);
          }}
          options={decadeOptions}
        />
      )}

      {isVideoTab && timeFilterMode === 'year' && (
        <Dropdown
          layout="inline"
          label={t('library.filter.yearLabel') || 'Year:'}
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(e.target.value);
            setDecadeFilter('all');
            setCurrentPage(1);
          }}
          options={yearOptions}
        />
      )}
    </>
  );
}
