import PropTypes from 'prop-types';
import CompareAssessmentCard from './CompareAssessmentCard';
import styles from './CompareAssessment.module.css';

export default function CompareAssessment({ comparison, t }) {
  return (
    <section className={styles.section} aria-labelledby="assessment-heading">
      <div className={styles.header}>
        <h2 id="assessment-heading" className={styles.title}>
          {t('landing.compare.honestComparison', {
            defaultValue: 'Honest Comparison: Which is Right for You?',
          })}
        </h2>
        <p className={styles.subtitle}>
          {t('landing.compare.honestSubtitle', {
            defaultValue:
              'Every tool has its strengths. Here is an honest breakdown to help you decide.',
          })}
        </p>
      </div>

      <div className={styles.grid}>
        <CompareAssessmentCard
          title={t('landing.compare.chooseCompetitor', {
            name: comparison.name,
            defaultValue: `Choose ${comparison.name} if...`,
          })}
          points={comparison.whenToChooseCompetitor}
        />

        <CompareAssessmentCard
          title={t('landing.compare.chooseSwaya', {
            defaultValue: 'Choose SWAYA if...',
          })}
          points={comparison.whenToChooseSwaya}
          isSwaya
        />
      </div>
    </section>
  );
}


CompareAssessment.propTypes = {
  comparison: PropTypes.shape({
    name: PropTypes.string.isRequired,
    whenToChooseCompetitor: PropTypes.arrayOf(PropTypes.string).isRequired,
    whenToChooseSwaya: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
};
