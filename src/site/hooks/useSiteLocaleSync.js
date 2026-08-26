import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import { SUPPORTED_LOCALES, LOCALE_PATH_REGEX } from '../data/localesConfig';

export { SUPPORTED_LOCALES };

/**
 * Synchronizes body classes and active i18n locale based on URL route parameters and pathname.
 */
export function useSiteLocaleSync() {
  const location = useLocation();
  const { lang } = useParams();
  const { setLocale, locale } = useTranslation();

  useEffect(() => {
    document.body.classList.add('landing-page-body');
    return () => {
      document.body.classList.remove('landing-page-body');
    };
  }, []);

  // Synchronize locale with active subpath / parameter
  useEffect(() => {
    if (lang && SUPPORTED_LOCALES.includes(lang.toLowerCase())) {
      setLocale(lang.toLowerCase());
    } else {
      const match = location.pathname.match(LOCALE_PATH_REGEX);
      setLocale(match ? match[1].toLowerCase() : 'en');
    }
  }, [location.pathname, lang, setLocale]);

  return { locale, setLocale };
}

export default useSiteLocaleSync;

