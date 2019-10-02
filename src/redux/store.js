import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';
import { fetchMiddleware } from 'redux-recompose';

import { reducer as auth } from './Auth/reducer';
import { reducer as modal } from './Modal/reducer';
import { reducer as home } from './Home/reducer';

export const history = createBrowserHistory();

const reducers = combineReducers({
  auth,
  form,
  modal,
  home,
  router: connectRouter(history)
});

const middlewares = [thunk, fetchMiddleware, routerMiddleware(history)];
const enhancers = [];

enhancers.push(applyMiddleware(...middlewares));

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = (state, action) => reducers(state, action);

const store = createStore(rootReducer, composeEnhancers(...enhancers));

export default store;
