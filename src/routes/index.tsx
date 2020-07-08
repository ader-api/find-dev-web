import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={Login} path="/" exact />
      <Route component={Register} path="/register" />
      <Route component={ForgotPassword} path="/forgot-password" />
    </Switch>
  );
};

export default Routes;
