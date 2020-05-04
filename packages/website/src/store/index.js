// redux
import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import thunk from 'redux-thunk';

// reducers
import createRootReducer from './reducers';

export const history = createBrowserHistory();

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

/* eslint-disable no-underscore-dangle */
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-undef
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(createRootReducer(history), {}, composedEnhancers);

export default store;
