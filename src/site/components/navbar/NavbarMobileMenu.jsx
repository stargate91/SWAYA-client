import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dropdown from '@/ui/Dropdown';
import { useNavbarMobileMenu } from '../../hooks/useNavbarMobileMenu';
import styles from './NavbarMobileMenu.module.css';


export default function NavbarMobileMenu({
  mobileMenuOpen,
  navLinks = [],
  locale,
  languageOptions,
  onLanguageChange,
  onClose,
}) {
  const { handleKeyDown } = useNavbarMobileMenu({ mobileMenuOpen, onClose });

  return (
    <nav
      id="mobile-navigation-drawer"
      role="navigation"
      aria-label="Mobile Navigation"
      aria-hidden={!mobileMenuOpen}
      className={`${styles['mobile-menu']} ${mobileMenuOpen ? styles['mobile-menu--open'] : ''}`}
      onKeyDown={handleKeyDown}
    >
      {navLinks.map((item) => (
        <Link
          key={item.key}
          to={item.to}
          onClick={onClose}
          className={`${styles.link} ${item.isActive ? styles['link--active'] : ''}`}
        >
          {item.label}
        </Link>
      ))}

      <div className={styles['mobile-lang-wrapper']}>
        <Dropdown
          options={languageOptions}
          value={locale || 'en'}
          onChange={onLanguageChange}
          size="sm"
          width="full"
        />
      </div>
    </nav>
  );
}

NavbarMobileMenu.propTypes = {
  mobileMenuOpen: PropTypes.bool.isRequired,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
    })
  ),
  locale: PropTypes.string,
  languageOptions: PropTypes.array.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

