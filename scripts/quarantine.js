// scripts/quarantine.js
const fs = require('fs');
const path = require('path');

const rerun = path.resolve('reports', 'rerun.txt');
if (!fs.existsSync(rerun)) process.exit(0);

const content = fs.readFileSync(rerun, 'utf8').trim();
if (!content) process.exit(0);

const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
const quarantineFile = path.resolve('reports', 'quarantine.txt');
fs.appendFileSync(quarantineFile, lines.join('\n') + '\n');
console.log('Added to quarantine:', lines.length, 'scenarios');
