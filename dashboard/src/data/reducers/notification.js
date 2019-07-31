import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from '../actions/types';
import {
  evalStatusCases,
  initialStateDecorator,
} from '../lib/reducers';
import { notificationTypes } from '../../util/constants';

const notificationState = initialStateDecorator({
  notificationType: notificationTypes.INFORMATION,
  notificationText: '',
  showNotification: false,
});

const typeReducer = (state, action) => {
  let updatedState = {};
  const {
    type,
    response,
  } = action;

  switch (type) {
    case SHOW_NOTIFICATION:
      updatedState = { ...updatedState, ...response };
      updatedState.showNotification = true;
      break;
    case HIDE_NOTIFICATION:
      updatedState.showNotification = false;
      break;
    default:
      return state;
  }

  return evalStatusCases(state, action, updatedState);
};

export default (state = notificationState, action) => {
  const { type } = action;

  switch (type) {
    case SHOW_NOTIFICATION:
    case HIDE_NOTIFICATION:
      return typeReducer(state, action);
    default:
      return state;
  }
};
