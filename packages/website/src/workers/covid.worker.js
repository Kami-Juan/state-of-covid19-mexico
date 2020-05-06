/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import {groupBy, countBy} from 'lodash';

self.addEventListener('message', e => {
  if (!e) return;

  const {covidData} = e.data;

  const casesByDates = groupBy(covidData, 'RESULTADO');

  const positivosByFechaIngreso = countBy(
    casesByDates['Positivo SARS-CoV-2'],
    'FECHA_INGRESO',
  );

  const negativosByFechaIngreso = countBy(
    casesByDates['No positivo SARS-CoV-2'],
    'FECHA_INGRESO',
  );

  const pendientesByFechaIngreso = countBy(
    casesByDates['Resultado pendiente'],
    'FECHA_INGRESO',
  );

  postMessage({
    positivosByFechaIngreso,
    negativosByFechaIngreso,
    pendientesByFechaIngreso,
  });
});
