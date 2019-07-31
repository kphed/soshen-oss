const { get } = require('lodash');

const actionWrapper = ({ type }) => {
  const action = { type };
  const hasOwnProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

  return (payload = {}) => {
    action.response = null;
    action.error = null;
    action.status = '';

    if (hasOwnProp(payload, 'error')) {
      action.error = payload.error;
      action.status = 'error';
    } else if (hasOwnProp(payload, 'response')) {
      action.response = payload.response;
      action.status = 'success';
    }

    return { ...action };
  };
};

const parseActionError = (error, defaultMessage) => get(error, ['response', 'data', 'error', 'message'], defaultMessage);

module.exports = {
  actionWrapper,
  parseActionError,
};
