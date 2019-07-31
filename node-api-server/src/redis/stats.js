const throwError = require('../util/throw-error');

module.exports = client => ({
  setStats: async (projectId, date, hour, projectRequest) => {
    const serializedStats = JSON.stringify({
      date,
      [projectRequest]: {
        [hour]: 1,
      },
    });
    const statsKey = `${projectId}-${date}`;

    let setNx;
    let data;
    let deserializedStats;
    let reserializedStats;

    try {
      setNx = await client.HSETNXAsync('stats', statsKey, serializedStats);

      if (!setNx) {
        data = await client.HGETAsync('stats', `${statsKey}`);
        deserializedStats = JSON.parse(data);

        if (deserializedStats[projectRequest]) {
          deserializedStats[projectRequest] = {
            ...deserializedStats[projectRequest],
            [hour]: (deserializedStats[projectRequest][hour] += 1) || 1,
          };
        } else {
          deserializedStats[projectRequest] = {
            [hour]: 1,
          };
        }

        reserializedStats = JSON.stringify(deserializedStats);

        await client.HSETAsync('stats', statsKey, reserializedStats);

        return reserializedStats;
      }

      return serializedStats;
    } catch (err) {
      return throwError(err, {
        projectId,
        fn: 'setStats',
        source: 'src/redis/stats.js',
        payload: JSON.stringify({
          fnArgs: {
            projectId,
            date,
            hour,
            projectRequest,
          },
          serializedStats,
          statsKey,
          setNx,
          data,
          deserializedStats,
          reserializedStats,
        }),
      });
    }
  },
});
