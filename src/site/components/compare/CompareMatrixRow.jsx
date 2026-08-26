import PropTypes from 'prop-types';
import CompareStatusCell from './CompareStatusCell';
import styles from './CompareMatrixRow.module.css';


export default function CompareMatrixRow({ row, t }) {
  return (
    <tr>
      <td className={styles['feature-name']}>{row.feature}</td>
      <td>
        <CompareStatusCell
          value={row.swaya}
          note={row.swayaNote}
          t={t}
          isSwaya
        />
      </td>
      <td>
        <CompareStatusCell
          value={row.competitor}
          note={row.competitorNote}
          t={t}
        />
      </td>
    </tr>
  );
}

CompareMatrixRow.propTypes = {
  row: PropTypes.shape({
    feature: PropTypes.string.isRequired,
    swaya: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
    swayaNote: PropTypes.string,
    competitor: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
    competitorNote: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
};
