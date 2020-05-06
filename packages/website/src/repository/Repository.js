/**
 * @author: Juan de Dios
 * @description: Instacia de Axios para peticiones HTTP  https://github.com/axios/axios#custom-instance-defaults
 */
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'dist' : '',
});

// Modifica los headers en todas las peticiones
// Más información: https://github.com/axios/axios#interceptors
instance.interceptors.request.use(config => {
  return config;
});

// Recupera la respuesta de cualquier petición
// Más información: https://github.com/axios/axios#interceptors
instance.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.status === 500) {
      //
    } else if (err.response.status === 401) {
      //
    } else {
      //
    }

    return Promise.reject(err);
  },
);

export default instance;
