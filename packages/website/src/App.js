import React, {useState} from 'react';
import ReactMapGL from 'react-map-gl';

function App() {
  const [viewport, setViewport] = useState({
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    },
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiUrl={process.env.MAPBOX_ACCESS_TOKEN}
      onViewportChange={updatedViewport =>
        setViewport({viewport: updatedViewport})
      }
    />
  );
}

export default App;
