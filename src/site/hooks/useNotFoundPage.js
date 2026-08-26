import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import { usePageMeta } from './usePageMeta';
import { useLocalizedUrls } from './useLocalizedUrls';
import { getDocPath } from '../lib/urlUtils';
import { NOT_FOUND_QUICK_LINKS } from '../data/notFoundConfig';

/**
 * Hook providing 404 page state, SEO `noindex` robots meta, quick navigation links, and back handler.
 * @returns {{
 *   t: Function,
 *   locale: string,
 *   prefix: string,
 *   homeUrl: string,
 *   goBack: () => void,
 *   quickLinks: Array<{ slug: string, to: string, label: string }>,
 *   popularGuidesTitle: string
 * }}
 */
export function useNotFoundPage() {
  const { t, locale } = useTranslation();
  const { prefix, homeUrl } = useLocalizedUrls();
  const navigate = useNavigate();

  usePageMeta({
    title: '404 - Page Not Found | SWAYA',
    description: 'The page or guide you are looking for does not exist on SWAYA.',
    locale: locale || 'en',
    ogType: 'website',
    robots: 'noindex, follow',
  });

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const quickLinks = useMemo(
    () =>
      NOT_FOUND_QUICK_LINKS.map((link) => ({
        slug: link.slug,
        to: getDocPath(link.slug, prefix),
        label: t(link.labelKey, { defaultValue: link.defaultLabel }),
      })),
    [prefix, t]
  );

  const popularGuidesTitle = t('docs.ui.popularGuides', { defaultValue: 'Popular Guides' });

  return {
    t,
    locale,
    prefix,
    homeUrl,
    goBack,
    quickLinks,
    popularGuidesTitle,
  };
}

export default useNotFoundPage;
