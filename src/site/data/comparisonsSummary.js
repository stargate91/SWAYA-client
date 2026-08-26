/**
 * Lightweight comparison summary definitions for Landing Page preview cards.
 * Avoids loading deep comparison tables, matrix rules, and full text translations.
 */

export const COMPARISONS_SUMMARY_LIST = [
  {
    slug: 'filebot',
    name: 'FileBot',
    shortCategory: 'Renamer',
    heroTagline: 'Why just rename your files when you can organize and play your entire collection?',
    heroSubtitle:
      'FileBot is great for renaming files, but SWAYA takes your local media to the next level: disk organization, beautiful offline library browsing, and a built-in 4K HDR MPV player in one modern desktop app.',
    competitorPricing: '$6/year or $48 lifetime',
  },
  {
    slug: 'plex',
    name: 'Plex',
    shortCategory: 'Media Server',
    heroTagline: 'Ditch the heavy client-server setup. Enjoy your offline media on your Windows & Linux PC instantly.',
    heroSubtitle:
      'Plex is built for multi-device streaming and remote access. SWAYA is designed for collectors who want zero servers, 100% offline privacy, and direct physical file management on local hard drives.',
    competitorPricing: 'Free or $4.99/mo ($119.99 lifetime)',
  },
  {
    slug: 'tinymediamanager',
    name: 'tinyMediaManager',
    shortCategory: 'NFO Manager',
    heroTagline: 'A modern, high-performance media center designed for playback, not just editing NFOs.',
    heroSubtitle:
      'tinyMediaManager is a deep metadata scraper and renamer, but lacks an integrated video player. SWAYA combines automated scraping and physical file renaming with an embedded 4K MPV player.',
    competitorPricing: '€10/year for Pro',
  },
  {
    slug: 'stash',
    name: 'Stash (StashApp)',
    shortCategory: 'Adult Media Server',
    heroTagline: 'Native Windows & Linux desktop app with instant setup, multi-database scraping, and true offline privacy.',
    heroSubtitle:
      'StashApp is a powerful self-hosted server for adult media, but requires complex browser-server setup. SWAYA runs locally as a native Windows & Linux desktop app with multi-database metadata scraping.',
    competitorPricing: 'Free & Open Source',
  },
  {
    slug: 'jellyfin',
    name: 'Jellyfin',
    shortCategory: 'Streaming Server',
    heroTagline: 'Zero servers, zero port forwarding, zero transcoding. Pure local desktop performance.',
    heroSubtitle:
      'Jellyfin is an open-source media streaming server. SWAYA is built for single-seat desktop media collectors who want direct file renaming, local curation, and hardware-accelerated 4K MPV playback.',
    competitorPricing: 'Free & Open Source',
  },
  {
    slug: 'kodi',
    name: 'Kodi',
    shortCategory: 'Home Theater',
    heroTagline: 'Clean desktop workflow with automated file renaming and modern UI, without complex addon setups.',
    heroSubtitle:
      'Kodi is a 10-foot TV interface with a complex addon ecosystem. SWAYA is crafted specifically for Windows & Linux desktop users with physical disk renaming, automated scraping, and 1-click stealth privacy.',
    competitorPricing: 'Free & Open Source',
  },
];

/**
 * Returns lightweight preview comparison items for landing page cards.
 * @returns {Array}
 */
export function getComparisonsSummaryList() {
  return COMPARISONS_SUMMARY_LIST;
}
