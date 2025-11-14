// playwright.config.js
module.exports = {
  testDir: './features',
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure', // optional: record video only on failures
    screenshot: 'only-on-failure'
  },
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'reports/cucumber_report.json' }]],
};