import React, {useState, useEffect} from 'react';
import ReactMapGL from 'react-map-gl';

import MapLayers from './MapLayers';
// mapbox://styles/kamiganzo/ck9qm24bg1djq1ioa7hj4ppvu
// mapbox://styles/kamiganzo/ck9qlz1os014n1ioempih349w

const MapCasesCovid = ({type}) => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth - 380,
    height: 500,
    latitude: 22.586386,
    longitude: -102.020593,
    zoom: 3.5,
  });

  const onMapHandler = event => {
    // console.log(event);
  };

  const onUpdateViewport = () => {
    setViewport(prev => ({...prev, width: window.innerWidth - 380}));
  };

  useEffect(() => {
    window.addEventListener('resize', onUpdateViewport);

    return () => {
      window.removeEventListener('resize', onUpdateViewport);
    };
  }, []);

  return (
    <>
      <ReactMapGL
        {...viewport}
        minZoom={3.5}
        mapStyle="mapbox://styles/kamiganzo/ck9qlz1os014n1ioempih349w"
        mapboxApiUrl={process.env.MAPBOX_ACCESS_TOKEN}
        onClick={onMapHandler}
        onViewportChange={updatedViewport =>
          setViewport(prev => ({...prev, ...updatedViewport}))
        }>
        <MapLayers type={type} />
      </ReactMapGL>
    </>
  );
};

export default MapCasesCovid;
