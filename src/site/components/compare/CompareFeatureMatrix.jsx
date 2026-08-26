import PropTypes from 'prop-types';
import CompareMatrixHeader from './CompareMatrixHeader';
import CompareMatrixRow from './CompareMatrixRow';
import styles from './CompareFeatureMatrix.module.css';

export default function CompareFeatureMatrix({ comparison, t }) {
  return (
    <section className={styles.section} aria-labelledby="matrix-heading">
      <CompareMatrixHeader competitorName={comparison.name} t={t} />

      <div className={styles['table-wrapper']}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                {t('landing.compare.featureHeader', {
                  defaultValue: 'Feature / Capability',
                })}
              </th>
              <th>{t('landing.navbar.brand', { defaultValue: 'SWAYA' })}</th>
              <th>{comparison.name}</th>
            </tr>
          </thead>
          <tbody>
            {comparison.matrix.map((row, idx) => (
              <CompareMatrixRow
                key={row.feature || idx}
                row={row}
                t={t}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

CompareFeatureMatrix.propTypes = {
  comparison: PropTypes.shape({
    name: PropTypes.string.isRequired,
    matrix: PropTypes.arrayOf(
      PropTypes.shape({
        feature: PropTypes.string.isRequired,
        swaya: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
        swayaNote: PropTypes.string,
        competitor: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
        competitorNote: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

