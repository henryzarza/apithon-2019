import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './screens/Home';
import Profile from './screens/Profile';

import Routes from '~constants/routes';
import Navbar from '~components/Navbar';

function Dashboard() {
  return (
    <div className="main-content">
      <Navbar />
      <Switch>
        <Route exact path={Routes.PROFILE} component={Profile} />
        <Route exact path={Routes.HOME} component={Home} />
        <Route component={<Redirect to={Routes.HOME} />} />
      </Switch>
    </div>
  );
}

export default Dashboard;
