import { test, expect } from "@playwright/test";
const URL = "https://www.qaplayground.com/practice/dynamic-waits";

test("TC01: Wait for a delayed browser alert to appear and accept it", async ({
  page,
}) => {
  // 1. Navigate
  await page.goto(URL);

  // 2. Handle dialog
  let alertHandled = false;

  page.on("dialog", async (dialog) => {
    await dialog.accept();

    alertHandled = true;
  });

  // 3 & 5. Click delayed alert button
  await page.getByTestId("btn-delayed-alert").click();

  // 6. Assert alert handled successfully
  await expect.poll(() => alertHandled).toBeTruthy();

  await page.waitForTimeout(10000);
});

test("TC02: Wait for a hidden element to become visible after delay", async ({
  page,
}) => {
  // 1. Navigate
  await page.goto(URL);

  // 2. Locate Show Element button
  const showButton = page.getByTestId("btn-show-element");

  // 3. Click button
  await showButton.click();

  // 4 & 5. Wait for delayed element
  const delayedElement = page.getByTestId("delayed-element");

  await delayedElement.waitFor({ state: "visible" });

  // 6. Assert text
  await expect(delayedElement).toHaveText("Element is now visible!");
});

test("TC03: Wait for a disabled button to become enabled", async ({ page }) => {
  // 1. Navigate
  await page.goto(URL);

  // 2. Locate delayed enable button
  const delayedButton = page.getByTestId("btn-enable-after-delay");

  // 3. Verify initially disabled
  await expect(delayedButton).toBeDisabled();

  // 4. Click Activate Button
  await page.getByRole("button", { name: "Activate Button" }).click();

  // 5 & 6. Wait until enabled
  await expect(delayedButton).toBeEnabled({ timeout: 10000 });
});
