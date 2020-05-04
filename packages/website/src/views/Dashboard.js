import React from 'react';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import DashboardLayout from '../layouts/DashboardLayout';
import GraphCovidCases from '../components/ui/graphs/GraphCovidCases';

const useStyles = makeStyles(theme => ({
  text: {
    marginBottom: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        CASOS POSITIVOS POR ENTIDADES
      </Typography>
      <Typography variant="body1" className={classes.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
        reiciendis accusamus aperiam, id asperiores ipsa voluptatum dolor,
        molestias quo, excepturi officiis blanditiis neque nostrum vel debitis
        qui hic facilis repellat.
      </Typography>
      <GraphCovidCases />
    </DashboardLayout>
  );
};

export default Dashboard;
