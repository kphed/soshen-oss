import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const ActionButton = memo(({
  primary,
  variant,
  disabled,
  color,
  style,
  dataTestId,
  onClick,
  text,
  ...props
}) => (
  <Button
    {...props}
    variant={variant || (primary ? 'contained' : 'outlined')}
    color={color || 'primary'}
    size="large"
    disabled={disabled}
    style={style || (primary && { marginLeft: 10, ...style })}
    data-testid={dataTestId}
    onClick={onClick}
  >
    {text}
  </Button>
));

ActionButton.propTypes = {
  primary: PropTypes.bool,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  style: PropTypes.shape({}),
  dataTestId: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

ActionButton.defaultProps = {
  primary: null,
  variant: null,
  disabled: false,
  color: '',
  style: null,
  dataTestId: '',
  onClick: null,
};

export default ActionButton;
