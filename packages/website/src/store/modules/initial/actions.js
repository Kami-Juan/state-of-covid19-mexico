import {SET_INITIAL_LOADING} from './actionTypes';

export const setInitialLoading = (state = null) => {
  return {
    type: SET_INITIAL_LOADING,
    state,
  };
};
