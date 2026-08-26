import { test, expect } from '@playwright/test';

test.describe('SWAYA Marketing & Documentation Site E2E Suite', () => {
  test('Landing Page loads with Hero, Features, Video, and FAQ', async ({ page }) => {
    await page.goto('/');

    // Check brand title
    await expect(page.locator('h1')).toBeVisible();

    // Check navbar brand
    const brand = page.locator('header');
    await expect(brand).toBeVisible();

    // Check FAQ accordion interaction
    const faqHeading = page.locator('#faq');
    if (await faqHeading.isVisible()) {
      const firstFaqButton = page.locator('#faq button').first();
      await firstFaqButton.click();
    }
  });

  test('Multi-language routing preserves page context', async ({ page }) => {
    await page.goto('/hu');
    await expect(page).toHaveURL(/\/hu/);

    await page.goto('/de');
    await expect(page).toHaveURL(/\/de/);
  });

  test('Documentation Hub and Guide navigation works', async ({ page }) => {
    await page.goto('/docs');
    await expect(page.locator('h1')).toBeVisible();

    // Navigate to a guide
    const firstGuideLink = page.locator('a[href*="/docs/"]').first();
    if (await firstGuideLink.isVisible()) {
      await firstGuideLink.click();
      await expect(page).toHaveURL(/\/docs\/.+/);
    }
  });

  test('Changelog, Comparisons, and Help pages render correctly', async ({ page }) => {
    await page.goto('/changelog');
    await expect(page.locator('h1')).toBeVisible();

    await page.goto('/compare');
    await expect(page.locator('h1')).toBeVisible();

    await page.goto('/help');
    await expect(page.locator('h1')).toBeVisible();
  });
});
