import React, { lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import { history } from '../../../redux/store';
import Suspense from '../Suspense';
import Routes from '../../../constants/routes';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import styles from './styles.scss';

const Dashboard = lazy(() => import('../../screens/Dashboard'));
const Login = lazy(() => import('../../screens/Login'));

function AppRoutes() {
  return (
    <ConnectedRouter history={history}>
      <div className={styles.container}>
        <Suspense>
          <Switch>
            <AuthenticatedRoute isPrivateRoute path={Routes.HOME} component={Dashboard} />
            <AuthenticatedRoute isPublicRoute exact path={Routes.LOGIN} component={Login} />
          </Switch>
        </Suspense>
      </div>
    </ConnectedRouter>
  );
}

export default AppRoutes;
