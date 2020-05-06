import CovidRepository from './CovidRepository';
import MapTitleRepository from './MapTitleRepository';

const services = {
  covid: CovidRepository,
  mapTitle: MapTitleRepository,
};

/**
 * @author: Juan de Dios
 * @desc: Conjunto de funciones útiles para los repositories
 */
export const RepositoryFactory = {
  /**
   * @author: Juan de Dios
   * @desc: Obtiene el Repository por el nombre
   * @param {string} nombre Nombre del Repository
   * @return {Repository} Devuelve una instancia de un Repository
   */
  get: nombre => services[nombre],
};
