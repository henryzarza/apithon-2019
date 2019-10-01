import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';

import { USER_TARGET } from './constants';

import AuthService from '~services/AuthService';

const completedTypes = completeTypes(['LOGIN'], ['LOGOUT']);

export const actions = createTypes(completedTypes, '@@AUTH');

export const actionCreators = {
  login: authData => ({
    type: actions.LOGIN,
    target: USER_TARGET,
    service: AuthService.login,
    payload: authData,
    successSelector: response => response.data,
    failureSelector: response => response.error,
    injections: [
      withPostSuccess((_, response) => {
        AuthService.setCurrentUser(response.data);
      })
    ]
  }),
  logout: () => dispatch => {
    AuthService.removeCurrentUser();
    dispatch({
      type: actions.LOGOUT,
      target: USER_TARGET,
      payload: null
    });
  }
};
