const { faker } = require('@faker-js/faker');

module.exports = {
  generateUser: (overrides = {}) => ({
    firstName: overrides.firstName || faker.person.firstName(),
    lastName: overrides.lastName || faker.person.lastName(),
    email: overrides.email || faker.internet.email(),
    password: overrides.password || faker.internet.password(10),
  })
};
