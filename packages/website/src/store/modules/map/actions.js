import {SET_MEXICO_GEOJSON, SET_COVID_DATA} from './actionTypes';

export const setMexicoGeojson = data => {
  return {
    type: SET_MEXICO_GEOJSON,
    data,
  };
};

export const setCovidData = data => {
  return {
    type: SET_COVID_DATA,
    data,
  };
};
