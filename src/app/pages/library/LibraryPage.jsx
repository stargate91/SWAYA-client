import Page from '@/ui/Page';
import Skeleton from '@/ui/Skeleton';
import { isPaginationInfinite } from '@/stores/useLibraryModeStore';
import LibraryPagination from './components/LibraryPagination';
import { LibrarySearchInput } from './components/LibrarySearchInput';
import PanelHeader from '@/ui/PanelHeader';
import panelHeaderStyles from '@/ui/PanelHeader.module.css';
import LibraryGrid from './components/LibraryGrid';
import LibraryFilters from './components/LibraryFilters';
import Card from '@/ui/Card';
import Grid from '@/ui/Grid';
import { Tabs } from '@/ui/Tabs';
import { isLibraryTagsTab } from '@/lib/libraryTabs';
import ImagePickerDrawer from '@/components/drawers/ImagePickerDrawer';
import UtilityBarPortal from '@/ui/UtilityBarPortal';
import SegmentedControl from '@/ui/SegmentedControl';
import Dropdown from '@/ui/Dropdown';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Spinner from '@/ui/Spinner';
import { useLibraryPageController } from './hooks/useLibraryPageController';

export default function LibraryPage({ initialTab = 'movies', lockTab = false, showTabs = true, pageTitle = null }) {
  const {
    state,
    isAdultMode,
    showOwnershipSegment,
    handleOwnershipChange,
    showInlineSorter,
    handleSortKeyChange,
    handleSortDirectionToggle,
    headerActions,
    isTagFocusMode,
    sentinelRef,
    gridProps,
    imagePickerProps,
    skeletonGridVariant,
    skeletonCardAspect,
    skeletonCount,
    pageTitle: computedPageTitle,
  } = useLibraryPageController({ initialTab, lockTab, showTabs, pageTitle });

  if (state.isLoading) {
    return (
      <Page className="library-page">
        <Stack gap="lg" fullWidth>
          <Inline justify="space-between" align="center">
            <div>
              <Skeleton.Title />
            </div>
            <Inline gap="md">
              <Skeleton width="5rem" height="2.25rem" />
              <Skeleton width="5rem" height="2.25rem" />
            </Inline>
          </Inline>
          <Card variant="soft" padding="md">
            <Inline gap="lg">
              <Skeleton width="7.5rem" height="2rem" />
              <Skeleton width="6.25rem" height="2rem" />
              <Skeleton width="9.375rem" height="2rem" />
            </Inline>
          </Card>
          <Grid variant={skeletonGridVariant}>
            {Array.from({ length: skeletonCount }).map((_, idx) => (
              <Skeleton.Card key={idx} aspect={skeletonCardAspect} />
            ))}
          </Grid>
        </Stack>
      </Page>
    );
  }

  return (
    <Page className={`library-page ${isAdultMode ? 'library-page--nsfw' : ''}`}>
      {showOwnershipSegment && (
        <UtilityBarPortal align="center">
          <SegmentedControl
            value={state.ownershipFilter}
            onChange={handleOwnershipChange}
            options={[
              { value: 'owned', label: state.t('library.filter.have') || 'Have' },
              { value: 'unowned', label: state.t('library.filter.missing') || 'Missing' },
            ]}
            size="sm"
            animated={true}
          />
        </UtilityBarPortal>
      )}
      <Stack gap="3xl">
        <PanelHeader
          title={computedPageTitle}
          isAdult={isAdultMode}
          actions={headerActions}
        >
          {/* Row 2: Tabs and Search */}
          <PanelHeader.Row>
            {showTabs ? (
              <Tabs
                tabs={state.tabs}
                value={state.resolvedTab}
                onChange={state.setActiveTab}
                className={panelHeaderStyles['panel-tabs']}
                tabClassName={panelHeaderStyles['panel-tab']}
              />
            ) : (
              <Inline gap="2xl" align="center">
                {showInlineSorter ? (
                  <Dropdown
                    layout="inline"
                    label={state.t('library.sort.label') || 'Sort:'}
                    value={state.sortKey}
                    onChange={(e) => handleSortKeyChange(e.target.value)}
                    sortDirection={state.sortDirection}
                    onSortDirectionToggle={handleSortDirectionToggle}
                    options={[
                      { value: 'total_count', label: state.t('library.sort.itemCount') || 'Item Count' },
                      { value: 'name', label: state.t('library.sort.name') || 'Name' },
                    ]}
                  />
                ) : null}
              </Inline>
            )}
            <LibrarySearchInput
              key={state.resolvedTab}
              placeholder={state.searchPlaceholder}
              onSearchChange={state.setSearchQuery}
              initialValue={state.searchQuery}
            />
          </PanelHeader.Row>

          {/* Row 3+: LibraryFilters */}
          {!(isLibraryTagsTab(state.resolvedTab) && !showTabs) && (
            <LibraryFilters
              state={state}
              isAdultMode={isAdultMode}
            />
          )}
        </PanelHeader>

        <LibraryPagination
          state={state}
          isTagFocusMode={isTagFocusMode}
          showPageSizes
        />

        <Stack gap="xl">
          <LibraryGrid key={state.resolvedTab} {...gridProps} />

          {isPaginationInfinite(state.paginationMode) && state.currentPage < state.totalPages && (
            <Inline ref={sentinelRef} justify="center" align="center">
              <Spinner size="var(--space-2xl)" />
            </Inline>
          )}

          <LibraryPagination
            state={state}
            isTagFocusMode={isTagFocusMode}
          />
        </Stack>
      </Stack>

      <ImagePickerDrawer {...imagePickerProps} />
    </Page>
  );
}
