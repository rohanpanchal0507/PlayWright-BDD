// scripts/rerun-failed.js
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const rerunFile = path.resolve('reports', 'rerun.txt');

if (!fs.existsSync(rerunFile)) {
  console.log('No rerun file found - no failed scenarios to rerun.');
  process.exit(0);
}

const content = fs.readFileSync(rerunFile, 'utf8').trim();
if (!content) {
  console.log('Rerun file empty.');
  process.exit(0);
}

// Run cucumber with paths from rerun file
console.log('Re-running failed scenarios from rerun.txt');
try {
  execSync(`npx cucumber-js @${rerunFile} --require ./features/support/world.js --require ./features/support/hooks.js --require ./features/step-definitions --format json:reports/cucumber-rerun.json`, { stdio: 'inherit' });
  console.log('Rerun complete.');
} catch (err) {
  console.error('Rerun failed', err.message);
  process.exit(1);
}
