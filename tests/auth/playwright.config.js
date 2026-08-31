const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: ['**/*.spec.js'],
  reporter: 'line',
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
  },
});
