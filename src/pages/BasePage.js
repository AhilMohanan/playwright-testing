class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    if (new.target === BasePage) {
      throw new TypeError('Cannot instantiate abstract class BasePage directly');
    }
    this.page = page;
  }

  async goto() {
    throw new Error('goto() must be implemented by subclass');
  }

  async waitForReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { BasePage };