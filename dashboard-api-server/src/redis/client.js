const redis = require('./redis');
const {
  REDIS_HOST,
  REDIS_PORT,
} = require('../config');

let client = null;

const redisClient = () => {
  if (!client) {
    client = redis.createClient({
      host: REDIS_HOST,
      port: REDIS_PORT,
    });
  }

  return client;
};

module.exports = redisClient;
