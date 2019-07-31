import React from 'react';
import {
  AppBar,
  Toolbar,
} from '@material-ui/core';
import Box from '../presentational/reusable/Box';
import Brand from '../presentational/navigation/Brand';
import NavigationalMenu from '../presentational/navigation/NavigationMenu';
import NavigationButtons from '../presentational/navigation/NavigationButtons';

const NavigationContainer = React.memo(() => (
  <AppBar position="static">
    <Toolbar>
      <Brand />
      <NavigationButtons />
      <Box display={{ xs: 'block', sm: 'none' }}>
        <NavigationalMenu />
      </Box>
    </Toolbar>
  </AppBar>
));

export default NavigationContainer;
