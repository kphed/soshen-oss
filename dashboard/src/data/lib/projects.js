const { normalize, schema } = require('normalizr');

const projectSchema = new schema.Entity(
  'projects',
  {},
  { idAttribute: 'name' },
);

const projectListSchema = new schema.Array(projectSchema);

const normalizeProject = data => normalize(data, projectSchema);

const normalizeProjectList = data => normalize(data, projectListSchema);

module.exports = {
  normalizeProject,
  normalizeProjectList,
};
