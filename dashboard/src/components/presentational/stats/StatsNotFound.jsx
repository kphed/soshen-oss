import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';

const StatsNotFound = () => (
  <Grid container>
    <Grid item xs={12}>
      <Typography align="center">
        NO STATS FOUND
      </Typography>
    </Grid>
  </Grid>
);

export default StatsNotFound;
