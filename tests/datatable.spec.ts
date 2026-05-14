import { test, expect } from '@playwright/test';

test('TC01: Verify all table column headers are present', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-data-table').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Automate Tables/);

  await page.waitForSelector('table');

  const headers = await page.locator('[aria-label="Data table practice exercises"]').locator('table thead th').allTextContents();

  console.log(headers);

  expect(headers).toEqual([
    'Sr No.',
    'Book Name',
    'Book Genre',
    'Book Author',
    'Book ISBN',
    'Book Published',
  ]);

});

test('TC02: Count the total number of rows in the data table', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-data-table').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Automate Tables/);

  await page.waitForSelector('table tbody tr');
  const rowCount = await page.locator('table tbody tr').count();
  expect(rowCount).toBe(5);

});