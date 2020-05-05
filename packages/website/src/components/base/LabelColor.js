import React from 'react';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '0.6rem',
  },
  labelColor: ({color}) => ({
    height: '1rem',
    width: '1rem',
    margin: '0 0.4rem',
    backgroundColor: color || '#fff',
  }),
});

const LabelColor = ({color, text}) => {
  const classes = useStyles({color});

  return (
    <>
      <div className={classes.labelColor} />
      <Typography variant="caption">{text}</Typography>
    </>
  );
};

export default LabelColor;
