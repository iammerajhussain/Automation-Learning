import { test, expect } from '@playwright/test';
const URL = 'https://www.qaplayground.com/practice/date-picker';

test("TC01: Fill today's date in the date input and verify the value", async ({ page }) => {

  // 1. Navigate
  await page.goto(URL);

  // 2. Locate today's date input
  const todayDateInput = page.getByTestId('input-today-date');

  // 3 & 4. Fill date (YYYY-MM-DD)
  await todayDateInput.fill('2024-03-28');

  // 5. Assert value
  await expect(todayDateInput).toHaveValue('2024-03-28');

  // OR using inputValue()
  const value = await todayDateInput.inputValue();
  expect(value).toBe('2024-03-28');

});

test('TC02: Enter a birthday date and assert the value is stored', async ({ page }) => {

  // 1. Navigate
  await page.goto(URL);

  // 2. Locate birthday input
  const birthdayInput = page.getByTestId('input-birthday');

  // 3 & 4. Fill birthday
  await birthdayInput.fill('1995-06-15');

  // 5. Assert stored value
  await expect(birthdayInput).toHaveValue('1995-06-15');

  // Alternative
  const value = await birthdayInput.inputValue();
  expect(value).toBe('1995-06-15');

});