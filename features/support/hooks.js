// features/support/hooks.js
const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  // Optional: global setup if needed
  // Called once before all scenarios
});

Before({ timeout: 60 * 1000 }, async function () {
  // `this` is the World
  // Launch a fresh browser per scenario for isolation (recommended)
  await this.launch({ headless: true });
});

After(async function (scenario) {
  try {
    if (this.context) {
      // stop tracing and write zip per scenario
      const tracePath = path.join('reports', `trace-${Date.now()}.zip`);
      try { await this.context.tracing.stop({ path: tracePath }); } catch (e) {}

      // attach trace path (as text) so report can link to it
      if (this.attach) this.attach(`trace:${tracePath}`);

      // Save video path(s)
      try {
        const pages = this.context.pages ? this.context.pages() : [this.page];
        for (const p of pages) {
          const video = p.video();
          if (video) {
            const savedPath = await video.path();
            // copy or rename if you wish, here we attach saved path string
            if (this.attach) this.attach(`video:${savedPath}`);
          }
        }
      } catch (e) { /* ignore video errors */ }

      // screenshot on failure
      if (scenario.result && scenario.result.status === 'FAILED' && this.page) {
        const screenshot = await this.page.screenshot({ type: 'png' });
        if (this.attach) this.attach(screenshot, 'image/png');
        fs.writeFileSync(path.join('reports', `failure-${Date.now()}.png`), screenshot);
      }
    }
  } catch (err) {
    console.error('After hook extension error', err);
  } finally {
    await this.close();
  }
});

AfterAll(async function () {
  // Optional: global cleanup
});
