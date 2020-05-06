import React, {useEffect, useState} from 'react';
import Highchart from 'highcharts/highstock';

import '../../../utils/graphDarkTheme';

const BaseGraph = ({opts}) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    Highchart.setOptions({
      lang: {
        rangeSelectorFrom: 'Desde',
        rangeSelectorTo: 'Hasta',
        months: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        shortMonths: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Doc',
        ],
      },
    });
    const highchart = Highchart.stockChart('container', opts);
    setChart(highchart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chart) {
      chart.update(opts);
    }
  }, [chart, opts]);

  return (
    <>
      <div id="container" />
    </>
  );
};

export default BaseGraph;
