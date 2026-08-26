import { useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { getLocalizedUrls, getDocPath, getComparePath } from '../lib/urlUtils';

export { getDocPath, getComparePath, getLocalizedUrls };

/**
 * Hook computing prefix and localized root paths (homeUrl, docsUrl, changelogUrl, helpUrl, compareUrl) for a given locale.
 * @param {string} [customLocale] - Optional explicit locale override
 * @returns {{
 *   prefix: string,
 *   homeUrl: string,
 *   docsUrl: string,
 *   changelogUrl: string,
 *   helpUrl: string,
 *   compareUrl: string
 * }}
 */
export function useLocalizedUrls(customLocale) {
  const { locale: contextLocale } = useTranslation();
  const activeLocale = customLocale !== undefined ? customLocale : contextLocale;

  return useMemo(() => getLocalizedUrls(activeLocale), [activeLocale]);
}

export const useSiteUrls = useLocalizedUrls;

export default useLocalizedUrls;
