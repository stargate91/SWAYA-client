import PropTypes from 'prop-types';
import styles from './CompareHeroPricingPill.module.css';


export default function CompareHeroPricingPill({
  swayaPricingLabel,
  swayaPricing,
  competitorPricingLabel,
  competitorPricing,
}) {
  return (
    <div className={styles['pricing-pill-container']}>
      <span>
        {swayaPricingLabel}
        <strong className={styles['pricing-swaya']}>{swayaPricing}</strong>
      </span>
      <span className={styles.divider} aria-hidden="true" />
      <span>
        {competitorPricingLabel}
        <span className={styles['pricing-competitor']}>
          {competitorPricing}
        </span>
      </span>
    </div>
  );
}

CompareHeroPricingPill.propTypes = {
  swayaPricingLabel: PropTypes.string.isRequired,
  swayaPricing: PropTypes.string.isRequired,
  competitorPricingLabel: PropTypes.string.isRequired,
  competitorPricing: PropTypes.string.isRequired,
};
