import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  CssBaseline,
} from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import Navigation from '../container/Navigation';
import Routes from './Routes';
import Projects from '../container/Projects';
import Stats from '../container/Stats';
import Notification from '../functional/Notification';

const App = React.memo(() => (
  <Fragment>
    <CssBaseline />
    <Grid container>
      <Navigation />
      <Routes>
        <Projects path="/(|projects)/" protected />
        <Stats path="/stats" protected />
      </Routes>
      <Notification />
    </Grid>
  </Fragment>
));

export default hot(withRouter(App));
