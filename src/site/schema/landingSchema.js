import { FAQ_ITEMS, normalizeFaqList } from '../data/faqConfig.js';
import {
  BASE_URL,
  DEFAULT_OG_IMAGE,
  createJsonLdEnvelope,
  createOrganizationSchema,
  createSoftwareApplicationSchema,
  createFaqPageSchema,
  createSiteNavigationSchema,
} from './baseSchemas.js';

export function getLandingJsonLd({
  locale = 'en',
  t = (k) => k,
  videoContentUrl = `${BASE_URL}/assets/action.mp4`,
}) {
  const landingFaqItems = normalizeFaqList(FAQ_ITEMS, t);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    'url': BASE_URL,
    'name': 'SWAYA',
    'description':
      'Personal offline media center and video player for Windows and Linux. Organize movies, TV shows, and adult video collections with rich metadata, custom curation, and complete privacy.',
    'publisher': {
      '@id': `${BASE_URL}/#organization`,
    },
    'inLanguage': locale || 'en',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${BASE_URL}/docs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = createOrganizationSchema();

  const softwareAppSchema = createSoftwareApplicationSchema({
    screenshot: [
      DEFAULT_OG_IMAGE,
      `${BASE_URL}/og/docs-organizer.jpg`,
      `${BASE_URL}/og/docs-library.jpg`,
      `${BASE_URL}/og/docs-player.jpg`,
      `${BASE_URL}/og/docs-dashboard.jpg`,
    ],
  });

  const videoSchema = {
    '@type': 'VideoObject',
    'name': 'SWAYA: Desktop Media Center & 4K Player Demo',
    'description':
      'Watch SWAYA in action: lightning fast batch renaming on disk, offline movie/series cataloging, and native 4K HDR MPV playback.',
    'thumbnailUrl': DEFAULT_OG_IMAGE,
    'uploadDate': '2026-08-20T00:00:00+00:00',
    'duration': 'PT2M48S',
    'contentUrl': videoContentUrl,
    'embedUrl': `${BASE_URL}/#demo-video`,
    'inLanguage': locale || 'en',
  };

  const faqSchema = createFaqPageSchema(landingFaqItems);

  const navItems = [
    {
      name: t('landing.navbar.docs', { defaultValue: 'Documentation' }),
      description: 'Comprehensive user guides and feature manuals',
      url: `${BASE_URL}${prefix}/docs`,
    },
    {
      name: t('landing.navbar.changelog', { defaultValue: 'Changelog' }),
      description: 'Version releases, new features, and update history',
      url: `${BASE_URL}${prefix}/changelog`,
    },
    {
      name: t('landing.navbar.compare', { defaultValue: 'Compare' }),
      description: 'Software comparisons and feature matrices',
      url: `${BASE_URL}${prefix}/compare`,
    },
    {
      name: t('landing.navbar.help', { defaultValue: 'Help & Support' }),
      description: 'Customer support, Discord community, and FAQ',
      url: `${BASE_URL}${prefix}/help`,
    },
    {
      name: t('landing.navbar.download', { defaultValue: 'Download & Pricing' }),
      description: 'One-time perpetual license with instant access',
      url: `${BASE_URL}${prefix}/#download`,
    },
  ];

  const navigationSchema = createSiteNavigationSchema(navItems, {
    id: `${BASE_URL}${prefix}/#navigation`,
    name: t('landing.navbar.title', { defaultValue: 'SWAYA Site Navigation' }),
  });

  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `${BASE_URL}${prefix}/#webpage`,
    'url': prefix ? `${BASE_URL}${prefix}` : `${BASE_URL}/`,
    'name': t('landing.hero.title', { defaultValue: 'SWAYA - Personal Offline Media Center & Video Player for Windows & Linux' }),
    'description': t('landing.hero.subtitle', {
      defaultValue:
        'Personal offline media center and video player for Windows and Linux. Organize movies, TV shows, and adult video collections with rich metadata, custom curation, and complete privacy.',
    }),
    'isPartOf': {
      '@id': `${BASE_URL}/#website`,
    },
    'about': {
      '@id': `${BASE_URL}/#organization`,
    },
    'inLanguage': locale || 'en',
  };

  return createJsonLdEnvelope([
    websiteSchema,
    webPageSchema,
    organizationSchema,
    softwareAppSchema,
    videoSchema,
    faqSchema,
    navigationSchema,
  ]);
}

export default getLandingJsonLd;
