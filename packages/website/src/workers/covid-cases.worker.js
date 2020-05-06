/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-globals */
self.addEventListener('message', e => {
  if (!e) return;

  const {covidData} = e.data;

  const datesWithCases = {};

  for (const data in covidData) {
    for (const date in covidData[data].dates) {
      const {resultados} = covidData[data].dates[date];

      const posCount = resultados['Positivo SARS-CoV-2']
        ? resultados['Positivo SARS-CoV-2']
        : 0;

      const noPosCount = resultados['No positivo SARS-CoV-2']
        ? resultados['No positivo SARS-CoV-2']
        : 0;

      const pendCount = resultados['Resultado pendiente']
        ? resultados['Resultado pendiente']
        : 0;

      if (Object.keys(datesWithCases).length > 0 && datesWithCases[date]) {
        datesWithCases[date] = {
          'Positivo SARS-CoV-2':
            datesWithCases[date]['Positivo SARS-CoV-2'] + posCount,
          'No positivo SARS-CoV-2':
            datesWithCases[date]['No positivo SARS-CoV-2'] + noPosCount,
          'Resultado pendiente':
            datesWithCases[date]['Resultado pendiente'] + pendCount,
        };
      } else {
        datesWithCases[date] = {
          'Positivo SARS-CoV-2': posCount,
          'No positivo SARS-CoV-2': noPosCount,
          'Resultado pendiente': posCount,
        };
      }
    }
  }

  const orderedKeys = Object.keys(datesWithCases).sort(
    (a, b) => new Date(a) - new Date(b),
  );

  const labelValuesPositivos = orderedKeys.reduce(
    (prev, key) => [
      ...prev,
      [new Date(key).getTime(), datesWithCases[key]['Positivo SARS-CoV-2']],
    ],
    [],
  );

  const labelValuesNegativos = orderedKeys.reduce(
    (prev, key) => [
      ...prev,
      [new Date(key).getTime(), datesWithCases[key]['No positivo SARS-CoV-2']],
    ],
    [],
  );

  const labelValuesPendientes = orderedKeys.reduce(
    (prev, key) => [
      ...prev,
      [new Date(key).getTime(), datesWithCases[key]['Resultado pendiente']],
    ],
    [],
  );

  postMessage({
    labelValuesPositivos,
    labelValuesNegativos,
    labelValuesPendientes,
  });
});
