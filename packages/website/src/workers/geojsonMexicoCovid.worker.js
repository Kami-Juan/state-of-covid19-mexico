/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
self.addEventListener('message', e => {
  if (!e) return;

  const {mexicoGeoJSON, covidData, typeMap} = e.data;

  const mexicoCountries = mexicoGeoJSON.features.filter(
    feature => !!feature.properties.mun_code === false,
  );

  for (let i = 0; i < mexicoCountries.length; i++) {
    const stateCodeCounty = mexicoCountries[i].properties.state_code;
    const keyCovidState =
      stateCodeCounty < 10 ? `0${stateCodeCounty}` : stateCodeCounty;

    const {totalResults} = covidData[keyCovidState];

    mexicoCountries[i].properties.totalCases = totalResults[typeMap];
  }

  postMessage(mexicoCountries);
});
