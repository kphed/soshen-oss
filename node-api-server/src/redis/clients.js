const redis = require('./redis');
const redisConfig = require('./config');
const throwError = require('../util/throw-error');

let client = null;

const redisClient = () => {
  try {
    client = client || redis.createClient(redisConfig);
    return client;
  } catch (err) {
    return throwError(err);
  }
};

module.exports = redisClient;
