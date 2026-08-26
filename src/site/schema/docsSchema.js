import {
  BASE_URL,
  DEFAULT_OG_IMAGE,
  createJsonLdEnvelope,
  createBreadcrumbListSchema,
  createCollectionPageSchema,
} from './baseSchemas.js';
import { getDocDate } from '../data/docDates.js';
import { getDocHowTo } from '../data/docHowToData.js';

export function getDocsHubJsonLd({
  locale = 'en',
  prefix = '',
  hubUrl = `${BASE_URL}/docs`,
  fullTitle = 'SWAYA Documentation - Guides, Tutorials & Workflows',
  description = 'Official SWAYA documentation: master media library curation, multi-source metadata scraping, custom collection management, and smooth playback.',
  breadcrumbHome = 'Home',
  breadcrumbDocs = 'Documentation',
  allDocs = [],
}) {
  const breadcrumbs = createBreadcrumbListSchema([
    {
      name: breadcrumbHome,
      item: prefix ? `${BASE_URL}${prefix}` : `${BASE_URL}/`,
    },
    {
      name: breadcrumbDocs,
      item: hubUrl,
    },
  ]);

  const collectionPage = createCollectionPageSchema({
    name: fullTitle,
    description: description,
    url: hubUrl,
    inLanguage: locale || 'en',
    mainEntity: {
      '@type': 'ItemList',
      'itemListElement': allDocs.map((doc, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'url': `${BASE_URL}${prefix}/docs/${doc.slug}`,
        'name': doc.title,
        'description': doc.description,
      })),
    },
  });

  return createJsonLdEnvelope([breadcrumbs, collectionPage]);
}

export function getDocArticleJsonLd({
  locale = 'en',
  prefix = '',
  slug = '',
  docUrl = '',
  hubUrl = `${BASE_URL}/docs`,
  title = 'Guide',
  description = '',
  articleSection = 'Core Workflows',
  keywords = 'SWAYA, offline media center, video player, file organizer',
  timeRequired = 'PT3M',
  image = DEFAULT_OG_IMAGE,
  breadcrumbHome = 'Home',
  breadcrumbDocs = 'Documentation',
  datePublished,
  dateModified,
}) {
  const docSlug = slug || (docUrl ? docUrl.split('/').pop() : '');
  const docDates = getDocDate(docSlug);
  const finalDatePublished = datePublished || docDates.published || '2026-08-15';
  const finalDateModified = dateModified || docDates.modified || '2026-08-20';

  const breadcrumbs = createBreadcrumbListSchema([
    {
      name: breadcrumbHome,
      item: prefix ? `${BASE_URL}${prefix}` : `${BASE_URL}/`,
    },
    {
      name: breadcrumbDocs,
      item: hubUrl,
    },
    {
      name: title,
      item: docUrl,
    },
  ]);

  const article = {
    '@type': 'TechArticle',
    'headline': title,
    'description': description,
    'url': docUrl,
    'inLanguage': locale || 'en',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': docUrl,
    },
    'image': image,
    'articleSection': articleSection,
    'keywords': keywords,
    'timeRequired': timeRequired,
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['h1', 'article p', '.doc-content p', '#main-content p'],
    },
    'author': {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      'name': 'SWAYA',
      'url': BASE_URL,
    },
    'publisher': {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      'name': 'SWAYA',
      'url': BASE_URL,
      'logo': {
        '@type': 'ImageObject',
        'url': `${BASE_URL}/og-image.jpg`,
      },
    },
    'datePublished': finalDatePublished,
    'dateModified': finalDateModified,
  };

  const schemas = [breadcrumbs, article];

  const howToData = getDocHowTo(docSlug, locale);
  if (howToData) {
    const howToSchema = {
      '@type': 'HowTo',
      '@id': `${docUrl}#howto`,
      'name': howToData.name || `How to Use ${title} in SWAYA`,
      'description': howToData.description || description,
      'image': image,
      'totalTime': howToData.totalTime || timeRequired || 'PT3M',
      'tool': [
        {
          '@type': 'HowToTool',
          'name': 'SWAYA Media Center',
        },
      ],
      'step': (howToData.steps || []).map((step, idx) => ({
        '@type': 'HowToStep',
        'position': idx + 1,
        'name': step.name || `Step ${idx + 1}`,
        'text': step.text,
        'url': `${docUrl}#step-${idx + 1}`,
      })),
    };
    schemas.push(howToSchema);
  }

  return createJsonLdEnvelope(schemas);
}

export default {
  getDocsHubJsonLd,
  getDocArticleJsonLd,
};
