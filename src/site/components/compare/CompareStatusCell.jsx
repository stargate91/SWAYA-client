import PropTypes from 'prop-types';
import { useCompareStatusCell } from '../../hooks/useCompareStatusCell';
import styles from './CompareStatusCell.module.css';


export default function CompareStatusCell({ value, note, t, isSwaya = false }) {
  const { variantClassKey, icon: Icon, label } = useCompareStatusCell({ value, isSwaya, t });

  return (
    <div className={styles.cell}>
      <span className={`${styles['status-badge']} ${styles[variantClassKey]}`}>
        <Icon size={15} aria-hidden="true" />
        <span>{label}</span>
      </span>
      {note && <span className={styles.note}>{note}</span>}
    </div>
  );
}

CompareStatusCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  note: PropTypes.string,
  t: PropTypes.func,
  isSwaya: PropTypes.bool,
};

