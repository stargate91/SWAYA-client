import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LanguageContext } from './LanguageContext';
import { useTranslationEngine } from '@/lib/i18n';

export function LanguageProvider({ children }) {
  const { locale, setLocale, t } = useTranslationEngine({ defaultLocale: 'en' });

  // Dynamically synchronize <html lang="..."> for SEO and screen readers
  useEffect(() => {
    if (locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node,
};

export default LanguageProvider;
