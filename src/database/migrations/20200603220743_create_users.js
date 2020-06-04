exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table
      .string('username')
      .unique()
      .notNullable();
    table.string('password').notNullable();
    table.string('name').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
