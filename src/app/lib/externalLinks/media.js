import { getIconForUrl, getBrandColorForKey, createLinkAdder } from './shared';

export function buildMediaExternalLinks(item) {
  if (!item) return [];

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
        iconSrc: getIconForUrl(href, key, 'links/homepage.png'),
        brandColor: getBrandColorForKey(key),
      });
    });
  }

  return links;
}
