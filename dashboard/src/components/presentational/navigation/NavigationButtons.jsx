import React from 'react';
import { Button } from '@material-ui/core';
import {
  LayersSharp,
  InsertChartOutlinedSharp,
} from '@material-ui/icons';
import Box from '../reusable/Box';
import Link from '../reusable/Link';
import {
  leftButton,
  buttonIcon,
} from '../../../styles/js/navigation';

const NavigationalButtons = React.memo(() => (
  <Box display={{ xs: 'none', sm: 'block' }}>
    <Link to="/projects">
      <Button style={leftButton} color="inherit" data-testid="projectLink">
        <LayersSharp style={buttonIcon} />
        Projects
      </Button>
    </Link>
    <Link to="/stats">
      <Button color="inherit">
        <InsertChartOutlinedSharp style={buttonIcon} />
        Stats
      </Button>
    </Link>
  </Box>
));

export default NavigationalButtons;
