import React from 'react';
import {useSelector} from 'react-redux';
import {Source, Layer} from 'react-map-gl';

const MapLayers = () => {
  const mexicoGeoJSON = useSelector(state => state.map.mexicoGeojson);

  const mexicoMapLayer = {
    id: 'mexicoMap',
    type: 'fill',
    paint: {
      'fill-opacity': 0.1,
      'fill-color': [
        'case',
        ['==', ['get', 'state_code'], 0],
        '#cfcfcf',
        ['>=', ['get', 'state_code'], 35],
        '#9151b9',
        ['>=', ['get', 'state_code'], 30],
        '#7961ca',
        ['>=', ['get', 'state_code'], 25],
        '#676dd8',
        ['>=', ['get', 'state_code'], 20],
        '#6481e3',
        ['>=', ['get', 'state_code'], 15],
        '#6a93e7',
        ['>=', ['get', 'state_code'], 10],
        '#71abed',
        ['>=', ['get', 'state_code'], 5],
        '#78c6f5',
        ['>=', ['get', 'state_code'], 0.01],
        '#81e3fc',
        '#00FF00',
      ],
    },
  };

  return Object.keys(mexicoGeoJSON).length > 0 ? (
    <Source type="geojson" data={mexicoGeoJSON}>
      <Layer key="neighborhoods" {...mexicoMapLayer} />
    </Source>
  ) : null;
};

export default MapLayers;
