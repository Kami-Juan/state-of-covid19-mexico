import {
  map,
  compose,
  pickAll,
  keys,
  values,
  unnest,
  uniq,
  sort,
  groupBy,
  toPairs,
  sum,
} from 'ramda';

const getLabelByCollect = (data, key) => {
  return compose(
    map(x => [new Date(x[0]).getTime(), x[1]]),
    toPairs,
    map(x => sum(map(y => y[1], x))),
    groupBy(x => x[0]),
    unnest,
    map(x => toPairs(x)),
    map(x => map(y => (y ? y[key] || 0 : 0), x)),
    values,
  )(data);
};

/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-globals */
self.addEventListener('message', e => {
  if (!e) return;

  const {covidData} = e.data;

  const keysVal = compose(
    sort((a, b) => new Date(a) - new Date(b)),
    uniq,
    unnest,
    map(x => keys(x)),
    values,
    map(x => map(y => y, x.dates)),
  )(covidData);

  const composeData = compose(
    map(x => pickAll(keysVal, x)),
    map(x =>
      map(
        z =>
          pickAll(
            [
              'Positivo SARS-CoV-2',
              'No positivo SARS-CoV-2',
              'Resultado pendiente',
            ],
            z,
          ),
        x,
      ),
    ),
    map(x => map(z => z.resultados, x)),
    map(x => x.dates),
  )(covidData);

  const labelValuesPositivos = getLabelByCollect(
    composeData,
    'Positivo SARS-CoV-2',
  );

  const labelValuesNegativos = getLabelByCollect(
    composeData,
    'No positivo SARS-CoV-2',
  );

  const labelValuesPendientes = getLabelByCollect(
    composeData,
    'Resultado pendiente',
  );

  postMessage({
    labelValuesPositivos,
    labelValuesNegativos,
    labelValuesPendientes,
  });
});
