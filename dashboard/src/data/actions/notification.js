import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from './types';
import { actionWrapper } from '../lib/actions';

const showNotificationAction = response => actionWrapper({ type: SHOW_NOTIFICATION })({ response });
const hideNotificationAction = response => actionWrapper({ type: HIDE_NOTIFICATION })({ response });

export default () => ({
  showNotification: param => dispatch => dispatch(showNotificationAction(param)),
  hideNotification: () => dispatch => dispatch(hideNotificationAction()),
});
