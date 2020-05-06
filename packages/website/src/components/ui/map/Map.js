import React, {useState} from 'react';
import ReactMapGL from 'react-map-gl';

import MapLayers from './MapLayers';
// mapbox://styles/kamiganzo/ck9qm24bg1djq1ioa7hj4ppvu
// mapbox://styles/kamiganzo/ck9qlz1os014n1ioempih349w

const Dashboard = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 22.586386,
    longitude: -102.020593,
    zoom: 4.8,
  });

  const onMapHandler = event => {
    console.log(event);
  };

  return (
    <ReactMapGL
      {...viewport}
      minZoom={4.5}
      mapStyle="mapbox://styles/kamiganzo/ck9qlz1os014n1ioempih349w"
      mapboxApiUrl={process.env.MAPBOX_ACCESS_TOKEN}
      onClick={onMapHandler}
      onViewportChange={updatedViewport =>
        setViewport(prev => ({...prev, ...updatedViewport}))
      }>
      <MapLayers />
    </ReactMapGL>
  );
};

export default Dashboard;
