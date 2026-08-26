import { useTranslation } from '@/providers/LanguageContext';
import { useSiteLocaleSync } from './useSiteLocaleSync';
import { useScrollToHash } from './useScrollToHash';
import { useAnalytics } from './useAnalytics';

/**
 * Orchestration hook for SiteLayout handling locale synchronization,
 * hash scrolling on page load/navigation, page analytics, and layout strings.
 * @returns {object} Layout helper properties
 */
export function useSiteLayout() {
  const { t, locale } = useTranslation();
  useSiteLocaleSync();
  useScrollToHash();
  useAnalytics(locale);

  return {
    t,
    locale,
    skipToContentLabel: t('docs.ui.skipToContent', { defaultValue: 'Skip to main content' }),
  };
}

export default useSiteLayout;
