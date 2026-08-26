import { ChevronUp, ChevronDown } from '@/ui/icons';
import styles from '../Table.module.css';

export default function TableHeader({
  columns = [],
  sortKey = null,
  sortDirection = null,
  onSort = null,
  allSelected = false,
}) {
  return (
    <thead>
      <tr>
        {columns.map((col) => {
          const isSortable = col.sortable;
          const isCurrentSort = sortKey === col.key;
          const alignClass =
            col.align === 'center'
              ? styles['align-center']
              : col.align === 'right'
                ? styles['align-right']
                : '';
          const thClass = `${alignClass} ${col.className || ''}`.trim();
          return (
            <th
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
              className={thClass}
            >
              {isSortable && onSort ? (
                <button
                  type="button"
                  className={styles['sort-btn']}
                  data-sort-active={isCurrentSort}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSort(col.key);
                  }}
                >
                  <span>{col.label}</span>
                  {isCurrentSort ? (
                    sortDirection === 'asc' ? (
                      <ChevronUp size={12} />
                    ) : (
                      <ChevronDown size={12} />
                    )
                  ) : null}
                </button>
              ) : typeof col.label === 'function' ? (
                col.label(allSelected)
              ) : (
                col.label
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
