import { stripLocalePrefix } from './localesConfig.js';

export const SITE_NAV_ITEMS = [
  {
    key: 'home',
    labelKey: 'landing.navbar.home',
    defaultLabel: 'Home',
    end: true,
    match: (cleanPath) => cleanPath === '/',
    getUrl: (urls) => urls.homeUrl,
  },
  {
    key: 'docs',
    labelKey: 'landing.navbar.docs',
    defaultLabel: 'Documentation',
    match: (cleanPath) => cleanPath === '/docs' || cleanPath.startsWith('/docs/'),
    getUrl: (urls) => urls.docsUrl,
  },
  {
    key: 'changelog',
    labelKey: 'landing.footer.links.changelog',
    defaultLabel: 'Changelog',
    match: (cleanPath) => cleanPath === '/changelog' || cleanPath.startsWith('/changelog/'),
    getUrl: (urls) => urls.changelogUrl,
  },
  {
    key: 'help',
    labelKey: 'landing.navbar.help',
    defaultLabel: 'Help',
    match: (cleanPath) => cleanPath === '/help' || cleanPath.startsWith('/help/'),
    getUrl: (urls) => urls.helpUrl,
  },
];

/**
 * Resolves localized navigation items with active route state.
 * @param {object} params
 * @param {string} params.pathname - Current location pathname
 * @param {object} params.urls - Localized URLs object from useLocalizedUrls
 * @param {Function} params.t - Translation function
 * @returns {Array} List of navigation items
 */
export function getSiteNavLinks({ pathname, urls, t = (k, opts) => opts?.defaultValue || k }) {
  const cleanPath = stripLocalePrefix(pathname);

  return SITE_NAV_ITEMS.map((item) => ({
    key: item.key,
    to: item.getUrl(urls),
    label: t(item.labelKey, { defaultValue: item.defaultLabel }),
    end: item.end,
    isActive: item.match(cleanPath),
  }));
}

export default SITE_NAV_ITEMS;
