import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  InputAdornment,
} from '@material-ui/core';
import {
  inputLabel,
  select,
} from '../../../styles/js/reusable/select';

const ReusableSelect = React.memo(({
  label,
  dataTestId,
  disabled,
  value,
  options,
  onChange,
  style,
  startAdornmentIcon,
  dataList,
  dataKey,
}) => (
  <TextField
    select
    fullWidth
    data-testid={dataTestId}
    disabled={disabled}
    label={label}
    value={value}
    style={style}
    onChange={onChange}
    variant="outlined"
    SelectProps={select}
    InputProps={{
      ...startAdornmentIcon && ({
        startAdornment: <InputAdornment position="start">{ startAdornmentIcon }</InputAdornment>,
      }),
    }}
    InputLabelProps={inputLabel}
  >
    { options.map(option => (
      <option key={option} value={option}>
        { (dataList && dataKey ? dataList[option][dataKey] : option) }
      </option>
    ))}
  </TextField>
));

ReusableSelect.propTypes = {
  label: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  dataList: PropTypes.shape({}),
  dataKey: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  startAdornmentIcon: PropTypes.element,
  style: PropTypes.shape({}),
};

ReusableSelect.defaultProps = {
  dataTestId: '',
  dataList: null,
  dataKey: null,
  disabled: false,
  startAdornmentIcon: null,
  style: null,
};

export default ReusableSelect;
