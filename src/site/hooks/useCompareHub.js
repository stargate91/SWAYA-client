import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import { usePageMeta } from './usePageMeta';
import { useLocalizedUrls } from './useLocalizedUrls';
import { getComparisonsList } from '../data/comparisonsData';
import { getCompareHubJsonLd } from '../schema/compareSchema';

export const COMPARISON_CATEGORIES = [
  'All',
  'File Renamers',
  'Media Servers',
  'Adult Organizers',
  'Home Theater',
];

/**
 * Hook providing data, filtering, SEO schemas, and navigation for the Comparisons Hub page.
 * @returns {{
 *   t: Function,
 *   locale: string,
 *   categories: Array<string>,
 *   selectedCategory: string,
 *   setSelectedCategory: Function,
 *   filteredList: Array<object>,
 *   onSelectComparison: Function,
 *   homeUrl: string,
 *   prefix: string,
 *   breadcrumbItems: Array<{ label: string, to?: string }>
 * }}
 */
export function useCompareHub() {
  const navigate = useNavigate();
  const { t, locale } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { prefix, homeUrl, compareUrl: currentPath } = useLocalizedUrls();
  const currentUrl = `https://swaya.xyz${currentPath}`;

  const jsonLd = useMemo(() => getCompareHubJsonLd({ locale, currentUrl }), [locale, currentUrl]);

  const title = `${t('landing.compare.metaTitle', {
    defaultValue: 'SWAYA Comparisons & Software Alternatives',
  })} - SWAYA`;

  const description = t('landing.compare.metaDescription', {
    defaultValue: t('landing.compare.hubSubtitle', {
      defaultValue:
        'Compare SWAYA against FileBot, Plex, tinyMediaManager, StashApp, Jellyfin, and Kodi. Find the best offline media center, disk renamer, and MPV video player for Windows.',
    }),
  });

  usePageMeta({
    title,
    description,
    url: currentUrl,
    canonicalUrl: currentUrl,
    pathname: currentPath,
    locale: locale || 'en',
    ogType: 'website',
    ogImage: 'https://swaya.xyz/og/compare-hub.jpg',
    jsonLd,
  });

  const localizedList = useMemo(() => {
    return getComparisonsList(locale);
  }, [locale]);

  const filteredList = useMemo(() => {
    if (selectedCategory === 'All') return localizedList;
    return localizedList.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, localizedList]);

  const onOpenDemo = () => {
    navigate('/dashboard');
  };

  const filterAnnouncement = useMemo(() => {
    return `${filteredList.length} ${t('landing.footer.columns.comparisons', { defaultValue: 'comparisons' })}`;
  }, [filteredList.length, t]);

  const breadcrumbItems = useMemo(
    () => [
      {
        label: t('landing.footer.links.home', { defaultValue: 'Home' }),
        to: homeUrl,
      },
      {
        label: t('landing.footer.columns.comparisons', {
          defaultValue: 'Comparisons & Alternatives',
        }),
      },
    ],
    [homeUrl, t]
  );

  return {
    selectedCategory,
    setSelectedCategory,
    categories: COMPARISON_CATEGORIES,
    filteredList,
    filterAnnouncement,
    breadcrumbItems,
    homeUrl,
    prefix,
    onOpenDemo,
    t,
    locale,
  };
}

export default useCompareHub;

