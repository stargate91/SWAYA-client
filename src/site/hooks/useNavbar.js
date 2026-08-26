import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import { STRIPE_CHECKOUT_URL } from '../data/siteConfig';
import { getSiteNavLinks } from '../data/siteNavConfig';
import { trackConversion } from '../lib/analytics';
import { useLanguageSwitcher } from './useLanguageSwitcher';
import { useLocalizedUrls } from './useLocalizedUrls';
import { useScrollThreshold } from './useScrollThreshold';
import { useMobileDrawer } from './useMobileDrawer';

/**
 * Main hook managing navbar state, scroll elevation, active links, language switching, and mobile drawer toggles.
 * @returns {{
 *   t: Function,
 *   locale: string,
 *   brandLabel: string,
 *   buyLabel: string,
 *   homeUrl: string,
 *   navLinks: Array<object>,
 *   isScrolled: boolean,
 *   mobileMenuOpen: boolean,
 *   toggleMobileMenu: () => void,
 *   closeMobileMenu: () => void,
 *   scrollToTop: () => void,
 *   languageOptions: Array<{ value: string, label: string }>,
 *   handleLanguageChange: (e: any) => void,
 *   checkoutUrl: string,
 *   handleBuyClick: () => void
 * }}
 */
export function useNavbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { locale, handleLanguageChange, languageOptions } = useLanguageSwitcher();
  const localizedUrls = useLocalizedUrls();
  const { isScrolled } = useScrollThreshold(20);
  const {
    isOpen: mobileMenuOpen,
    toggle: toggleMobileMenu,
    close: closeMobileMenu,
  } = useMobileDrawer();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBuyClick = useCallback(() => {
    trackConversion({ source: 'navbar' });
  }, []);

  const navLinks = useMemo(
    () =>
      getSiteNavLinks({
        pathname: location.pathname,
        urls: localizedUrls,
        t,
      }),
    [location.pathname, localizedUrls, t]
  );

  const brandLabel = t('landing.navbar.brand');
  const buyLabel = t('landing.navbar.buy');

  return {
    t,
    locale,
    brandLabel,
    buyLabel,
    homeUrl: localizedUrls.homeUrl,
    navLinks,
    isScrolled,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    scrollToTop,
    languageOptions,
    handleLanguageChange,
    checkoutUrl: STRIPE_CHECKOUT_URL,
    handleBuyClick,
  };
}

export default useNavbar;

