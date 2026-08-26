export const RELATED_DOCS_MAP = {
  'getting-started': ['organizer', 'dashboard', 'player'],
  'organizer': ['settings', 'torrent', 'details'],
  'dashboard': ['library', 'player', 'search'],
  'library': ['details', 'lists', 'ratings'],
  'details': ['library', 'ratings', 'organizer'],
  'player': ['history', 'dashboard', 'settings'],
  'search': ['library', 'dashboard', 'lists'],
  'lists': ['library', 'ratings', 'details'],
  'ratings': ['lists', 'history', 'details'],
  'history': ['statistics', 'player', 'ratings'],
  'statistics': ['history', 'library', 'ratings'],
  'settings': ['organizer', 'torrent', 'getting-started'],
  'torrent': ['organizer', 'settings', 'dashboard'],
};

export const COMPARE_RELATED_DOCS_MAP = {
  filebot: ['organizer', 'settings', 'player'],
  plex: ['library', 'player', 'lists'],
  tinymediamanager: ['organizer', 'details', 'player'],
  stash: ['settings', 'details', 'player'],
  stashapp: ['settings', 'details', 'player'],
  jellyfin: ['library', 'player', 'search'],
  kodi: ['library', 'organizer', 'statistics'],
};
