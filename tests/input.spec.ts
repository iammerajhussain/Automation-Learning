import { test, expect } from '@playwright/test';

test('TC01: Verify successful movie name input', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.waitForTimeout(3000);

  await page.getByTestId('practice-card-input-fields').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/Input Field Automation Practice/);

  const inputLocator = page.locator(`//input[@name='movieName']`);
  await inputLocator.fill('Inception');
  
  await expect(inputLocator).toHaveValue('Inception');

});

test('TC02: Verify input placeholder disappears on typing', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/practice');
  await expect(page).toHaveTitle(/Practice Elements/);

  await page.getByTestId('practice-card-input-fields').getByText('Practice Now').click();
  await expect(page).toHaveTitle(/Input Field Automation Practice/); 

  const inputLocator = page.locator(`//input[@name='movieName']`);
  await expect(inputLocator).toHaveAttribute('placeholder', 'Enter hollywood movie name');
  
  await inputLocator.fill('Inception');
  
await expect(inputLocator).toHaveValue('Inception');

});
