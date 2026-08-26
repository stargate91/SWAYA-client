import { useRef, useLayoutEffect, useMemo, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useVirtualizer } from '@tanstack/react-virtual';
import Grid from './Grid';
import { getGridColumnCount, getDefaultRowHeight, calculateRowHeight } from './virtualGridUtils';
import { useVirtualGridMeasurement } from './useVirtualGridMeasurement';
import styles from './VirtualGrid.module.css';

function areVirtualGridRowsEqual(prev, next) {
  if (
    prev.virtualRow.index !== next.virtualRow.index ||
    prev.virtualRow.start !== next.virtualRow.start ||
    prev.columnCount !== next.columnCount ||
    prev.rowStartIndex !== next.rowStartIndex ||
    prev.variant !== next.variant ||
    prev.gap !== next.gap ||
    prev.renderItem !== next.renderItem ||
    prev.dynamicMeasurement !== next.dynamicMeasurement ||
    prev.measureElement !== next.measureElement
  ) {
    return false;
  }

  const prevLen = prev.rowItems?.length || 0;
  const nextLen = next.rowItems?.length || 0;
  if (prevLen !== nextLen) {
    return false;
  }

  for (let i = 0; i < prevLen; i += 1) {
    if (prev.rowItems[i] !== next.rowItems[i]) {
      return false;
    }
  }

  return true;
}

const VirtualGridRow = memo(function VirtualGridRow({
  virtualRow,
  columnCount,
  rowStartIndex,
  rowItems,
  variant,
  gap,
  renderItem,
  dynamicMeasurement,
  measureElement,
}) {
  return (
    <div
      data-index={virtualRow.index}
      {...(gap ? { 'data-gap': gap } : {})}
      {...(dynamicMeasurement ? { ref: measureElement } : {})}
      className={styles['virtual-grid-row']}
      /* eslint-disable-next-line react/forbid-dom-props */
      style={{
        transform: `translateY(${virtualRow.start}px)`,
      }}
    >
      <Grid
        variant={variant}
        gap={gap}
        /* eslint-disable-next-line react/forbid-component-props */
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {rowItems.map((item, colIdx) => {
          const globalIndex = rowStartIndex + colIdx;
          return renderItem(item, globalIndex, virtualRow.index, colIdx);
        })}
      </Grid>
    </div>
  );
}, areVirtualGridRowsEqual);

VirtualGridRow.propTypes = {
  virtualRow: PropTypes.object.isRequired,
  columnCount: PropTypes.number.isRequired,
  rowStartIndex: PropTypes.number.isRequired,
  rowItems: PropTypes.array.isRequired,
  variant: PropTypes.string,
  gap: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  dynamicMeasurement: PropTypes.bool,
  measureElement: PropTypes.func,
};

/**
 * Headless Virtualized Responsive Grid Component.
 *
 * Efficiently virtualizes large lists and infinite scroll grids by chunking items
 * into responsive rows and only mounting visible DOM elements.
 */
export default function VirtualGrid({
  items = [],
  renderItem,
  variant = 'poster',
  gap,
  className = '',
  scrollElementRef,
  scrollSelector = '.shell__content',
  estimateRowHeight,
  overscan = 8,
  endReachedThreshold = 6,
  onEndReached,
  hasMore = false,
  isLoadingMore = false,
  dynamicMeasurement = false,
}) {
  const containerRef = useRef(null);
  const { measuredWidth } = useVirtualGridMeasurement(containerRef);

  const columnCount = useMemo(() => {
    return getGridColumnCount(variant, measuredWidth);
  }, [variant, measuredWidth]);

  const rowCount = columnCount > 0 ? Math.ceil((items?.length || 0) / columnCount) : 0;

  const cachedScrollElementRef = useRef(null);

  useLayoutEffect(() => {
    if (scrollElementRef?.current) {
      cachedScrollElementRef.current = scrollElementRef.current;
      return;
    }
    if (scrollSelector && typeof document !== 'undefined') {
      const el = document.querySelector(scrollSelector);
      if (el) {
        cachedScrollElementRef.current = el;
        return;
      }
    }
    if (containerRef.current && typeof window !== 'undefined') {
      let parent = containerRef.current.parentElement;
      while (parent && parent !== document.body && parent !== document.documentElement) {
        const style = window.getComputedStyle(parent);
        const overflowY = style.overflowY || style.overflow;
        if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
          cachedScrollElementRef.current = parent;
          return;
        }
        parent = parent.parentElement;
      }
    }
    cachedScrollElementRef.current = typeof window !== 'undefined' ? window : null;
  }, [scrollElementRef, scrollSelector]);

  const getScrollElement = useCallback(() => {
    if (scrollElementRef?.current) {
      return scrollElementRef.current;
    }
    if (cachedScrollElementRef.current && (cachedScrollElementRef.current === window || cachedScrollElementRef.current.isConnected)) {
      return cachedScrollElementRef.current;
    }
    if (scrollSelector && typeof document !== 'undefined') {
      const el = document.querySelector(scrollSelector);
      if (el) {
        cachedScrollElementRef.current = el;
        return el;
      }
    }
    return typeof window !== 'undefined' ? window : null;
  }, [scrollElementRef, scrollSelector]);

  const rowHeight = useMemo(() => {
    if (estimateRowHeight) return estimateRowHeight;
    return calculateRowHeight(variant, measuredWidth, columnCount, gap);
  }, [estimateRowHeight, variant, measuredWidth, columnCount, gap]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement,
    estimateSize: () => rowHeight,
    overscan,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  useLayoutEffect(() => {
    if (!onEndReached || !hasMore || isLoadingMore || !virtualRows.length) return;
    const lastItem = virtualRows[virtualRows.length - 1];
    if (lastItem && lastItem.index >= rowCount - endReachedThreshold) {
      onEndReached();
    }
  }, [virtualRows, onEndReached, hasMore, isLoadingMore, rowCount, endReachedThreshold]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`${styles['virtual-grid-wrapper']} ${className}`.trim()}
      data-scrolling={rowVirtualizer.isScrolling || undefined}
      /* eslint-disable-next-line react/forbid-dom-props */
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const rowStartIndex = virtualRow.index * columnCount;
        const rowEndIndex = Math.min(rowStartIndex + columnCount, items.length);
        const rowItems = items.slice(rowStartIndex, rowEndIndex);

        return (
          <VirtualGridRow
            key={virtualRow.key}
            virtualRow={virtualRow}
            columnCount={columnCount}
            rowStartIndex={rowStartIndex}
            rowItems={rowItems}
            variant={variant}
            gap={gap}
            renderItem={renderItem}
            dynamicMeasurement={dynamicMeasurement}
            measureElement={rowVirtualizer.measureElement}
          />
        );
      })}
    </div>
  );
}

VirtualGrid.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  variant: PropTypes.string,
  gap: PropTypes.string,
  className: PropTypes.string,
  scrollElementRef: PropTypes.shape({ current: PropTypes.any }),
  scrollSelector: PropTypes.string,
  estimateRowHeight: PropTypes.number,
  overscan: PropTypes.number,
  endReachedThreshold: PropTypes.number,
  onEndReached: PropTypes.func,
  hasMore: PropTypes.bool,
  isLoadingMore: PropTypes.bool,
  dynamicMeasurement: PropTypes.bool,
};
