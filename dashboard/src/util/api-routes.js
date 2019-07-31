const { DASHBOARD_API_SERVER_URL } = require('../config');

const projectPath = `${DASHBOARD_API_SERVER_URL}/project`;
const statsPath = `${DASHBOARD_API_SERVER_URL}/stats`;

module.exports = {
  projectRoutes: {
    fetchProjectsRoute: `${projectPath}/list`,
    createProjectRoute: `${projectPath}/create`,
    updateProjectRoute: `${projectPath}/update`,
    deleteProjectRoute: `${projectPath}/delete`,
  },
  statsRoutes: {
    fetchStatsRoute: `${statsPath}/project`,
  },
};
