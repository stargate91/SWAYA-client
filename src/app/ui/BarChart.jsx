import PropTypes from 'prop-types';
import Text from './Text';
import Tooltip from './Tooltip';
import styles from './BarChart.module.css';

/**
 * Reusable vertical Bar Chart visualization primitive.
 *
 * @param {object} props
 * @param {Array<Array<string | number>>} props.sortedData - Sorted 2D array of [label, value] pairs
 * @param {number} props.maxCount - The maximum value for rendering full height
 * @param {Function} props.T - Translation function
 * @param {Function} props.formatDecade - Helper function to format decade label
 */
export default function BarChart({ sortedData, maxCount, T, formatDecade }) {
  return (
    <div className={styles.container}>
      {sortedData.map(([label, count]) => {
        const heightPct = Math.max(5, (count / maxCount) * 100);
        const formattedLabel = formatDecade(label);
        const tooltipContent = T('statistics.stats.items_count_tooltip', { label: formattedLabel, count }) || `${formattedLabel}: ${count} files`;

        return (
          <Tooltip key={label} content={tooltipContent} delay={200}>
            <div className={styles['bar-wrapper']}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles['bar-svg']}>
                <rect
                  x="0"
                  y={100 - heightPct}
                  width="100"
                  height={heightPct}
                  rx="6"
                  ry="6"
                  className={styles['bar-rect']}
                />
              </svg>
              <div className={styles['label-wrapper']}>
                <Text variant="caption" color="secondary" weight="extrabold">
                  {formattedLabel}
                </Text>
              </div>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}

BarChart.propTypes = {
  sortedData: PropTypes.arrayOf(PropTypes.array).isRequired,
  maxCount: PropTypes.number.isRequired,
  T: PropTypes.func.isRequired,
  formatDecade: PropTypes.func.isRequired,
};
