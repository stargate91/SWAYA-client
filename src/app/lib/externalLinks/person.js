import { getIconForUrl, getBrandColorForKey, detectSiteName, createLinkAdder } from './shared';

export function buildPersonExternalLinks(item) {
  if (!item?.id) {
    return [];
  }

  const links = [];
  const seenUrls = new Set();
  const seenKeys = new Set();
  const addLink = createLinkAdder(links, seenUrls, seenKeys);

  // 1. Process backend-supplied resolved external_links
  if (Array.isArray(item.external_links)) {
    item.external_links.forEach((link) => {
      const href = (link.url && String(link.url).startsWith('http')) ? link.url : null;
      if (!href) return;
      const key = link.provider || link.key;
      addLink({
        key: key,
        label: link.name || link.provider || 'Link',
        href: href,
        iconSrc: getIconForUrl(href, key),
        brandColor: getBrandColorForKey(key),
      });
    });
  }

  // 2. Process any raw extra URLs in externalIds
  const externalIds = item.external_ids || {};
  if (Array.isArray(externalIds.urls)) {
    externalIds.urls.forEach((u, i) => {
      if (u && u.url) {
        addLink({
          key: `extra-${i}`,
          label: detectSiteName(u.url, u.site),
          href: u.url,
          iconSrc: getIconForUrl(u.url),
          brandColor: 'var(--color-text-primary)',
        });
      }
    });
  }

  return links;
}
