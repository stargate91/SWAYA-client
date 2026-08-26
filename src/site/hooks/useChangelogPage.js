import { useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { usePageMeta } from './usePageMeta';
import { useLocalizedUrls } from './useLocalizedUrls';
import { CHANGELOG_RELEASES } from '../data/changelogConfig';
import { getChangelogReleases } from '../data/changelogTranslations';
import { getChangelogJsonLd } from '../schema/changelogSchema';

/**
 * Hook providing data, SEO meta, JSON-LD schema, and breadcrumb state for the Changelog page.
 * @returns {{
 *   releases: Array<object>,
 *   homeUrl: string,
 *   prefix: string,
 *   changelogUrl: string,
 *   changelogPath: string,
 *   breadcrumbItems: Array<{ label: string, to?: string }>,
 *   t: Function,
 *   locale: string
 * }}
 */
export function useChangelogPage() {
  const { t, locale } = useTranslation();
  const { prefix, homeUrl, changelogUrl: changelogPath } = useLocalizedUrls();

  const releases = useMemo(() => getChangelogReleases(CHANGELOG_RELEASES, locale), [locale]);
  const changelogUrl = `https://swaya.xyz${changelogPath}`;

  const changelogJsonLd = useMemo(
    () =>
      getChangelogJsonLd({
        locale,
        t,
        prefix,
        changelogUrl,
        latestRelease: releases[0] || CHANGELOG_RELEASES[0],
      }),
    [locale, t, prefix, changelogUrl, releases]
  );

  usePageMeta({
    title: `${t('landing.changelog.title', { defaultValue: 'SWAYA Changelog & Release Notes' })} - SWAYA`,
    description: t('landing.changelog.subtitle', {
      defaultValue: 'Track all updates, new features, performance improvements, and bug fixes for the SWAYA desktop offline media center & video player.',
    }),
    url: changelogUrl,
    canonicalUrl: changelogUrl,
    pathname: changelogPath,
    locale: locale || 'en',
    ogType: 'website',
    ogImage: 'https://swaya.xyz/og/changelog.jpg',
    jsonLd: changelogJsonLd,
  });

  const breadcrumbItems = useMemo(
    () => [
      {
        label: t('docs.ui.breadcrumbHome', { defaultValue: 'Home' }),
        to: homeUrl,
      },
      {
        label: t('landing.footer.links.changelog', { defaultValue: 'Changelog' }),
      },
    ],
    [t, homeUrl]
  );

  return {
    releases,
    homeUrl,
    prefix,
    changelogUrl,
    changelogPath,
    breadcrumbItems,
    t,
    locale,
  };
}

export default useChangelogPage;
