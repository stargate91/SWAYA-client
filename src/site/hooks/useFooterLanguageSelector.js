import { useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../data/localesConfig';

/**
 * Hook providing language options and active status for FooterLanguageSelector.
 */
export function useFooterLanguageSelector(currentLocale) {
  const { t, locale: ctxLocale } = useTranslation();
  const activeLocale = currentLocale || ctxLocale || 'en';

  const label = t('landing.footer.languages', { defaultValue: 'Languages:' });

  const languageItems = useMemo(
    () =>
      SUPPORTED_LANGUAGES.map((lang) => ({
        code: lang.code,
        label: lang.label,
        path: lang.path,
        isActive: activeLocale === lang.code,
      })),
    [activeLocale]
  );

  return {
    label,
    languageItems,
  };
}

export default useFooterLanguageSelector;
