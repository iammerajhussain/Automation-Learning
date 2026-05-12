import { test, expect } from '@playwright/test';

test('TC01: Select Apple from fruit dropdown by visible text', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.waitForTimeout(3000);

  await page.getByTestId('practice-card-dropdowns').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Dropdowns using Select Class/);

  const fruitDropdown = page.getByRole('combobox', { name: 'Fruit dropdown' });
  await fruitDropdown.click();
  await page.getByRole('option', { name: 'Apple' }).click();
  await expect(fruitDropdown).toHaveText('Apple');
});

test('TC02: Select India from country dropdown by value', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-dropdowns').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Dropdowns using Select Class/);

  const countryDropdown = page.getByRole('combobox', { name: 'Country dropdown' });
  await countryDropdown.click();
  await page.getByRole('option', { name: 'India' }).click();
  await expect(countryDropdown).toHaveText('India');
});

test('TC03: Verify selected fruit is displayed', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-dropdowns').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/How to Handle Dropdowns using Select Class/);

  const fruitDropdown = page.getByRole('combobox', { name: 'Fruit dropdown' });
  await fruitDropdown.click();
  await page.getByRole('option', { name: 'Banana' }).click();
  await expect(fruitDropdown).toHaveText('Banana');
});


