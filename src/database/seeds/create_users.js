const bcrypt = require('bcryptjs');
const faker = require('faker');

exports.seed = function(knex) {
  return knex('users')
    .del()
    .then(async () => {
      return knex('users').insert([
        {
          name: faker.name.findName(),
          username: faker.internet.userName(),
          password: await bcrypt.hash('pass', 8),
        },
        {
          name: faker.name.findName(),
          username: faker.internet.userName(),
          password: await bcrypt.hash('pass', 8),
        },
        {
          name: faker.name.findName(),
          username: faker.internet.userName(),
          password: await bcrypt.hash('pass', 8),
        },
      ]);
    });
};
