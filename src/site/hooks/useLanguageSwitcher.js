import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import {
  LANGUAGE_OPTIONS,
  VALID_LOCALES,
  isValidLocale,
  getLocalizedPath,
} from '../data/localesConfig';

export { LANGUAGE_OPTIONS, VALID_LOCALES };

/**
 * Hook providing language selection state, route-preserving locale switching handler, and supported language options.
 * @returns {{
 *   locale: string,
 *   setLocale: (locale: string) => void,
 *   handleLanguageChange: (eventOrLocale: string|object) => void,
 *   languageOptions: Array<{ value: string, label: string }>
 * }}
 */
export function useLanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = useCallback(
    (eventOrLocale) => {
      let newLocale = eventOrLocale;
      if (eventOrLocale && typeof eventOrLocale === 'object') {
        newLocale = eventOrLocale.target?.value ?? eventOrLocale.value ?? '';
      }

      if (!newLocale || typeof newLocale !== 'string') return;
      newLocale = newLocale.toLowerCase().trim();

      if (!isValidLocale(newLocale)) return;
      if (newLocale === locale) return;

      setLocale(newLocale);

      const targetPath = getLocalizedPath(location.pathname, newLocale);
      navigate(targetPath);
    },
    [locale, location.pathname, navigate, setLocale]
  );

  const safeLocale = isValidLocale(locale) ? locale : 'en';

  return {
    locale: safeLocale,
    setLocale,
    handleLanguageChange,
    languageOptions: LANGUAGE_OPTIONS,
  };
}

export default useLanguageSwitcher;

