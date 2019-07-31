module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z0-9\-_]+$/i,
        notEmpty: true,
        len: [1, 50],
      },
    },
    blockchain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Project;
};
