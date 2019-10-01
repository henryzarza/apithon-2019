import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer, onReadValue } from 'redux-recompose';

import { actions } from './actions';
import { USER_TARGET } from './constants';

import LocalStorageService from '~services/LocalStorageService';

const initialStateDescription = { [USER_TARGET]: LocalStorageService.getSessionToken() };

const initialState = completeState(initialStateDescription);

const reducerDescription = {
  primaryActions: [actions.LOGIN],
  override: {
    [actions.LOGOUT]: onReadValue()
  }
};

export const reducer = createReducer(new Immutable(initialState), completeReducer(reducerDescription));
