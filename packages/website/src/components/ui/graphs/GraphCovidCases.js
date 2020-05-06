import React, {useEffect, useState, useRef} from 'react';

import {useSelector} from 'react-redux';
import BaseGraph from './BaseGraph';

import LabelColor from '../../base/LabelColor';
import LabelColorContainer from '../../base/LabelColorContainer';

import CovidCaseWorker from '../../../workers/covid-cases.worker';

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

  const covidCasesWorker = useRef(null);

  const covidData = useSelector(state => state.map.covidData);

  useEffect(() => {
    covidCasesWorker.current = new CovidCaseWorker();
  }, []);

  useEffect(() => {
    if (Object.keys(covidData).length > 0 && covidCasesWorker.current) {
      covidCasesWorker.current.postMessage({
        covidData,
      });

      covidCasesWorker.current.addEventListener('message', e => {
        setOpts(prev => ({
          ...prev,
          series: [
            {
              name: 'Negativos',
              data: e.data.labelValuesPositivos,
            },
            {
              name: 'Positivo',
              data: e.data.labelValuesNegativos,
            },
            {
              name: 'Sin confirmar',
              data: e.data.labelValuesPendientes,
            },
          ],
        }));
      });
    }
  }, [covidData, covidCasesWorker]);

  return (
    <>
      <LabelColorContainer>
        <LabelColor color="#7ac16d" text="Casos positivos" />
        <LabelColor color="#2b908f" text="Casos negativos" />
        <LabelColor color="#f45b5b" text="Casos sin confirmar" />
      </LabelColorContainer>
      <BaseGraph opts={opts} />
    </>
  );
};

export default GraphCovidCases;
