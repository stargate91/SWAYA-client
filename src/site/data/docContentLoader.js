const FILE_SLUG_MAP = {
  'GETTING_STARTED.md': 'getting-started',
  'ORGANIZER_FEATURE_GUIDE.md': 'organizer',
  'DASHBOARD_FEATURE_GUIDE.md': 'dashboard',
  'LIBRARY_FEATURE_GUIDE.md': 'library',
  'DETAILS_FEATURE_GUIDE.md': 'details',
  'PLAYER_FEATURE_GUIDE.md': 'player',
  'SEARCH_FEATURE_GUIDE.md': 'search',
  'LISTS_FEATURE_GUIDE.md': 'lists',
  'RATINGS_FEATURE_GUIDE.md': 'ratings',
  'HISTORY_FEATURE_GUIDE.md': 'history',
  'STATISTICS_FEATURE_GUIDE.md': 'statistics',
  'SETTINGS_FEATURE_GUIDE.md': 'settings',
  'TORRENT_FEATURE_GUIDE.md': 'torrent',
};

const docFiles = import.meta.glob('../docs/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const DOCS_CONTENT = {};

for (const [filePath, content] of Object.entries(docFiles)) {
  const match = filePath.match(/\.\.\/docs\/([^/]+)\/([^/]+)$/);
  if (match) {
    const [, locale, filename] = match;
    const slug = FILE_SLUG_MAP[filename] || filename.replace(/_FEATURE_GUIDE\.md$/i, '').replace(/_/g, '-').toLowerCase();

    if (!DOCS_CONTENT[locale]) {
      DOCS_CONTENT[locale] = {};
    }
    DOCS_CONTENT[locale][slug] = content;
  }
}

export function getDocRawMarkdown(slug, locale = 'en') {
  return DOCS_CONTENT[locale]?.[slug] ?? DOCS_CONTENT.en?.[slug] ?? '';
}
