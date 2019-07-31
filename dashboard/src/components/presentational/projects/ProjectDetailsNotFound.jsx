import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { projectDetailsNotFound } from '../../../styles/js/projects';

const ProjectDetailsNotFound = () => (
  <Grid container style={projectDetailsNotFound.root}>
    <Grid item xs={12}>
      <Typography
        align="center"
        style={projectDetailsNotFound.typography}
        data-testid="projectNotFoundLabel"
      >
        NO PROJECTS FOUND
      </Typography>
    </Grid>
  </Grid>
);

export default ProjectDetailsNotFound;
