import { SUPPORTED_LANGUAGES, stripLocalePrefix } from '../../data/localesConfig';

export const BASE_URL = 'https://swaya.xyz';

/**
 * Updates or creates <link rel="alternate" hreflang="..."> elements in document.head
 */
export function setHrefLangTags(pathname = '/') {
  if (typeof document === 'undefined') return;

  const cleanPath = stripLocalePrefix(pathname);
  const normalizedClean = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  const pathSuffix = normalizedClean === '/' ? '' : normalizedClean;

  const hreflangMap = {
    'x-default': `${BASE_URL}${normalizedClean}`,
  };

  SUPPORTED_LANGUAGES.forEach((lang) => {
    hreflangMap[lang.code] =
      lang.code === 'en'
        ? `${BASE_URL}${normalizedClean}`
        : `${BASE_URL}/${lang.code}${pathSuffix}`;
  });

  Object.entries(hreflangMap).forEach(([lang, href]) => {
    let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  });
}

