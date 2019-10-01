import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bool, shape } from 'prop-types';

import Routes from '../../../../constants/routes';

import { USER_TARGET } from '~redux/Auth/constants';

const DEFAULT_PUBLIC_ROUTE = Routes.LOGIN;
const DEFAULT_PRIVATE_ROUTE = Routes.HOME;

function AuthenticatedRoute({
  /*
   * TODO Add this if you need it
   * device,
   */
  isPublicRoute,
  isPrivateRoute,
  // initialized,
  currentUser,
  component: Comp,
  ...props
}) {
  return (
    <Route
      {...props}
      // eslint-disable-next-line react/jsx-no-bind
      render={routeProps => {
        /*
         * TODO Add this if you need it
         * if (device.isMobile && !device.adviceSubmitted) {
         *   return <AppDownloader />;
         * }
         */
        if (currentUser) {
          if (isPublicRoute) {
            /*
             * TODO Add this if you need it
             * if (currentUser && isPublicRoute) {
             * do not allow logged users to access public routes. redirect to app
             */
            return (
              <Redirect
                to={{
                  pathname: DEFAULT_PRIVATE_ROUTE,
                  state: { from: props.location }
                }}
              />
            );
          }
        } else if (isPrivateRoute) {
          // Do not allow unlogged users to access app. redirect to signin
          return (
            <Redirect
              to={{
                pathname: DEFAULT_PUBLIC_ROUTE,
                state: { from: props.location }
              }}
            />
          );
        }

        return <Comp {...routeProps} />;
      }}
    />
  );
}

AuthenticatedRoute.propTypes = {
  ...Route.propTypes, // eslint-disable-line react/forbid-foreign-prop-types
  currentUser: shape(),
  isPrivateRoute: bool,
  isPublicRoute: bool
};

const mapStateToProps = store => ({
  currentUser: !!store.auth[USER_TARGET]
});

export default withRouter(connect(mapStateToProps)(AuthenticatedRoute));
