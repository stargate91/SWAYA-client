import { useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { usePageMeta } from './usePageMeta';
import { useLocalizedUrls } from './useLocalizedUrls';
import { getHelpJsonLd } from '../schema/helpSchema';
import {
  getHelpFaqItems,
  getHelpChannels,
  getHelpQuickDocs,
} from '../data/helpConfig';
import { ALL_DOCS } from '../data/docQueries';

/**
 * Main hook for the Help & Support page, providing channels, FAQ items, quick documentation links, and SEO schemas.
 * @returns {{
 *   channels: Array<object>,
 *   faqItems: Array<object>,
 *   quickDocs: Array<object>,
 *   allGuidesUrl: string,
 *   breadcrumbItems: Array<{ label: string, to?: string }>,
 *   t: Function,
 *   locale: string
 * }}
 */
export function useHelpPage() {
  const { t, locale } = useTranslation();
  const { prefix, homeUrl, docsUrl, helpUrl: helpPath } = useLocalizedUrls();
  const helpUrl = `https://swaya.xyz${helpPath}`;

  const helpJsonLd = useMemo(
    () =>
      getHelpJsonLd({
        locale,
        t,
        prefix,
        helpUrl,
      }),
    [locale, t, prefix, helpUrl]
  );

  usePageMeta({
    title: `${t('landing.help.title', { defaultValue: 'How Can We Help You?' })} - SWAYA`,
    description: t('landing.help.subtitle', {
      defaultValue:
        'Get in touch with the developer, join our Discord community for live chat, or browse our documentation guides.',
    }),
    url: helpUrl,
    canonicalUrl: helpUrl,
    pathname: helpPath,
    locale: locale || 'en',
    ogType: 'website',
    ogImage: 'https://swaya.xyz/og/help.jpg',
    jsonLd: helpJsonLd,
  });

  const helpChannels = useMemo(
    () => getHelpChannels(t),
    [t]
  );

  const quickDocLinks = useMemo(
    () => getHelpQuickDocs(t, prefix),
    [t, prefix]
  );

  const totalDocCount = useMemo(() => ALL_DOCS.length, []);

  const quickDocsTitle = t('landing.help.quickDocs.title', {
    defaultValue: 'Looking for Documentation?',
  });

  const quickDocsSubtitle = t('landing.help.quickDocs.subtitle', {
    defaultValue:
      'Explore step-by-step feature guides, batch renaming workflows, and technical details.',
  });

  const allGuidesLabel = t('landing.help.quickDocs.allGuides', {
    count: totalDocCount,
    defaultValue: `Explore All ${totalDocCount} Guides →`,
  });

  const helpFaqItems = useMemo(
    () => getHelpFaqItems(t),
    [t]
  );

  return {
    homeUrl,
    docsUrl,
    prefix,
    helpChannels,
    quickDocLinks,
    quickDocsTitle,
    quickDocsSubtitle,
    allGuidesLabel,
    helpFaqItems,
    t,
    locale,
  };
}

export default useHelpPage;


