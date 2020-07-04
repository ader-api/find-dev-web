import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={Login} path="/" exact />
      <Route component={Register} path="/register" />
    </Switch>
  );
};

export default Routes;
