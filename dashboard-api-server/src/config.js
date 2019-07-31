module.exports = {
  NODE_ENV: 'development',
  PORT: 8200,
  DASHBOARD_URL: 'http://localhost:8100',
  DATABASE_HOST: process.env.POSTGRES_HOST || 'localhost',
  DATABASE_USER: process.env.POSTGRES_USER || 'postgres',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
};
