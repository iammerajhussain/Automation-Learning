import { test, expect, Page } from '@playwright/test';

test.describe('Multiple Tabs / Windows Handling', () => {

  test('TC01 - Handle new tab in Playwright', async ({ page, context }) => {

    // Navigate to application
    await page.goto('https://the-internet.herokuapp.com/windows');

    // Verify parent page title
    await expect(page).toHaveTitle('The Internet');

    console.log('Parent Page Title:', await page.title());

    /**
     * Wait for new tab event
     * and click link simultaneously
     */
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('a').nth(1).click()
    ]);

    // Wait for new tab to load completely
    await newPage.waitForLoadState();

    // Print new tab title
    console.log('Child Page Title:', await newPage.title());

    // Validate child page content
    await expect(newPage.locator('h3')).toHaveText('New Window');

    // Perform action in child tab
    const childText = await newPage.locator('h3').textContent();
    console.log('Child Page Heading:', childText);

    // Switch back to parent page
    await page.bringToFront();

    // Validate parent page heading
    await expect(page.locator('h3')).toHaveText('Opening a new window');

    console.log('Successfully switched back to parent page');
  });

});