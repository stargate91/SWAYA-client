import PropTypes from 'prop-types';
import styles from './StatCard.module.css';
import Text from '../Text';

export default function StatCard({ icon, label, value, state = 'default', className = '', ...props }) {
  return (
    <div
      className={`${styles.card} ${className}`.trim()}
      data-state={state}
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
          <Text variant="small" weight="semibold">
            {value}
          </Text>
        )}
      </div>
    </div>
  );
}

StatCard.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.node,
  value: PropTypes.node,
  state: PropTypes.oneOf(['default', 'profit', 'loss', 'info']),
  className: PropTypes.string,
};
