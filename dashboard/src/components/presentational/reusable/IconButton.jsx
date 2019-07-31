import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { iconButton } from '../../../styles/js/reusable/icon-button';

const ReusableIconButton = React.memo(({
  title,
  dataTestId,
  onClick,
  icon,
  classes,
}) => (
  <Tooltip title={title}>
    <IconButton classes={{ root: classes.iconButton }} data-testid={dataTestId} onClick={onClick}>
      {icon}
    </IconButton>
  </Tooltip>
));

ReusableIconButton.propTypes = {
  title: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.element.isRequired,
  classes: PropTypes.shape({
    iconButton: PropTypes.string.isRequired,
  }).isRequired,
};

ReusableIconButton.defaultProps = {
  onClick: null,
  dataTestId: '',
};

export default withStyles(iconButton)(ReusableIconButton);
