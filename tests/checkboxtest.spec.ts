import { Page, test, expect } from "@playwright/test";
import { CheckboxTest } from "../Pages/CheckboxTest";

test('Verify Checkboxes', async ({ page }) => {

    const checkboxTest = new CheckboxTest(page);

    await checkboxTest.gotoURL();
    await checkboxTest.clickCheckboxLink();
    await checkboxTest.verifyCheckbox1();
    await checkboxTest.verifyCheckbox2();
    await checkboxTest.clickCheckbox1();

});