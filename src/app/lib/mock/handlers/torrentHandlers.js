import {
  MOCK_TORRENTS,
  MOCK_TORRENT_SEARCH_RESULTS
} from '../mockData';

export function handleTorrentRequests(path, options, urlStr) {
  if (path === 'torrent/active') {
    return new Response(JSON.stringify({ downloads: MOCK_TORRENTS }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('torrent/active/') && path.endsWith('/pause')) {
    const hash = path.split('/')[2];
    const t = MOCK_TORRENTS.find(item => item.hash === hash);
    if (t) t.state = 'paused';
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('torrent/active/') && path.endsWith('/resume')) {
    const hash = path.split('/')[2];
    const t = MOCK_TORRENTS.find(item => item.hash === hash);
    if (t) t.state = 'downloading';
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('torrent/active/')) {
    const hash = path.split('/')[2];
    const idx = MOCK_TORRENTS.findIndex(item => item.hash === hash);
    if (idx !== -1) MOCK_TORRENTS.splice(idx, 1);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'torrent/search') {
    const urlObj = new URL(urlStr, window.location.origin);
    const query = (urlObj.searchParams.get('query') || '').toLowerCase();
    const results = query
      ? MOCK_TORRENT_SEARCH_RESULTS.filter(item => item.name?.toLowerCase().includes(query))
      : MOCK_TORRENT_SEARCH_RESULTS;
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'torrent/download') {
    if (options.method === 'POST') {
      try {
        const body = JSON.parse(options.body);
        MOCK_TORRENTS.unshift({
          hash: 'torrent_' + Date.now(),
          name: body.title || body.name || 'New Download',
          size: body.size || 5400000000,
          progress: 0,
          speed: 9500000,
          eta: 580,
          state: 'downloading'
        });
      } catch {
        // Ignore malformed JSON in mock
      }
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return null;
}
