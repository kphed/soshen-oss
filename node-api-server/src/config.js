module.exports = {
  CARDANO_IMPORTER_URL: 'https://iohk-mainnet.yoroiwallet.com',
  PORT: 8300,
  DATABASE_HOST: process.env.POSTGRES_HOST || 'localhost',
  DATABASE_USER: process.env.POSTGRES_USER || 'postgres',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
};
