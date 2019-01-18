import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//component: Component - component prop is Component subclass
const PrivateRoute = ({ component: Component, userAuth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      userAuth.isAuthenticated === true ? (
        <Component key={props.match.params.user_id} {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  userAuth: state.userAuth
});

export default connect(mapStateToProps)(PrivateRoute);
