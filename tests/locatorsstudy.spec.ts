import { test, expect } from '@playwright/test';

test('Verify successful navigation to Best Buy website', async ({ page }) => {
  await page.goto('https://www.bestbuy.com/');


  await page.locator("(//img[@alt='United States'])[1]").click();
  await page.waitForTimeout(2000);
  await page.getByLabel('Search', { exact: true }).fill("laptop");
  await page.waitForTimeout(4000);
  await page.locator("//textarea[@placeholder='Search Best Buy']").fill("mobile");
  await page.waitForTimeout(2000);
  await page.locator("//div[@id='autocomplete-search-bar-container']/div/textarea").fill("tablet"); //xpath selector
  await page.waitForTimeout(2000);

  await page.locator("div[id='autocomplete-search-bar-container'] div textarea").fill("Ipad");//css selector
  await page.waitForTimeout(2000);

  await page.locator("//div[@id='autocomplete-icon-container']/preceding-sibling::textarea").fill("iPhone");
  await page.waitForTimeout(2000);

});