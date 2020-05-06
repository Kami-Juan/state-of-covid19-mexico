import Repository from './Repository';

export default {
  getMexicoGeoJson() {
    return Repository.get('mx.json');
  },
};
