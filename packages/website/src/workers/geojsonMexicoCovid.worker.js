import {countBy} from 'lodash';

/* eslint-disable no-restricted-globals */
// eslint-disable-next-line no-restricted-globals
// eslint-disable-next-line no-undef
self.addEventListener('message', e => {
  // eslint-disable-line no-restricted-globals
  if (!e) return;

  const {mexicoGeoJSON, covidStates, covidStatesGroup, typeMap} = e.data;

  const mexicoCountries = mexicoGeoJSON.features.filter(
    feature => !!feature.properties.mun_code === false,
  );

  // eslint-disable-next-line no-restricted-globals

  for (let i = 0; i < mexicoCountries.length; i++) {
    const stateCodeCounty = mexicoCountries[i].properties.state_code;
    const keyCovidState =
      stateCodeCounty < 10 ? `0${stateCodeCounty}` : stateCodeCounty;

    const totalCases = covidStates[keyCovidState];

    const totalByResults = countBy(
      covidStatesGroup[keyCovidState],
      'RESULTADO',
    );

    mexicoCountries[i].properties.totalCases = totalByResults[typeMap];
  }

  // eslint-disable-next-line no-undef
  postMessage(mexicoCountries);
});
