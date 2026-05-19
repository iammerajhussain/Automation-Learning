import { test, expect } from '@playwright/test';

test('TC01: Verify button is clickable and triggers action', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.waitForTimeout(3000);

  await page.getByTestId('practice-card-buttons').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Button Clicks/);

  const button = page.getByRole('button', { name: 'Go To Home' });

  await button.click();

  await expect(page).toHaveURL('https://qaplayground.com/');

});

test('TC02: Verify button displays the correct label text', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

    await page.getByTestId('practice-card-buttons').getByText('Practice Now').click();
    await expect(page).toHaveTitle(/How to Handle Button Clicks/);

    const button = page.getByRole('button', { name: 'Go To Home' });

    await expect(button).toBeVisible();
    await expect(button).toHaveText('Go To Home');

});

test('TC03: Verify button triggers the correct action on click', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

    await page.getByTestId('practice-card-buttons').getByText('Practice Now').click();
    await expect(page).toHaveTitle(/How to Handle Button Clicks/);

    const button = page.getByRole('button', { name: 'Go To Home' });
    await button.click();
    await expect(page).toHaveURL('https://qaplayground.com/');

});