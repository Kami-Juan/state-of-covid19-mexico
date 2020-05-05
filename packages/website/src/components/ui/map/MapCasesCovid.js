import React, {useState} from 'react';
import ReactMapGL from 'react-map-gl';

import {makeStyles} from '@material-ui/core/styles';
import {InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';

import MapLayers from './MapLayers';
// mapbox://styles/kamiganzo/ck9qm24bg1djq1ioa7hj4ppvu
// mapbox://styles/kamiganzo/ck9qlz1os014n1ioempih349w

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MapCasesCovid = () => {
  const classes = useStyles();
  const [typeMap, setTypeMap] = useState('Positivo SARS-CoV-2');

  const [viewport, setViewport] = useState({
    width: window.innerWidth - 380,
    height: 400,
    latitude: 22.586386,
    longitude: -102.020593,
    zoom: 3.5,
  });

  const onMapHandler = event => {
    console.log(event);
  };

  const onTypeMapHandler = event => {
    setTypeMap(event.target.value);
  };

  return (
    <>
      <div className={classes.selectContainer}>
        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Tipo de resultado
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={typeMap}
          onChange={onTypeMapHandler}>
          <MenuItem value="Positivo SARS-CoV-2">Positivos</MenuItem>
          <MenuItem value="No positivo SARS-CoV-2">Negativo</MenuItem>
          <MenuItem value="Resultado pendiente">En espera de resultado</MenuItem>
        </Select>
      </FormControl>
      </div>
      <ReactMapGL
        {...viewport}
        minZoom={3.5}
        mapStyle="mapbox://styles/kamiganzo/ck9qlz1os014n1ioempih349w"
        mapboxApiUrl={process.env.MAPBOX_ACCESS_TOKEN}
        onClick={onMapHandler}
        onViewportChange={updatedViewport =>
          setViewport(prev => ({...prev, ...updatedViewport}))
        }>
        <MapLayers />
      </ReactMapGL>
    </>
  );
};

export default MapCasesCovid;
