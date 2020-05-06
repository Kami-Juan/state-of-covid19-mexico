import React, {useState, useEffect} from 'react';
import ReactMapGL, {NavigationControl} from 'react-map-gl';

import MapLayers from './MapLayers';
import StatusMapPopup from '../popups/StatusMapPopup';
// mapbox://styles/kamiganzo/ck9qm24bg1djq1ioa7hj4ppvu
// mapbox://styles/kamiganzo/ck9qlz1os014n1ioempih349w

const MapCasesCovid = ({type}) => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth - 380,
    height: 500,
    latitude: 23.586386,
    longitude: -102.020593,
    zoom: 4,
  });

  const [showPopup, setShowPopup] = useState({
    show: false,
    lat: 0,
    lng: 0,
    data: null,
  });

  const showPopupInfo = (lat, lng, data) => {
    setShowPopup({
      show: true,
      lat,
      lng,
      data,
    });
  };

  const closePopupInfo = () => {
    setShowPopup({
      show: false,
      lat: 0,
      lng: 0,
      data: null,
    });
  };

  const onMapHandler = event => {
    if (event.features.length <= 0) return;

    const {lngLat} = event;

    for (let i = 0; i < event.features.length; i++) {
      const {layer, properties} = event.features[i];

      switch (layer.id) {
        case 'mexicoMap':
          showPopupInfo(lngLat[1], lngLat[0], {
            stateName: properties.state_name,
            totalCases: properties.totalCases,
          });
          break;
        default:
          break;
      }
    }
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
        minZoom={4}
        mapStyle="mapbox://styles/kamiganzo/ck9qlz1os014n1ioempih349w"
        mapboxApiUrl={process.env.MAPBOX_ACCESS_TOKEN}
        onClick={onMapHandler}
        onViewportChange={updatedViewport =>
          setViewport(prev => ({...prev, ...updatedViewport}))
        }>
        <div style={{position: 'absolute', right: 16, bottom: 32}}>
          <NavigationControl showCompass={false} />
        </div>
        {showPopup.show && (
          <StatusMapPopup {...showPopup} onClose={closePopupInfo} />
        )}
        <MapLayers type={type} />
      </ReactMapGL>
    </>
  );
};

export default MapCasesCovid;
