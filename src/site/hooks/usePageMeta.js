import { useEffect } from 'react';
import { 
  setPageMeta, 
  setJsonLd, 
  setHrefLangTags, 
  cleanupJsonLd, 
  DEFAULT_OG_IMAGE 
} from '../lib/domMetaUtils';

export { setPageMeta, setJsonLd, setHrefLangTags, DEFAULT_OG_IMAGE };

/**
 * React hook to automatically update page metadata and schemas on mount/changes
 */
export function usePageMeta({
  title,
  description,
  url,
  canonicalUrl,
  pathname,
  locale,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageWidth,
  ogImageHeight,
  ogImageAlt,
  twitterCard = 'summary_large_image',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  robots,
  jsonLd,
}) {
  const jsonLdSerialized = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    setPageMeta({
      title,
      description,
      url,
      canonicalUrl,
      pathname,
      locale,
      ogType,
      ogImage,
      ogImageWidth,
      ogImageHeight,
      ogImageAlt,
      twitterCard,
      articlePublishedTime,
      articleModifiedTime,
      articleAuthor,
      robots,
      jsonLd,
    });

    return () => {
      try {
        cleanupJsonLd(jsonLd);
      } catch {
        // Safe cleanup
      }
      if (robots && robots !== 'index, follow') {
        setPageMeta({ robots: 'index, follow' });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    description,
    url,
    canonicalUrl,
    pathname,
    locale,
    ogType,
    ogImage,
    ogImageWidth,
    ogImageHeight,
    ogImageAlt,
    twitterCard,
    articlePublishedTime,
    articleModifiedTime,
    articleAuthor,
    robots,
    jsonLdSerialized,
  ]);
}

export default usePageMeta;
