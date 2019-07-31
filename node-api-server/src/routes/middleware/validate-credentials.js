const getProjectDetail = require('../../util/get-project-detail');
const sendError = require('../../util/send-error');
const throwError = require('../../util/throw-error');
const { errorMessages } = require('../../util/constants');

const onError = (req, res) => {
  sendError(res, 401, errorMessages.INVALID_CREDENTIALS);

  return throwError(new Error(errorMessages.INVALID_CREDENTIALS));
};

module.exports = async (req, res, next) => {
  const [, projectName, apiId, blockchain, ...apiEndpoint] = req.url.split('/');

  try {
    if (projectName && apiId && blockchain) {
      const {
        projectId,
        userId,
      } = await getProjectDetail(projectName, apiId, blockchain);

      if (projectId) {
        res.locals = {
          projectName,
          apiId,
          blockchain,
          userId,
          projectId,
          apiEndpoint: `/${blockchain}/${apiEndpoint.join('/')}`,
          requestProps: {
            ...req.body,
            ...req.query,
          },
        };

        return next();
      }
    }
  } catch (err) {
    return onError(req, res);
  }

  return onError(req, res);
};
