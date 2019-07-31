const Joi = require('joi');

module.exports = {
  id: Joi.string().max(255),
  dateRange: Joi.number().positive(),
};
