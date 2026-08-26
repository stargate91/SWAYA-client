import PropTypes from 'prop-types';
import styles from './WatchStatsCard.module.css';
import Text from '../Text';

export default function WatchStatsCard({ icon, label, value, children, className = '', ...props }) {
  return (
    <div
      className={`${styles.card} ${className}`.trim()}
      {...props}
    >
      {icon && <div className={styles['icon-wrapper']}>{icon}</div>}
      <div className={styles.content}>
        {label && (
          <Text variant="caption" color="muted" weight="bold" uppercase>
            {label}
          </Text>
        )}
        {value && (
          <Text variant="small" color="primary" weight="semibold">
            {value}
          </Text>
        )}
        {children}
      </div>
    </div>
  );
}

WatchStatsCard.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.node,
  value: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};
