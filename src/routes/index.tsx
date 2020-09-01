import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';


const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={Login} path="/" exact />
      <Route component={Register} path="/register" />
      <Route component={ForgotPassword} path="/forgot-password" />
      <Route component={ResetPassword} path="/reset-password" />

      <Route component={Dashboard} path="/dashboard" isPrivate />
      <Route component={Profile} path="/profile/:id" isPrivate />
    </Switch>
  );
};

export default Routes;
