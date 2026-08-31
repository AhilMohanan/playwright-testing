const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = page.getByText('Products', { exact: true });
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    await this.waitForReady();
  }
}

module.exports = { InventoryPage };
