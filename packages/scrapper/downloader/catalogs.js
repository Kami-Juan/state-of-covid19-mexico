// http://187.191.75.115/gobmx/salud/datos_abiertos/diccionario_datos_covid19.zip

const fetch = require('node-fetch');
const {unzip} = require('./../utils')

const main = async () => {
  try {
    const streamZip = await fetch('http://187.191.75.115/gobmx/salud/datos_abiertos/diccionario_datos_covid19.zip');

    unzip(streamZip.body);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {main}