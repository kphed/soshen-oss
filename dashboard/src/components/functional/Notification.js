import React, { memo } from 'react';
import {
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideNotification } from '../../data/actions';
import { notificationTypes } from '../../util/constants';
import {
  main,
  information,
  warning,
  error,
} from '../../styles/js/notification';

const {
  INFORMATION,
  WARNING,
  ERROR,
} = notificationTypes;

const getStyle = (type) => {
  const typeStyles = {
    [INFORMATION]: information,
    [WARNING]: warning,
    [ERROR]: error,
  };

  return { ...typeStyles[type], ...main };
};

const Notification = memo(({
  duration,
  notification: {
    notificationType,
    notificationText,
    showNotification,
  },
  hideNotification: hideNotificationAction,
}) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    open={showNotification}
    autoHideDuration={duration}
    onClose={hideNotificationAction}
  >
    <SnackbarContent
      style={getStyle(notificationType)}
      message={<span>{notificationText}</span>}
    />
  </Snackbar>
));

Notification.propTypes = {
  notification: PropTypes.shape({
    notificationType: PropTypes.string.isRequired,
    notificationText: PropTypes.string.isRequired,
    showNotification: PropTypes.bool.isRequired,
  }).isRequired,
  hideNotification: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

Notification.defaultProps = {
  duration: 2000,
};

const mapStateToProps = state => ({
  notification: state.notification,
});

export default connect(mapStateToProps, { hideNotification })(Notification);
