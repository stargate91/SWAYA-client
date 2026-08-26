import PropTypes from 'prop-types';
import styles from './RatingCard.module.css';
import Text from '../Text';

export default function RatingCard({ logoSrc, logoAlt, value, size = 'sm', fullWidth = false, className = '', ...props }) {
  const cardClasses = [
    styles.card,
    fullWidth && styles['full-width'],
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      {...props}
    >
      {logoSrc && (
        <img
          src={logoSrc}
          alt={logoAlt || ''}
          className={styles.logo}
          data-size={size}
        />
      )}
      {value && (
        <Text variant="small" weight="bold">
          {value}
        </Text>
      )}
    </div>
  );
}

RatingCard.propTypes = {
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  value: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};
