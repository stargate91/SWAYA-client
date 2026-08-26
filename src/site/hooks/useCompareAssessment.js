import { useMemo } from 'react';
import { Check } from 'lucide-react';
import styles from '../components/compare/CompareAssessment.module.css';

/**
 * Custom hook to prepare formatted styling and icon properties for CompareAssessmentCard.
 * @param {object} params
 * @param {string} params.title - Card title
 * @param {string[]} [params.points] - List of points/reasons
 * @param {boolean} [params.isSwaya] - Whether this card represents SWAYA
 * @returns {object} Formatted card properties
 */
export function useCompareAssessment({ title, points = [], isSwaya = false }) {
  return useMemo(() => {
    const cardClassName = `${styles.card} ${isSwaya ? styles['card--swaya'] : ''}`.trim();
    const iconClassName = isSwaya ? styles['icon--swaya'] : styles['icon--competitor'];

    return {
      title,
      points,
      isSwaya,
      cardClassName,
      iconClassName,
      Icon: Check,
    };
  }, [title, points, isSwaya]);
}

export default useCompareAssessment;
