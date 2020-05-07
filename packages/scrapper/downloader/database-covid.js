const fetch = require('node-fetch');
const {promiseUnzip} = require('./../utils');

const main = async () => {
  const streamZip = await fetch('http://187.191.75.115/gobmx/salud/datos_abiertos/datos_abiertos_covid19.zip');
  return promiseUnzip(streamZip.body)
}

module.exports = {main}