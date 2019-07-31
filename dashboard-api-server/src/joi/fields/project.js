const Joi = require('joi');
const { blockchainList } = require('../../util/lookup-tables');
const { regexPatterns } = require('../../util/constants');

module.exports = {
  id: Joi.string().max(255),
  name: Joi.string().max(255).regex(regexPatterns.PROJECT_NAME),
  apiId: Joi.string().max(255),
  blockchain: Joi.string().valid(blockchainList),
};
