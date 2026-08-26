import PropTypes from 'prop-types';
import styles from './Divider.module.css';

export default function Divider({ orientation = 'horizontal', className = '', ...props }) {
  const isVertical = orientation === 'vertical';
  return (
    <hr
      className={`${styles.root} ${isVertical ? styles['root--vertical'] : ''} ${className}`.trim()}
      {...props}
    />
  );
}

Divider.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
};
