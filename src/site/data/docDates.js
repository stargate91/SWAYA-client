/**
 * Publication and last modification dates for all documentation guides
 */
export const DOC_DATES = {
  'getting-started': { published: '2026-08-10', modified: '2026-08-20' },
  'organizer': { published: '2026-08-11', modified: '2026-08-21' },
  'dashboard': { published: '2026-08-12', modified: '2026-08-18' },
  'library': { published: '2026-08-12', modified: '2026-08-20' },
  'details': { published: '2026-08-13', modified: '2026-08-19' },
  'player': { published: '2026-08-13', modified: '2026-08-17' },
  'search': { published: '2026-08-14', modified: '2026-08-20' },
  'lists': { published: '2026-08-14', modified: '2026-08-18' },
  'ratings': { published: '2026-08-15', modified: '2026-08-19' },
  'history': { published: '2026-08-15', modified: '2026-08-18' },
  'statistics': { published: '2026-08-16', modified: '2026-08-21' },
  'settings': { published: '2026-08-16', modified: '2026-08-20' },
  'torrent': { published: '2026-08-16', modified: '2026-08-21' },
};

export function getDocDate(slug) {
  return DOC_DATES[slug] || { published: '2026-08-15', modified: '2026-08-20' };
}
