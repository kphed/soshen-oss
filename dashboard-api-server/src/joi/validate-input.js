const Joi = require('joi');
const { get } = require('lodash');

const parseError = (error, hints) => {
  const fieldName = get(error, ['details', 0, 'path', 0], null);

  if (fieldName) {
    return hints[fieldName] || `Invalid input for "${fieldName}" field`;
  }

  return 'Bad Request';
};

module.exports = (input, schema) => {
  const {
    rules,
    hints,
  } = schema;

  const { error } = Joi.validate(input, rules);

  if (error) {
    throw new Error(parseError(error, hints));
  }

  return true;
};
