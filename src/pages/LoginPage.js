const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginError = page.getByText(/Epic sadface:/);
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
    await this.waitForReady();
  }

  async login(user) {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
    return new (require('./InventoryPage').InventoryPage)(this.page);
  }
}

module.exports = { LoginPage };
