import React, {
  memo,
  Fragment,
  useState,
} from 'react';
import {
  IconButton,
  Menu,
} from '@material-ui/core';
import { MoreHorizSharp } from '@material-ui/icons';
import Box from '../reusable/Box';
import MenuItemLink from './MenuItemLink';

const NavigationMenu = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = ({ currentTarget }) => {
    setIsOpen(true);
    setAnchorEl(currentTarget);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <IconButton color="inherit" onClick={openMenu} data-testid="navigationalMenu">
        <MoreHorizSharp />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={isOpen}
        onClose={closeMenu}
        disableAutoFocusItem
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClick={closeMenu}
      >
        <Box display={{ xs: 'block', sm: 'none' }}>
          <MenuItemLink path="/projects" text="Projects" />
          <MenuItemLink path="/stats" text="Stats" />
        </Box>
      </Menu>
    </Fragment>
  );
});

export default NavigationMenu;
