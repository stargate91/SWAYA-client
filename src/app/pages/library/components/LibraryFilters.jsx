import Dropdown from '@/ui/Dropdown';
import SegmentedControl from '@/ui/SegmentedControl';
import Pill from '@/ui/Pill';
import PanelHeader from '@/ui/PanelHeader';
import Inline from '@/ui/Inline';
import LibraryAdvancedFilters from './LibraryAdvancedFilters';
import PeopleFilterControls from './filters/PeopleFilterControls';
import VideoFilterControls from './filters/VideoFilterControls';
import { useLibraryFiltersLayout } from '../hooks/useLibraryFiltersLayout';

export default function LibraryFilters({
  state,
  ...props
}) {
  const merged = state ? { ...state, ...props } : props;
  const layout = useLibraryFiltersLayout(merged);

  const {
    t,
    isCollections,
    isPeople,
    activeSessionMode,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    setCurrentPage,
    collectionStatusFilter,
    setCollectionStatusFilter,
    studioTypeFilter,
    setStudioTypeFilter,
    favoriteFilter,
    setFavoriteFilter,
    timeFilterMode,
    setTimeFilterMode,
    setDecadeFilter,
    setYearFilter,
    ethnicityFilter,
    setEthnicityFilter,
    breastTypeFilter,
    setBreastTypeFilter,
    breastSizeFilter,
    setBreastSizeFilter,
    buttShapeFilter,
    setButtShapeFilter,
    buttSizeFilter,
    setButtSizeFilter,
    tattoosFilter,
    setTattoosFilter,
    piercingsFilter,
    setPiercingsFilter,
    eyeColorFilter,
    setEyeColorFilter,
    filterData,
    settings,
  } = merged;

  const {
    showAdvanced,
    setShowAdvanced,
    isVideoTab,
    isCollectionTab,
    isPeopleTab,
    isTagsTab,
    isStudiosTab,
    sortOptions,
    studioTypeOptions,
    collectionStatusOptions,
  } = layout;

  return (
    <>
      <PanelHeader.Row variant="filters">
        <Inline justify="between" align="center" flex={1}>
          <Inline gap="2xl" align="center">
            {(isVideoTab || isCollectionTab || isPeopleTab || isTagsTab || isStudiosTab) && (
              <>
                <Dropdown
                  layout="inline"
                  label={t('library.sort.label') || 'Sort:'}
                  value={sortKey}
                  onChange={(e) => {
                    setSortKey(e.target.value);
                    setCurrentPage(1);
                  }}
                  sortDirection={sortDirection}
                  onSortDirectionToggle={() => {
                    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
                    setCurrentPage(1);
                  }}
                  options={sortOptions}
                />
                {isStudiosTab && activeSessionMode === 'sfw' && (
                  <Dropdown
                    layout="inline"
                    label={t('library.filter.typeLabel') || 'Type:'}
                    value={studioTypeFilter}
                    onChange={(e) => {
                      setStudioTypeFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    options={studioTypeOptions}
                  />
                )}
              </>
            )}

            {isCollections && (
              <Dropdown
                layout="inline"
                label={t('library.filter.statusLabel') || 'Status:'}
                value={collectionStatusFilter}
                onChange={(e) => {
                  setCollectionStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                options={collectionStatusOptions}
              />
            )}

            <PeopleFilterControls state={merged} layout={layout} />
            <VideoFilterControls state={merged} layout={layout} />
          </Inline>
        </Inline>

        <Inline gap="md" align="center">
          {(isPeople || isStudiosTab) && (
            <Pill
              variant={favoriteFilter === 'favorite' ? 'favorite-active' : 'favorite'}
              onClick={() => {
                setFavoriteFilter((prev) => (prev === 'favorite' ? 'all' : 'favorite'));
                setCurrentPage(1);
              }}
            >
              {t('library.filter.favorite') || 'Favourite'}
            </Pill>
          )}

          {isPeopleTab && (
            <Pill
              variant={showAdvanced ? 'filter-active' : 'favorite'}
              onClick={() => setShowAdvanced((prev) => !prev)}
              className="advanced-filters-toggle"
            >
              {showAdvanced ? (t('library.filter.lessFilters') || 'Less') : (t('library.filter.advancedFilters') || 'Filters')}
            </Pill>
          )}

          {isVideoTab && (
            <SegmentedControl
              variant="filter"
              value={timeFilterMode}
              onChange={(val) => {
                setTimeFilterMode(val);
                setDecadeFilter('all');
                setYearFilter('');
                setCurrentPage(1);
              }}
              options={[
                { value: 'decade', label: t('library.filter.decadeMode') || 'Decade' },
                { value: 'year', label: t('library.filter.yearMode') || 'Year' },
              ]}
            />
          )}
        </Inline>
      </PanelHeader.Row>

      {showAdvanced && isPeopleTab && (
        <LibraryAdvancedFilters
          t={t}
          ethnicityFilter={ethnicityFilter}
          setEthnicityFilter={setEthnicityFilter}
          breastTypeFilter={breastTypeFilter}
          setBreastTypeFilter={setBreastTypeFilter}
          breastSizeFilter={breastSizeFilter}
          setBreastSizeFilter={setBreastSizeFilter}
          buttShapeFilter={buttShapeFilter}
          setButtShapeFilter={setButtShapeFilter}
          buttSizeFilter={buttSizeFilter}
          setButtSizeFilter={setButtSizeFilter}
          tattoosFilter={tattoosFilter}
          setTattoosFilter={setTattoosFilter}
          piercingsFilter={piercingsFilter}
          setPiercingsFilter={setPiercingsFilter}
          eyeColorFilter={eyeColorFilter}
          setEyeColorFilter={setEyeColorFilter}
          filterData={filterData}
          setCurrentPage={setCurrentPage}
          activeSessionMode={activeSessionMode}
          settings={settings}
        />
      )}
    </>
  );
}
