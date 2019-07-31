import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
} from 'react-router-dom';

const Routes = React.memo(({ children }) => (
  <Switch>
    { React.Children.map(children, child => (
      <Route path={child.props.path} render={() => child} />
    )) }
  </Switch>
));

Routes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Routes;
