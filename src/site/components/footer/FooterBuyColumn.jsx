import PropTypes from 'prop-types';
import { ExternalLink } from 'lucide-react';
import Button from '@/ui/Button';
import styles from './FooterBuyColumn.module.css';

export default function FooterBuyColumn({ title, licenseDescription, buyLabel, checkoutUrl }) {
  return (
    <div className={styles.col}>
      <h3 className={styles['col-title']}>{title}</h3>
      <p className={styles['license-text']}>{licenseDescription}</p>
      <div className={styles['buy-button']}>
        <Button
          as="a"
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="sm"
          aria-label={`${buyLabel} (opens in new tab)`}
          rightIcon={<ExternalLink size={14} aria-hidden="true" />}
        >
          {buyLabel}
        </Button>
      </div>
    </div>
  );
}

FooterBuyColumn.propTypes = {
  title: PropTypes.string.isRequired,
  licenseDescription: PropTypes.string.isRequired,
  buyLabel: PropTypes.string.isRequired,
  checkoutUrl: PropTypes.string.isRequired,
};

