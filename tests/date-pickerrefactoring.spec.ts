import { test, expect } from '@playwright/test';

// Application URL
const URL = 'https://www.qaplayground.com/practice/date-picker';

// Test data
const TODAY_DATE = '2026-05-14';
const BIRTHDAY_DATE = '1995-06-15';

/**
 * Reusable function to fill a date input
 * and verify the entered value.
 */
async function fillAndVerifyDate(
  inputField: any,
  expectedDate: string
) {
  // Enter the date
  await inputField.fill(expectedDate);

  // Verify using Playwright assertion
  await expect(inputField).toHaveValue(expectedDate);

  // Additional verification using inputValue()
  const actualValue = await inputField.inputValue();
  expect(actualValue).toBe(expectedDate);
}

test.describe('Date Picker Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Open the application before every test
    await page.goto(URL);
  });

  test("TC01: Verify today's date can be entered successfully", async ({ page }) => {

    // Locate Today's Date input field
    const todayDateInput = page.getByTestId('input-today-date');

    // Fill and verify date
    await fillAndVerifyDate(todayDateInput, TODAY_DATE);
  });

  test('TC02: Verify birthday date is stored correctly', async ({ page }) => {

    // Locate Birthday input field
    const birthdayInput = page.getByTestId('input-birthday');

    // Fill and verify date
    await fillAndVerifyDate(birthdayInput, BIRTHDAY_DATE);
  });

});