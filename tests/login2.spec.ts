import { Page, test, expect } from "@playwright/test";
import { LoginPage2 } from "../Pages/LoginPage2";
import loginData from "../LoginData.json";

test('Valid Login Test Success', async ({ page }) => {

    const loginPage = new LoginPage2(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.valid_user.username, loginData.valid_user.password);
    await loginPage.VerifyLoginSuccess();
})

test('Invalid Login Test Failure', async ({ page }) => {
    const loginPage = new LoginPage2(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.invalid_user.username, loginData.invalid_user.password);
    await loginPage.VerifyLoginFailure();
})