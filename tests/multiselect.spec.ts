import { test, expect } from '@playwright/test';

test('TC01: Select multiple fruits using Ctrl+click in a native multi-select', async ({ page }) => {
    await page.goto('https://www.qaplayground.com/practice');
    await expect(page).toHaveTitle(/Practice Elements/);

    await page.getByTestId('practice-card-multi-select').getByText('Practice Now').click();
    await expect(page).toHaveTitle(/How to Handle Multi-Select Elements/);

    await page.locator("#fruitMultiSelect").selectOption([
        { label: "Apple" },
        { label: "Mango" },
        { index: 2 },
    ]);


    const count = await page.locator("#fruitMultiSelect option:checked").count();
    expect(count).toBe(3);

});

test('TC02: Select All countries using Select All option', async ({ page }) => {
    await page.goto('https://www.qaplayground.com/practice');
    await expect(page).toHaveTitle(/Practice Elements/);

    await page.getByTestId('practice-card-multi-select').getByText('Practice Now').click();
    await expect(page).toHaveTitle(/How to Handle Multi-Select Elements/);

    await page.getByTestId("select-all-btn").click();

    const total = await page.locator("#countryMultiSelect option").count();
    const selected = await page.locator("#countryMultiSelect option:checked").count();
    expect(selected).toBe(total);

    await page.getByTestId("deselect-all-btn").click();
    expect(await page.locator("#countryMultiSelect option:checked").count()).toBe(0);

});