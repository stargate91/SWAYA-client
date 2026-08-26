import PaginationBar from '@/ui/PaginationBar';
import { DEFAULT_PAGE_SIZE_OPTIONS } from '@/lib/paginationConstants';

export default function LibraryPagination({
  state,
  isTagFocusMode,
  showPageSizes = false,
}) {
  const hasItems = state.paginatedItems.length > 0;
  
  if (!state.shouldShowPagination || isTagFocusMode) {
    return null;
  }

  if (!showPageSizes && !hasItems) {
    return null;
  }

  return (
    <PaginationBar
      summaryText={state.summaryText}
      currentPage={state.currentPage}
      totalPages={state.totalPages}
      pageSize={state.pageSize}
      pageSizeOptions={showPageSizes ? DEFAULT_PAGE_SIZE_OPTIONS : undefined}
      showPageSizes={showPageSizes}
      onPageChange={state.setCurrentPage}
      onPageSizeChange={showPageSizes ? state.setPageSize : undefined}
      labels={state.t('organizer.pagination')}
      paginationMode={state.paginationMode}
      onPaginationModeChange={state.setPaginationMode}
    />
  );
}
