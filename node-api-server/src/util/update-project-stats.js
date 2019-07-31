const moment = require('moment');
const redisClient = require('../redis/clients');
const stats = require('../redis/stats');

const client = redisClient();
const { setStats } = stats(client);


module.exports = async (projectId, apiEndpoint) => {
  const momentDate = moment.utc();
  const date = momentDate.format('MM-DD-YY');
  const hour = momentDate.format('HH');
  const projectRequest = apiEndpoint;

  const serializedStats = await setStats(
    projectId,
    date,
    hour,
    projectRequest,
  );

  return serializedStats;
};
