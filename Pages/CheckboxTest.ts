import { Page, Locator, expect } from '@playwright/test';

export class CheckboxTest {

    page: Page;
    checkboxlink: Locator;
    checkbox1: Locator;
    checkbox2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkboxlink = page.getByRole('link', { name: 'Checkboxes' });
        this.checkbox1 = page.locator('input[type="checkbox"]').nth(0);
        this.checkbox2 = page.locator('input[type="checkbox"]').nth(1);
    }

    async gotoURL() {

        await this.page.goto('https://the-internet.herokuapp.com/');
    }

    async clickCheckboxLink() {
        await this.checkboxlink.click();
    }

    async verifyCheckbox1() {
        await expect(this.checkbox1).toBeVisible();
        await expect(this.checkbox1).not.toBeChecked();
    }

    async verifyCheckbox2() {
        await expect(this.checkbox2).toBeVisible();
        await expect(this.checkbox2).toBeChecked();
    }

    async clickCheckbox1() {
        await this.checkbox1.check();
        await expect(this.checkbox1).toBeChecked();
        await expect(this.checkbox1).toHaveCSS('style', 'color: red;');
    }
}