import { useRef, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from '@/ui/icons';
import { useScrollRowArrows } from './useScrollRowArrows';
import styles from './ScrollRow.module.css';

const ScrollRow = forwardRef(({
  children,
  className = '',
  containerClassName = '',
  showArrows = true,
  enableWheelScroll = false,
  arrowsLayout = 'overlay', // 'overlay' | 'column'
  size = 'default', // 'default' | 'sm'
  hasMore = false,
  onLoadMore = null,
  onReachEnd = null,
  onScroll,
}, ref) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useImperativeHandle(ref, () => scrollRef.current);

  const { showLeft, showRight, updateArrows, scroll } = useScrollRowArrows({
    scrollRef,
    containerRef,
    hasMore,
    children,
    enableWheelScroll,
    onLoadMore,
    onReachEnd,
  });

  const containerClass = `
    ${styles.container}
    ${styles[`container--layout-${arrowsLayout}`]}
    ${styles[`container--size-${size}`]}
    ${containerClassName}
  `.trim();

  const leftHidden = !showLeft || !showArrows;
  const rightHidden = !showRight || !showArrows;
  const arrowIconSize = size === 'sm' ? 12 : 20;

  return (
    <div ref={containerRef} className={containerClass}>
      {showArrows && (
        <button
          type="button"
          className={`ui-carousel-arrow ${styles.arrow} ${styles['is-left']} ${leftHidden ? styles['is-hidden'] : ''}`.trim()}
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={arrowIconSize} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={(e) => {
          updateArrows();
          onScroll?.(e);
        }}
        className={`${styles.track} no-scrollbar ${className}`.trim()}
      >
        {children}
      </div>

      {showArrows && (
        <button
          type="button"
          className={`ui-carousel-arrow ${styles.arrow} ${styles['is-right']} ${rightHidden ? styles['is-hidden'] : ''}`.trim()}
          onClick={() => scroll('right')}
        >
          <ChevronRight size={arrowIconSize} />
        </button>
      )}
    </div>
  );
});

ScrollRow.displayName = 'ScrollRow';

ScrollRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  showArrows: PropTypes.bool,
  enableWheelScroll: PropTypes.bool,
  arrowsLayout: PropTypes.oneOf(['overlay', 'column']),
  size: PropTypes.oneOf(['default', 'sm']),
  hasMore: PropTypes.bool,
  onLoadMore: PropTypes.func,
  onReachEnd: PropTypes.func,
  onScroll: PropTypes.func,
};

export default ScrollRow;
