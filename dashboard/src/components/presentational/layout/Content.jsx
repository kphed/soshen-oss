import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
} from '@material-ui/core';
import {
  top,
  center,
  bottom,
} from '../../../styles/js/layout/content';

export default class Content extends PureComponent {
  static Top = ({ children }) => (
    <Grid container style={top}>
      { children }
    </Grid>
  )

  static Center = ({ children, style }) => (
    <Paper square style={style}>
      <Grid container justify="center" alignItems="center" style={center}>
        { children }
      </Grid>
    </Paper>
  )

  static Bottom = ({ children, style }) => (
    <Paper square style={style}>
      <Grid container justify="center" alignItems="center" style={bottom}>
        { children }
      </Grid>
    </Paper>
  )

  static Left = ({ children }) => (
    <Grid container alignItems="center" wrap="nowrap" item xs={6}>
      {children}
    </Grid>
  )

  static Right = ({ children }) => (
    <Grid container justify="flex-end" wrap="nowrap" item xs={6}>
      { children }
    </Grid>
  )

  render = () => (
    <Grid container justify="center">
      <Grid item xs={11} sm={8}>
        { this.props.children }
      </Grid>
    </Grid>
  )
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
};
