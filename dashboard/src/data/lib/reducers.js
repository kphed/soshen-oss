const {
  errorCodes,
  errorMessages,
} = require('../../util/constants');

const initialStateDecorator = state => ({
  ...state,
  inProgress: false,
  error: null,
  errorCode: errorCodes.NONE,
  errorMessage: errorMessages.NONE,
});

const reduceStartState = (state, startState = {}) => ({
  ...state,
  ...startState,
  inProgress: true,
  error: null,
  errorCode: errorCodes.NONE,
  errorMessage: errorMessages.NONE,
});

const reduceSucessState = (state, successState = {}) => ({
  ...state,
  ...successState,
  inProgress: false,
});

const reduceErrorState = (state, errorState = {
  error: null,
  errorCode: errorCodes.UNKNOWN,
  errorMessage: errorMessages.UNKNOWN,
}) => ({
  ...state,
  ...errorState,
  inProgress: false,
});

const evalStatusCases = (state, action, updatedState) => {
  const { status } = action;

  switch (status) {
    case '':
      return reduceStartState(state, updatedState);
    case 'success':
      return reduceSucessState(state, updatedState);
    case 'error':
      return reduceErrorState(state, updatedState);
    default:
      return state;
  }
};

const updateById = (byId, newId) => ({ ...byId, ...newId });

const filterOldId = (allIds, oldId) => allIds.filter(id => id !== oldId);

module.exports = {
  initialStateDecorator,
  evalStatusCases,
  updateById,
  filterOldId,
};
