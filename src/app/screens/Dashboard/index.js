import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './screens/Home';
import Trip from './screens/Trip';

import Routes from '~constants/routes';

function Dashboard() {
  return (
    <div className="main-content">
      <Switch>
        <Route exact path={Routes.TRIP} component={Trip} />
        <Route exact path={Routes.HOME} component={Home} />
        <Route component={<Redirect to={Routes.HOME} />} />
      </Switch>
    </div>
  );
}

export default Dashboard;
