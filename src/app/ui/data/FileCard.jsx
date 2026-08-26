import PropTypes from 'prop-types';
import styles from './FileCard.module.css';

export default function FileCard({ children, fullWidth = false, className = '', ...props }) {
  const cardClasses = [
    styles.card,
    fullWidth && styles['full-width'],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}

FileCard.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};
