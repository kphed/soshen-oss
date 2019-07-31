const {
  Sequelize: { Op },
  Project,
} = require('../database/models');
const throwError = require('./throw-error');
const { errorMessages } = require('./constants');

module.exports = async (projectName, apiId, blockchain) => {
  const project = await Project.findOne({
    where: {
      name: { [Op.iLike]: projectName },
      apiId: { [Op.iLike]: apiId },
      blockchain: { [Op.iLike]: blockchain },
    },
  });

  if (!project) {
    return throwError(new Error(errorMessages.INVALID_CREDENTIALS));
  }

  return {
    projectName,
    apiId,
    blockchain,
    projectId: project.id,
  };
};
