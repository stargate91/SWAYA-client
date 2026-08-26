import {
  MOCK_MOVIES,
  MOCK_VIDEOS,
  MOCK_SHOWS,
  MOCK_ADULT_SCENES,
  MOCK_PEOPLE,
  MOCK_STUDIOS,
  MOCK_COLLECTIONS
} from '../mockData';

export function handleSearchRequests(path, options, urlStr) {
  if (path === 'search' || path.startsWith('search?')) {
    const urlObj = new URL(urlStr, window.location.origin);
    const query = (urlObj.searchParams.get('q') || urlObj.searchParams.get('query') || '').toLowerCase();
    const includeAdult = urlObj.searchParams.get('include_adult') === 'true' || urlObj.searchParams.get('session_mode') === 'nsfw';
    
    let pool = includeAdult
      ? [
          ...MOCK_ADULT_SCENES,
          ...MOCK_VIDEOS.filter(v => v.is_adult),
          ...MOCK_PEOPLE.filter(p => p.is_adult),
          ...MOCK_STUDIOS.filter(s => s.is_adult),
          ...MOCK_COLLECTIONS.filter(c => c.is_adult)
        ]
      : [
          ...MOCK_MOVIES,
          ...MOCK_VIDEOS.filter(v => !v.is_adult),
          ...MOCK_SHOWS,
          ...MOCK_PEOPLE.filter(p => !p.is_adult),
          ...MOCK_STUDIOS.filter(s => !s.is_adult),
          ...MOCK_COLLECTIONS.filter(c => !c.is_adult)
        ];

    let items = pool;
    if (query) {
      items = pool.filter(item => (item.title || item.name || '').toLowerCase().includes(query));
    }
    return new Response(JSON.stringify({
      items,
      results: items,
      total: items.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return null;
}
