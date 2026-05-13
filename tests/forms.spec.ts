import { test, expect } from '@playwright/test';

test('TC01: Fill all fields with valid data and submit successfully', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.waitForTimeout(3000);

  await page.getByTestId('practice-card-forms').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Automate Form Submission/);

  await page.getByTestId('input-first-name').fill('Demo');
  await page.waitForTimeout(3000);
  await page.getByTestId('input-last-name').fill('User');
    await page.waitForTimeout(3000);

  await page.getByTestId('input-email').fill('demouser@test.com');
    await page.waitForTimeout(3000);

  await page.getByTestId('input-phone').fill('1012343332');
    await page.waitForTimeout(3000);

  await page.getByTestId('input-dob').fill('1995-08-08');
  await page.waitForTimeout(3000);

  await page.getByTestId('radio-gender-male').check();
  await page.waitForTimeout(3000);

  await page.getByTestId('select-country').click();
    await page.waitForTimeout(3000);

  await page.getByRole('option', { name: 'USA' }).click();
  await page.waitForTimeout(3000);

  await page.getByTestId('input-city').fill('Texas');
  
  await page.getByTestId('input-password').fill('pass123');
  await page.getByTestId('input-confirm-password').fill('pass123');

  await page.getByTestId('checkbox-terms').check();

  await page.getByTestId('submit-form-btn').click();

  await expect(page.getByRole('heading', { name: 'Form Submitted Successfully!' })).toBeVisible();

});

test('TC02: Verify required field errors appear on empty submit', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);
  await page.getByTestId('practice-card-forms').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Automate Form Submission/);

  await page.getByTestId('submit-form-btn').click();
  await expect(page.getByTestId('error-first-name')).toBeVisible();
  await expect(page.getByTestId('error-last-name')).toBeVisible();
  await expect(page.getByTestId('error-email')).toBeVisible();
  await expect(page.getByTestId('error-phone')).toBeVisible();
  await expect(page.getByTestId('error-dob')).toBeVisible();
  await expect(page.getByTestId('error-gender')).toBeVisible();
  await expect(page.getByTestId('error-country')).toBeVisible();
  await expect(page.getByTestId('error-city')).toBeVisible();
  await expect(page.getByTestId('error-password')).toBeVisible();
  await expect(page.getByTestId('error-confirm-password')).toBeVisible();
  await expect(page.getByTestId('error-terms')).toBeVisible();

});


