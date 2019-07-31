const { projectSchema } = require('../fields/index');

const {
  name,
  blockchain,
} = projectSchema;
const projectNameHint = 'Project name can only contain alphanumeric, dashes, and underscores';

module.exports = {
  createProjectSchema: {
    rules: {
      name: name.required(),
      blockchain: blockchain.required(),
    },
    hints: {
      name: projectNameHint,
    },
  },
  updateProjectSchema: {
    rules: {
      name: name.required(),
      newName: name,
      newBlockchain: blockchain,
    },
    hints: {
      name: projectNameHint,
      newName: projectNameHint,
    },
  },
  deleteProjectSchema: {
    rules: {
      name: name.required(),
    },
    hints: {
      name: projectNameHint,
    },
  },
};
