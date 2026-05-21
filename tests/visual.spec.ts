import { test, expect } from '@playwright/test';

test('Homepage visual test', async ({ page }) => {

  // Open website
  await page.goto('https://playwright.dev/');

  // Wait for page to load properly
  await page.waitForLoadState('networkidle');

  // Take screenshot and compare
  await expect(page).toHaveScreenshot('homepage-actual.png');

});