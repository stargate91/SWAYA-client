import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useFooterLanguageSelector } from '../../hooks/useFooterLanguageSelector';
import styles from './FooterLanguageSelector.module.css';

export default function FooterLanguageSelector({ locale }) {
  const { label, languageItems } = useFooterLanguageSelector(locale);

  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.list}>
        {languageItems.map((lang, idx) => (
          <Fragment key={lang.code}>
            {idx > 0 && <span className={styles.divider} aria-hidden="true" />}
            <Link
              to={lang.path}
              className={`${styles.link} ${lang.isActive ? styles['link-active'] : ''}`}
            >
              {lang.label}
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

FooterLanguageSelector.propTypes = {
  locale: PropTypes.string,
};
