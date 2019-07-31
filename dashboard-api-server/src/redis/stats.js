const moment = require('moment');

module.exports = client => ({
  getStats: (projectId, dateRange) => {
    const statsKeys = [];

    for (let i = 0; i < dateRange; i += 1) {
      const date = moment.utc().subtract(i, 'days').format('MM-DD-YY');

      statsKeys.push(`${projectId}-${date}`);
    }

    return client.HMGETAsync('stats', ...statsKeys).map(stats => JSON.parse(stats));
  },
});
