const projectMethodSchema = require('./project');
const statsMethodSchema = require('./stats');

module.exports = {
  ...projectMethodSchema,
  ...statsMethodSchema,
};
