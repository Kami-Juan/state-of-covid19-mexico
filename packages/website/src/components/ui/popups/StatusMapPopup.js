import React from 'react';
import {Popup} from 'react-map-gl';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {},
  text: {color: 'black', fontSize: 12},
});

const StatusMapPopup = ({lat, lng, data, onClose}) => {
  const classes = useStyles();

  return (
    <Popup
      latitude={lat}
      longitude={lng}
      closeButton
      closeOnClick={false}
      onClose={onClose}
      className={classes.container}
      anchor="top">
      <Typography className={classes.text}>
        {data.stateName}: {data.totalCases} casos
      </Typography>
    </Popup>
  );
};

export default StatusMapPopup;
