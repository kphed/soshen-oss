const {
  DATABASE_HOST,
  DATABASE_USER,
} = require('../config');

module.exports = {
  development: {
    database: 'dashboard-api-server-dev',
    host: DATABASE_HOST,
    username: DATABASE_USER,
    dialect: 'postgres',
    logging: console.log,
    benchmark: true,
  },
};
