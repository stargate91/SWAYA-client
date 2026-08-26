/**
 * Playwright API Mocking Helper
 */
export async function setupApiMocks(page) {
  // Stateful scan variables
  let scanActive = false;
  let scanPollCount = 0;
  let lastCompleted = 0;

  // Inject mock Electron API
  await page.addInitScript(() => {
    window.require = (moduleName) => {
      if (moduleName === 'electron') {
        return {
          ipcRenderer: {
            send: () => { },
            invoke: async (channel) => {
              if (channel === 'select-folder') {
                return 'D:/MockScanFolder';
              }
              return null;
            },
            on: () => { },
            off: () => { },
            removeListener: () => { }
          }
        };
      }
      throw new Error(`Cannot find module '${moduleName}'`);
    };
  });

  // Intercept all requests directed to the backend API base URL
  await page.route('http://localhost:8000/api/**', async (route) => {
    const url = route.request().url();
    const method = route.request().method();
    console.log(`[MOCK API] Intercepted request: ${method} ${url}`);

    if (url.includes('settings')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          include_adult: false,
          theme: 'classic-dark',
          language: 'en',
          onboarding_completed: true,
        }),
      });
    }

    if (url.includes('recommendations')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          watchlist_item_ids: [101, 102],
          trending: [
            { id: 101, title: 'Mock Movie 1', poster_path: null, media_type: 'movie' }
          ],
          discover_movies: [
            { id: 101, title: 'Mock Movie 1', poster_path: null, media_type: 'movie' }
          ],
          discover_tv: [
            { id: 102, name: 'Mock Show 1', poster_path: null, media_type: 'tv' }
          ]
        }),
      });
    }

    if (url.includes('continue-watching')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    }

    if (url.includes('lists')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    }

    // Scan Status
    if (url.includes('scan-status')) {
      if (scanActive) {
        scanPollCount++;
        if (scanPollCount >= 3) {
          scanActive = false;
          lastCompleted = Date.now();
          return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              active: false,
              phase: 'idle',
              last_completed: lastCompleted,
            }),
          });
        } else {
          return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              active: true,
              phase: 'resolving',
              progress: scanPollCount * 33,
              processed_files: scanPollCount,
              total_files: 3,
              last_completed: lastCompleted,
            }),
          });
        }
      } else {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            active: false,
            phase: 'idle',
            last_completed: lastCompleted,
          }),
        });
      }
    }

    // Start Scan (POST to /api/scan)
    if (url.includes('scan') && !url.includes('scan-status')) {
      if (method === 'POST') {
        scanActive = true;
        scanPollCount = 0;
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 'success' }),
        });
      }
    }

    // Organizer count
    if (url.includes('organizer/count')) {
      const count = lastCompleted > 0 ? 1 : 0;
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ count }),
      });
    }

    // Organizer candidates list
    if (url.includes('organizer')) {
      if (lastCompleted > 0) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            manual: [
              {
                id: 'movie-candidate-1',
                type: 'movie',
                current_path: 'D:/MockScanFolder/Mock Scan Candidate Movie (2026).mp4',
                filename: 'Mock Scan Candidate Movie (2026).mp4',
                title: 'Mock Scan Candidate Movie',
                year: '2026',
                status: 'uncertain',
                scan_mode: 'movies_tv',
              }
            ],
            movies: [],
            tv: [],
            extras: [],
            collisions: []
          }),
        });
      } else {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            manual: [],
            movies: [],
            tv: [],
            extras: [],
            collisions: []
          }),
        });
      }
    }

    if (url.includes('playback-info')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          title: 'Mock Movie 1',
          file_path: 'D:/Movies/Mock Movie 1.mp4',
          is_adult: false,
          media_type: 'movie',
          user_rating: 4,
          start_seconds: 120,
        }),
      });
    }

    // Default fallback for any other backend API calls
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });
}
