import PropTypes from 'prop-types';
import styles from './GenderSilhouette.module.css';

/* eslint-disable-next-line react-refresh/only-export-components */
export function resolveGenderType(gender) {
  if (gender === 1 || gender === '1') return 'female';
  if (gender === 2 || gender === '2') return 'male';
  return 'other';
}

export default function GenderSilhouette({
  gender,
  isLinking = false,
  className = '',
}) {
  const type = resolveGenderType(gender);

  return (
    <div
      className={`${styles.silhouette} ${styles[`silhouette--${type}`]} ${isLinking ? styles['is-linking'] : ''} ${className}`.trim()}
      aria-hidden="true"
    />
  );
}

GenderSilhouette.propTypes = {
  gender: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isLinking: PropTypes.bool,
  className: PropTypes.string,
};

