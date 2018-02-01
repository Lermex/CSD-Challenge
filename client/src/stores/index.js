import { applyMiddleware, createStore, compose } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import users from './users';

const reducers = users.reducer;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [reduxThunkMiddleware, createLogger({ collapsed: true, timestamp: false })];

export const buildStore = ({ reducer, middlewares = middleware }) =>
  createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));

export default function initStore () {
  return buildStore({ reducer: reducers, middleware });
}
