const {test, expect} = require('@playwright/test');

test('@selectorshub validation', async ({page}) => {

    await page.goto("https://selectorshub.com/xpath-practice-page/");
    await page.getByPlaceholder('Enter email').fill('test@example.com');
    await page.getByRole('textbox',{name:"Password"}).fill('samplPease');

});