import { MOCK_SETTINGS } from '../mockSettings';

const STORAGE_KEY = 'swaya_demo_settings';

// Hydrate from localStorage if available in browser
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(MOCK_SETTINGS, parsed);
    }
  } catch {
    // ignore
  }
}

export function handleSettingsRequests(path, options) {
  // 1. Validate Folders endpoint
  if (path === 'settings/validate-folders') {
    let payload = {};
    try {
      payload = JSON.parse(options?.body || '{}');
    } catch {
      // ignore
    }

    const { default_scan_dir, folder_library_path, folder_move_to_library, folder_adult_library_path } = payload;
    
    // Check if scan folder is provided
    if (!default_scan_dir || !default_scan_dir.trim()) {
      return new Response(JSON.stringify({
        valid: false,
        message: 'scanDirRequired',
        errors: { scanFolder: 'scanDirRequired' }
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Check if target library folder is provided when move_to_library is enabled
    if (folder_move_to_library && (!folder_library_path || !folder_library_path.trim())) {
      return new Response(JSON.stringify({
        valid: false,
        message: 'libraryDirRequired',
        errors: { targetFolder: 'libraryDirRequired' }
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Check if scan folder and target folder are identical
    if (folder_move_to_library && default_scan_dir.trim().toLowerCase() === folder_library_path.trim().toLowerCase()) {
      return new Response(JSON.stringify({
        valid: false,
        message: 'foldersCannotBeSame',
        errors: { targetFolder: 'foldersCannotBeSame', scanFolder: 'foldersCannotBeSame' }
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({
      valid: true,
      message: 'foldersVerified',
      errors: null
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // 2. Validate API Keys endpoint
  if (path === 'settings/validate-api-keys') {
    return new Response(JSON.stringify({
      tmdb: { valid: true, message: 'API key is valid.' },
      omdb: { valid: true, message: 'API key is valid.' },
      stashdb: { valid: true, message: 'API key is valid.' },
      fansdb: { valid: true, message: 'API key is valid.' },
      theporndb: { valid: true, message: 'API key is valid.' }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // 3. Language Sync endpoint
  if (path === 'settings/sync-language') {
    return new Response(JSON.stringify({
      success: true,
      message: 'Language synced successfully.'
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // 4. Main Settings Get & Save endpoint
  if (path === 'settings') {
    if (options?.method === 'POST') {
      try {
        const body = JSON.parse(options.body || '{}');
        Object.assign(MOCK_SETTINGS, body);
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_SETTINGS));
        }
      } catch {
        // Ignore malformed JSON in mock
      }
    }
    return new Response(JSON.stringify(MOCK_SETTINGS), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 5. Onboarding status
  if (path === 'onboarding/status') {
    return new Response(JSON.stringify({ completed: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 6. Scan, Image & Hydrate statuses
  if (path === 'scan-status') {
    return new Response(JSON.stringify({ active: false, progress: 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === 'image-status' || path === 'hydrate-status' || path === 'collection-status') {
    return new Response(JSON.stringify({ active: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return null;
}
