import PropTypes from 'prop-types';
import CompareDeepDiveCard from './CompareDeepDiveCard';
import styles from './CompareDeepDives.module.css';

export default function CompareDeepDives({ comparison, t }) {
  return (
    <section className={styles.section} aria-labelledby="deepdives-heading">
      <div className={styles.header}>
        <h2 id="deepdives-heading" className={styles.title}>
          {t('landing.compare.whySwitch', {
            defaultValue: 'Why Users Switch to SWAYA',
          })}
        </h2>
        <p className={styles.subtitle}>
          {t('landing.compare.whySwitchSubtitle', {
            defaultValue:
              'Key architectural differences designed for media collectors and desktop power users.',
          })}
        </p>
      </div>

      <div className={styles.grid}>
        {comparison.deepDives.map((dive, idx) => (
          <CompareDeepDiveCard
            key={dive.title || idx}
            dive={dive}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}

CompareDeepDives.propTypes = {
  comparison: PropTypes.shape({
    deepDives: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        iconKey: PropTypes.string,
        iconType: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
};
