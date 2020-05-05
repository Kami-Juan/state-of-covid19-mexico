import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '0.6rem',
  },
});

const LabelColorContainer = ({children}) => {
  const classes = useStyles();

  return <div className={classes.labelContainer}>{children}</div>;
};

export default LabelColorContainer;
