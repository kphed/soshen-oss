const {
  projectSchema,
  statsSchema,
} = require('../fields/index');

const { id } = projectSchema;
const { dateRange } = statsSchema;

module.exports = {
  fetchStatsSchema: {
    rules: {
      projectId: id.required(),
      dateRange: dateRange.required(),
    },
    hints: {},
  },
};
