import {
  MOCK_HISTORY,
  MOCK_WATCHED_HISTORY,
  MOCK_PEAKS
} from '../mockHistory';

export function handleHistoryRequests(path) {
  if (path === 'history/peaks-decorated') {
    return new Response(JSON.stringify(MOCK_PEAKS), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'library/watched-history') {
    return new Response(JSON.stringify({
      items: MOCK_WATCHED_HISTORY,
      total: MOCK_WATCHED_HISTORY.length,
      page: 1,
      has_more: false
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'history') {
    return new Response(JSON.stringify({
      items: MOCK_HISTORY,
      total: MOCK_HISTORY.length,
      page: 1,
      has_more: false
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return null;
}
