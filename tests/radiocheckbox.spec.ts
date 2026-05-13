import { test, expect } from '@playwright/test';

test('TC01: Verify radio button is selected on click', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-radio-checkbox').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Radio Buttons and Checkboxes/);

  await expect(page).toHaveURL(/radio/);

  const radio1 = page.getByRole('radio', { name: 'Yes' }).first();
  await expect(radio1).toBeVisible();

  await radio1.check();
  await expect(radio1).toBeChecked();

});


test('TC02: Verify selecting another radio deselects the previous one', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-radio-checkbox').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Radio Buttons and Checkboxes/);

  await expect(page).toHaveURL(/radio/);

  const radio1 = page.getByRole('radio', { name: 'Yes' }).first();
  const radio2 = page.getByRole('radio', { name: 'No' }).first();

  await expect(radio1).toBeVisible();
  await radio1.check();
  await expect(radio1).toBeChecked();

  await radio2.check();
  await expect(radio1).not.toBeChecked();
  await expect(radio2).toBeChecked();

});