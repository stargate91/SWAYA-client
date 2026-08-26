import {
  MOCK_MOVIES,
  MOCK_DISCOVER_MOVIES,
  MOCK_VIDEOS,
  MOCK_SHOWS,
  MOCK_ADULT_SCENES,
  MOCK_PEOPLE,
  MOCK_STUDIOS,
  MOCK_COLLECTIONS,
  MOCK_TAGS
} from '../mockData';
import { computeLibraryStats, computeRatingsStats } from '../statsCalculator';

const getOrigin = () => (typeof window !== 'undefined' && window?.location?.origin ? window.location.origin : 'http://localhost');

export function handleLibraryRequests(path, options, urlStr) {
  // 1. Collections
  if (path === 'library/collections') {
    const urlObj = new URL(urlStr, getOrigin());
    const includeAdult = urlObj.searchParams.get('include_adult') === 'true' || urlObj.searchParams.get('tab') === 'adult';
    const items = MOCK_COLLECTIONS.filter(c => includeAdult ? Boolean(c.is_adult) : !c.is_adult);
    return new Response(JSON.stringify({
      items,
      total: items.length,
      page: 1,
      page_size: 40,
      pages_count: 1
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 1.1 Single Collection detail
  if (path.startsWith('library/collection/')) {
    const collectionId = path.split('/')[2];
    const collection = MOCK_COLLECTIONS.find(c => String(c.id) === String(collectionId) || String(c.tmdb_id) === String(collectionId)) || null;
    return new Response(JSON.stringify(collection), {
      status: collection ? 200 : 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 2. Studio detail
  if (path.startsWith('library/studio/')) {
    const studioId = path.split('/')[2];
    const studio = MOCK_STUDIOS.find(s => String(s.id) === String(studioId)) || null;
    return new Response(JSON.stringify(studio), {
      status: studio ? 200 : 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 3. Main library catalog grid
  if (path === 'library') {
    const urlObj = new URL(urlStr, getOrigin());
    const tab = urlObj.searchParams.get('tab') || urlObj.searchParams.get('media_type');
    const query = urlObj.searchParams.get('q') || urlObj.searchParams.get('search') || '';
    const includeAdult = urlObj.searchParams.get('include_adult') === 'true' || (tab && tab.includes('adult'));
    const studioId = urlObj.searchParams.get('selected_studio_id');
    const tagParam = urlObj.searchParams.get('tag') || urlObj.searchParams.get('selected_tag_id');
    const genreParam = urlObj.searchParams.get('genre');
    const sortBy = urlObj.searchParams.get('sortBy') || urlObj.searchParams.get('sort_by') || '';

    let items;
    if (tab === 'movie' || tab === 'movies') {
      items = [...MOCK_MOVIES];
    } else if (tab === 'adult') {
      items = [];
    } else if (tab === 'video' || tab === 'videos') {
      items = MOCK_VIDEOS.filter(v => !v.is_adult);
    } else if (tab === 'adult_videos') {
      items = MOCK_VIDEOS.filter(v => v.is_adult);
    } else if (tab === 'show' || tab === 'tv') {
      items = [...MOCK_SHOWS];
    } else if (tab === 'adult_tv') {
      items = [];
    } else if (tab === 'adult_scene' || tab === 'scenes' || tab === 'adult_scenes') {
      items = [...MOCK_ADULT_SCENES];
    } else if (tab === 'people') {
      items = MOCK_PEOPLE.filter(p => !p.is_adult);
    } else if (tab === 'adult_people') {
      items = MOCK_PEOPLE.filter(p => p.is_adult);
    } else if (tab === 'studios') {
      items = MOCK_STUDIOS.filter(s => !s.is_adult);
    } else if (tab === 'adult_studios') {
      items = MOCK_STUDIOS.filter(s => s.is_adult);
    } else {
      // Mixed view
      if (includeAdult) {
        items = [...MOCK_ADULT_SCENES, ...MOCK_VIDEOS.filter(v => v.is_adult)];
      } else {
        items = [...MOCK_MOVIES, ...MOCK_VIDEOS.filter(v => !v.is_adult), ...MOCK_SHOWS];
      }
    }

    const filterRating = urlObj.searchParams.get('filter_rating');
    if (filterRating === 'rated') {
      items = items.filter(item => (Number(item.user_rating) > 0) || (typeof item.user_comment === 'string' && item.user_comment.trim().length > 0));
    } else if (filterRating === 'unrated') {
      items = items.filter(item => !(Number(item.user_rating) > 0) && !(typeof item.user_comment === 'string' && item.user_comment.trim().length > 0));
    }

    const filterGender = urlObj.searchParams.get('filter_gender');
    if (filterGender && filterGender !== 'all') {
      if (filterGender === 'female' || String(filterGender) === '1') {
        items = items.filter(p => p.gender === 1 || p.gender === 'female');
      } else if (filterGender === 'male' || String(filterGender) === '2') {
        items = items.filter(p => p.gender === 2 || p.gender === 'male');
      }
    }

    const filterStatus = urlObj.searchParams.get('filter_status');
    if (filterStatus === 'active') {
      items = items.filter(item => item.is_active !== false);
    } else if (filterStatus === 'favorite') {
      items = items.filter(item => Boolean(item.is_favorite));
    } else if (filterStatus === 'watched') {
      items = items.filter(item => Boolean(item.is_watched));
    } else if (filterStatus === 'unwatched') {
      items = items.filter(item => !item.is_watched);
    }

    const filterOwnership = urlObj.searchParams.get('filter_ownership');
    if (filterOwnership === 'in_library') {
      items = items.filter(item => Boolean(item.in_library));
    }

    if (studioId) {
      items = items.filter(item =>
        item.companies?.some(c => String(c.id) === String(studioId) || c.name?.toLowerCase() === studioId.toLowerCase()) ||
        item.studios?.some(s => String(s.id) === String(studioId) || s.name?.toLowerCase() === studioId.toLowerCase()) ||
        String(item.studio_id) === String(studioId) ||
        item.studio?.toLowerCase() === studioId.toLowerCase()
      );
    }

    if (tagParam) {
      items = items.filter(item =>
        item.tags?.some(t => (typeof t === 'string' ? t.toLowerCase() === tagParam.toLowerCase() : String(t.id) === String(tagParam) || t.name?.toLowerCase() === tagParam.toLowerCase()))
      );
    }

    if (genreParam) {
      items = items.filter(item => item.genres?.includes(genreParam));
    }

    if (query) {
      items = items.filter(item => {
        const name = item.title || item.name || '';
        return name.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (sortBy) {
      if (sortBy === 'rating_desc' || sortBy === 'user_rating_desc') {
        items.sort((a, b) => (Number(b.user_rating) || 0) - (Number(a.user_rating) || 0));
      } else if (sortBy === 'rating_asc' || sortBy === 'user_rating_asc') {
        items.sort((a, b) => (Number(a.user_rating) || 0) - (Number(b.user_rating) || 0));
      } else if (sortBy === 'comment_desc') {
        items.sort((a, b) => (b.user_comment || '').localeCompare(a.user_comment || ''));
      } else if (sortBy === 'comment_asc') {
        items.sort((a, b) => (a.user_comment || '').localeCompare(b.user_comment || ''));
      } else if (sortBy.includes('release_date') || sortBy.includes('year')) {
        const isDesc = sortBy.includes('desc') || !sortBy.includes('asc');
        items.sort((a, b) => isDesc ? ((b.year || 0) - (a.year || 0)) : ((a.year || 0) - (b.year || 0)));
      } else if (sortBy.includes('rating')) {
        const isDesc = sortBy.includes('desc') || !sortBy.includes('asc');
        const getR = (x) => x.rating_tmdb || x.user_rating || x.rating || 0;
        items.sort((a, b) => isDesc ? (getR(b) - getR(a)) : (getR(a) - getR(b)));
      } else if (sortBy.includes('title') || sortBy.includes('name')) {
        const isDesc = sortBy.includes('desc');
        items.sort((a, b) => {
          const tA = (a.title || a.name || '').toLowerCase();
          const tB = (b.title || b.name || '').toLowerCase();
          return isDesc ? tB.localeCompare(tA) : tA.localeCompare(tB);
        });
      }
    }

    const counts = {
      movies: MOCK_MOVIES.length,
      tv: MOCK_SHOWS.length,
      collections: MOCK_COLLECTIONS.filter(c => !c.is_adult).length,
      people: MOCK_PEOPLE.filter(p => !p.is_adult).length,
      studios: MOCK_STUDIOS.filter(s => !s.is_adult).length,
      videos: MOCK_VIDEOS.filter(v => !v.is_adult).length,
      adult: 0,
      adult_tv: 0,
      adult_collections: MOCK_COLLECTIONS.filter(c => c.is_adult).length,
      adult_people: MOCK_PEOPLE.filter(p => p.is_adult).length,
      adult_studios: MOCK_STUDIOS.filter(s => s.is_adult).length,
      adult_scenes: MOCK_ADULT_SCENES.length,
      adult_videos: MOCK_VIDEOS.filter(v => v.is_adult).length
    };

    const page = Math.max(1, Number(urlObj.searchParams.get('page') || 1));
    const pageSize = Math.max(1, Number(urlObj.searchParams.get('pageSize') || urlObj.searchParams.get('page_size') || urlObj.searchParams.get('limit') || 40));
    const total = items.length;
    const start = (page - 1) * pageSize;
    const paginatedItems = items.slice(start, start + pageSize);

    return new Response(JSON.stringify({
      items: paginatedItems,
      total,
      total_items: total,
      page,
      page_size: pageSize,
      pages_count: Math.max(1, Math.ceil(total / pageSize)),
      counts
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 4. Statistics
  if (path === 'library/stats' || path.startsWith('library/stats?')) {
    const urlObj = new URL(urlStr, getOrigin());
    const isNsfw = urlObj.searchParams.get('is_nsfw') === 'true' || urlObj.searchParams.get('include_adult') === 'true';
    const stats = computeLibraryStats(isNsfw);
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'library/ratings/stats' || path.startsWith('library/ratings/stats?')) {
    const urlObj = new URL(urlStr, getOrigin());
    const isNsfw = urlObj.searchParams.get('is_nsfw') === 'true' || urlObj.searchParams.get('include_adult') === 'true';
    const stats = computeRatingsStats(isNsfw);
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 5. Continue watching
  if (path === 'library/continue-watching') {
    const urlObj = new URL(urlStr, getOrigin());
    const includeAdult = urlObj.searchParams.get('include_adult') === 'true';
    const pool = includeAdult
      ? [...MOCK_ADULT_SCENES, ...MOCK_VIDEOS.filter(v => v.is_adult)]
      : [...MOCK_MOVIES, ...MOCK_VIDEOS.filter(v => !v.is_adult), ...MOCK_SHOWS];
    const resumeItems = pool.filter(
      item => (item.resume_position || 0) > 0
    );
    return new Response(JSON.stringify({
      items: resumeItems
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 6. Filters & tags
  if (path === 'library/filters') {
    const urlObj = new URL(urlStr, getOrigin());
    const includeAdult = urlObj.searchParams.get('include_adult') === 'true' || (urlObj.searchParams.get('tab') && urlObj.searchParams.get('tab').includes('adult'));
    const pool = includeAdult
      ? [...MOCK_ADULT_SCENES, ...MOCK_VIDEOS.filter(v => v.is_adult)]
      : [...MOCK_MOVIES, ...MOCK_VIDEOS.filter(v => !v.is_adult), ...MOCK_SHOWS];
    const genres = Array.from(new Set(pool.flatMap(m => m.genres || [])));
    const years = Array.from(new Set(pool.map(m => m.year).filter(Boolean))).sort((a, b) => b - a);
    const studioList = MOCK_STUDIOS.filter(s => includeAdult ? Boolean(s.is_adult) : !s.is_adult);
    const studios = studioList.map(s => s.name || s.title).filter(Boolean);
    return new Response(JSON.stringify({
      genres,
      years,
      studios
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'tags' || path === 'library/tags') {
    const urlObj = new URL(urlStr, getOrigin());
    const includeAdult = urlObj.searchParams.get('include_adult') === 'true' || urlObj.searchParams.get('session_mode') === 'nsfw';
    const items = MOCK_TAGS.filter(t => includeAdult ? Boolean(t.is_adult) : !t.is_adult);
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 7. TV Show detail & seasons/episodes
  if (path.startsWith('library/tv/')) {
    const showId = path.split('/')[2];
    const show = MOCK_SHOWS.find(s => String(s.id) === String(showId) || String(s.tv_tmdb_id) === String(showId)) || null;
    return new Response(JSON.stringify(show), {
      status: show ? 200 : 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('metadata/tv/')) {
    const parts = path.split('/'); // ["metadata", "tv", "123", "seasons"] or ["metadata", "tv", "123", "season", "1", "episodes"]
    const tvId = parts[2];
    const show = MOCK_SHOWS.find(s => String(s.id) === String(tvId) || String(s.tv_tmdb_id) === String(tvId)) || null;

    if (parts[3] === 'seasons') {
      const seasons = show?.seasons || [];
      return new Response(JSON.stringify(seasons), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (parts[3] === 'season' && parts[5] === 'episodes') {
      const seasonNumber = Number(parts[4]) || 1;
      const season = show?.seasons?.find(s => Number(s.season_number) === seasonNumber);
      const episodes = season?.episodes || [];
      return new Response(JSON.stringify(episodes), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // 8. Playback progress update
  if (path === 'media/progress') {
    if (options.method === 'POST') {
      try {
        const body = JSON.parse(options.body);
        const itemId = body.item_id || body.id;
        const target = [...MOCK_MOVIES, ...MOCK_VIDEOS, ...MOCK_SHOWS, ...MOCK_ADULT_SCENES].find(i => String(i.id) === String(itemId));
        if (target) {
          target.resume_position = body.position || body.resume_position || 0;
          if (body.duration) target.duration = body.duration;
        }
      } catch {
        // ignore parse error
      }
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'media/active-sessions' || path === 'active-sessions') {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('media/playback-info/')) {
    return new Response(JSON.stringify({
      has_stream: false,
      stream_url: null,
      resume_position: 0,
      audio_tracks: [],
      subtitle_tracks: []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'media/play') {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 9. Single media item detail
  if (path.startsWith('library/item')) {
    const urlObj = new URL(urlStr, getOrigin());
    const itemId = urlObj.searchParams.get('item_id') || urlObj.searchParams.get('external_id') || path.split('/').pop();
    
    const found = [...MOCK_MOVIES, ...MOCK_DISCOVER_MOVIES, ...MOCK_VIDEOS, ...MOCK_SHOWS, ...MOCK_ADULT_SCENES].find(item => {
      const rawId = String(item.id);
      const tmdbId = String(item.tmdb_id || item.tv_tmdb_id || '');
      const queryId = String(itemId);
      return rawId === queryId || tmdbId === queryId || queryId.endsWith(`_${rawId}`) || queryId.endsWith(`_${tmdbId}`);
    });

    if (!found) {
      return new Response(JSON.stringify(null), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(found), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 10. Update item status/rating/favorite/comment
  if (path.startsWith('item/') && path.endsWith('/status')) {
    const itemId = path.split('/')[1];
    const target = [...MOCK_MOVIES, ...MOCK_DISCOVER_MOVIES, ...MOCK_VIDEOS, ...MOCK_SHOWS, ...MOCK_ADULT_SCENES].find(item => {
      const rawId = String(item.id);
      const tmdbId = String(item.tmdb_id || item.tv_tmdb_id || '');
      const queryId = String(itemId);
      return rawId === queryId || tmdbId === queryId || queryId.endsWith(`_${rawId}`) || queryId.endsWith(`_${tmdbId}`);
    });

    if (options?.method === 'POST' && target) {
      try {
        const body = JSON.parse(options.body || '{}');
        if ('user_rating' in body) target.user_rating = body.user_rating;
        if ('is_favorite' in body) target.is_favorite = body.is_favorite;
        if ('is_watched' in body) target.is_watched = body.is_watched;
        if ('user_comment' in body) target.user_comment = body.user_comment;
      } catch {
        // ignore
      }
    }
    return new Response(JSON.stringify({ success: true, item: target }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return null;
}
