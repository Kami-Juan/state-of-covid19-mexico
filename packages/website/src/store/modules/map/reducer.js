import {SET_MEXICO_GEOJSON, SET_COVID_DATA} from './actionTypes';

const defaultState = {
  mexicoGeojson: {},
  covidData: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_MEXICO_GEOJSON:
      return {
        ...state,
        mexicoGeojson: action.data,
      };
    case SET_COVID_DATA:
      return {
        ...state,
        covidData: action.data,
      };
    default:
      return state;
  }
};
