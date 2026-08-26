import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import styles from './FooterBottomBar.module.css';

export default function FooterBottomBar({
  copyrightText,
  madeWithLoveText,
  forCollectorsText,
  privacyUrl,
  termsUrl,
  privacyLabel,
  termsLabel,
}) {
  return (
    <div className={styles['bottom-bar']}>
      <p>{copyrightText}</p>

      {(privacyUrl || termsUrl) && (
        <div className={styles['legal-links']}>
          {privacyUrl && (
            <Link to={privacyUrl} className={styles['legal-link']}>
              {privacyLabel || 'Privacy Policy'}
            </Link>
          )}
          {privacyUrl && termsUrl && <span className={styles.divider} aria-hidden="true">•</span>}
          {termsUrl && (
            <Link to={termsUrl} className={styles['legal-link']}>
              {termsLabel || 'Terms & Refund Policy'}
            </Link>
          )}
        </div>
      )}

      <p className={styles.love}>
        {madeWithLoveText}{' '}
        <Heart className={styles.heart} aria-hidden="true" />{' '}
        {forCollectorsText}
      </p>
    </div>
  );
}

FooterBottomBar.propTypes = {
  copyrightText: PropTypes.string.isRequired,
  madeWithLoveText: PropTypes.string.isRequired,
  forCollectorsText: PropTypes.string.isRequired,
  privacyUrl: PropTypes.string,
  termsUrl: PropTypes.string,
  privacyLabel: PropTypes.string,
  termsLabel: PropTypes.string,
};
