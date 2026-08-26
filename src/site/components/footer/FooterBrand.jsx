import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import Badge from '@/ui/Badge';
import styles from './FooterBrand.module.css';

export default function FooterBrand({ homeUrl, brandLabel, tagline, badgeText }) {
  return (
    <div className={styles['brand-col']}>
      <Link
        to={homeUrl}
        className={styles['brand-link']}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={brandLabel}
      >
        <span className={styles['logo-text']}>{brandLabel}</span>
      </Link>

      <p className={styles['brand-tagline']}>{tagline}</p>

      <Badge tone="neutral" size="sm" leftIcon={<ShieldCheck size={13} aria-hidden="true" />}>
        {badgeText}
      </Badge>
    </div>
  );
}

FooterBrand.propTypes = {
  homeUrl: PropTypes.string.isRequired,
  brandLabel: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  badgeText: PropTypes.string.isRequired,
};
