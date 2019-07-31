import React from 'react';
import { Grid } from '@material-ui/core';
import Link from '../reusable/Link';
import {
  brand,
} from '../../../styles/js/navigation';

const Brand = React.memo(() => (
  <Grid style={brand} color="inherit">
    <Link to="/">sōshen</Link>
  </Grid>
));

export default Brand;
