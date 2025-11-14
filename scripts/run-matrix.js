// scripts/run-matrix.js
const { execSync } = require('child_process');

const matrix = [
  { browser: 'chromium', headless: true },
  { browser: 'firefox',  headless: true },
  { browser: 'webkit',   headless: true },
];

for (const cfg of matrix) {
  console.log(`\n=== Running tests: ${cfg.browser} (headless=${cfg.headless}) ===\n`);
  try {
    execSync(`BROWSER=${cfg.browser} HEADLESS=${cfg.headless} npx cucumber-js --require ./features/support/world.js --require ./features/support/hooks.js --require ./features/step-definitions --format json:reports/cucumber-${cfg.browser}.json features`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Run failed for ${cfg.browser}`);
  }
}
console.log('\nMatrix runs complete. You can now run `node scripts/generate-report.js` to merge reports.');
