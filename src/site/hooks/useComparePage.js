import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import { usePageMeta } from './usePageMeta';
import { useLocalizedUrls } from './useLocalizedUrls';
import { getComparisonBySlug } from '../data/comparisonsData';
import { getCompareJsonLd } from '../schema/compareSchema';
import { getCompareRelatedDocs } from '../data/docQueries';
import { getDocPath } from '../lib/urlUtils';

/**
 * Hook providing comparison data, SEO schemas, translations, and navigation for a single comparison page.
 * @param {string} slug - Competitor comparison slug (e.g. 'filebot', 'plex')
 * @returns {{
 *   comparison: object|null,
 *   homeUrl: string,
 *   compareHubUrl: string,
 *   swayaPricingLabel: string,
 *   competitorPricingLabel: string,
 *   mainTitlePrefix: string,
 *   relatedDocs: Array<object>,
 *   t: Function,
 *   locale: string,
 *   prefix: string,
 *   onOpenDemo: Function
 * }}
 */
export function useComparePage(slug) {
  const navigate = useNavigate();
  const { t, locale } = useTranslation();
  const { prefix, homeUrl, compareUrl: compareHubUrl } = useLocalizedUrls();

  const comparison = useMemo(() => {
    return getComparisonBySlug(slug, locale);
  }, [slug, locale]);

  const currentUrl = `https://swaya.xyz${prefix}/compare/${slug || ''}`;
  const currentPath = `${prefix}/compare/${slug || ''}`;

  const jsonLd = useMemo(
    () => (comparison ? getCompareJsonLd({ comparison, locale, prefix, currentUrl }) : null),
    [comparison, locale, prefix, currentUrl]
  );

  const relatedDocs = useMemo(() => {
    if (!slug) return [];
    return getCompareRelatedDocs(slug, t, locale).map((doc) => ({
      ...doc,
      path: getDocPath(doc.slug, prefix),
    }));
  }, [slug, t, locale, prefix]);

  usePageMeta({
    title: comparison ? `${comparison.metaTitle} - SWAYA` : 'SWAYA Comparisons',
    description: comparison ? comparison.metaDescription : '',
    url: currentUrl,
    canonicalUrl: currentUrl,
    pathname: currentPath,
    locale: locale || 'en',
    ogType: 'article',
    ogImage: slug ? `https://swaya.xyz/og/compare-${slug}.jpg` : 'https://swaya.xyz/og-image.jpg',
    jsonLd,
  });

  const onOpenDemo = () => {
    navigate('/dashboard');
  };

  const brandName = t('landing.navbar.brand', { defaultValue: 'SWAYA' });
  const hubTitle = t('landing.compare.hubTitle', { defaultValue: 'SWAYA vs' });
  const swayaPricingLabel = `${brandName}: `;
  const competitorPricingLabel = comparison ? `${comparison.name}: ` : '';
  const mainTitlePrefix = comparison ? `${hubTitle} ${comparison.name}: ` : '';
  const hubUrl = compareHubUrl || '/compare';

  const compareFaqProps = useMemo(() => {
    if (!comparison?.faqs || comparison.faqs.length === 0) return null;
    return {
      id: 'compare-faq',
      tag: t('landing.faq.tag', { defaultValue: 'Got Questions?' }),
      title: t('landing.faq.title', { defaultValue: 'Frequently Asked' }),
      titleAccent: t('landing.faq.titleAccent', { defaultValue: 'Questions.' }),
      subtitle: t('landing.compare.faqSubtitle', {
        name: comparison.name,
        defaultValue: `Common questions about migrating to or using SWAYA alongside ${comparison.name}.`,
      }),
      items: comparison.faqs,
    };
  }, [comparison, t]);

  return {
    comparison,
    homeUrl,
    compareHubUrl,
    hubUrl,
    currentUrl,
    currentPath,
    onOpenDemo,
    brandName,
    hubTitle,
    swayaPricingLabel,
    competitorPricingLabel,
    mainTitlePrefix,
    compareFaqProps,
    relatedDocs,
    t,
    locale,
    prefix,
  };
}


export default useComparePage;
