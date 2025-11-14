// pages/DashboardPage.js

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardTitle = 'div.oxd-topbar-header-title';
  }

  async isLoaded() {
    return await this.page.locator(this.dashboardTitle).count() > 0;
  }
}

module.exports = DashboardPage;
