import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';

import { reducer as auth } from './Auth/reducer';

export const history = createBrowserHistory();

const reducers = combineReducers({
  auth,
  form,
  router: connectRouter(history)
});

const middlewares = [thunk, routerMiddleware(history)];
const enhancers = [];

enhancers.push(applyMiddleware(...middlewares));

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = (state, action) => reducers(state, action);

const store = createStore(rootReducer, composeEnhancers(...enhancers));

export default store;
