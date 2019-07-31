const uuidv4 = require('uuid/v4');
const {
  Sequelize: { Op },
  Project,
} = require('../database/models');
const validateInput = require('../joi/validate-input');
const {
  sanitizeObject,
  sanitizeList,
} = require('../util/sanitize-output');
const {
  createProjectSchema,
  updateProjectSchema,
  deleteProjectSchema,
} = require('../joi/methods');

const generateProjectApiData = async () => {
  try {
    const id = uuidv4();
    const apiId = id.substr(0, (id.length / 2));

    return {
      id,
      apiId,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  fetchProjects: async () => {
    try {
      const projects = await Project.findAll({
        raw: true,
      });

      return sanitizeList(projects);
    } catch (err) {
      throw err;
    }
  },
  createProject: async (req) => {
    const { body } = req;

    await validateInput(body, createProjectSchema);

    const {
      name,
      blockchain,
    } = body;

    try {
      const project = await Project.findOne({
        where: {
          name: { [Op.iLike]: name },
        },
      });

      if (project) {
        throw new Error('Project name has been taken');
      }

      const {
        id,
        apiId,
      } = await generateProjectApiData();

      const newProject = await Project.create({
        id,
        name,
        apiId,
        blockchain,
      });

      return sanitizeObject(newProject);
    } catch (err) {
      throw err;
    }
  },
  updateProject: async (req) => {
    const { body } = req;

    await validateInput(body, updateProjectSchema);

    const {
      name,
      newName = '',
      newBlockchain = '',
    } = body;

    try {
      const project = await Project.findOne({
        where: {
          name: { [Op.iLike]: newName },
        },
      });

      if (project) {
        throw new Error('Project name has been taken');
      }

      const [, updatedProject] = await Project.update({
        ...(newName && { name: newName }),
        ...(newBlockchain && { blockchain: newBlockchain }),
      }, {
        where: {
          name: { [Op.iLike]: name },
        },
        returning: true,
        plain: true,
      });

      if (!updatedProject) {
        throw new Error('Error updating project');
      }

      return sanitizeObject(updatedProject);
    } catch (err) {
      throw err;
    }
  },
  deleteProject: async (req) => {
    const { body } = req;

    await validateInput(body, deleteProjectSchema);

    const { name } = body;

    try {
      const project = await Project.findOne({
        where: {
          name: { [Op.iLike]: name },
        },
      });

      if (!project) {
        throw new Error('Project not found');
      }

      const success = !!(await Project.destroy({
        where: {
          name: { [Op.iLike]: name },
        },
      }));

      if (!success) {
        throw new Error('Error deleting project');
      }

      return success;
    } catch (err) {
      throw err;
    }
  },
};
