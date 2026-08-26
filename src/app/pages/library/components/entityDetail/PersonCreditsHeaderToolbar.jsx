import Inline from '@/ui/Inline';
import Text from '@/ui/Text';
import Chip from '@/ui/Chip';
import SegmentedControl from '@/ui/SegmentedControl';
import Autocomplete from '@/ui/Autocomplete';
import { Search } from '@/ui/icons';

export default function PersonCreditsHeaderToolbar({
  headerTitle = '',
  viewMode = 'library',
  setViewMode,
  navigationOptions = [],
  myLibraryTabs = [],
  activeLibraryTab,
  setActiveLibraryTab,
  hasMovies = false,
  movieTabs = [],
  hasTv = false,
  tvTabs = [],
  hasScenes = false,
  sceneTabs = [],
  activeDiscoverTab,
  setActiveDiscoverTab,
  activeSource,
  currentProviderStudios = [],
  activeStudioFilter,
  setActiveStudioFilter,
  studioInputValue = '',
  setStudioInputValue,
  filteredStudioSuggestions = [],
  activeTagFilter,
  setActiveTagFilter,
  tagInputValue = '',
  setTagInputValue,
  filteredTagSuggestions = [],
  item,
  t,
}) {
  return (
    <Inline
      justify="between"
      align="center"
      gap="md"
      wrap={false}
      fullWidth
      className="person-credits-discover-header-layout"
    >
      {/* Left side: Title + Tabs + Filters grouped together */}
      <Inline
        align="center"
        gap="md"
        wrap={false}
        /* eslint-disable-next-line react/forbid-component-props */
        style={{ flex: 1, minWidth: 0, overflowX: 'auto', scrollbarWidth: 'none' }}
      >
        <Text
          as="h4"
          variant="body"
          weight="extrabold"
          color="primary"
          uppercase
          tracking="widest"
          /* eslint-disable-next-line react/forbid-component-props */
          style={{ flexShrink: 0 }}
        >
          {headerTitle}
        </Text>

        {viewMode === 'library' && myLibraryTabs.length > 0 && (
          <Inline
            gap="xs"
            align="center"
            wrap={false}
            className="person-credits-discover-group"
          >
            {myLibraryTabs.map((tab) => (
              <Chip
                key={tab.id}
                variant="translucent"
                size="sm"
                active={activeLibraryTab === tab.id}
                onClick={() => setActiveLibraryTab?.(tab.id)}
              >
                {tab.label}{' '}
                <Text as="strong" variant="xsmall" color="secondary" weight="bold">
                  {tab.items?.length || 0}
                </Text>
              </Chip>
            ))}
          </Inline>
        )}

        {viewMode === 'discover' && (
          <Inline
            gap="lg"
            align="center"
            wrap={false}
            /* eslint-disable-next-line react/forbid-component-props */
            style={{ flex: 1, minWidth: 0 }}
          >
            {hasMovies && (
              <Inline
                gap="xs"
                align="center"
                wrap={false}
                className="person-credits-discover-group"
              >
                <Text
                  variant="xsmall"
                  uppercase
                  weight="bold"
                  color="secondary"
                  tracking="wide"
                  /* eslint-disable-next-line react/forbid-component-props */
                  style={{ flexShrink: 0 }}
                >
                  {t('library.details.movies') || 'Movies'}
                </Text>
                {movieTabs.map((tab) => (
                  <Chip
                    key={tab.value}
                    variant="translucent"
                    size="sm"
                    active={activeDiscoverTab === tab.value}
                    onClick={() => setActiveDiscoverTab?.(tab.value)}
                  >
                    {tab.label}
                  </Chip>
                ))}
              </Inline>
            )}

            {hasTv && (
              <Inline
                gap="xs"
                align="center"
                wrap={false}
                className="person-credits-discover-group"
              >
                <Text
                  variant="xsmall"
                  uppercase
                  weight="bold"
                  color="secondary"
                  tracking="wide"
                  /* eslint-disable-next-line react/forbid-component-props */
                  style={{ flexShrink: 0 }}
                >
                  {t('library.details.tvShows') || 'TV Shows'}
                </Text>
                {tvTabs.map((tab) => (
                  <Chip
                    key={tab.value}
                    variant="translucent"
                    size="sm"
                    active={activeDiscoverTab === tab.value}
                    onClick={() => setActiveDiscoverTab?.(tab.value)}
                  >
                    {tab.label}
                  </Chip>
                ))}
              </Inline>
            )}

            {hasScenes && (
              <Inline
                gap="xs"
                align="center"
                wrap={false}
                className="person-credits-discover-group"
              >
                <Text
                  variant="xsmall"
                  uppercase
                  weight="bold"
                  color="secondary"
                  tracking="wide"
                  /* eslint-disable-next-line react/forbid-component-props */
                  style={{ flexShrink: 0 }}
                >
                  {t('library.details.scenes') || 'Scenes'}
                </Text>
                {sceneTabs.map((tab) => (
                  <Chip
                    key={tab.value}
                    variant="translucent"
                    size="sm"
                    active={activeDiscoverTab === tab.value}
                    onClick={() => setActiveDiscoverTab?.(tab.value)}
                  >
                    {tab.label}
                  </Chip>
                ))}
              </Inline>
            )}

            {activeSource && (
              <Inline
                gap="xs"
                align="center"
                wrap={false}
                className="person-credits-discover-group"
              >
                {currentProviderStudios.length > 0 &&
                  (activeStudioFilter ? (
                    <Chip
                      variant="translucent"
                      size="sm"
                      active={true}
                      onRemove={() => {
                        setActiveStudioFilter?.('');
                        setStudioInputValue?.('');
                      }}
                    >
                      {activeStudioFilter}
                    </Chip>
                  ) : (
                    <Autocomplete
                      value={studioInputValue}
                      onChange={setStudioInputValue}
                      options={filteredStudioSuggestions}
                      onSelect={(st) => {
                        const selected =
                          typeof st === 'string'
                            ? st
                            : st?.name || st?.label || String(st);
                        setActiveStudioFilter?.(selected);
                        setStudioInputValue?.(selected);
                      }}
                      placeholder={
                        t('library.details.filterStudio') ||
                        'Filter studio...'
                      }
                      size="sm"
                      width="10.5rem"
                      leftElement={<Search size={12} />}
                    />
                  ))}

                {!(item?.is_adult && activeSource === 'tmdb') &&
                  (activeTagFilter ? (
                    <Chip
                      variant="translucent"
                      size="sm"
                      active={true}
                      onRemove={() => {
                        setActiveTagFilter?.('');
                        setTagInputValue?.('');
                      }}
                    >
                      {activeTagFilter}
                    </Chip>
                  ) : (
                    <Autocomplete
                      value={tagInputValue}
                      onChange={setTagInputValue}
                      options={filteredTagSuggestions}
                      onSelect={(tag) => {
                        const selected =
                          typeof tag === 'string'
                            ? tag
                            : tag?.name || tag?.label || String(tag);
                        setActiveTagFilter?.(selected);
                        setTagInputValue?.(selected);
                      }}
                      placeholder={
                        t('dashboard.search_tag_placeholder') ||
                        'Filter tag...'
                      }
                      size="sm"
                      width="10.5rem"
                      leftElement={<Search size={12} />}
                    />
                  ))}
              </Inline>
            )}
          </Inline>
        )}
      </Inline>

      {/* Right side: ViewMode toggle */}
      {navigationOptions.length > 1 && (
        <SegmentedControl
          options={navigationOptions}
          value={viewMode}
          onChange={setViewMode}
          variant="translucent"
          size="sm"
          animated
          /* eslint-disable-next-line react/forbid-component-props */
          style={{ flexShrink: 0 }}
        />
      )}
    </Inline>
  );
}
