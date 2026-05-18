import { test, expect } from '@playwright/test';
import { ENV } from '../utils/env';

test('Environment Test', async ({ page }) => {

  console.log('Running on:', ENV.BASE_URL);

  await page.goto(ENV.BASE_URL);

  await expect(page).toHaveTitle(/Google/);

});