import { useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useTranslation } from '@/providers/LanguageContext';
import EmptyState from './EmptyState';
import ContextMenu from './ContextMenu';
import TableHeader from './table/TableHeader';
import TableRow from './table/TableRow';
import TableSkeletonRows from './table/TableSkeletonRows';
import useTableContextMenu from './table/useTableContextMenu';
import styles from './Table.module.css';

export { TableHeader, TableRow, TableSkeletonRows };

export default function Table({
  columns = [],
  rows = [],
  loading = false,
  loadingRowCount = 6,
  onRowClick,
  activeRowId = null,
  emptyText,
  emptyContent = null,
  rowActions = [],
  selectedRows = [],
  openBulkDeleteModal,
  openMatchModal,
  openBulkOverrideModal,
  dismissRows,
  clearSelectedRows,
  variant = 'default',
  sortKey = null,
  sortDirection = null,
  onSort = null,
  className = '',
  virtualized = false,
  estimateRowHeight = 44,
  overscan = 8,
}) {
  const wrapRef = useRef(null);

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => wrapRef.current,
    estimateSize: () => estimateRowHeight,
    overscan,
    enabled: Boolean(virtualized && rows.length > 0),
  });

  const {
    contextMenu,
    contextMenuItems,
    handleRowContextMenu,
    closeContextMenu,
  } = useTableContextMenu({
    selectedRows,
    rowActions,
    openBulkDeleteModal,
    openMatchModal,
    openBulkOverrideModal,
    dismissRows,
    clearSelectedRows,
  });

  const { t } = useTranslation();
  const displayEmptyText = emptyText ?? t('common.noData');

  const selectedIds = useMemo(
    () => new Set(selectedRows.map((r) => r.id)),
    [selectedRows]
  );
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.id));

  const isMinimalOrGrid = variant === 'minimal' || variant === 'grid';
  const wrapClass = `${styles.wrap} ${
    isMinimalOrGrid ? styles['wrap-minimal'] : ''
  } ${className}`.trim();
  const tableClass = [
    styles.table,
    variant === 'minimal' && styles['table-minimal'],
    variant === 'grid' && styles['table-grid'],
  ]
    .filter(Boolean)
    .join(' ');

  const virtualItems = virtualized ? rowVirtualizer.getVirtualItems() : null;
  const paddingTop = virtualItems?.length > 0 ? virtualItems[0].start : 0;
  const paddingBottom =
    virtualItems?.length > 0
      ? rowVirtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
      : 0;

  return (
    <div ref={wrapRef} className={wrapClass}>
      <table className={tableClass}>
        <TableHeader
          columns={columns}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={onSort}
          allSelected={allSelected}
        />
        <tbody>
          {loading ? (
            <TableSkeletonRows columns={columns} rowCount={loadingRowCount} />
          ) : rows.length === 0 ? (
            <tr className={styles['is-empty']}>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyContent || (
                  <EmptyState
                    size="sm"
                    border="none"
                    background="none"
                    title={displayEmptyText}
                  />
                )}
              </td>
            </tr>
          ) : virtualized && virtualItems ? (
            <>
              {paddingTop > 0 && (
                <tr key="virtual-spacer-top" aria-hidden="true">
                  <td
                    colSpan={columns.length}
                    className={styles['virtual-spacer']}
                    /* eslint-disable-next-line react/forbid-dom-props */
                    style={{ height: `${paddingTop}px` }}
                  />
                </tr>
              )}
              {virtualItems.map((virtualRow) => {
                const row = rows[virtualRow.index];
                if (!row) return null;
                return (
                  <TableRow
                    key={row.id}
                    ref={rowVirtualizer.measureElement}
                    data-index={virtualRow.index}
                    row={row}
                    columns={columns}
                    onRowClick={onRowClick}
                    onContextMenu={variant === 'minimal' ? undefined : handleRowContextMenu}
                    activeRowId={activeRowId}
                    rowActions={variant === 'minimal' ? [] : rowActions}
                    selected={selectedIds.has(row.id)}
                  />
                );
              })}
              {paddingBottom > 0 && (
                <tr key="virtual-spacer-bottom" aria-hidden="true">
                  <td
                    colSpan={columns.length}
                    className={styles['virtual-spacer']}
                    /* eslint-disable-next-line react/forbid-dom-props */
                    style={{ height: `${paddingBottom}px` }}
                  />
                </tr>
              )}
            </>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                row={row}
                columns={columns}
                onRowClick={onRowClick}
                onContextMenu={variant === 'minimal' ? undefined : handleRowContextMenu}
                activeRowId={activeRowId}
                rowActions={variant === 'minimal' ? [] : rowActions}
                selected={selectedIds.has(row.id)}
              />
            ))
          )}
        </tbody>
      </table>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
}
