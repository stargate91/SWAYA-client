import { useEffect, useRef } from 'react';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { isPaginationInfinite } from '@/stores/useLibraryModeStore';

export function useLibraryScrollSync({
  currentPage,
  totalPages,
  isDataLoading,
  isLoading,
  paginationMode,
  setCurrentPage,
  scrollSelector = '.shell__content',
}) {
  const isInitialLoadRef = useRef(true);
  const lastPageRef = useRef(currentPage);

  // Smooth scroll to top after page change finishes loading new data
  useEffect(() => {
    if (isPaginationInfinite(paginationMode)) return;
    if (isInitialLoadRef.current) {
      if (!isDataLoading && !isLoading) {
        isInitialLoadRef.current = false;
        lastPageRef.current = currentPage;
      }
      return;
    }
    if (!isDataLoading) {
      if (currentPage !== lastPageRef.current) {
        lastPageRef.current = currentPage;
        const container = document.querySelector(scrollSelector);
        if (container) {
          container.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  }, [currentPage, isDataLoading, isLoading, paginationMode, scrollSelector]);

  // Save & Restore scroll position
  useScrollRestoration(scrollSelector, [isLoading, isDataLoading]);

  const sentinelRef = useInfiniteScroll({
    onIntersect: () => setCurrentPage(currentPage + 1),
    enabled: isPaginationInfinite(paginationMode) && currentPage < totalPages && !isDataLoading,
    root: scrollSelector,
  });

  return {
    sentinelRef,
  };
}

export default useLibraryScrollSync;
