import FooterBrand from './FooterBrand';
import FooterNavColumn from './FooterNavColumn';
import FooterBuyColumn from './FooterBuyColumn';
import FooterBottomBar from './FooterBottomBar';
import FooterLanguageSelector from './FooterLanguageSelector';
import { useFooterLinks } from '../../hooks/useFooterLinks';
import styles from './Footer.module.css';

export default function Footer() {
  const {
    t,
    locale,
    homeUrl,
    checkoutUrl,
    brandLabel,
    buyLabel,
    copyrightText,
    madeWithLoveText,
    forCollectorsText,
    privacyUrl,
    termsUrl,
    privacyLabel,
    termsLabel,
    navigationLinks,
    comparisonLinks,
    documentationLinks,
  } = useFooterLinks();

  return (
    <footer role="contentinfo" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <FooterBrand
            homeUrl={homeUrl}
            brandLabel={brandLabel}
            tagline={t('landing.footer.tagline')}
            badgeText={t('landing.footer.badge')}
          />

          {/* Navigation Column */}
          <FooterNavColumn
            title={t('landing.footer.columns.navigation')}
            links={navigationLinks}
          />

          {/* Comparisons Column */}
          <FooterNavColumn
            title={t('landing.footer.columns.comparisons', { defaultValue: 'Comparisons' })}
            links={comparisonLinks}
          />

          {/* Documentation Column */}
          <FooterNavColumn
            title={t('landing.footer.columns.documentation')}
            links={documentationLinks}
          />

          {/* Buy / License Column */}
          <FooterBuyColumn
            title={t('landing.footer.columns.getSwaya')}
            licenseDescription={t('landing.footer.licenseDescription')}
            buyLabel={buyLabel}
            checkoutUrl={checkoutUrl}
          />
        </div>

        {/* Language Alternates */}
        <FooterLanguageSelector locale={locale || 'en'} />

        {/* Bottom Bar */}
        <FooterBottomBar
          copyrightText={copyrightText}
          madeWithLoveText={madeWithLoveText}
          forCollectorsText={forCollectorsText}
          privacyUrl={privacyUrl}
          termsUrl={termsUrl}
          privacyLabel={privacyLabel}
          termsLabel={termsLabel}
        />
      </div>
    </footer>
  );
}
