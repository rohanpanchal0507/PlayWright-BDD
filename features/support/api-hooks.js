const { BeforeAll, AfterAll } = require('@cucumber/cucumber');
const axios = require('axios');

BeforeAll(async function () {
  // Example: create test tenant or auth token
  try {
    // const res = await axios.post(`${process.env.API_BASE}/setup-test-tenant`, {...});
    // this.apiToken = res.data.token;
    console.log('Global API setup (noop example).');
  } catch (err) {
    console.warn('API setup failed but continuing', err.message);
  }
});

AfterAll(async function () {
  // cleanup
  try {
    // await axios.post(`${process.env.API_BASE}/cleanup`, {...});
    console.log('Global API cleanup complete.');
  } catch (err) {
    console.warn('API cleanup failed', err.message);
  }
});