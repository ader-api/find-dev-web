import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={Login} path="/" exact />
    </Switch>
  );
};

export default Routes;
