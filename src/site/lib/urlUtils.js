/**
 * Pure URL utility functions for localized paths and document routes.
 */

export function getDocPath(slug = '', prefix = '') {
  return slug ? `${prefix || ''}/docs/${slug}` : `${prefix || ''}/docs`;
}

export function getComparePath(slug = '', prefix = '') {
  return slug ? `${prefix || ''}/compare/${slug}` : `${prefix || ''}/compare`;
}

export function getLocalizedUrls(locale = 'en') {
  const prefix = locale && locale !== 'en' ? `/${locale}` : '';
  const homeUrl = prefix || '/';
  const docsUrl = `${prefix}/docs`;
  const changelogUrl = `${prefix}/changelog`;
  const helpUrl = `${prefix}/help`;
  const compareUrl = `${prefix}/compare`;
  const privacyUrl = `${prefix}/privacy`;
  const termsUrl = `${prefix}/terms`;

  return {
    prefix,
    homeUrl,
    docsUrl,
    changelogUrl,
    helpUrl,
    compareUrl,
    privacyUrl,
    termsUrl,
    getDocPath: (slug = '') => getDocPath(slug, prefix),
    getComparePath: (slug = '') => getComparePath(slug, prefix),
    makeUrl: (path = '') => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `${prefix}${cleanPath}` || '/';
    },
  };
}
