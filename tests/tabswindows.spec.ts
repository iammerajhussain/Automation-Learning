import { test, expect } from '@playwright/test';
const URL = 'https://www.qaplayground.com/practice/tabs-windows';

test('TC01: Open a link in a new tab and switch to it', async ({ page, context }) => {

  // 1. Navigate
  await page.goto(URL);

  // 2. Locate button
  const openTabButton = page.getByTestId('btn-open-home-tab');

  // 3, 4 & 5. Click button and capture new tab
  const [newPage] = await Promise.all([context.waitForEvent('page'),
  openTabButton.click()
  ]);

  // Wait for new tab to load
  await newPage.waitForLoadState();

  // 6. Assert title
  await expect(newPage).toHaveTitle(/QA Playground/i);

});

test('TC02: Open multiple windows and print all window titles', async ({ page, context }) => {

  // 1. Navigate
  await page.goto(URL);

  // 2. Locate button
  const multipleWindowsButton = page.getByTestId('btn-open-multiple-windows');

  // 3. Click button
  await multipleWindowsButton.click();

  // Optional small wait for tabs to open
  await page.waitForTimeout(2000);

  // 4 & 5. Get all open pages/tabs
  const pages = context.pages();

  // Print titles
  for (const p of pages) {

    await p.waitForLoadState();

    console.log(await p.title());

  }

  // 6. Assert at least 2 pages exist
  expect(pages.length).toBeGreaterThanOrEqual(2);

});