import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import { actions } from './actions';
import { NEAREST_TARGET, MEASUREMENTS_TARGET } from './constants';

const initialStateDescription = { [MEASUREMENTS_TARGET]: null, [NEAREST_TARGET]: null };

const initialState = completeState(initialStateDescription);

const reducerDescription = {
  primaryActions: [actions.GET_NEAREST, actions.GET_MEASUREMENTS]
};

export const reducer = createReducer(new Immutable(initialState), completeReducer(reducerDescription));
