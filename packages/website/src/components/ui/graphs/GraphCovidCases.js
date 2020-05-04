import React, {useEffect, useState} from 'react';
import {groupBy, countBy} from 'lodash';

import {useSelector} from 'react-redux';
import BaseGraph from './BaseGraph';

import {timeRangeCollection, sizeRangeCollection} from '../../../utils/methods';

const GraphCovidCases = () => {
  const [opts, setOpts] = useState({
    chart: {
      zoomType: 'x',
    },
    title: {},
    subtitle: {},
    yAxis: {},
    xAxis: {},
    stockTools: {
      gui: {
        enabled: true,
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    plotOptions: {},
    series: [
      {
        name: 'No positivo',
        data: [],
      },
      {
        name: 'Positivo',
        data: [],
      },
      {
        name: 'Pendiente',
        data: [],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  });

  const covidData = useSelector(state => state.map.covidData);

  useEffect(() => {
    if (covidData.length > 0) {
      const casesByDates = groupBy(covidData, 'RESULTADO');

      const positivos = casesByDates['Positivo SARS-CoV-2'];
      const negativos = casesByDates['No positivo SARS-CoV-2'];
      const pendientes = casesByDates['Resultado pendiente'];

      const positivosByFechaIngreso = countBy(positivos, 'FECHA_INGRESO');
      const negativosByFechaIngreso = countBy(negativos, 'FECHA_INGRESO');
      const pendientesByFechaIngreso = countBy(pendientes, 'FECHA_INGRESO');

      const xAxisLabels = sizeRangeCollection([
        positivosByFechaIngreso,
        negativosByFechaIngreso,
        pendientesByFechaIngreso,
      ]);

      const labelValuesPositivos = timeRangeCollection(
        positivosByFechaIngreso,
        [xAxisLabels[0], xAxisLabels[xAxisLabels.length - 1]],
      );

      const labelValuesNegativos = timeRangeCollection(
        negativosByFechaIngreso,
        [xAxisLabels[0], xAxisLabels[xAxisLabels.length - 1]],
      );

      const labelValuesPendientes = timeRangeCollection(
        pendientesByFechaIngreso,
        [xAxisLabels[0], xAxisLabels[xAxisLabels.length - 1]],
      );

      setOpts(prev => ({
        ...prev,
        series: [
          {
            name: 'No positivo',
            data: Object.entries(labelValuesPositivos).map(val => [
              parseInt(val[0], 10),
              val[1],
            ]),
          },
          {
            name: 'Positivo',
            data: Object.entries(labelValuesNegativos).map(val => [
              parseInt(val[0], 10),
              val[1],
            ]),
          },
          {
            name: 'Pendiente',
            data: Object.entries(labelValuesPendientes).map(val => [
              parseInt(val[0], 10),
              val[1],
            ]),
          },
        ],
      }));
    }
  }, [covidData]);

  return <BaseGraph opts={opts} />;
};

export default GraphCovidCases;
