import PropTypes from 'prop-types';
import styles from './HeroGuaranteeItem.module.css';


export default function HeroGuaranteeItem({ item }) {
  const Icon = item.icon;

  return (
    <span className={styles['guarantee-item']}>
      {Icon && <Icon size={14} className={styles['guarantee-icon']} aria-hidden="true" />}
      <span>{item.label}</span>
    </span>
  );
}

HeroGuaranteeItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.elementType,
    iconKey: PropTypes.string,
    label: PropTypes.string.isRequired,
  }).isRequired,
};
