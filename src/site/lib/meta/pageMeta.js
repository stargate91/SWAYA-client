import { setMetaTag, setCanonicalUrl, setJsonLd } from './domHead';
import { setOgLocaleTags } from './ogLocales';
import { setHrefLangTags, BASE_URL } from './hreflang';
import { TWITTER_HANDLE } from '../../data/siteConfig';

export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;
export const DEFAULT_OG_IMAGE_WIDTH = '1200';
export const DEFAULT_OG_IMAGE_HEIGHT = '630';

/**
 * Applies title, description, OpenGraph, Twitter, canonical, hreflang, and JSON-LD schemas
 */
export function setPageMeta({
  title,
  description,
  url,
  canonicalUrl,
  pathname,
  locale,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageWidth = DEFAULT_OG_IMAGE_WIDTH,
  ogImageHeight = DEFAULT_OG_IMAGE_HEIGHT,
  ogImageAlt,
  twitterCard = 'summary_large_image',
  twitterSite = TWITTER_HANDLE,
  twitterCreator = TWITTER_HANDLE,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  robots,
  jsonLd,
}) {
  if (typeof document === 'undefined') return;

  if (locale) {
    document.documentElement.lang = locale;
  }

  if (twitterCard) {
    setMetaTag('name', 'twitter:card', twitterCard);
  }

  if (twitterSite) {
    setMetaTag('name', 'twitter:site', twitterSite);
  }

  if (twitterCreator) {
    setMetaTag('name', 'twitter:creator', twitterCreator);
  }

  if (title) {
    document.title = title;
    setMetaTag('property', 'og:title', title);
    setMetaTag('name', 'twitter:title', title);
  }

  if (description) {
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:description', description);
    setMetaTag('name', 'twitter:description', description);
  }

  if (robots) {
    setMetaTag('name', 'robots', robots);
  } else {
    setMetaTag('name', 'robots', 'index, follow');
  }

  if (url) {
    setMetaTag('property', 'og:url', url);
  }

  if (canonicalUrl || url) {
    const targetUrl = canonicalUrl || url;
    setCanonicalUrl(targetUrl);
  }

  // Set hreflang alternate tags and og:locale tags
  const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
  setHrefLangTags(currentPath);
  setOgLocaleTags(locale || 'en', currentPath);

  if (ogType) {
    setMetaTag('property', 'og:type', ogType);
  }

  if (ogType === 'article') {
    if (articlePublishedTime) setMetaTag('property', 'article:published_time', articlePublishedTime);
    if (articleModifiedTime) setMetaTag('property', 'article:modified_time', articleModifiedTime);
    if (articleAuthor) setMetaTag('property', 'article:author', articleAuthor);
  }

  if (ogImage) {
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:image:width', String(ogImageWidth));
    setMetaTag('property', 'og:image:height', String(ogImageHeight));

    const altText = ogImageAlt || title || 'SWAYA - Offline Media Center & Video Player for Windows';
    setMetaTag('property', 'og:image:alt', altText);
    setMetaTag('name', 'twitter:image:alt', altText);
    setMetaTag('name', 'twitter:image', ogImage);
  }

  if (jsonLd && typeof jsonLd === 'object') {
    Object.entries(jsonLd).forEach(([id, schema]) => {
      setJsonLd(id, schema);
    });
  }
}
