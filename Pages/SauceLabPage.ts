import { Page, Locator, expect } from "@playwright/test";

export class SauceLabPage {

    page: Page;
    usernameinput: Locator;
    passwordinput: Locator;
    loginbutton: Locator;
    errormessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameinput = page.locator('#user-name');
        this.passwordinput = page.locator('#password');
        this.loginbutton = page.locator('#login-button');
        this.errormessage = page.locator('[data-test="error"]');
    }

    async gotoURL() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async Login(username: string, password: string) {
        await this.usernameinput.fill(username);
        await this.passwordinput.fill(password);
        await this.loginbutton.click();
    }

    async VerifyLoginSuccess() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

    async VerifyLoginFailure() {
        await expect(this.errormessage).toBeVisible();
    }
}