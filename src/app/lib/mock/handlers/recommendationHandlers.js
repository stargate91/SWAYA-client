import {
  MOCK_MOVIES,
  MOCK_VIDEOS,
  MOCK_SHOWS,
  MOCK_ADULT_SCENES,
  MOCK_PEOPLE,
  MOCK_STUDIOS
} from '../mockData';

export function handleRecommendationRequests(path, options, urlStr) {
  if (path === 'recommendations/recently-added') {
    const urlObj = new URL(urlStr, window.location.origin);
    const type = urlObj.searchParams.get('media_type');
    const includeAdult = urlObj.searchParams.get('include_adult') === 'true' || type === 'scene' || type === 'scenes';
    let items;
    if (includeAdult) {
      if (type === 'scene' || type === 'scenes') {
        items = [...MOCK_ADULT_SCENES];
      } else if (type === 'video' || type === 'videos') {
        items = MOCK_VIDEOS.filter(v => v.is_adult);
      } else if (type === 'movie' || type === 'movies' || type === 'show' || type === 'tv') {
        items = [];
      } else {
        items = [...MOCK_ADULT_SCENES, ...MOCK_VIDEOS.filter(v => v.is_adult)];
      }
    } else {
      if (type === 'movie' || type === 'movies') {
        items = [...MOCK_MOVIES];
      } else if (type === 'video' || type === 'videos') {
        items = MOCK_VIDEOS.filter(v => !v.is_adult);
      } else if (type === 'show' || type === 'tv') {
        items = [...MOCK_SHOWS];
      } else if (type === 'scene' || type === 'scenes') {
        items = [];
      } else {
        items = [...MOCK_MOVIES, ...MOCK_VIDEOS.filter(v => !v.is_adult), ...MOCK_SHOWS];
      }
    }
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'recommendations/recently-activated-people') {
    const urlObj = new URL(urlStr, window.location.origin);
    const includeAdult = urlObj.searchParams.get('include_adult') === 'true';
    const items = MOCK_PEOPLE.filter(p => includeAdult ? Boolean(p.is_adult) : !p.is_adult);
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'recommendations/recently-followed-studios') {
    const urlObj = new URL(urlStr, window.location.origin);
    const includeAdult = urlObj.searchParams.get('include_adult') === 'true';
    const items = MOCK_STUDIOS.filter(s => includeAdult ? Boolean(s.is_adult) : !s.is_adult);
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 1. Studio listing
  if (path === 'metadata/studios' || path === 'metadata/studios/') {
    const urlObj = new URL(urlStr, window.location.origin);
    const includeAdult = urlObj.searchParams.get('include_adult') === 'true';
    const items = MOCK_STUDIOS.filter(s => includeAdult ? Boolean(s.is_adult) : !s.is_adult);
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

  // 2. Studio detail, status & discover
  if (path.startsWith('metadata/studios/')) {
    const parts = path.split('/'); // e.g. ["metadata", "studios", "174", "discover"]
    const studioId = parts[2];
    const subAction = parts[3];

    const studio = MOCK_STUDIOS.find(s => String(s.id) === String(studioId)) || null;

    if (subAction === 'status') {
      if (options.method === 'POST' && studio) {
        try {
          const body = JSON.parse(options.body || '{}');
          if ('is_active' in body) studio.is_active = body.is_active;
          if ('is_favorite' in body || 'isFavorite' in body) studio.is_favorite = body.is_favorite ?? body.isFavorite;
          if ('user_rating' in body || 'userRating' in body) studio.user_rating = body.user_rating ?? body.userRating;
          if ('user_comment' in body || 'userComment' in body) studio.user_comment = body.user_comment ?? body.userComment;
        } catch {
          // ignore parse error
        }
      }
      return new Response(JSON.stringify({ success: true, item: studio, is_active: studio?.is_active ?? true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (subAction === 'discover') {
      const urlObj = new URL(urlStr, window.location.origin);
      const mediaType = urlObj.searchParams.get('media_type') || 'movies';
      
      let items = [];
      if (mediaType === 'tv') {
        items = MOCK_SHOWS.filter(s => s.studios?.some(st => String(st.id) === String(studioId) || st.name === studio?.name) || s.companies?.some(c => String(c.id) === String(studioId) || c.name === studio?.name));
      } else if (mediaType === 'scenes') {
        items = MOCK_ADULT_SCENES.filter(sc => String(sc.studio_id) === String(studioId) || sc.studio === studio?.name);
      } else {
        items = MOCK_MOVIES.filter(m => m.studios?.some(st => String(st.id) === String(studioId) || st.name === studio?.name) || m.companies?.some(c => String(c.id) === String(studioId) || c.name === studio?.name));
      }

      return new Response(JSON.stringify({
        items,
        total: items.length,
        page: 1,
        page_size: 24,
        pages_count: 1
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Default studio detail
    return new Response(JSON.stringify(studio), {
      status: studio ? 200 : 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'recommendations/discover') {
    return new Response(JSON.stringify(MOCK_MOVIES), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'recommendations/discover/adult') {
    return new Response(JSON.stringify(MOCK_ADULT_SCENES), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'recommendations') {
    const urlObj = new URL(urlStr, window.location.origin);
    const includeAdult = urlObj.searchParams.get('include_adult') === 'true';
    if (includeAdult) {
      const resumeItems = MOCK_ADULT_SCENES.filter(item => (item.resume_position || 0) > 0);
      return new Response(JSON.stringify({
        spotlight: MOCK_ADULT_SCENES[0] || null,
        trending: MOCK_ADULT_SCENES,
        continue_watching: resumeItems,
        recently_added: MOCK_ADULT_SCENES,
        discover_adult_providers: {
          stashdb: MOCK_ADULT_SCENES,
          fansdb: [],
          theporndb: []
        },
        discover_adult: MOCK_ADULT_SCENES,
        watchlist_item_ids: []
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const resumeItems = [...MOCK_MOVIES, ...MOCK_SHOWS].filter(
      item => (item.resume_position || 0) > 0
    );
    return new Response(JSON.stringify({
      spotlight: MOCK_MOVIES[0] || MOCK_SHOWS[0] || null,
      trending: [...MOCK_MOVIES, ...MOCK_SHOWS],
      continue_watching: resumeItems,
      recently_added: [...MOCK_MOVIES, ...MOCK_SHOWS],
      watchlist_item_ids: []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return null;
}
