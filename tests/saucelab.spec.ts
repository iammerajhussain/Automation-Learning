import { Page, test, expect } from "@playwright/test";
import { SauceLabPage } from "../Pages/SauceLabPage";
import sauceLabData from "../test-data/SauceLabData.json";

test('Valid Login Test Success', async ({ page }) => {

    const sauceLabPage = new SauceLabPage(page);
    await sauceLabPage.gotoURL();
    await sauceLabPage.Login(sauceLabData.valid_user.username, sauceLabData.valid_user.password);
    await sauceLabPage.VerifyLoginSuccess();
})

test('Invalid Login Test Failure', async ({ page }) => {
    const sauceLabPage = new SauceLabPage(page);
    await sauceLabPage.gotoURL();
    await sauceLabPage.Login(sauceLabData.invalid_user.username, sauceLabData.invalid_user.password);
    await sauceLabPage.VerifyLoginFailure();
});