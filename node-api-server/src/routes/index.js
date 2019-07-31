const validateCredentials = require('./middleware/validate-credentials');
const validateProps = require('./middleware/validate-props');
const updateProjectStats = require('./middleware/update-project-stats');
const cardanoRoutes = require('./cardano');

module.exports = (server) => {
  server.use('/', [
    validateCredentials,
    validateProps,
    updateProjectStats,
  ]);

  cardanoRoutes(server);
};
