import { test, expect } from '@playwright/test';
import { setupApiMocks } from './mocks/apiMocks.js';

test.describe('Swaya UI Smoke Test with Mocked API', () => {
  test.beforeEach(async ({ page }) => {
    // Enable backend API mocking
    await setupApiMocks(page);
  });

  test('should load app, navigate through sidebar, and verify mock data rendering', async ({ page }) => {
    // Listen for uncaught exceptions in the page
    page.on('pageerror', exception => {
      console.log(`PAGE ERROR: ${exception.stack || exception.message}`);
    });
    page.on('console', msg => {
      console.log(`PAGE CONSOLE [${msg.type()}]: ${msg.text()}`);
    });
    page.on('requestfailed', request => {
      console.log(`REQUEST FAILED: ${request.url()} - ${request.failure()?.errorText || 'unknown error'}`);
    });
    page.on('requestfinished', request => {
      try {
        const response = request.response();
        if (response && typeof response.status === 'function' && response.status() >= 400) {
          console.log(`REQUEST STATUS ${response.status()}: ${request.url()}`);
        }
      } catch {
        // Ignored
      }
    });

    // 1. Load the app
    await page.goto('/');

    // Verify sidebar is present
    const sidebar = page.locator('.shell__sidebar');
    try {
      await expect(sidebar).toBeVisible({ timeout: 30000 });
    } catch (e) {
      console.log("TEST FAILED. CURRENT URL:", page.url());
      console.log("HTML CONTENT:", await page.content());
      await page.screenshot({ path: 'test-failure.png' });
      throw e;
    }

    // 2. We should be on Dashboard first. Check if mock recommendations render
    await expect(page).toHaveURL(/.*dashboard/);
    const mockMovieText = page.locator('text=Mock Movie 1').first();
    await expect(mockMovieText).toBeVisible();

    // 3. Define the remaining navigation items and check their paths
    const navItems = [
      { path: '/organizer', label: 'Organizer' },
      { path: '/library', label: 'Library' },
      { path: '/lists', label: 'Lists' },
      { path: '/my-ratings', label: 'Ratings' },
      { path: '/history', label: 'History' },
      { path: '/settings', label: 'Settings' }
    ];

    for (const item of navItems) {
      const linkSelector = `aside.shell__sidebar a[href*="${item.path}"]`;
      const navLink = page.locator(linkSelector);
      
      await expect(navLink).toBeVisible();
      await navLink.click();

      // Expect URL to match path
      await expect(page).toHaveURL(new RegExp(item.path));
    }
  });

  test('should scan folder and display candidates in organizer', async ({ page }) => {
    // 1. Navigate to Organizer page directly
    await page.goto('/#/organizer');

    // 2. Locate and click the "Browse & Scan" button
    const scanButton = page.locator('button:has-text("Browse & Scan")');
    await expect(scanButton).toBeVisible({ timeout: 15000 });
    await scanButton.click();

    // 3. Verify that the scanning state triggers and eventually resolves, populating the candidates
    const candidateMovieCard = page.locator('text=Mock Scan Candidate Movie').first();
    try {
      await expect(candidateMovieCard).toBeVisible({ timeout: 15000 });
    } catch (e) {
      console.log("ORGANIZER TEST FAILED. CURRENT URL:", page.url());
      console.log("HTML CONTENT:", await page.content());
      await page.screenshot({ path: 'organizer-test-failure.png' });
      throw e;
    }
  });

  test('should load player page and display video title', async ({ page }) => {
    // Navigate directly to player page for item 101
    await page.goto('/#/player/101');

    // Locate the player title
    const playerTitle = page.locator('.player-page__title');
    
    // Verify it is visible and contains mock title
    await expect(playerTitle).toBeVisible({ timeout: 15000 });
    await expect(playerTitle).toHaveText('Mock Movie 1');
  });
});
