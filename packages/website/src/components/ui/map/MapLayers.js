import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {Source, Layer} from 'react-map-gl';

import MexicoCovidWorker from '../../../workers/geojsonMexicoCovid.worker';

const MapLayers = ({type}) => {
  const mexicoGeoJSON = useSelector(state => state.map.mexicoGeojson);
  const covidData = useSelector(state => state.map.covidData);

  const geoJSONWorker = useRef(null);
  const [geoJSONFormatted, setGeoJSONFormatted] = useState(null);

  useEffect(() => {
    geoJSONWorker.current = new MexicoCovidWorker();
  }, []);

  useEffect(() => {
    if (covidData.length === 0 || Object.keys(mexicoGeoJSON).length === 0) {
      return;
    }

    if (geoJSONWorker.current) {
      geoJSONWorker.current.postMessage({
        mexicoGeoJSON,
        covidData,
        typeMap: type,
      });

      geoJSONWorker.current.addEventListener('message', event => {
        setGeoJSONFormatted({type: 'FeatureCollection', features: event.data});
      });
    }
  }, [geoJSONWorker, covidData, mexicoGeoJSON, type]);

  const mexicoMapLayer = {
    id: 'mexicoMap',
    type: 'fill',
    paint: {
      'fill-opacity': 1,
      'fill-color': [
        'case',
        ['==', ['get', 'totalCases'], 0],
        '#ffffcc',
        ['>=', ['get', 'totalCases'], 7000],
        '#800026',
        ['>=', ['get', 'totalCases'], 6000],
        '#bd0026',
        ['>=', ['get', 'totalCases'], 5000],
        '#e31a1c',
        ['>=', ['get', 'totalCases'], 4000],
        '#fc4e2a',
        ['>=', ['get', 'totalCases'], 3000],
        '#fd8d3c',
        ['>=', ['get', 'totalCases'], 2000],
        '#feb24c',
        ['>=', ['get', 'totalCases'], 1000],
        '#fed976',
        ['>=', ['get', 'totalCases'], 0],
        '#ffeda0',
        '#00FF00',
      ],
    },
  };

  const mexicoMapLinesLayer = {
    id: 'mexicoMapLines',
    type: 'line',
    paint: {'line-opacity': 0.1},
  };

  return geoJSONFormatted ? (
    <Source type="geojson" data={geoJSONFormatted}>
      <Layer {...mexicoMapLayer} />
      <Layer {...mexicoMapLinesLayer} />
    </Source>
  ) : null;
};

export default MapLayers;
