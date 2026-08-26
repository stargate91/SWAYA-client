import PropTypes from 'prop-types';
import styles from './SpecCard.module.css';
import Text from '../Text';

export default function SpecCard({ icon, label, value, span, fullWidth = false, className = '', ...props }) {
  const cardClasses = [
    styles.card,
    fullWidth && styles['full-width'],
    icon && styles['has-icon'],
    span === 2 && styles['span-2'],
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
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

SpecCard.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.node,
  value: PropTypes.node,
  span: PropTypes.number,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

