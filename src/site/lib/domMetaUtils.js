/**
 * Re-export all metadata utilities from modular sub-packages.
 */
export {
  setMetaTag,
  setCanonicalUrl,
  setJsonLd,
  cleanupJsonLd,
} from './meta/domHead';

export {
  OG_LOCALE_MAP,
  setOgLocaleTags,
} from './meta/ogLocales';

export {
  BASE_URL,
  setHrefLangTags,
} from './meta/hreflang';

export {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_OG_IMAGE_HEIGHT,
  setPageMeta,
} from './meta/pageMeta';
