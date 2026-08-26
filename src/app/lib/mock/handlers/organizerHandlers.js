import { MOCK_ORGANIZER_FILES } from '../mockOrganizer';
import { MOCK_HISTORY } from '../mockHistory';

export function handleOrganizerRequests(path, options, urlStr) {
  // 1. Organizer file queue
  if (path === 'organizer' || path.startsWith('organizer?')) {
    const urlObj = new URL(urlStr || `http://localhost/${path}`, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const tab = urlObj.searchParams.get('tab') || 'manual';
    const subTab = urlObj.searchParams.get('sub_tab') || 'all';
    const sessionMode = urlObj.searchParams.get('session_mode') || 'sfw';
    const isNsfw = sessionMode === 'nsfw';
    const query = (urlObj.searchParams.get('q') || '').toLowerCase();

    // Base list filtered by session mode
    let allFiles = MOCK_ORGANIZER_FILES.filter(f => {
      if (isNsfw) return Boolean(f.is_adult || f.is_scene);
      return !f.is_adult && !f.is_scene;
    });

    // Compute tab counts
    const tab_counts = {
      moviesCount: allFiles.filter(f => f.is_movie && !f.is_manual && f.type !== 'extra' && f.rawType !== 'extra').length,
      episodesCount: allFiles.filter(f => f.is_tv && !f.is_manual && f.type !== 'extra' && f.rawType !== 'extra').length,
      scenesCount: allFiles.filter(f => f.is_scene && !f.is_manual && f.type !== 'extra' && f.rawType !== 'extra').length,
      manualCount: allFiles.filter(f => f.is_manual && f.type !== 'extra' && f.rawType !== 'extra').length,
      manualMoviesCount: allFiles.filter(f => f.is_manual && f.is_movie).length,
      manualEpisodesCount: allFiles.filter(f => f.is_manual && f.is_tv).length,
      manualScenesCount: allFiles.filter(f => f.is_manual && f.is_scene).length,
      extrasCount: allFiles.filter(f => f.type === 'extra' || f.rawType === 'extra').length
    };

    // Filter items based on active tab
    let items = [];
    if (tab === 'manual') {
      items = allFiles.filter(f => f.is_manual && f.type !== 'extra' && f.rawType !== 'extra');
      if (subTab === 'movies') items = items.filter(f => f.is_movie);
      else if (subTab === 'episodes' || subTab === 'tv') items = items.filter(f => f.is_tv);
      else if (subTab === 'scenes') items = items.filter(f => f.is_scene);
    } else if (tab === 'movies') {
      items = allFiles.filter(f => f.is_movie && !f.is_manual && f.type !== 'extra' && f.rawType !== 'extra');
    } else if (tab === 'episodes' || tab === 'tv') {
      items = allFiles.filter(f => f.is_tv && !f.is_manual && f.type !== 'extra' && f.rawType !== 'extra');
    } else if (tab === 'scenes') {
      items = allFiles.filter(f => f.is_scene && !f.is_manual && f.type !== 'extra' && f.rawType !== 'extra');
    } else if (tab === 'extras') {
      items = allFiles.filter(f => f.type === 'extra' || f.rawType === 'extra');
      if (subTab && subTab !== 'all') {
        items = items.filter(f => f.subtype === subTab);
      }
    } else {
      // Fallback
      items = allFiles.filter(f => !f.is_manual);
    }

    if (query) {
      items = items.filter(f =>
        f.filename?.toLowerCase().includes(query) ||
        f.source_filename?.toLowerCase().includes(query) ||
        f.target_filename?.toLowerCase().includes(query) ||
        f.title?.toLowerCase().includes(query)
      );
    }

    const page = Math.max(1, Number(urlObj.searchParams.get('page') || 1));
    const pageSize = Math.max(1, Number(urlObj.searchParams.get('page_size') || urlObj.searchParams.get('pageSize') || 50));
    const total = items.length;
    const start = (page - 1) * pageSize;
    const paginatedItems = items.slice(start, start + pageSize);

    return new Response(JSON.stringify({
      items: paginatedItems,
      total,
      page,
      page_size: pageSize,
      pages_count: Math.max(1, Math.ceil(total / pageSize)),
      tab_counts
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'organizer/count') {
    return new Response(JSON.stringify({ count: MOCK_ORGANIZER_FILES.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 2. Rename Dry-Run Preview
  if (path === 'organizer/rename-preview') {
    const previewItems = MOCK_ORGANIZER_FILES.map((file, idx) => ({
      id: file.id || idx + 1,
      original_path: file.current_path || file.path || file.filename || `C:\\Downloads\\Sample.File.${idx + 1}.mkv`,
      new_path: file.planned_path || `D:\\Media\\Library\\Movies\\${file.title || 'Movie'} (${file.year || 2024})\\${file.title || 'Movie'} (${file.year || 2024}).mkv`,
      status: file.status || 'ready',
      match_title: file.title || 'Matched Movie',
      match_year: file.year || 2024
    }));

    return new Response(JSON.stringify({
      items: previewItems,
      total: previewItems.length,
      ready_count: previewItems.filter(i => i.status === 'ready').length,
      conflict_count: 0
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 3. Batch Rename execution
  if (path === 'rename/start') {
    const batchId = `batch_${Date.now()}`;
    const renamedItems = MOCK_ORGANIZER_FILES.map((file, idx) => ({
      original_path: file.current_path || file.path || file.filename || `C:\\Downloads\\Sample.${idx + 1}.mkv`,
      new_path: file.planned_path || `D:\\Media\\Library\\Movies\\${file.title || 'Movie'} (${file.year || 2024})\\${file.title || 'Movie'} (${file.year || 2024}).mkv`,
      status: 'success'
    }));

    // Add to Mock History
    MOCK_HISTORY.unshift({
      id: batchId,
      name: `Batch Rename - ${renamedItems.length || 1} items`,
      created_at: new Date().toISOString(),
      success_count: renamedItems.length,
      failed_count: 0,
      items: renamedItems
    });

    // Clear processed files from queue
    const processedCount = MOCK_ORGANIZER_FILES.length;
    MOCK_ORGANIZER_FILES.length = 0;

    return new Response(JSON.stringify({
      success: true,
      batch_id: batchId,
      processed_count: processedCount,
      success_count: processedCount,
      failed_count: 0
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 4. Undo Rename Batch
  if (path.startsWith('rename/undo/')) {
    const batchId = path.split('/')[2];
    const idx = MOCK_HISTORY.findIndex(b => b.id === batchId);
    if (idx !== -1) {
      MOCK_HISTORY.splice(idx, 1);
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 5. Delete from scanner
  if (path === 'organizer/delete') {
    if (options.method === 'POST') {
      try {
        const body = JSON.parse(options.body);
        const itemIds = body.item_ids || [];
        if (itemIds.length > 0) {
          const idSet = new Set(itemIds.map(String));
          const remaining = MOCK_ORGANIZER_FILES.filter(f => !idSet.has(String(f.id)));
          MOCK_ORGANIZER_FILES.length = 0;
          MOCK_ORGANIZER_FILES.push(...remaining);
        }
      } catch {
        // ignore parse error
      }
    }
    return new Response(JSON.stringify({ success: true, count: MOCK_ORGANIZER_FILES.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 6. Manual match candidates search
  if (path.startsWith('organizer/search-candidates')) {
    return new Response(JSON.stringify({
      results: [
        {
          id: 693134,
          title: 'Dune: Part Two',
          year: 2024,
          poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
          overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen.'
        },
        {
          id: 872585,
          title: 'Oppenheimer',
          year: 2023,
          poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
          overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb.'
        }
      ]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 7. Scan start, retry & task control
  if (path === 'scan' || path === 'scan/retry') {
    return new Response(JSON.stringify({
      success: true,
      message: 'Scan complete',
      processed: MOCK_ORGANIZER_FILES.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'task/stop') {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return null;
}
