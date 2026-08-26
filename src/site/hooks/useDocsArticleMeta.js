import { useEffect } from 'react';
import { setPageMeta } from './usePageMeta';
import { getDocsHubJsonLd, getDocArticleJsonLd } from '../schema/docsSchema';
import { getDocDate } from '../data/docDates';

/**
 * Hook synchronizing dynamic page `<title>`, `<meta>`, and structured JSON-LD schemas for Docs Hub and Guides.
 * @param {object} options
 * @param {boolean} options.isHub - Whether currently viewing the documentation hub
 * @param {object|null} [options.activeDoc] - Currently viewed guide metadata
 * @param {Array<object>} [options.allDocs] - List of all guides for hub structured data
 * @param {string} [options.locale='en'] - Active locale
 * @param {string} [options.prefix=''] - Localized path prefix (e.g. '/hu')
 * @param {Function} [options.t] - Translation function
 */
export function useDocsArticleMeta({ isHub, activeDoc, allDocs, locale = 'en', prefix = '', t = (k) => k }) {
  useEffect(() => {
    const hubUrl = `https://swaya.xyz${prefix}/docs`;
    const docUrl = activeDoc?.slug ? `https://swaya.xyz${prefix}/docs/${activeDoc.slug}` : hubUrl;
    const hubPath = `${prefix}/docs`;
    const docPath = activeDoc?.slug ? `${prefix}/docs/${activeDoc.slug}` : hubPath;

    if (isHub) {
      const fullTitle = t('docs.ui.hubTitle', {
        defaultValue: 'SWAYA Documentation - Guides, Tutorials & Workflows',
      });
      const description = t('docs.ui.hubSubtitle', {
        defaultValue:
          'Official SWAYA documentation: master automated batch physical file renaming, multi-source metadata scraping, 4K collection curation, and MPV playback.',
      });

      const jsonLd = getDocsHubJsonLd({
        locale,
        prefix,
        hubUrl,
        fullTitle,
        description,
        breadcrumbHome: t('docs.ui.breadcrumbHome', { defaultValue: 'Home' }),
        breadcrumbDocs: t('docs.ui.breadcrumbDocs', { defaultValue: 'Documentation' }),
        allDocs,
      });

      setPageMeta({
        title: fullTitle,
        description,
        url: hubUrl,
        canonicalUrl: hubUrl,
        pathname: hubPath,
        locale: locale || 'en',
        ogType: 'website',
        jsonLd,
      });
    } else if (activeDoc) {
      const fullTitle = activeDoc.title
        ? `SWAYA Docs - ${activeDoc.title}`
        : 'SWAYA - Documentation';
      const description = activeDoc.description
        || 'SWAYA offline media management and video player documentation and guides.';

      const docDates = getDocDate(activeDoc.slug);
      const docOgImage = `https://swaya.xyz/og/docs-${activeDoc.slug}.jpg`;
      const jsonLd = getDocArticleJsonLd({
        locale,
        prefix,
        docUrl,
        hubUrl,
        title: activeDoc.title || 'Guide',
        description,
        articleSection: activeDoc.category || 'Guides',
        keywords: `SWAYA, ${activeDoc.title || 'Guide'}, ${activeDoc.category || 'Docs'}, offline media center, video player`,
        timeRequired: 'PT3M',
        image: docOgImage,
        breadcrumbHome: t('docs.ui.breadcrumbHome', { defaultValue: 'Home' }),
        breadcrumbDocs: t('docs.ui.breadcrumbDocs', { defaultValue: 'Documentation' }),
        datePublished: docDates.published,
        dateModified: docDates.modified,
      });

      setPageMeta({
        title: fullTitle,
        description,
        url: docUrl,
        canonicalUrl: docUrl,
        pathname: docPath,
        locale: locale || 'en',
        ogType: 'article',
        ogImage: docOgImage,
        articlePublishedTime: `${docDates.published}T00:00:00Z`,
        articleModifiedTime: `${docDates.modified}T00:00:00Z`,
        articleAuthor: 'SWAYA',
        jsonLd,
      });
    }
  }, [isHub, activeDoc, allDocs, locale, prefix, t]);
}

export default useDocsArticleMeta;
