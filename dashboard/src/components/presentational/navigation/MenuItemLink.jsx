import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import Link from '../reusable/Link';

const MenuItemLink = React.memo(({
  path,
  text,
  dataTestId,
}) => (
  <Link to={path}>
    <MenuItem data-testid={dataTestId}>{text}</MenuItem>
  </Link>
));

MenuItemLink.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
};

MenuItemLink.defaultProps = {
  dataTestId: '',
};

export default MenuItemLink;
