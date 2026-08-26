import Page from '@/ui/Page';
import PanelHeader from '@/ui/PanelHeader';
import panelHeaderStyles from '@/ui/PanelHeader.module.css';
import { Tabs } from '@/ui/Tabs';
import OrganizerResultsPanel from './OrganizerResultsPanel';
import { normalizeStatusTone, PAGE_SIZE_OPTIONS } from '@/lib/mappers';
import { useOrganizerColumns } from '../hooks/useOrganizerColumns';
import ImageTooltip from '@/ui/ImageTooltip';
import Stack from '@/ui/Stack';
import { useImagePreviewTooltip } from '@/hooks/useImagePreviewTooltip';
import { isOrganizerRowLandscape, resolveOrganizerTooltipImage } from '../utils';
import OrganizerHeaderActions from './OrganizerHeaderActions';
import OrganizerEmptyStateActions from './OrganizerEmptyStateActions';

export default function OrganizerPageContent({
  activeExtrasTab,
  activeManualTab,
  activeMainTab,
  activeRow,
  currentPage,
  handleSortToggle,
  handleToggleAll,
  handleToggleRow,
  pageSize,
  paginatedRows,
  searchQuery,
  selectedRowIds,
  setActiveExtrasTab,
  setActiveManualTab,
  setActiveMainTab,
  setActiveRowId,
  setPageAndScrollToTop,
  setPageSize,
  setSearchQuery,
  sortConfig,
  totalPages,
  settingsQuery,
  organizerQuery,
  computedExtrasTabs,
  computedManualTabs,
  computedMainTabs,
  organizerEmptyState,
  organizerLoadingState,
  summaryText,
  headerActionsProps,
  emptyStateActionsProps,
  emptyStateActions,
  headerActions,
  onDropPaths,
  isDropzoneDisabled,
  sessionMode,
  t,
}) {
  const {
    tooltipRef,
    activeItem: tooltipRow,
    isVisible: tooltipVisible,
    coords: tooltipInitialCoords,
    handleMouseEnter: handleMouseEnterSource,
    handleMouseMove: handleMouseMoveSource,
    handleMouseLeave: handleMouseLeaveSource,
  } = useImagePreviewTooltip({ delay: 150 });

  const { columns } = useOrganizerColumns({
    activeExtrasTab,
    activeMainTab,
    collisionStrategy: settingsQuery.data?.collision_strategy,
    handleSortToggle,
    handleToggleAll,
    handleToggleRow,
    normalizeStatusTone,
    paginatedRows,
    selectedRowIds,
    sortConfig,
    t,
    onMouseEnterSource: (e, row) => handleMouseEnterSource(e, row),
    onMouseMoveSource: handleMouseMoveSource,
    onMouseLeaveSource: handleMouseLeaveSource,
  });

  const currentContextLabel =
    activeMainTab === 'manual'
      ? computedManualTabs.find((tab) => tab.value === activeManualTab)?.label || t('organizer.tabs.manual')
      : activeMainTab === 'extras'
        ? computedExtrasTabs.find((tab) => tab.value === activeExtrasTab)?.label || t('organizer.tabs.extras')
        : computedMainTabs.find((tab) => tab.value === activeMainTab)?.label || t('organizer.tabs.manual');

  const organizerInlineEmptyText = organizerQuery.isLoading
    ? t('organizer.table.emptyLoading')
    : searchQuery.trim()
      ? t('organizer.table.emptySearch', { context: currentContextLabel }) || `No items match your search in ${currentContextLabel}.`
      : t('organizer.table.emptyCategory', { context: currentContextLabel }) || `No items in ${currentContextLabel}.`;

  const isLandscape = isOrganizerRowLandscape(tooltipRow, activeMainTab, activeManualTab);
  const tooltipImageUrl = resolveOrganizerTooltipImage(tooltipRow, activeMainTab, activeManualTab);

  return (
    <Page variant="viewport">
      <Stack fill gap="3xl">
        <PanelHeader
            title={t('organizer.title')}
            isAdult={sessionMode === 'nsfw'}
            actions={headerActions || (headerActionsProps ? <OrganizerHeaderActions {...headerActionsProps} /> : null)}
            tabs={computedMainTabs}
            activeTab={activeMainTab}
            onTabChange={setActiveMainTab}
            showSearch={true}
            searchPlaceholder={
              activeMainTab === 'manual'
                ? t('organizer.searchPlaceholderManual')
                : activeMainTab === 'movies'
                  ? t('organizer.searchPlaceholderMovies')
                  : activeMainTab === 'episodes'
                    ? t('organizer.searchPlaceholderEpisodes')
                    : activeMainTab === 'extras'
                      ? t('organizer.searchPlaceholderExtras')
                      : t('organizer.searchPlaceholder')
            }
            searchQuery={searchQuery}
            onSearchQueryChange={(event) => setSearchQuery(event.target.value)}
          >
            {activeMainTab === 'manual' && computedManualTabs.length > 1 && (
              <PanelHeader.Row>
                <Tabs
                  tabs={computedManualTabs}
                  value={activeManualTab}
                  onChange={setActiveManualTab}
                  variant="sub"
                  className={panelHeaderStyles['panel-tabs']}
                  tabClassName={panelHeaderStyles['panel-tab']}
                />
              </PanelHeader.Row>
            )}
            {activeMainTab === 'extras' && computedExtrasTabs.length > 1 && (
              <PanelHeader.Row>
                <Tabs
                  tabs={computedExtrasTabs}
                  value={activeExtrasTab}
                  onChange={setActiveExtrasTab}
                  variant="sub"
                  className={panelHeaderStyles['panel-tabs']}
                  tabClassName={panelHeaderStyles['panel-tab']}
                />
              </PanelHeader.Row>
            )}
          </PanelHeader>

          <OrganizerResultsPanel
            activeRowId={activeRow?.id || null}
            columns={columns}
            currentPage={currentPage}
            dropOverlayDescription={t('organizer.dropzone.description')}
            dropOverlayLabel={t('organizer.dropzone.label')}
            onDropPaths={onDropPaths}
            isDropzoneDisabled={isDropzoneDisabled}
            emptyActions={emptyStateActions || (emptyStateActionsProps ? <OrganizerEmptyStateActions {...emptyStateActionsProps} /> : null)}
            emptyState={organizerEmptyState}
            emptyText={organizerInlineEmptyText}
            labels={t('organizer.pagination')}
            loadingState={organizerLoadingState}
            onPageChange={setPageAndScrollToTop}
            onPageSizeChange={setPageSize}
            onRowClick={(row) => setActiveRowId(row.id)}
            pageSize={pageSize}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            rows={paginatedRows}
            showPageSizes
            summaryText={summaryText}
            totalItems={organizerQuery.data?.total_items || 0}
            totalPages={totalPages}
          />
      </Stack>

      <ImageTooltip
        ref={tooltipRef}
        imageUrl={tooltipImageUrl}
        visible={tooltipVisible}
        x={tooltipInitialCoords.x}
        y={tooltipInitialCoords.y}
        aspect={isLandscape ? 'landscape' : 'poster'}
      />
    </Page>
  );
}
