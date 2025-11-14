// scripts/merge-reports.js
const fs = require('fs');
const path = require('path');

const reportsDir = path.resolve('reports');
const mergedDir = path.join(reportsDir, 'merged');
if (!fs.existsSync(mergedDir)) fs.mkdirSync(mergedDir, { recursive: true });

const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.json') && !f.includes('merged'));
let merged = [];

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(reportsDir, file)));
  merged = merged.concat(data);
}

fs.writeFileSync(path.join(mergedDir, 'cucumber-merged.json'), JSON.stringify(merged, null, 2));
console.log('Merged', files.length, 'files -> reports/merged/cucumber-merged.json');
