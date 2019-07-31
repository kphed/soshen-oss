import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  InputAdornment,
} from '@material-ui/core';

const ReusableInputField = React.memo(({
  label,
  dataTestId,
  value,
  onChange,
  disabled,
  style,
  startAdornmentIcon,
  endAdornmentIcon,
  onClick,
  onFocus,
  onBlur,
}) => (
  <TextField
    fullWidth
    data-testid={dataTestId}
    variant="outlined"
    label={label}
    value={value}
    disabled={disabled}
    style={style}
    readOnly={!onChange}
    onChange={onChange}
    InputProps={{
      inputProps: {
        onClick,
        onFocus,
        onBlur,
      },
      ...startAdornmentIcon && ({
        startAdornment: <InputAdornment position="start">{ startAdornmentIcon }</InputAdornment>,
      }),
      ...endAdornmentIcon && ({
        endAdornment: <InputAdornment position="end">{ endAdornmentIcon }</InputAdornment>,
      }),
    }}
  />
));

ReusableInputField.propTypes = {
  label: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  startAdornmentIcon: PropTypes.element,
  endAdornmentIcon: PropTypes.element,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

ReusableInputField.defaultProps = {
  onChange: null,
  dataTestId: '',
  disabled: false,
  style: {},
  startAdornmentIcon: null,
  endAdornmentIcon: null,
  onClick: null,
  onFocus: null,
  onBlur: null,
};

export default ReusableInputField;
