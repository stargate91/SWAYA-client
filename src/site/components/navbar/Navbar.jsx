import { Link } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';
import styles from './Navbar.module.css';
import Button from '@/ui/Button';
import Dropdown from '@/ui/Dropdown';
import { useNavbar } from '../../hooks/useNavbar';
import NavbarMobileMenu from './NavbarMobileMenu';

export default function Navbar() {
  const {
    t,
    locale,
    brandLabel,
    buyLabel,
    homeUrl,
    navLinks,
    isScrolled,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    scrollToTop,

    languageOptions,
    handleLanguageChange,
    checkoutUrl,
    handleBuyClick,
  } = useNavbar();

  return (
    <header role="banner" className={`${styles.navbar} ${isScrolled ? styles['navbar--scrolled'] : ''}`}>
      <div className={styles.container}>
        {/* Brand */}
        <Link
          to={homeUrl}
          className={styles.brand}
          onClick={scrollToTop}
          aria-label={brandLabel}
        >
          <span className={styles['logo-text']}>{brandLabel}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav role="navigation" className={styles.nav} aria-label="Main Navigation">
          {navLinks.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className={`${styles.link} ${item.isActive ? styles['link--active'] : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions & Language Switcher */}
        <div className={styles.actions}>
          <Dropdown
            options={languageOptions}
            value={locale || 'en'}
            onChange={handleLanguageChange}
            size="sm"
            width="sm"
            className={styles['lang-dropdown']}
          />

          <Button
            as="a"
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            onClick={handleBuyClick}
            aria-label={`${buyLabel} (opens in new tab)`}
            rightIcon={<ExternalLink size={13} aria-hidden="true" />}
          >
            {buyLabel}
          </Button>

          <button
            type="button"
            className={styles['menu-button']}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? t('landing.navbar.closeMenu') : t('landing.navbar.openMenu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <NavbarMobileMenu
        mobileMenuOpen={mobileMenuOpen}
        navLinks={navLinks}
        locale={locale}
        languageOptions={languageOptions}
        onLanguageChange={handleLanguageChange}
        onClose={closeMobileMenu}
      />
    </header>

  );
}
