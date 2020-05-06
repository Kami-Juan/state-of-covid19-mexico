import React, {useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';

import {useDispatch} from 'react-redux';
import {setMexicoGeojson, setCovidData} from '../store/modules/map/actions';

import Header from '../components/ui/home/Header';

import {RepositoryFactory} from '../repository/RepositoryFactory';

const CovidRepository = RepositoryFactory.get('covid');
const MapTitleRepository = RepositoryFactory.get('mapTitle');

const useStyles = makeStyles({
  container: {
    marginTop: 64,
    marginLeft: 240,
    padding: 60,
  },
});

const StatusView = ({children}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    async function getMexicoGeoJSON() {
      try {
        const {
          data: geojsonMexico,
        } = await MapTitleRepository.getMexicoGeoJson();
        const {data: covidData} = await CovidRepository.getCovidData();

        dispatch(setMexicoGeojson(geojsonMexico));
        dispatch(setCovidData(covidData));
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

export default StatusView;
