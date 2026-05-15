import { test, expect } from '@playwright/test';

test('Advanced Locator Example', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/', { waitUntil: 'domcontentloaded' });

  await page.getByText('Username : Admin').waitFor({ state: 'visible' });

  await page.setDefaultTimeout(2000);

  // Pause execution here
  //await page.pause();

  // Username using placeholder
  await page.getByPlaceholder('Username').fill('Admin');

  // Password using locator
  await page.locator('input[name="password"]').fill('admin123');

  // Login button using role
  await page.getByRole('button', { name: 'Login' }).click();
  await page.setDefaultTimeout(2000);

  // Validate dashboard heading
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

});