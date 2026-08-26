import StudioMediaHeaderControls from './StudioMediaHeaderControls';
import StudioMediaGrid from './StudioMediaGrid';
import styles from './StudioGridSection.module.css';

export default function StudioGridSection(props) {
  const {
    viewMode,
    setViewMode,
    viewModeOptions,
    t,
    navigate,
    settings,
    mediaItems,
    mediaQuery,
    effectiveActiveTab,
    setActiveTab,
    tabOptions,
    isFetchingNextPage,
    observerRef,
    effectiveDiscoverSource,
    effectiveDiscoverMediaType,
    setDiscoverMediaType,
    discoverSourceOptions,
    setDiscoverSource,
    discoverQuery,
    discoverItems,
    isFetchingNextDiscover,
    discoverObserverRef,
    isTmdbSource,
    isMultiTypeSource,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    sortOptions,
  } = props;

  return (
    <div className={styles['right-column']}>
      <div className={styles['transition-wrapper']}>
        <div className={styles['media-section']}>
          {/* Header Controls Bar */}
          <StudioMediaHeaderControls
            viewMode={viewMode}
            setViewMode={setViewMode}
            viewModeOptions={viewModeOptions}
            mediaItemsCount={mediaItems.length}
            effectiveActiveTab={effectiveActiveTab}
            setActiveTab={setActiveTab}
            tabOptions={tabOptions}
            effectiveDiscoverSource={effectiveDiscoverSource}
            effectiveDiscoverMediaType={effectiveDiscoverMediaType}
            setDiscoverMediaType={setDiscoverMediaType}
            discoverSourceOptions={discoverSourceOptions}
            setDiscoverSource={setDiscoverSource}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            sortOptions={sortOptions}
            t={t}
          />

          {/* Media Items Grid with Skeleton Loaders */}
          <StudioMediaGrid
            viewMode={viewMode}
            mediaQuery={mediaQuery}
            mediaItems={mediaItems}
            effectiveActiveTab={effectiveActiveTab}
            tabOptions={tabOptions}
            isFetchingNextPage={isFetchingNextPage}
            observerRef={observerRef}
            discoverQuery={discoverQuery}
            discoverItems={discoverItems}
            isFetchingNextDiscover={isFetchingNextDiscover}
            discoverObserverRef={discoverObserverRef}
            isTmdbSource={isTmdbSource}
            isMultiTypeSource={isMultiTypeSource}
            effectiveDiscoverSource={effectiveDiscoverSource}
            effectiveDiscoverMediaType={effectiveDiscoverMediaType}
            navigate={navigate}
            settings={settings}
            t={t}
            sortBy={sortBy}
          />
        </div>
      </div>
    </div>
  );
}
