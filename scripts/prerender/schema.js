import { getHashedVideoUrl } from './utils.js';
import { getLandingJsonLd as getBaseLandingJsonLd } from '../../src/site/schema/landingSchema.js';
import { getChangelogJsonLd as getBaseChangelogJsonLd } from '../../src/site/schema/changelogSchema.js';
import { getDocsHubJsonLd as getBaseDocsHubJsonLd, getDocArticleJsonLd as getBaseDocArticleJsonLd } from '../../src/site/schema/docsSchema.js';
import { getHelpJsonLd as getBaseHelpJsonLd } from '../../src/site/schema/helpSchema.js';
import { getCompareJsonLd as getBaseCompareJsonLd, getCompareHubJsonLd as getBaseCompareHubJsonLd } from '../../src/site/schema/compareSchema.js';
import { getPrivacyJsonLd as getBasePrivacyJsonLd, getTermsJsonLd as getBaseTermsJsonLd } from '../../src/site/schema/legalSchema.js';

export function getLandingJsonLd({ locale, landingData, description }) {
  const videoUrl = getHashedVideoUrl();
  const schemaObj = getBaseLandingJsonLd({
    locale,
    t: (key, options) => {
      if (key === 'landing.video.title') return landingData.video?.title ? `SWAYA - ${landingData.video.title}` : (options?.defaultValue || 'SWAYA - Product Overview & Feature Walkthrough');
      if (key === 'landing.video.subtitle') return landingData.video?.subtitle || description;
      if (key.startsWith('landing.faq.items.')) {
        const parts = key.split('.');
        const idx = parseInt(parts[3], 10);
        const field = parts[4]; // 'question' or 'answer'
        return landingData.faq?.items?.[idx]?.[field] || options?.defaultValue || key;
      }
      return options?.defaultValue || key;
    },
    videoContentUrl: videoUrl,
  });

  return schemaObj['site-jsonld'];
}

import { getDocDate } from '../../src/site/data/docDates.js';

export function getDocArticleJsonLd({ locale, slug, docsData, meta, docUrl, title, description, prefix, datePublished, dateModified }) {
  const category = (meta && (docsData.categories?.[meta.categoryKey] || meta.category)) || 'Guides';
  const docSlug = slug || (docUrl ? docUrl.split('/').pop() : '');
  const docDates = getDocDate(docSlug);
  const finalPublished = datePublished || docDates.published || '2026-08-15';
  const finalModified = dateModified || docDates.modified || '2026-08-20';
  const docOgImage = docSlug ? `https://swaya.xyz/og/docs-${docSlug}.jpg` : 'https://swaya.xyz/og-image.jpg';
  const schemaObj = getBaseDocArticleJsonLd({
    locale,
    prefix,
    docUrl,
    title,
    description,
    articleSection: category,
    keywords: `SWAYA, ${title}, ${category}, offline media center, video player`,
    timeRequired: 'PT3M',
    image: docOgImage,
    breadcrumbHome: docsData?.ui?.breadcrumbHome || 'Home',
    breadcrumbDocs: docsData?.ui?.breadcrumbDocs || 'Documentation',
    datePublished: finalPublished,
    dateModified: finalModified,
  });

  return schemaObj['site-jsonld'];
}

export function getDocsHubJsonLd({ locale, docsData, hubUrl, fullTitle, description, allDocEntries, prefix }) {
  const allDocs = allDocEntries.map(([slug, meta]) => ({
    slug,
    title: docsData.items?.[slug]?.title || meta.title,
    description: docsData.items?.[slug]?.description || meta.description,
  }));

  const schemaObj = getBaseDocsHubJsonLd({
    locale,
    prefix,
    hubUrl,
    fullTitle,
    description,
    breadcrumbHome: docsData.ui?.breadcrumbHome || 'Home',
    breadcrumbDocs: docsData.ui?.breadcrumbDocs || 'Documentation',
    allDocs,
  });

  return schemaObj['site-jsonld'];
}

export function getChangelogJsonLd({ locale, changelogUrl, prefix }) {
  const schemaObj = getBaseChangelogJsonLd({
    locale,
    prefix,
    changelogUrl,
    t: (key, options) => options?.defaultValue || key,
    latestRelease: {
      version: '1.1.0',
      date: '2026-08-29',
      description: 'Major stability and user experience update featuring interactive titlebar navigation, person filmography scroll position restoration, automatic Alembic database schema migrations, and modularized design system architecture.',
    },
  });

  return schemaObj['site-jsonld'];
}

export function getHelpJsonLd({ locale, helpUrl, prefix, landingData }) {
  const schemaObj = getBaseHelpJsonLd({
    locale,
    prefix,
    helpUrl,
    t: (key, options) => {
      if (key === 'landing.help.title') return landingData.help?.title || 'How Can We Help You?';
      if (key === 'landing.help.subtitle') return landingData.help?.subtitle || 'Get in touch with the developer, join our Discord community for live chat, or browse our documentation guides.';
      if (key === 'landing.navbar.help') return landingData.navbar?.help || 'Help & Support';
      return options?.defaultValue || key;
    },
  });

  return schemaObj['site-jsonld'];
}

export function getCompareJsonLd({ comparison, locale, prefix, currentUrl, breadcrumbHome, breadcrumbCompare }) {
  const schemaObj = getBaseCompareJsonLd({ comparison, locale, prefix, currentUrl, breadcrumbHome, breadcrumbCompare });
  return schemaObj ? schemaObj['compare-jsonld'] : null;
}

export function getCompareHubJsonLd({ locale, prefix, currentUrl, breadcrumbHome, breadcrumbCompare }) {
  const schemaObj = getBaseCompareHubJsonLd({ locale, prefix, currentUrl, breadcrumbHome, breadcrumbCompare });
  return schemaObj ? schemaObj['compare-hub-jsonld'] : null;
}

export function getPrivacyJsonLd({ locale, prefix, privacyUrl, title, description, breadcrumbHome, breadcrumbPrivacy }) {
  const schemaObj = getBasePrivacyJsonLd({ locale, prefix, privacyUrl, title, description, breadcrumbHome, breadcrumbPrivacy });
  return schemaObj ? schemaObj['privacy-jsonld'] : null;
}

export function getTermsJsonLd({ locale, prefix, termsUrl, title, description, breadcrumbHome, breadcrumbTerms }) {
  const schemaObj = getBaseTermsJsonLd({ locale, prefix, termsUrl, title, description, breadcrumbHome, breadcrumbTerms });
  return schemaObj ? schemaObj['terms-jsonld'] : null;
}
