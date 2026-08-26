import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Badge from '@/ui/Badge';
import { useCompareCard } from '../../hooks/useCompareCard';
import styles from './CompareCard.module.css';

export default function CompareCard({ comp, prefix, t }) {
  const {
    cardUrl,
    cardTitle,
    shortCategory,
    heroTagline,
    heroSubtitle,
    pricingText,
    viewComparisonLabel,
  } = useCompareCard(comp, prefix, t);

  return (
    <Link
      to={cardUrl}
      className={styles.card}
    >
      <div className={styles['card-top']}>
        <div className={styles['card-header']}>
          <h2 className={styles['card-title']}>
            {cardTitle}
          </h2>
          <Badge tone="neutral" size="sm">
            {shortCategory}
          </Badge>
        </div>

        <div className={styles['card-tagline']}>{heroTagline}</div>
        <p className={styles['card-desc']}>{heroSubtitle}</p>
      </div>

      <div className={styles['card-bottom']}>
        <span>{pricingText}</span>
        <span className={styles['card-action']}>
          {viewComparisonLabel}{' '}
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

CompareCard.propTypes = {
  comp: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shortCategory: PropTypes.string.isRequired,
    heroTagline: PropTypes.string,
    heroSubtitle: PropTypes.string,
    competitorPricing: PropTypes.string,
  }).isRequired,
  prefix: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};
