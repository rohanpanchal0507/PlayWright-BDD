require('dotenv').config();
const path = require('path');
// features/support/world.js
const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const playwright = require('playwright');

setDefaultTimeout(60 * 1000);

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.attach = null; // Cucumber will set this for embedding artifacts
  }

  async launch({ headless = true, recordVideo = true } = {}) {
    // Read browser and headless mode from environment
    const browserName = process.env.BROWSER || 'chromium';
    const envHeadless = (process.env.HEADLESS || 'true') === 'true';
    // Use env value unless overridden by argument
    const finalHeadless = typeof headless === 'boolean' ? headless : envHeadless;
    this.browser = await playwright[browserName].launch({ headless: finalHeadless });
    // save videos to reports/videos per scenario (unique dir)
    const videoDir = path.join(process.cwd(), 'reports', 'videos');
    this.context = await this.browser.newContext({
      recordVideo: recordVideo ? { dir: videoDir } : undefined,
    });

    // start tracing for richer debug
    try {
      await this.context.tracing.start({ screenshots: true, snapshots: true });
    } catch (e) {
      // older Playwright versions may differ
    }

    this.page = await this.context.newPage();
  }

  async close() {
    try {
      if (this.page) await this.page.close();
      if (this.context) await this.context.close();
      if (this.browser) await this.browser.close();
    } catch (err) {
      // ignore close errors
    } finally {
      this.page = null;
      this.context = null;
      this.browser = null;
    }
  }
}

// Make the world available to Cucumber
setWorldConstructor(CustomWorld);
