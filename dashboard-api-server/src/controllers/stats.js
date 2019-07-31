const redisClient = require('../redis/client');
const redisStats = require('../redis/stats');
const { Project } = require('../database/models');
const validateInput = require('../joi/validate-input');
const { fetchStatsSchema } = require('../joi/methods/index');

module.exports = {
  fetchStats: async (req) => {
    console.log('req.body', req.body);
    const { body } = req;

    await validateInput(body, fetchStatsSchema);

    const {
      projectId,
      dateRange,
    } = body;

    try {
      const project = await Project.findOne({
        where: { id: projectId },
      });

      if (project) {
        const { getStats } = redisStats(redisClient());

        return await getStats(project.id, dateRange);
      } else {
        throw new Error('No project was found');
      }
    } catch (err) {
      throw err;
    }
  },
};
