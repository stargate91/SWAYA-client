import {
  MOCK_MOVIES,
  MOCK_DISCOVER_MOVIES,
  MOCK_SHOWS,
  MOCK_ADULT_SCENES,
  MOCK_PEOPLE
} from '../mockData';

export function handlePeopleRequests(path, options, urlStr) {
  if (path === 'people/enrichment-status') {
    return new Response(JSON.stringify({ active: false, total: 0, processed: 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'people') {
    const urlObj = new URL(urlStr, window.location.origin);
    const query = urlObj.searchParams.get('search') || '';
    let items = [...MOCK_PEOPLE];
    if (query) {
      items = items.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    }
    return new Response(JSON.stringify({
      items,
      total: items.length,
      page: 1,
      page_size: 20,
      pages_count: 1
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('people/')) {
    const parts = path.split('/'); // e.g. ["people", "146"] or ["people", "146", "movies"]
    const personId = parts[1];
    const subPath = parts[2]; // e.g. "movies", "tv", "scenes", "credit-backdrops"
    
    const person = MOCK_PEOPLE.find(p => String(p.id) === String(personId)) || null;

    if (!subPath) {
      return new Response(JSON.stringify(person), {
        status: person ? 200 : 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (subPath === 'status') {
      if (options?.method === 'POST' && person) {
        try {
          const body = JSON.parse(options.body || '{}');
          if ('user_rating' in body) person.user_rating = body.user_rating;
          if ('is_favorite' in body) person.is_favorite = body.is_favorite;
          if ('user_comment' in body) person.user_comment = body.user_comment;
          if ('is_active' in body) person.is_active = body.is_active;
        } catch {
          // ignore
        }
      }
      return new Response(JSON.stringify({ success: true, item: person }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (subPath === 'movies') {
      const allMovies = [...MOCK_MOVIES, ...MOCK_DISCOVER_MOVIES];
      const items = allMovies.filter(m => 
        m.cast?.some(c => String(c.id) === String(personId) || c.name?.toLowerCase() === person?.name?.toLowerCase()) ||
        m.directors?.some(d => String(d.id) === String(personId) || d.name?.toLowerCase() === person?.name?.toLowerCase()) ||
        m.writers?.some(w => String(w.id) === String(personId) || w.name?.toLowerCase() === person?.name?.toLowerCase())
      ).map(m => {
        const castEntry = m.cast?.find(c => String(c.id) === String(personId) || c.name?.toLowerCase() === person?.name?.toLowerCase());
        const dirEntry = m.directors?.find(d => String(d.id) === String(personId) || d.name?.toLowerCase() === person?.name?.toLowerCase());
        const writerEntry = m.writers?.find(w => String(w.id) === String(personId) || w.name?.toLowerCase() === person?.name?.toLowerCase());
        const job = castEntry ? (castEntry.character ? `as ${castEntry.character}` : 'Actor') : (dirEntry ? 'Director' : (writerEntry ? 'Screenplay' : ''));
        return {
          ...m,
          character: castEntry?.character,
          job,
          in_library: m.in_library ?? false
        };
      });

      return new Response(JSON.stringify({
        items,
        total: items.length,
        page: 1,
        page_size: 100,
        pages_count: 1
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (subPath === 'tv') {
      const items = MOCK_SHOWS.filter(s => 
        s.cast?.some(c => String(c.id) === String(personId) || c.name?.toLowerCase() === person?.name?.toLowerCase())
      ).map(s => ({ ...s, in_library: true }));

      return new Response(JSON.stringify({
        items,
        total: items.length,
        page: 1,
        page_size: 100,
        pages_count: 1
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (subPath === 'scenes') {
      const items = MOCK_ADULT_SCENES.filter(sc => 
        sc.performers?.some(p => p.toLowerCase() === person?.name?.toLowerCase())
      ).map(sc => ({ ...sc, in_library: true }));

      return new Response(JSON.stringify({
        items,
        total: items.length,
        page: 1,
        page_size: 100,
        pages_count: 1
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (subPath === 'credit-backdrops') {
      const relatedMovies = [...MOCK_MOVIES, ...MOCK_DISCOVER_MOVIES].filter(m => 
        m.cast?.some(c => String(c.id) === String(personId) || c.name?.toLowerCase() === person?.name?.toLowerCase()) ||
        m.directors?.some(d => String(d.id) === String(personId) || d.name?.toLowerCase() === person?.name?.toLowerCase()) ||
        m.writers?.some(w => String(w.id) === String(personId) || w.name?.toLowerCase() === person?.name?.toLowerCase())
      );
      const movieBackdrops = relatedMovies.map(m => m.backdrop_path).filter(Boolean);
      const knownForBackdrops = (person?.known_for || []).map(k => k.backdrop_path).filter(Boolean);
      const backdrops = [...new Set([...movieBackdrops, ...knownForBackdrops])];
      return new Response(JSON.stringify(backdrops), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return null;
}
