const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');

Given('I open the login page', async function () {
  if (!this.page) await this.launch();
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When('I login with username {string} and password {string}', async function (username, password) {
  this.dashboardPage = new DashboardPage(this.page);
  await this.loginPage.login(username, password);
});

Then('I should see the dashboard page', async function () {
  const loaded = await this.dashboardPage.isLoaded();
  assert.ok(loaded, 'Dashboard page did not load');
});
