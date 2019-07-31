const updateStats = require('../../util/update-project-stats');
const sendError = require('../../util/send-error');
const throwError = require('../../util/throw-error');

module.exports = async (req, res, next) => {
  const {
    projectId,
    apiEndpoint,
  } = res.locals;
  let serializedStats;

  try {
    serializedStats = await updateStats(projectId, apiEndpoint);
    next();
    return serializedStats;
  } catch (err) {
    sendError(res, 400, err.message);
    return throwError(err);
  }
};
