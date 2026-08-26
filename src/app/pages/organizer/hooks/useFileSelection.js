import { useState, useMemo, useCallback } from 'react';

export function useFileSelection({ sortedRows = [], paginatedRows = [] }) {
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());

  const selectedRows = useMemo(
    () => sortedRows.filter((row) => selectedRowIds.has(row.id)),
    [selectedRowIds, sortedRows]
  );

  const handleToggleRow = useCallback((id) => {
    setSelectedRowIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleToggleAll = useCallback(() => {
    setSelectedRowIds((current) => {
      const allSelected = paginatedRows.length > 0 && paginatedRows.every((row) => current.has(row.id));
      const next = new Set(current);
      if (allSelected) {
        paginatedRows.forEach((row) => next.delete(row.id));
      } else {
        paginatedRows.forEach((row) => next.add(row.id));
      }
      return next;
    });
  }, [paginatedRows]);

  const clearSelectedRows = useCallback(() => {
    setSelectedRowIds(new Set());
  }, []);

  return {
    selectedRowIds,
    setSelectedRowIds,
    selectedRows,
    handleToggleRow,
    handleToggleAll,
    clearSelectedRows,
  };
}
