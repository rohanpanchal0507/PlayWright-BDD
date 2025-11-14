// fixtures/factory.js
const { faker } = require('@faker-js/faker');

const generateUser = overrides => ({
  username: overrides?.username || faker.internet.userName(),
  password: overrides?.password || faker.internet.password(10),
  email: overrides?.email || faker.internet.email(),
  firstName: overrides?.firstName || faker.person.firstName(),
  lastName: overrides?.lastName || faker.person.lastName()
});

module.exports = { generateUser };
