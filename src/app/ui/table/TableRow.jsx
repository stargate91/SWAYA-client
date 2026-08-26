import { memo, forwardRef } from 'react';
import Tooltip from '../Tooltip';
import IconButton from '../IconButton';
import styles from '../Table.module.css';

/* eslint-disable-next-line react-refresh/only-export-components */
export function areTableRowsEqual(prevProps, nextProps) {
  if (prevProps.activeRowId !== nextProps.activeRowId) return false;
  if (prevProps.selected !== nextProps.selected) return false;
  if (prevProps.columns !== nextProps.columns) return false;
  if (prevProps.onRowClick !== nextProps.onRowClick) return false;
  if (prevProps.onContextMenu !== nextProps.onContextMenu) return false;
  if (prevProps.rowActions !== nextProps.rowActions) return false;
  if (prevProps['data-index'] !== nextProps['data-index']) return false;
  if (prevProps.row === nextProps.row) return true;

  const prevRow = prevProps.row;
  const nextRow = nextProps.row;
  if (!prevRow || !nextRow) return prevRow === nextRow;

  const prevKeys = Object.keys(prevRow);
  const nextKeys = Object.keys(nextRow);
  if (prevKeys.length !== nextKeys.length) return false;

  for (let i = 0; i < prevKeys.length; i++) {
    const key = prevKeys[i];
    if (prevRow[key] !== nextRow[key]) return false;
  }
  return true;
}

export const TableRow = memo(
  forwardRef(function TableRow(
    {
      row,
      columns = [],
      onRowClick,
      onContextMenu,
      activeRowId,
      rowActions = [],
      selected = false,
      ...rest
    },
    ref
  ) {
    const lastColumnKey = columns[columns.length - 1]?.key;
    const hasRowActions = rowActions.length > 0;
    const visibleRowActions = hasRowActions
      ? rowActions.filter((action) => (action.isVisible ? action.isVisible(row) : true))
      : [];

    return (
      <tr
        ref={ref}
        {...rest}
        onClick={onRowClick ? () => onRowClick(row) : undefined}
        onContextMenu={onContextMenu ? (e) => onContextMenu(e, row) : undefined}
        className={`${onRowClick ? styles['is-clickable'] : ''} ${activeRowId === row.id ? styles['is-active'] : ''}`.trim()}
      >
        {columns.map((col) => {
          const rawValue = row[col.key];
          const renderedValue = col.render ? col.render(rawValue, row, selected) : rawValue;
          const hasActionsInCell = visibleRowActions.length > 0 && col.key === lastColumnKey;
          const hideOnHoverClass = hasActionsInCell || col.hideOnHover ? styles['hide-on-hover'] : '';
          const isEmpty = renderedValue === undefined || renderedValue === null || renderedValue === '';
          const alignClass =
            col.align === 'center'
              ? styles['align-center']
              : col.align === 'right'
                ? styles['align-right']
                : '';
          const tdClass = `${alignClass} ${col.className || ''}`.trim();

          return (
            <td
              key={col.key}
              width={col.width || undefined}
              // eslint-disable-next-line react/forbid-dom-props
              style={
                col.width
                  ? { width: col.width, minWidth: col.minWidth || col.width }
                  : col.minWidth
                    ? { minWidth: col.minWidth }
                    : undefined
              }
              className={tdClass}
            >
              <div className={styles['cell-content']}>
                {col.render ? (
                  <div className={`${styles['cell-value-custom']} ${hideOnHoverClass}`.trim()}>
                    {isEmpty ? '-' : renderedValue}
                  </div>
                ) : (
                  <span className={`${styles['cell-value']} ${hideOnHoverClass}`.trim()}>
                    {isEmpty ? '-' : renderedValue}
                  </span>
                )}
                {hasActionsInCell ? (
                  /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
                  <div className={styles['row-actions']} onClick={(event) => event.stopPropagation()}>
                    {visibleRowActions.map((action) => {
                      const isDanger = action.variant === 'danger' || action.isDanger || action.className === 'is-danger';
                      const actionClass = `${styles['row-action']} ${
                        isDanger ? styles['is-danger'] : action.className || ''
                      }`.trim();
                      const actionLabel = typeof action.label === 'function' ? action.label(row) : action.label;
                      const actionTooltip =
                        typeof action.tooltip === 'function'
                          ? action.tooltip(row)
                          : action.tooltip || actionLabel;
                      return (
                        <Tooltip key={action.key} content={actionTooltip} side="top">
                          <IconButton
                            type="button"
                            className={actionClass}
                            onClick={() => action.onClick(row)}
                            label={actionLabel}
                            title={null}
                            size="sm"
                          >
                            <action.icon size={15} />
                          </IconButton>
                        </Tooltip>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </td>
          );
        })}
      </tr>
    );
  }),
  areTableRowsEqual
);

export default TableRow;
