export const v0_6_0 = {
  version: '0.6.0',
  date: '2026-08-10',
  isLatest: false,
  title: 'Universal Multi-Source Search & Process Lifecycle Watcher',
  description: 'Expanded search capabilities across global databases and hardened backend process management.',
  highlights: [
    'Unified global search across movies, scenes, performers, and studios',
    'Parent process monitor preventing orphaned background tasks',
  ],
  sections: [
    {
      type: 'added',
      title: 'New Features',
      items: [
        'Global Multi-Source Search: Search across all media types on mainstream and niche providers.',
        'Parent Process Monitor: Background watchdog ensuring clean backend exit on application close.',
      ],
    },
    {
      type: 'fixed',
      title: 'Bug Fixes',
      items: [
        'Resolved sandbox context-isolation API token verification issue in production.',
        'Fixed double-proxying of remote HTTPS images.',
        'Added automatic fallback import when navigating to unlinked external studios.',
      ],
    },
  ],
};
