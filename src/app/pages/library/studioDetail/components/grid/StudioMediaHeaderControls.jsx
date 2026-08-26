import Inline from '@/ui/Inline';
import Text from '@/ui/Text';
import Chip from '@/ui/Chip';
import SegmentedControl from '@/ui/SegmentedControl';
import Dropdown from '@/ui/Dropdown';
import styles from './StudioMediaHeaderControls.module.css';

export default function StudioMediaHeaderControls({
  viewMode,
  setViewMode,
  viewModeOptions,
  mediaItemsCount,
  effectiveActiveTab,
  setActiveTab,
  tabOptions,
  effectiveDiscoverSource,
  effectiveDiscoverMediaType,
  setDiscoverMediaType,
  discoverSourceOptions,
  setDiscoverSource,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  sortOptions,
  t,
}) {
  return (
    <div className={styles['media-header']}>
      <Inline gap="md" align="center">
        <Text as="h4" variant="body" weight="extrabold" color="primary" uppercase tracking="widest">
          {viewMode === 'library'
            ? (t('library.studios.mediaCount', { count: mediaItemsCount }) || `LIBRARY CONTENT (${mediaItemsCount})`)
            : (t('library.details.discover') || 'LIVE DISCOVERY')}
        </Text>

        {/* Media Type Tabs on Left */}
        {viewMode === 'library' ? (
          <Inline gap="2xs">
            {tabOptions.map((tab) => (
              <Chip
                key={tab.value}
                variant="translucent"
                size="sm"
                active={effectiveActiveTab === tab.value}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </Chip>
            ))}
          </Inline>
        ) : (
          <Inline gap="2xs">
            {effectiveDiscoverSource === 'tmdb' && (
              <>
                <Chip
                  variant="translucent"
                  size="sm"
                  active={effectiveDiscoverMediaType === 'movies'}
                  onClick={() => setDiscoverMediaType('movies')}
                >
                  {t('library.tabs.movies') || 'Movies'}
                </Chip>
                <Chip
                  variant="translucent"
                  size="sm"
                  active={effectiveDiscoverMediaType === 'tv'}
                  onClick={() => setDiscoverMediaType('tv')}
                >
                  {t('library.tabs.tv') || 'TV Shows'}
                </Chip>
              </>
            )}

            {effectiveDiscoverSource === 'theporndb' && (
              <>
                <Chip
                  variant="translucent"
                  size="sm"
                  active={effectiveDiscoverMediaType === 'movies'}
                  onClick={() => setDiscoverMediaType('movies')}
                >
                  {t('library.tabs.movies') || 'Movies'}
                </Chip>
                <Chip
                  variant="translucent"
                  size="sm"
                  active={effectiveDiscoverMediaType === 'scenes'}
                  onClick={() => setDiscoverMediaType('scenes')}
                >
                  {t('library.tabs.scenes') || 'Scenes'}
                </Chip>
              </>
            )}

            {effectiveDiscoverSource === 'tmdb_network' && (
              <Chip
                variant="translucent"
                size="sm"
                active={true}
              >
                {t('library.tabs.tv') || 'TV Shows'}
              </Chip>
            )}
          </Inline>
        )}

        {!(viewMode === 'discover' && effectiveDiscoverSource === 'theporndb') && (
          <Dropdown
            variant="sorter"
            layout="inline"
            label={t('library.sort.label') || 'Sort:'}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sortDirection={sortDirection}
            onSortDirectionToggle={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            options={sortOptions}
          />
        )}
      </Inline>

      {/* View Mode & Discover Sources on Right */}
      <Inline gap="xs" align="center" className={styles['filter-group']}>
        {viewModeOptions.length > 1 && (
          <SegmentedControl
            options={viewModeOptions}
            value={viewMode}
            onChange={setViewMode}
            variant="translucent"
            size="sm"
            animated
          />
        )}

        {viewMode === 'discover' && discoverSourceOptions.length > 1 && (
          <Inline gap="2xs">
            {discoverSourceOptions.map((srcOpt) => (
              <Chip
                key={srcOpt.value}
                variant="translucent"
                size="sm"
                active={effectiveDiscoverSource === srcOpt.value}
                onClick={() => setDiscoverSource(srcOpt.value)}
              >
                {srcOpt.label}
              </Chip>
            ))}
          </Inline>
        )}
      </Inline>
    </div>
  );
}
