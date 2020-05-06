import Repository from './Repository';

export default {
  getCovidData() {
    return Repository.get('covid-counters.json');
  },
};
