# Reports Directory

This directory contains test execution artifacts generated during BDD test runs.

## Structure

- `cucumber.json` - Main test results in JSON format
- `cucumber-rerun.json` - Results from rerun of failed tests
- `html/` - Generated HTML reports (via multiple-cucumber-html-reporter)
- `videos/` - Recorded videos of test scenarios
- `trace-*.zip` - Playwright trace files for debugging
- `failure-*.png` - Screenshots captured on test failures
- `test-data/` - Generated test data per scenario (for debugging/cleanup)
- `merged/` - Merged reports from matrix runs
  - `cucumber-merged.json` - Combined results from all browsers

## Usage

- HTML reports can be viewed by opening `html/index.html`
- Trace files can be opened with `npx playwright show-trace <trace-file.zip>`
- This directory is excluded from git (see `.gitignore`)
- Artifacts are uploaded to CI as build artifacts

## Cleanup

Run `npm run clean:reports` to remove all artifacts before a fresh test run.
