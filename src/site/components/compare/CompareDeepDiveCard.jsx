import PropTypes from 'prop-types';
import { useCompareDeepDive } from '../../hooks/useCompareDeepDive';
import styles from './CompareDeepDives.module.css';

export default function CompareDeepDiveCard({ dive, index = 0 }) {
  const { iconNode, title, description } = useCompareDeepDive(dive, index);

  return (
    <div className={styles.card}>
      <div className={styles.icon}>{iconNode}</div>
      <h3 className={styles['card-title']}>{title}</h3>
      <p className={styles['card-text']}>{description}</p>
    </div>
  );
}

CompareDeepDiveCard.propTypes = {
  dive: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    iconKey: PropTypes.string,
    iconType: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};
