const { normalize, schema } = require('normalizr');
const {
  reduce,
  uniq,
} = require('lodash');

const statsSchema = new schema.Entity('stats', {}, { idAttribute: 'date' });

const normalizeStatsList = (data) => {
  const { entities: { stats } } = normalize(data, [statsSchema]);

  const normalizedStats = reduce(stats, (totalStats, stat) => {
    const {
      date,
      ...projectRequests
    } = stat;
    const allProjectRequestKeys = totalStats.projectRequests || [];

    return {
      ...totalStats,
      ...reduce(projectRequests, (totalProjectRequests, requestsByHour, projectRequest) => ({
        ...totalProjectRequests,
        ...{
          [projectRequest]: {
            ...totalStats[projectRequest],
            [date]: {
              daily: reduce(requestsByHour, (total, requests) => total + requests, 0),
              ...requestsByHour,
            },
          },
        },
      }), {}),
      projectRequests: [...allProjectRequestKeys, ...Object.keys(projectRequests)],
    };
  }, {});

  normalizedStats.projectRequests = uniq(normalizedStats.projectRequests);

  return normalizedStats;
};

const fetchStats = (state, { response }) => {
  const normalizedStats = normalizeStatsList(response);
  const {
    byId,
    allIds,
    dateRange,
  } = state;

  const {
    projectRequests,
    ...stats
  } = normalizedStats;

  return {
    byId: {
      ...byId,
      [dateRange]: stats,
    },
    allIds: {
      ...allIds,
      [dateRange]: projectRequests,
    },
  };
};

module.exports = {
  fetchStats,
};
