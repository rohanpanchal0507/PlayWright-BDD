class BasePage {
  constructor(page) { this.page = page; }
  async click(selector) { await this.page.click(selector); }
  async type(selector, text) { await this.page.fill(selector, text); }
  // Add waits, retries, etc.
}
module.exports = BasePage;