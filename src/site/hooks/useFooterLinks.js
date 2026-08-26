import { useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { useLocalizedUrls } from './useLocalizedUrls';
import { STRIPE_CHECKOUT_URL } from '../data/siteConfig';
import {
  buildNavigationLinks,
  buildComparisonLinks,
  buildDocumentationLinks,
} from '../lib/navigation/footerLinkBuilders';

/**
 * Hook providing localized footer navigation links, comparison lists, documentation references, and copyright strings.
 * @returns {{
 *   t: Function,
 *   locale: string,
 *   brandLabel: string,
 *   buyLabel: string,
 *   checkoutUrl: string,
 *   copyrightText: string,
 *   madeWithLoveText: string,
 *   forCollectorsText: string,
 *   navigationLinks: Array<object>,
 *   comparisonLinks: Array<object>,
 *   documentationLinks: Array<object>
 * }}
 */
export function useFooterLinks() {
  const { t, locale } = useTranslation();
  const { prefix, homeUrl, docsUrl, changelogUrl, helpUrl, compareUrl, privacyUrl, termsUrl } = useLocalizedUrls();

  const brandLabel = t('landing.navbar.brand');
  const discordLabel = t('landing.footer.links.discord');
  const contactLabel = t('landing.footer.links.contact');
  const helpLabel = t('landing.navbar.help', { defaultValue: 'Help & Support' });
  const buyLabel = t('landing.footer.buyLicense');
  const privacyLabel = t('landing.footer.links.privacy', { defaultValue: 'Privacy Policy' });
  const termsLabel = t('landing.footer.links.terms', { defaultValue: 'Terms & Refund Policy' });

  const currentYear = new Date().getFullYear().toString();
  const copyrightText = t('landing.footer.copyright', { year: currentYear });
  const madeWithLoveText = t('landing.footer.madeWithLove');
  const forCollectorsText = t('landing.footer.forCollectors', { defaultValue: 'for media collectors' });

  const navigationLinks = useMemo(
    () =>
      buildNavigationLinks({
        homeUrl,
        docsUrl,
        changelogUrl,
        helpUrl,
        helpLabel,
        privacyUrl,
        privacyLabel,
        termsUrl,
        termsLabel,
        discordLabel,
        contactLabel,
        t,
      }),
    [homeUrl, docsUrl, changelogUrl, helpUrl, helpLabel, privacyUrl, privacyLabel, termsUrl, termsLabel, discordLabel, contactLabel, t]
  );

  const comparisonLinks = useMemo(
    () => buildComparisonLinks({ prefix, compareUrl, t }),
    [prefix, compareUrl, t]
  );

  const documentationLinks = useMemo(
    () => buildDocumentationLinks({ prefix, docsUrl, t }),
    [prefix, docsUrl, t]
  );

  return {
    t,
    locale,
    prefix,
    homeUrl,
    docsUrl,
    changelogUrl,
    helpUrl,
    compareUrl,
    privacyUrl,
    termsUrl,
    privacyLabel,
    termsLabel,
    checkoutUrl: STRIPE_CHECKOUT_URL,
    brandLabel,
    buyLabel,
    copyrightText,
    madeWithLoveText,
    forCollectorsText,
    navigationLinks,
    comparisonLinks,
    documentationLinks,
  };
}

export default useFooterLinks;


