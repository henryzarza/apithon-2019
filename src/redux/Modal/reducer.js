import Immutable from 'seamless-immutable';
import { createReducer, onSetValue } from 'redux-recompose';

import { actions } from './actions';
import { MODAL_TARGET } from './constants';

const initialStateDescription = { [MODAL_TARGET]: false };

const reducerDescription = {
  [actions.OPEN_MODAL]: onSetValue(true),
  [actions.CLOSE_MODAL]: onSetValue(false)
};

export const reducer = createReducer(new Immutable(initialStateDescription), reducerDescription);
