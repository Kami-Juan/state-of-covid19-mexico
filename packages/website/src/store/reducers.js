import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import initialReducer from './modules/initial/reducer';
import mapReducer from './modules/map/reducer';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    initial: initialReducer,
    map: mapReducer,
  });

export default createRootReducer;
