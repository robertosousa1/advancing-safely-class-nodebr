const { resolve } = require('path');

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: resolve(__dirname, 'src', 'database', 'db.sqlite'),
  },
  migrations: {
    directory: resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
};
