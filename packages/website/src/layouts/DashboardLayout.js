import React, {useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';

import {useDispatch} from 'react-redux';
import {setMexicoGeojson, setCovidData} from '../store/modules/map/actions';

import Header from '../components/ui/home/Header';

const useStyles = makeStyles({
  container: {
    marginTop: 64,
    marginLeft: 240,
    padding: 60,
  },
});

const DashboardLayout = ({children}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    async function getMexicoGeoJSON() {
      try {
        const geojsonDataMexico = await (await fetch('mx.json')).json();
        const covidDataCounters = await (
          await fetch('covid-counters.json')
        ).json();

        dispatch(setMexicoGeojson(geojsonDataMexico));
        dispatch(setCovidData(covidDataCounters));
      } catch (err) {
        // console.log(err);
      }
    }

    getMexicoGeoJSON();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className={classes.container}>{children}</div>
    </>
  );
};

export default DashboardLayout;
