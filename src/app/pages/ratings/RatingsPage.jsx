import { useNavigate } from 'react-router-dom';
import Page from '@/ui/Page';
import Table from '@/ui/Table';
import { Tabs } from '@/ui/Tabs';
import PanelHeader from '@/ui/PanelHeader';
import panelHeaderStyles from '@/ui/PanelHeader.module.css';
import { useTranslation } from '@/providers/LanguageContext';
import { useRatingsPageState } from './hooks/useRatingsPageState';
import { useRatingsColumns } from './hooks/useRatingsColumns';
import LibraryPagination from '../library/components/LibraryPagination';
import RatingsReviewDrawer from '@/components/drawers/RatingsReviewDrawer';
import Stack from '@/ui/Stack';

export default function RatingsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const state = useRatingsPageState();

  const {
    ratingTabs,
    subTabs,
    columns,
  } = useRatingsColumns({
    state,
    t,
    navigate,
  });

  return (
    <Page variant="viewport">
      <Stack fill gap="xl" flex={1}>
        <PanelHeader
          title={t('ratings.title') || 'Ratings & Reviews'}
          isAdult={state.activeSessionMode === 'nsfw'}
          tabs={ratingTabs}
          activeTab={state.activeTab}
          onTabChange={(val) => state.setActiveTab(val)}
          showSearch={true}
          searchPlaceholder={t('common.search') || 'Search...'}
          searchQuery={state.localSearch}
          onSearchQueryChange={(e) => state.setLocalSearch(e.target.value)}
        >
          <PanelHeader.Row>
            <Tabs
              tabs={subTabs}
              value={state.mediaType}
              onChange={(val) => state.setMediaType(val)}
              variant="sub"
              className={panelHeaderStyles['panel-tabs']}
              tabClassName={panelHeaderStyles['panel-tab']}
            />
          </PanelHeader.Row>
        </PanelHeader>

        {/* Upper Pagination Panel */}
        <LibraryPagination
          state={{
            paginatedItems: state.paginatedItems,
            shouldShowPagination: state.totalPages > 1,
            summaryText: state.totalItems > 0
              ? `${(state.currentPage - 1) * state.pageSize + 1}-${Math.min(state.currentPage * state.pageSize, state.totalItems)} / ${state.totalItems}`
              : '0-0 / 0',
            currentPage: state.currentPage,
            totalPages: state.totalPages,
            pageSize: state.pageSize,
            setCurrentPage: state.setCurrentPage,
            setPageSize: state.setPageSize,
            t: t,
          }}
          showPageSizes
        />

        {/* Table of Rated / Unrated items */}
        <Table
          loading={state.isLoading}
          columns={columns}
          rows={state.paginatedItems}
          emptyText={t('ratings.table.empty', { defaultValue: 'No items match selected criteria.' })}
          sortKey={state.sortKey}
          sortDirection={state.sortDirection}
          onSort={state.handleSortToggle}
        />
      </Stack>

      <RatingsReviewDrawer
        editingItem={state.editingItem}
        setEditingItem={state.setEditingItem}
        reviewText={state.reviewText}
        setReviewText={state.setReviewText}
        handleSaveReview={state.handleSaveReview}
        t={t}
      />
    </Page>
  );
}
