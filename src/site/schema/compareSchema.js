import {
  BASE_URL,
  createJsonLdEnvelope,
  createBreadcrumbListSchema,
  createSoftwareApplicationSchema,
  createFaqPageSchema,
  createCollectionPageSchema,
} from './baseSchemas.js';
import { COMPARISONS_LIST } from '../data/comparisonsData.js';

export function getCompareJsonLd({
  comparison,
  locale = 'en',
  prefix = (locale && locale !== 'en') ? `/${locale}` : '',
  currentUrl = `${BASE_URL}${prefix}/compare${comparison?.slug ? `/${comparison.slug}` : ''}`,
  breadcrumbHome = 'Home',
  breadcrumbCompare = 'Alternatives & Comparisons',
}) {
  if (!comparison) return null;

  const homeUrl = prefix ? `${BASE_URL}${prefix}` : `${BASE_URL}/`;
  const hubUrl = `${BASE_URL}${prefix}/compare`;

  const breadcrumbs = createBreadcrumbListSchema([
    {
      name: breadcrumbHome,
      item: homeUrl,
    },
    {
      name: breadcrumbCompare,
      item: hubUrl,
    },
    {
      name: `SWAYA vs ${comparison.name}`,
      item: currentUrl,
    },
  ]);

  const webPage = {
    '@type': 'WebPage',
    '@id': `${currentUrl}#webpage`,
    'url': currentUrl,
    'name': comparison.title,
    'description': comparison.metaDescription,
    'inLanguage': locale || 'en',
    'breadcrumb': breadcrumbs,
  };

  const softwareApp = createSoftwareApplicationSchema({
    description: 'Offline media center, batch disk organizer, and 4K HDR MPV player for Windows & Linux.',
  });

  const faqSchema =
    comparison.faqs && comparison.faqs.length > 0
      ? createFaqPageSchema(comparison.faqs)
      : null;

  return createJsonLdEnvelope([webPage, softwareApp, faqSchema], 'compare-jsonld');
}

export function getCompareHubJsonLd({
  locale = 'en',
  prefix = (locale && locale !== 'en') ? `/${locale}` : '',
  currentUrl = `${BASE_URL}${prefix}/compare`,
  breadcrumbHome = 'Home',
  breadcrumbCompare = 'Alternatives & Comparisons',
}) {
  const homeUrl = prefix ? `${BASE_URL}${prefix}` : `${BASE_URL}/`;
  const breadcrumbs = createBreadcrumbListSchema([
    {
      name: breadcrumbHome,
      item: homeUrl,
    },
    {
      name: breadcrumbCompare,
      item: currentUrl,
    },
  ]);

  const collectionPage = createCollectionPageSchema({
    id: `${currentUrl}#collection`,
    url: currentUrl,
    name: 'SWAYA Comparisons & Alternative Media Centers for Windows & Linux',
    description:
      'Compare SWAYA with FileBot, Plex, tinyMediaManager, StashApp, Jellyfin, and Kodi. Find the right offline media center for Windows & Linux.',
    inLanguage: locale || 'en',
    breadcrumb: breadcrumbs,
    mainEntity: {
      '@type': 'ItemList',
      'itemListElement': COMPARISONS_LIST.map((comp, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'url': `${BASE_URL}${prefix}/compare/${comp.slug}`,
        'name': comp.title || `SWAYA vs ${comp.name}`,
        'description': comp.heroTagline || comp.metaDescription,
      })),
    },
  });

  const itemList = {
    '@type': 'ItemList',
    '@id': `${currentUrl}#itemlist`,
    'name': 'SWAYA Comparisons & Alternative Media Centers for Windows & Linux',
    'description': 'Compare SWAYA with FileBot, Plex, tinyMediaManager, StashApp, Jellyfin, and Kodi.',
    'itemListElement': COMPARISONS_LIST.map((comp, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': comp.title || `SWAYA vs ${comp.name}`,
      'description': comp.heroTagline || comp.metaDescription,
      'url': `${BASE_URL}${prefix}/compare/${comp.slug}`,
    })),
  };

  return createJsonLdEnvelope([breadcrumbs, collectionPage, itemList], 'compare-hub-jsonld');
}

export default {
  getCompareJsonLd,
  getCompareHubJsonLd,
};
