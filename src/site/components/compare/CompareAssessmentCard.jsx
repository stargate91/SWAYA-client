import PropTypes from 'prop-types';
import { useCompareAssessment } from '../../hooks/useCompareAssessment';
import styles from './CompareAssessment.module.css';

export default function CompareAssessmentCard({ title, points = [], isSwaya = false }) {
  const {
    title: cardTitle,
    points: cardPoints,
    cardClassName,
    iconClassName,
    Icon,
  } = useCompareAssessment({ title, points, isSwaya });

  return (
    <div className={cardClassName}>
      <div className={styles['card-header']}>
        <h3 className={styles['card-title']}>{cardTitle}</h3>
      </div>
      <ul className={styles.list}>
        {cardPoints.map((point, idx) => (
          <li key={idx} className={styles.item}>
            <Icon
              size={16}
              className={iconClassName}
              aria-hidden="true"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

CompareAssessmentCard.propTypes = {
  title: PropTypes.string.isRequired,
  points: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSwaya: PropTypes.bool,
};

