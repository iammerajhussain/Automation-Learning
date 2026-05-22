import { test, expect } from '@playwright/test';
//const URL = 'https://www.qaplayground.com/practice/links';

test('TC01: Verify link navigates to the correct URL on click', async ({ page }) => {

//     // 1. Navigate
//   await page.goto(URL);

  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-links').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Links/);

  await page.getByRole("link", { name: /Home/i }).click();



  

  // 2. Locate link - use actual link text
//   const link = page.getByRole('link').first();
//   await expect(link).toBeVisible();

//   // 3. Click link
//   await link.click();

//   // 4. Wait for navigation and verify
//   await page.waitForLoadState('networkidle');

});


test('TC02: Verify link text matches expected label', async ({ page }) => {

  // 1. Navigate
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-links').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Links/);

  // 2. Locate link - use role selector
  const link = page.getByRole('link').first();
  await expect(link).toBeVisible();

  // 3. Read text
  const text = await link.textContent();

  // 4. Assert text
  expect(text?.trim()).toBeTruthy();

});

test('TC03: Verify external link opens in a new tab', async ({ page, context }) => {

  // 1. Navigate
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-links').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Links/);

  // 2. Locate external link - find link with target=_blank
  const externalLink = page.locator('a[target="_blank"]').first();
  await expect(externalLink).toBeVisible();

  // 3. Verify attributes
  await expect(externalLink).toHaveAttribute('target', '_blank');

  // 4. Click and capture new tab
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    externalLink.click()
  ]);

  // Wait for new tab load
  await newPage.waitForLoadState();

  // 5. Assert new tab URL
  await expect(newPage).toHaveURL(/expected-external-url/);

});

test('TC04: Verify internal link stays in the same tab', async ({ page, context }) => {

  // 1. Navigate
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-links').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Links/);

  // 2. Locate internal link - find first internal link
  const internalLink = page.getByRole('link').first();
  await expect(internalLink).toBeVisible();

  // 3. Record tab count
  const initialPages = context.pages().length;

  // 4. Click link
  await internalLink.click();
  await page.waitForLoadState('networkidle');

  // 5. Verify no new tab opened
  const finalPages = context.pages().length;

  expect(finalPages).toBe(initialPages);

  // 6. Verify page loaded successfully
  await expect(page).toHaveTitle(/.+/);
  await expect(page).toHaveURL(/expected-internal-path/);

});

test.skip('TC05: Verify broken link returns HTTP error status', async ({ page, request }) => {

  // 1. Navigate
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-links').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Links/);

  // 2. Locate broken link
  const brokenLink = page.getByTestId('broken-link');

  // 3. Get href
  const href = await brokenLink.getAttribute('href');

  expect(href).not.toBeNull();

  // Send HTTP request
  const response = await request.get(href!);

  // 4. Assert error status
  expect(response.status()).toBeGreaterThanOrEqual(400);

  // OR exact validation
  // expect(response.status()).toBe(404);

});

