const stats = require('./stats');
const projects = require('./projects');
const notification = require('./notification');

module.exports = {
  ...stats,
  ...projects,
  ...notification,
};
