import { useState, useRef, useEffect, useCallback } from 'react';

export function usePaginationEditor({ currentPage, totalPages, onPageChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [pageValue, setPageValue] = useState(String(currentPage));
  const [prevCurrentPage, setPrevCurrentPage] = useState(currentPage);
  const inputRef = useRef(null);

  if (currentPage !== prevCurrentPage) {
    setPrevCurrentPage(currentPage);
    setPageValue(String(currentPage));
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const submitPage = useCallback(() => {
    const parsed = Number.parseInt(pageValue, 10);
    if (Number.isNaN(parsed)) {
      setPageValue(String(currentPage));
      setIsEditing(false);
      return;
    }

    onPageChange?.(Math.min(totalPages, Math.max(1, parsed)));
    setIsEditing(false);
  }, [pageValue, currentPage, totalPages, onPageChange]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      submitPage();
    }
    if (event.key === 'Escape') {
      setPageValue(String(currentPage));
      setIsEditing(false);
    }
  }, [submitPage, currentPage]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  return {
    isEditing,
    pageValue,
    setPageValue,
    inputRef,
    submitPage,
    handleKeyDown,
    startEditing,
  };
}

export default usePaginationEditor;
