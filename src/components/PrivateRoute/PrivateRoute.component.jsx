import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../../providers/Auth';

function PrivateRoute({ children, ...rest }) {
  const { isLoggedIn } = useAuth();

  return <Route {...rest} render={() => (isLoggedIn ? children : <Redirect to="/" />)} />;
}

export default PrivateRoute;
