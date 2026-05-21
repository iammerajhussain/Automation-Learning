import { test, expect } from '@playwright/test';

test('TC01: Accept a simple browser alert and verify it closes', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.waitForTimeout(3000);

  await page.getByTestId('practice-card-alerts-dialogs').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Alerts/);

  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await page.getByTestId('btn-simple-alert').click();

  await expect(
    page.getByTestId('btn-simple-alert')
  ).toBeVisible();

});

test('TC02: Get text from simple browser alert before accepting', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.waitForTimeout(3000);

  await page.getByTestId('practice-card-alerts-dialogs').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Alerts/);

  page.on('dialog', async dialog => {

    expect(dialog.message()).toBe('Welcome to QA PlayGround!');

    await dialog.accept();
  });

  await page.getByTestId('btn-simple-alert').click();

});

test('TC03: Accept confirm dialog and verify accepted state', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.waitForTimeout(3000);

  await page.getByTestId('practice-card-alerts-dialogs').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Alerts/);

  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await page.getByTestId('btn-confirm-alert').click();

  const result = page.locator('text=Result: Accepted');

  await expect(result).toBeVisible();

});

