import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (!user ? <Redirect to='/' /> : <Component {...props} />)}
    />
  );
};
const mapStateToProps = state => ({
  user: state.users.user
});
export default connect(mapStateToProps)(PrivateRoute);
//if isAuthenticated and loading are false redirect to "/login" route
