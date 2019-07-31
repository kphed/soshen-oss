const { difference } = require('lodash');
const endpoints = require('../api');
const sendError = require('../../util/send-error');
const throwError = require('../../util/throw-error');
const { propTypes } = require('../util/prop-types');
const { errorMessages } = require('../../util/constants');

const {
  MISSING_PROPS,
  UNNECESSARY_PROPS,
  INVALID_PROP_TYPES,
} = errorMessages;

const checkForMissingRequiredProps = (props, requiredProps) => {
  const missingRequiredProps = requiredProps.filter(requiredProp => !props.includes(requiredProp));

  if (missingRequiredProps.length) {
    return throwError(new Error(`${MISSING_PROPS}: ${missingRequiredProps.join(', ')}`));
  }

  return true;
};

const checkForUnnecessaryProps = (props, requiredProps, optionalProps) => {
  const unnecessaryProps = difference(props, [...requiredProps, ...optionalProps]);

  if (unnecessaryProps.length) {
    return throwError(new Error(`${UNNECESSARY_PROPS}: ${unnecessaryProps.join(', ')}`));
  }

  return true;
};

const checkForInvalidPropTypes = (props, requestProps) => {
  const invalidPropTypes = props.filter((prop) => {
    if (propTypes[prop] === 'array') {
      return !Array.isArray(requestProps[prop]);
    }

    return typeof requestProps[prop] !== propTypes[prop];
  });

  if (invalidPropTypes.length) {
    return throwError(new Error(`${INVALID_PROP_TYPES}: ${invalidPropTypes.join(', ')}`));
  }

  return true;
};

const setDefaultProps = (res, requestProps, defaultProps) => {
  const inputProps = {
    ...defaultProps,
    ...requestProps,
  };

  res.locals = {
    ...res.locals,
    requestProps: inputProps,
  };
};

module.exports = (req, res, next) => {
  const {
    apiEndpoint,
    requestProps,
  } = res.locals;
  const props = Object.keys(requestProps);

  if (!apiEndpoint || !endpoints[apiEndpoint]) {
    const error = new Error('Invalid route');
    sendError(res, 404, error.message);
    return throwError(error);
  }

  const {
    requiredProps = [],
    optionalProps = [],
    defaultProps = {},
  } = endpoints[apiEndpoint];
  if (requiredProps.length || optionalProps.length) {
    try {
      checkForMissingRequiredProps(props, requiredProps);
      checkForUnnecessaryProps(props, requiredProps, optionalProps);
      checkForInvalidPropTypes(props, requestProps);
      setDefaultProps(res, requestProps, defaultProps);
    } catch (err) {
      sendError(res, 400, err.message);

      return throwError(err);
    }
  }

  return next();
};
