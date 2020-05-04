import React, {useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';

import {useDispatch} from 'react-redux';
import {setMexicoGeojson, setCovidData} from '../store/modules/map/actions';

import Header from '../components/ui/home/Header';
// mapbox://styles/kamiganzo/ck9qm24bg1djq1ioa7hj4ppvu
// mapbox://styles/kamiganzo/ck9qlz1os014n1ioempih349w

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
        const covidData = await (await fetch('covid.json')).json();

        dispatch(setMexicoGeojson(geojsonDataMexico));
        dispatch(setCovidData(covidData));
      } catch (err) {
        // console.log(err);
      }
    }

    getMexicoGeoJSON();
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className={classes.container}>{children}</div>
    </>
  );
};

export default DashboardLayout;
