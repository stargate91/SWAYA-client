import PropTypes from 'prop-types';
import { CheckCircle2 } from 'lucide-react';
import styles from './ShowcaseBenefitsList.module.css';


export default function ShowcaseBenefitsList({
  benefits = [],
  integrationsLabel = null,
  integrations = [],
}) {
  return (
    <>
      <ul className={styles['benefits-list']}>
        {benefits.map((benefit, idx) => (
          <li key={idx} className={styles['benefit-item']}>
            <CheckCircle2 size={16} className={styles['benefit-icon']} />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      {integrations && integrations.length > 0 && (
        <div className={styles.integrations}>
          {integrationsLabel && (
            <span className={styles['integrations-label']}>
              {integrationsLabel}
            </span>
          )}
          <div className={styles['integrations-tags']}>
            {integrations.map((badge) => (
              <span key={badge} className={styles['integration-badge']}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

ShowcaseBenefitsList.propTypes = {
  benefits: PropTypes.arrayOf(PropTypes.string),
  integrationsLabel: PropTypes.string,
  integrations: PropTypes.arrayOf(PropTypes.string),
};

