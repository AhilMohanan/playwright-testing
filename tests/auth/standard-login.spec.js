const { test, expect } = require('../../src/fixtures/base');
const users = require('../data/users.json');
const { LoginPage } = require('../../src/pages/LoginPage');

test.describe('Authentication', () => {
  test('standard user can log in @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    const inventoryPage = await loginPage.login(users.standard);

    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(page).toHaveURL(/.*\/inventory\.html/);
  });
});
