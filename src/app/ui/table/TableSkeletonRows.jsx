import Skeleton from '../Skeleton';
import styles from '../Table.module.css';

export default function TableSkeletonRows({ columns = [], rowCount = 6 }) {
  return Array.from({ length: rowCount }).map((_, rIdx) => (
    <tr key={`skeleton-row-${rIdx}`}>
      {columns.map((col) => {
        const alignClass =
          col.align === 'center'
            ? styles['align-center']
            : col.align === 'right'
              ? styles['align-right']
              : '';
        return (
          <td
            key={`skeleton-col-${col.key}`}
            width={col.width || undefined}
            /* eslint-disable-next-line react/forbid-dom-props */
            style={
              col.width
                ? { width: col.width, minWidth: col.minWidth || col.width }
                : col.minWidth
                  ? { minWidth: col.minWidth }
                  : undefined
            }
            className={alignClass}
          >
            <div className={styles['cell-content']}>
              <Skeleton
                height="1.125rem"
                width={col.align === 'center' ? '40%' : col.width ? '80%' : '65%'}
                variant="rect"
              />
            </div>
          </td>
        );
      })}
    </tr>
  ));
}
