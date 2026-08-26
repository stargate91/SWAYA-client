import PropTypes from 'prop-types';
import styles from './CompareMatrixHeader.module.css';


export default function CompareMatrixHeader({ competitorName, t }) {
  return (
    <div className={styles.header}>
      <h2 id="matrix-heading" className={styles.title}>
        {t('landing.compare.featureBreakdown', {
          defaultValue: 'Detailed Feature Breakdown',
        })}
      </h2>
      <p className={styles.subtitle}>
        {t('landing.compare.featureSubtitle', {
          name: competitorName,
          defaultValue: `Side-by-side technical and workflow comparison between SWAYA and ${competitorName}.`,
        })}
      </p>
    </div>
  );
}

CompareMatrixHeader.propTypes = {
  competitorName: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};
