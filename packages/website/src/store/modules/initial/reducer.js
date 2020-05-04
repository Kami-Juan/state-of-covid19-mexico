import {SET_INITIAL_LOADING} from './actionTypes';

const defaultState = {
  loading: true,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_INITIAL_LOADING:
      return {
        ...state,
        loading: action.state !== null ? action.state : !action.state,
      };
    default:
      return state;
  }
};
