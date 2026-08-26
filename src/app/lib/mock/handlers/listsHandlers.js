import { MOCK_LISTS } from '../mockLists';

function enrichList(list) {
  if (!list) return list;
  const items = list.items || [];
  const sample_posters = (list.sample_posters && list.sample_posters.length > 0)
    ? list.sample_posters
    : items.map(i => i.poster_path || i.still_path).filter(Boolean).slice(0, 4);

  return {
    ...list,
    sample_posters,
    item_count: items.length || list.item_count || list.items_count || 0,
    items_count: items.length || list.items_count || list.item_count || 0
  };
}

export function handleListsRequests(path) {
  if (path === 'watchlist') {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('watchlist/')) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'lists') {
    const enriched = MOCK_LISTS.map(enrichList);
    return new Response(JSON.stringify(enriched), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('lists/')) {
    const listId = path.split('/')[1];
    const found = MOCK_LISTS.find(l => String(l.id) === String(listId)) || MOCK_LISTS[0] || {
      id: Number(listId) || 1,
      name: 'Watchlist',
      description: 'Default Watchlist',
      is_adult: false,
      items_count: 0,
      items: []
    };
    return new Response(JSON.stringify(enrichList(found)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('lists/item-membership')) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return null;
}
