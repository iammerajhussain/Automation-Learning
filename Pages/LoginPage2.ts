import { Page, Locator, expect } from '@playwright/test';

export class LoginPage2 {

    page: Page;
    username: Locator;
    password: Locator;
    LoginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.LoginButton = page.getByText('Login').nth(1);
    }

    //Add functions action

    async gotoLoginPage() {
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.LoginButton.click();
    }

    async VerifyLoginSuccess() {
        await expect(this.page).toHaveURL('https://the-internet.herokuapp.com/secure');

    }

    async VerifyLoginFailure() {
        await expect(this.page).toHaveURL('https://the-internet.herokuapp.com/login');
    }
}