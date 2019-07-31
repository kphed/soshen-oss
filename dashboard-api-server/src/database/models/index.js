const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { NODE_ENV } = require('../../config');
const dbConfig = require('../db-config')[NODE_ENV];

const db = {};
const sequelize = new Sequelize(dbConfig);
const basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
