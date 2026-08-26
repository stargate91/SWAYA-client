import { setMetaTag } from './domHead';
import { OG_LOCALE_MAP } from '../../data/localesConfig';

export { OG_LOCALE_MAP };


/**
 * Updates or creates <meta property="og:locale"> and <meta property="og:locale:alternate"> elements
 */
export function setOgLocaleTags(locale = 'en') {
  if (typeof document === 'undefined') return;

  const currentOgLocale = OG_LOCALE_MAP[locale] || 'en_US';
  setMetaTag('property', 'og:locale', currentOgLocale);
  setMetaTag('property', 'og:site_name', 'SWAYA');

  // Remove existing og:locale:alternate tags
  const existingAlternates = document.querySelectorAll('meta[property="og:locale:alternate"]');
  existingAlternates.forEach((el) => el.remove());

  // Add alternate locales
  Object.values(OG_LOCALE_MAP).forEach((ogLoc) => {
    if (ogLoc !== currentOgLocale) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:locale:alternate');
      meta.setAttribute('content', ogLoc);
      document.head.appendChild(meta);
    }
  });
}
