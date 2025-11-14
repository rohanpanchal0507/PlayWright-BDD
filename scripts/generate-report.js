// scripts/generate-report.js
const { generate } = require('multiple-cucumber-html-reporter');
const path = require('path');
const fs = require('fs');



const mergedReport = path.join('reports', 'merged', 'cucumber-merged.json');
let jsonDir = 'reports';
if (fs.existsSync(mergedReport)) {
  jsonDir = path.join('reports', 'merged');
  console.log('Using merged report:', mergedReport);
}

generate({
  jsonDir,
  reportPath: 'reports/html',
  openReportInBrowser: false,
  displayDuration: true,
  durationInMS: true,
  metadata: {
    browser: {
      name: 'chromium',
      version: 'playwright'
    },
    device: 'Local Machine',
    platform: {
      name: process.platform,
      version: process.version
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'playwright-bdd' },
      { label: 'Executed', value: new Date().toISOString() }
    ]
  }
});

console.log('HTML report generated at reports/html/index.html');
