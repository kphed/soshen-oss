import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { gridContainer } from '../../../styles/js/reusable/progress-spinner';

const ReusableProgressSpinner = React.memo(({ style }) => (
  <Grid
    container
    justify="center"
    alignContent="center"
    spacing={0}
    direction="column"
    alignItems="center"
    style={gridContainer}
  >
    <CircularProgress size={100} style={style} />
  </Grid>
));

ReusableProgressSpinner.propTypes = {
  style: PropTypes.shape({}),
};

ReusableProgressSpinner.defaultProps = {
  style: {},
};

export default ReusableProgressSpinner;
